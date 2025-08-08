-- Run in Supabase SQL editor
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text check (role in ('student','teacher','admin')) default 'student',
  bio text,
  created_at timestamptz default now()
);

create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  teacher_id uuid references profiles(id) null,
  created_at timestamptz default now()
);

create table classes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text,
  start_time timestamptz,
  end_time timestamptz,
  meet_link text,
  youtube_id text,
  created_at timestamptz default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text,
  storage_path text,
  created_at timestamptz default now()
);

create table enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  enrolled_at timestamptz default now()
);
