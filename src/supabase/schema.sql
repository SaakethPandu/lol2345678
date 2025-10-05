-- DishaGB Hosting Database Schema

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create registered_users table
create table registered_users (
  id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  username text not null unique,
  display_name text not null,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  status text not null default 'active' check (status in ('active', 'pending')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references registered_users(id) on delete cascade,
  plan_name text not null,
  plan_category text not null check (plan_category in ('minecraft', 'bot', 'vps')),
  plan_details jsonb not null,
  amount numeric(10,2) not null,
  currency text not null default 'INR',
  status text not null default 'pending_payment_verification' 
    check (status in ('pending_payment_verification', 'awaiting_provision', 'completed', 'cancelled')),
  admin_assigned_credentials jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  paid_at timestamp with time zone
);

-- Create payments table
create table payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  method text not null check (method in ('upi', 'qr', 'razorpay')),
  upi_id text,
  qr_image_url text,
  confirmed boolean not null default false,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  confirmed_at timestamp with time zone
);

-- Create indexes for better performance
create index idx_orders_user_id on orders(user_id);
create index idx_orders_status on orders(status);
create index idx_payments_order_id on payments(order_id);
create index idx_payments_confirmed on payments(confirmed);
create index idx_registered_users_email on registered_users(email);
create index idx_registered_users_role on registered_users(role);

-- Enable Row Level Security (RLS)
alter table registered_users enable row level security;
alter table orders enable row level security;
alter table payments enable row level security;

-- RLS Policies for registered_users
create policy "Users can view their own profile" on registered_users
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on registered_users
  for update using (auth.uid() = id);

create policy "Admins can view all users" on registered_users
  for select using (
    exists (
      select 1 from registered_users 
      where id = auth.uid() and role = 'admin'
    )
  );

-- RLS Policies for orders
create policy "Users can view their own orders" on orders
  for select using (auth.uid() = user_id);

create policy "Users can create their own orders" on orders
  for insert with check (auth.uid() = user_id);

create policy "Admins can view all orders" on orders
  for select using (
    exists (
      select 1 from registered_users 
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update all orders" on orders
  for update using (
    exists (
      select 1 from registered_users 
      where id = auth.uid() and role = 'admin'
    )
  );

-- RLS Policies for payments
create policy "Users can view their own payments" on payments
  for select using (
    exists (
      select 1 from orders 
      where orders.id = payments.order_id and orders.user_id = auth.uid()
    )
  );

create policy "Users can create payments for their orders" on payments
  for insert with check (
    exists (
      select 1 from orders 
      where orders.id = payments.order_id and orders.user_id = auth.uid()
    )
  );

create policy "Admins can view all payments" on payments
  for select using (
    exists (
      select 1 from registered_users 
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update all payments" on payments
  for update using (
    exists (
      select 1 from registered_users 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at on orders
create trigger update_orders_updated_at 
  before update on orders 
  for each row execute procedure update_updated_at_column();

-- Function to handle user registration
create or replace function handle_new_user()
returns trigger as $
begin
  insert into public.registered_users (id, email, username, display_name, role, status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'user',
    case when new.email_confirmed_at is not null then 'active' else 'pending' end
  );
  return new;
end;
$ language plpgsql security definer;

-- Trigger to create user record when auth user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Function to update user status when email is confirmed
create or replace function handle_user_email_confirmation()
returns trigger as $$
begin
  if old.email_confirmed_at is null and new.email_confirmed_at is not null then
    update public.registered_users
    set status = 'active'
    where id = new.id;
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to update user status on email confirmation
create trigger on_auth_user_email_confirmed
  after update on auth.users
  for each row execute procedure handle_user_email_confirmation();

-- Create admin user function (for seeding)
create or replace function create_admin_user(admin_email text, admin_password text, admin_username text, admin_display_name text)
returns uuid as $
declare
  new_user_id uuid;
begin
  -- This should be run with elevated privileges
  insert into auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
  values (
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    jsonb_build_object('username', admin_username, 'display_name', admin_display_name)
  )
  returning id into new_user_id;
  
  insert into public.registered_users (id, email, username, display_name, role, status)
  values (new_user_id, admin_email, admin_username, admin_display_name, 'admin', 'active');
  
  return new_user_id;
end;
$ language plpgsql security definer;

-- Enable realtime for tables
alter publication supabase_realtime add table registered_users;
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table payments;

-- Seed admin user
-- Note: This should be run manually after database setup
-- The admin credentials are:
-- Email: admin@dishagb.shop
-- Password: dishagb@shop
-- Username: dishagb_admin
-- Display Name: DishaGB Admin
--
-- To create the admin user, run this SQL command in Supabase SQL Editor:
-- select create_admin_user('admin@dishagb.shop', 'dishagb@shop', 'dishagb_admin', 'DishaGB Admin');