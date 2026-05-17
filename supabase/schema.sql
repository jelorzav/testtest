create type platform as enum ('tiktok', 'instagram');
create type risk_label as enum ('Low', 'Emerging', 'High', 'Conquered');

create table restaurants (
  id text primary key,
  name text not null,
  address text not null,
  latitude double precision not null,
  longitude double precision not null,
  cuisine text not null,
  price_level text not null,
  instagram_handle text,
  tiktok_search_terms text[] not null default '{}',
  instagram_hashtags text[] not null default '{}'
);

create table social_metrics (
  id text primary key,
  restaurant_id text not null references restaurants(id) on delete cascade,
  platform platform not null,
  post_count integer not null,
  creator_count integer not null,
  total_views bigint not null,
  total_likes bigint not null,
  total_comments bigint not null,
  engagement_rate numeric(6, 2) not null,
  posts_last_7_days integer not null,
  posts_last_30_days integer not null,
  mega_creator_posts integer not null default 0,
  captured_at timestamptz not null default now()
);

create table risk_assessments (
  restaurant_id text primary key references restaurants(id) on delete cascade,
  score integer not null check (score between 0 and 100),
  label risk_label not null,
  explanation text not null,
  updated_at timestamptz not null default now()
);
