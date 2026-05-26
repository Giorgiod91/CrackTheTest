-- ── test_results table ──────────────────────────────────────────────────────
-- Run this in the Supabase SQL Editor (new project: jehutlecyqznhnpmwnhr)

create table if not exists public.test_results (
  id             uuid primary key default gen_random_uuid(),
  test_id        uuid not null references public.tests(id) on delete cascade,
  user_id        uuid not null references auth.users(id)   on delete cascade,
  score          integer not null check (score between 0 and 100),
  correct_count  integer not null default 0,
  total_count    integer not null default 0,
  answers_json   jsonb,
  completed_at   timestamptz not null default now()
);

-- Index for fast lookups per user
create index if not exists test_results_user_id_idx on public.test_results(user_id);
create index if not exists test_results_test_id_idx on public.test_results(test_id);

-- RLS
alter table public.test_results enable row level security;

-- Users can only see and insert their own results
create policy "Users can read own results"
  on public.test_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own results"
  on public.test_results for insert
  with check (auth.uid() = user_id);
