-- Profiles are created by a trigger on auth.users so signup cannot skip them.
-- The trigger function lives in private, which is not exposed through the Data API.

create schema if not exists private;

revoke all on schema private from public;
revoke all on schema private from anon, authenticated;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_credits integer not null default 100,
  credits_used_this_period integer not null default 0
);

create table public.verification_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null check (status in ('queued', 'processing', 'done', 'failed')),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  total_emails integer not null default 0,
  results_summary jsonb
);

create table public.verification_results (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.verification_jobs (id) on delete cascade,
  email text not null,
  status text not null,
  reason text,
  is_disposable boolean not null default false,
  is_role_account boolean not null default false,
  is_catch_all boolean not null default false,
  possible_blanket_reject boolean not null default false,
  mx_record_found boolean not null default false,
  checked_at timestamptz
);

create index subscriptions_user_id_idx on public.subscriptions (user_id);
create index verification_jobs_user_id_idx on public.verification_jobs (user_id);
create index verification_results_job_id_idx on public.verification_results (job_id);

revoke all on table public.profiles from anon;
revoke all on table public.subscriptions from anon;
revoke all on table public.verification_jobs from anon;
revoke all on table public.verification_results from anon;

grant select, insert, update, delete on table public.profiles to authenticated;
grant select, insert, update, delete on table public.subscriptions to authenticated;
grant select, insert, update, delete on table public.verification_jobs to authenticated;
grant select, insert, update, delete on table public.verification_results to authenticated;

grant all on table public.profiles to service_role;
grant all on table public.subscriptions to service_role;
grant all on table public.verification_jobs to service_role;
grant all on table public.verification_results to service_role;

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.verification_jobs enable row level security;
alter table public.verification_results enable row level security;

create policy profiles_select_own
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()));

create policy profiles_insert_own
  on public.profiles
  for insert
  to authenticated
  with check (id = (select auth.uid()));

create policy profiles_update_own
  on public.profiles
  for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy profiles_delete_own
  on public.profiles
  for delete
  to authenticated
  using (id = (select auth.uid()));

create policy subscriptions_select_own
  on public.subscriptions
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy subscriptions_insert_own
  on public.subscriptions
  for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy subscriptions_update_own
  on public.subscriptions
  for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy subscriptions_delete_own
  on public.subscriptions
  for delete
  to authenticated
  using (user_id = (select auth.uid()));

create policy verification_jobs_select_own
  on public.verification_jobs
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy verification_jobs_insert_own
  on public.verification_jobs
  for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy verification_jobs_update_own
  on public.verification_jobs
  for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy verification_jobs_delete_own
  on public.verification_jobs
  for delete
  to authenticated
  using (user_id = (select auth.uid()));

create policy verification_results_select_own
  on public.verification_results
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.verification_jobs
      where verification_jobs.id = verification_results.job_id
        and verification_jobs.user_id = (select auth.uid())
    )
  );

create policy verification_results_insert_own
  on public.verification_results
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.verification_jobs
      where verification_jobs.id = verification_results.job_id
        and verification_jobs.user_id = (select auth.uid())
    )
  );

create policy verification_results_update_own
  on public.verification_results
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.verification_jobs
      where verification_jobs.id = verification_results.job_id
        and verification_jobs.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.verification_jobs
      where verification_jobs.id = verification_results.job_id
        and verification_jobs.user_id = (select auth.uid())
    )
  );

create policy verification_results_delete_own
  on public.verification_results
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.verification_jobs
      where verification_jobs.id = verification_results.job_id
        and verification_jobs.user_id = (select auth.uid())
    )
  );

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, coalesce(new.email, ''));
  return new;
end;
$$;

revoke all on function private.handle_new_user() from public, anon, authenticated;
grant usage on schema private to supabase_auth_admin;
grant execute on function private.handle_new_user() to supabase_auth_admin;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function private.handle_new_user();
