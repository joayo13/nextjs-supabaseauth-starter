# Next.js Authentication Starter Kit

A modern authentication starter kit built with Next.js, Supabase, and Vercel. This kit provides a complete authentication system with sign-in, sign-up, and password recovery functionality.

## Features

- 🔐 Complete authentication flow (sign-in, sign-up, password recovery)
- 🎨 Modern UI with Tailwind CSS
- 🚀 Server-side rendering with Next.js
- 🔒 Secure authentication with Supabase
- 🌐 Easy deployment with Vercel
- 📱 Responsive design
- 🔄 Session management
- 🛡️ Protected routes

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account
- A Vercel account

### 1. Clone the repository

```bash
git clone https://github.com/joayo13/next-supabase-starter
cd next-supabase-starter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to your project's SQL editor
3. Run the following SQL to set up the authentication system:

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Create a trigger for new user signups
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect that it's a Next.js project
6. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click "Deploy"

Vercel will automatically build and deploy your application. Each push to your main branch will trigger a new deployment.

## Project Structure

```
├── app/
│   ├── auth/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── forgot-password/
│   ├── protected/
│   └── layout.tsx
├── components/
├── utils/
│   └── supabase/
└── public/
```

## Authentication Flow

1. Users can sign up with email and username
2. Email verification is handled by Supabase
3. Password recovery is available through the forgot password flow
4. Protected routes are automatically guarded
5. Sessions are managed securely

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
