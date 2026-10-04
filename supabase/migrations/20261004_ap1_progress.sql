-- AP1 Fachinformatiker: Lernfortschritt, Prüfungssimulationen, Prüfungstermin.
-- Im Supabase SQL Editor ausführen (oder via supabase db push).

-- 1. Prüfungstermin für den Countdown im Dashboard
alter table public.users
  add column if not exists exam_date date;

-- 2. Sicherheitsfix: Nutzer durften bisher ihre komplette Zeile updaten,
--    also auch premium = true oder free_tests_used = 0 setzen.
--    Ab jetzt nur noch username und exam_date. Webhook (service_role) ist nicht betroffen.
revoke update on public.users from authenticated, anon;
grant update (username, exam_date) on public.users to authenticated;

-- 3. Jede beantwortete Übungsfrage (Basis für Fortschritt pro Thema)
create table if not exists public.ap1_answers (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  question_id  text not null,
  topic        text not null,
  correct      boolean not null,
  source       text not null default 'practice' check (source in ('practice', 'exam')),
  answered_at  timestamptz not null default now()
);

create index if not exists ap1_answers_user_idx on public.ap1_answers (user_id, answered_at desc);

alter table public.ap1_answers enable row level security;

create policy "ap1_answers_select_own" on public.ap1_answers
  for select using (auth.uid() = user_id);
create policy "ap1_answers_insert_own" on public.ap1_answers
  for insert with check (auth.uid() = user_id);
create policy "ap1_answers_delete_own" on public.ap1_answers
  for delete using (auth.uid() = user_id);

-- 4. Abgeschlossene Prüfungssimulationen
create table if not exists public.ap1_exams (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  points            numeric(5,1) not null check (points between 0 and 100),
  note              smallint not null check (note between 1 and 6),
  duration_seconds  integer not null,
  parts_json        jsonb,
  completed_at      timestamptz not null default now()
);

create index if not exists ap1_exams_user_idx on public.ap1_exams (user_id, completed_at desc);

alter table public.ap1_exams enable row level security;

create policy "ap1_exams_select_own" on public.ap1_exams
  for select using (auth.uid() = user_id);
create policy "ap1_exams_insert_own" on public.ap1_exams
  for insert with check (auth.uid() = user_id);
