-- ================================================================
-- CrackTheTest — Komplettes Supabase Setup
-- Führe dieses SQL in einem NEUEN Supabase-Projekt aus:
-- Supabase Dashboard → SQL Editor → New Query → Alles einfügen → Run
-- ================================================================

-- ────────────────────────────────────────────────────────────────
-- 1. USERS Tabelle
--    Speichert Profil-Daten und Premium-Status zusätzlich zu
--    Supabase Auth (auth.users Tabelle bleibt separat)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  real_member_id  UUID        PRIMARY KEY,  -- = auth.users.id
  email           TEXT        UNIQUE,
  username        TEXT,
  premium         BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- User kann nur eigene Zeile lesen/updaten
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = real_member_id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = real_member_id);

-- Service role kann alles (für Webhook)
CREATE POLICY "service_role_all" ON public.users
  FOR ALL USING (auth.role() = 'service_role');


-- ────────────────────────────────────────────────────────────────
-- 2. AUTO-CREATE USER bei Registrierung
--    Wenn jemand sich registriert (Supabase Auth) wird automatisch
--    ein Eintrag in public.users erstellt
-- ────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (real_member_id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1))
  )
  ON CONFLICT (real_member_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ────────────────────────────────────────────────────────────────
-- 3. TESTS Tabelle
--    Speichert die vom User erstellten / generierten Tests
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tests (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  content     TEXT        NOT NULL,
  subject     TEXT,
  authorid    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS tests_authorid_idx ON public.tests (authorid);
CREATE INDEX IF NOT EXISTS tests_created_at_idx ON public.tests (created_at DESC);

-- RLS
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tests_select_own" ON public.tests
  FOR SELECT USING (auth.uid() = authorid);

CREATE POLICY "tests_insert_own" ON public.tests
  FOR INSERT WITH CHECK (auth.uid() = authorid);

CREATE POLICY "tests_delete_own" ON public.tests
  FOR DELETE USING (auth.uid() = authorid);

CREATE POLICY "tests_update_own" ON public.tests
  FOR UPDATE USING (auth.uid() = authorid);


-- ────────────────────────────────────────────────────────────────
-- 4. FEEDBACK Tabelle
--    Speichert Feedback aus dem Premium-Dashboard Widget
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.feedback (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL,
  category    TEXT        NOT NULL CHECK (category IN ('bug', 'feature', 'general', 'praise')),
  rating      SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS feedback_created_idx ON public.feedback (created_at DESC);

-- Nur service_role kann lesen (du als Admin via SQL Editor)
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
-- Keine Policies = nur service_role hat Zugriff


-- ────────────────────────────────────────────────────────────────
-- 5. RATE LIMITS Tabelle
--    Schützt API-Endpoints gegen Missbrauch
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier   TEXT        NOT NULL,
  endpoint     TEXT        NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  count        INTEGER     NOT NULL DEFAULT 0,
  UNIQUE (identifier, endpoint, window_start)
);

CREATE INDEX IF NOT EXISTS rate_limits_lookup
  ON public.rate_limits (identifier, endpoint, window_start);

-- Auto-cleanup alter Einträge (>24h)
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM public.rate_limits WHERE window_start < NOW() - INTERVAL '24 hours';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_cleanup_rate_limits ON public.rate_limits;
CREATE TRIGGER trigger_cleanup_rate_limits
  AFTER INSERT ON public.rate_limits
  EXECUTE FUNCTION cleanup_rate_limits();

-- Nur service_role
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;


-- ────────────────────────────────────────────────────────────────
-- 6. FEEDBACK OVERVIEW (Admin-View)
--    Zeigt dir alle Feedbacks mit User-Email
-- ────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.feedback_overview AS
SELECT
  f.created_at,
  f.category,
  f.rating,
  LEFT(f.message, 300) AS nachricht,
  u.email,
  u.username
FROM public.feedback f
LEFT JOIN public.users u ON u.real_member_id = f.user_id
ORDER BY f.created_at DESC;


-- ────────────────────────────────────────────────────────────────
-- DONE ✅
-- Tabellen erstellt: users, tests, feedback, rate_limits
-- Trigger: auto user-create bei Registrierung, auto updated_at
-- RLS aktiviert auf allen Tabellen
-- ────────────────────────────────────────────────────────────────
