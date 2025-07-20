-- Create a table for public "profiles"
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default now(),
  name text,
  email text unique,
  phone text,
  goals text,
  status text,
  avatar_url text
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Allow authenticated users to view their own profile
create policy "Users can view their own profile."
  on profiles for select
  using (auth.uid() = id);

-- Allow authenticated users to insert their own profile
create policy "Users can insert their own profile."
  on profiles for insert
  with check (auth.uid() = id);

-- Allow authenticated users to update their own profile
create policy "Users can update their own profile."
  on profiles for update
  using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
