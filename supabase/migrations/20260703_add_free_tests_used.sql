-- Free tier: track how many free AI tests a non-premium user has generated.
-- Run this in the Supabase SQL Editor (or via supabase db push).
alter table public.users
  add column if not exists free_tests_used integer not null default 0;
