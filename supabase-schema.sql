create table sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  slug text unique not null,
  business_name text not null,
  industry text,
  form_data jsonb not null,
  content jsonb not null,
  published boolean default true,
  created_at timestamptz default now()
);

alter table sites enable row level security;

create policy "Public reads published sites" on sites for select using (published = true);
create policy "Users read own sites" on sites for select using (auth.uid() = user_id);
create policy "Users insert own sites" on sites for insert with check (auth.uid() = user_id);
create policy "Users update own sites" on sites for update using (auth.uid() = user_id);
create policy "Users delete own sites" on sites for delete using (auth.uid() = user_id);
