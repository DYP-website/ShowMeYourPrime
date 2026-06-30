-- Tabelle future per salvataggio cloud. Per ora l'app usa localStorage.
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  age int, sex text, height numeric, start_weight numeric, current_weight numeric, goal_weight numeric,
  workouts_per_week int, activity text, target_calories int, protein_target int, carb_target int, fat_target int,
  created_at timestamptz default now()
);
create table if not exists meals (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade,
  date date not null, name text not null, kcal int default 0, protein numeric default 0, carbs numeric default 0, fat numeric default 0, meal_type text, created_at timestamptz default now()
);
create table if not exists weights (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade, date date not null, weight numeric not null, created_at timestamptz default now()
);
create table if not exists gym_days (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade, date date not null, planned boolean default false, done boolean default false, created_at timestamptz default now()
);
alter table profiles enable row level security;
alter table meals enable row level security;
alter table weights enable row level security;
alter table gym_days enable row level security;
create policy "own profiles" on profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own meals" on meals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own weights" on weights for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own gym" on gym_days for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
