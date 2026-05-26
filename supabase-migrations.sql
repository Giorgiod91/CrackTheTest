-- ============================================================
-- CrackTheTest – Supabase SQL Migrations
-- Run these in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. Rate Limits Table
--    Used by the rate limiter to track requests per user/hour.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rate_limits (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier   TEXT        NOT NULL,
  endpoint     TEXT        NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  count        INTEGER     NOT NULL DEFAULT 0,
  UNIQUE (identifier, endpoint, window_start)
);

CREATE INDEX IF NOT EXISTS rate_limits_lookup
  ON rate_limits (identifier, endpoint, window_start);

-- Auto-clean old windows (older than 24h) to keep table small
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_start < NOW() - INTERVAL '24 hours';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_cleanup_rate_limits ON rate_limits;
CREATE TRIGGER trigger_cleanup_rate_limits
  AFTER INSERT ON rate_limits
  EXECUTE FUNCTION cleanup_rate_limits();

-- RLS: only service_role can read/write (never expose to client)
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
-- No policies = nobody via anon/authenticated key can access it


-- ────────────────────────────────────────────────────────────
-- 2. Feedback Table
--    Stores user feedback submitted via the FeedbackWidget.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS feedback (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID        NOT NULL,              -- Supabase auth user ID
  category   TEXT        NOT NULL CHECK (category IN ('bug', 'feature', 'general', 'praise')),
  rating     SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message    TEXT        NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS feedback_user_idx ON feedback (user_id);
CREATE INDEX IF NOT EXISTS feedback_category_idx ON feedback (category);
CREATE INDEX IF NOT EXISTS feedback_created_idx ON feedback (created_at DESC);

-- RLS: only service_role can insert/read (via our API)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
-- No policies = only service_role key can access


-- ────────────────────────────────────────────────────────────
-- 3. View for quick feedback overview (run as service_role)
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW feedback_overview AS
SELECT
  f.created_at,
  f.category,
  f.rating,
  LEFT(f.message, 200) AS message_preview,
  u.email
FROM feedback f
LEFT JOIN users u ON u.real_member_id::TEXT = f.user_id::TEXT
ORDER BY f.created_at DESC;
