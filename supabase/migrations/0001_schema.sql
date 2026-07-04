-- ============================================================
-- CLÍNICA GERAL DA ADVOCACIA — Schema inicial
-- Rode este arquivo inteiro no SQL Editor do Supabase.
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- ENUMS ----------
create type user_role as enum ('cliente', 'equipe_juridica', 'admin');
create type client_type as enum ('pf', 'pj');
create type subscription_status as enum ('ativa', 'inadimplente', 'suspensa', 'cancelada');
create type demanda_tipo as enum ('consulta_juridica', 'revisao_contrato', 'acompanhamento_processual', 'distribuicao_acao', 'outro');
create type demanda_status as enum ('em_analise', 'em_andamento', 'aguardando_cliente', 'concluido', 'cancelado');
create type contrato_status as enum ('em_revisao', 'aprovado', 'assinado', 'rejeitado');
create type processo_tipo as enum ('eletronico', 'fisico');
create type audiencia_tipo as enum ('online', 'presencial');
create type audiencia_status as enum ('agendada', 'realizada', 'cancelada', 'remarcada');

-- ============================================================
-- PROFILES — 1:1 com auth.users, criado automaticamente no signup
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role user_role not null default 'cliente',
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- CLIENTS — dados específicos de pessoa física/jurídica
-- ============================================================
create table public.clients (
  id uuid primary key references public.profiles (id) on delete cascade,
  client_type client_type not null,
  cpf text,
  cnpj text,
  razao_social text,
  nome_fantasia text,
  endereco jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================
-- LEGAL STAFF — responsáveis jurídicos / equipe interna
-- ============================================================
create table public.legal_staff (
  id uuid primary key references public.profiles (id) on delete cascade,
  cargo text,
  oab text,
  photo_url text,
  bio text,
  is_active boolean not null default true
);

-- ============================================================
-- PLANS / PLAN_BENEFITS — espelha src/data/plans.js
-- ============================================================
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  audience text not null,
  price_cents integer not null,
  period text not null default '/mês',
  description text,
  highlight text,
  cta_label text,
  is_active boolean not null default true,
  sort_order integer not null default 0
);

create table public.plan_benefits (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.plans (id) on delete cascade,
  label text not null,
  display_value text not null,
  -- metric_key identifica benefícios contáveis (null = item "Ilimitado"/"24x7", não conta consumo)
  metric_key text,
  limit_value integer,
  sort_order integer not null default 0
);

-- ============================================================
-- SUBSCRIPTIONS — assinatura do cliente a um plano
-- ============================================================
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  plan_id uuid not null references public.plans (id),
  status subscription_status not null default 'ativa',
  started_at date not null default current_date,
  current_period_start date not null default date_trunc('month', current_date),
  current_period_end date not null default (date_trunc('month', current_date) + interval '1 month - 1 day'),
  assigned_by uuid references public.profiles (id),
  notes text,
  payment_gateway_ref text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- DEMANDAS — solicitações do cliente (também alimenta "status das demandas")
-- ============================================================
create table public.demandas (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  subscription_id uuid references public.subscriptions (id),
  tipo demanda_tipo not null,
  titulo text not null,
  descricao text,
  status demanda_status not null default 'em_analise',
  assigned_to uuid references public.profiles (id),
  prazo_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- CONTRATOS
-- ============================================================
create table public.contratos (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  demanda_id uuid references public.demandas (id),
  titulo text not null,
  storage_path text,
  versao integer not null default 1,
  status contrato_status not null default 'em_revisao',
  uploaded_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

-- ============================================================
-- PROCESSOS + ANDAMENTOS
-- ============================================================
create table public.processos (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  numero_processo text,
  tipo processo_tipo not null,
  vara_instancia text,
  andamento_atual text,
  assigned_to uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.processo_andamentos (
  id uuid primary key default gen_random_uuid(),
  processo_id uuid not null references public.processos (id) on delete cascade,
  descricao text not null,
  data_andamento date not null default current_date,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

-- ============================================================
-- AUDIENCIAS
-- ============================================================
create table public.audiencias (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  processo_id uuid references public.processos (id),
  tipo audiencia_tipo not null,
  data_hora timestamptz not null,
  local_ou_link text,
  status audiencia_status not null default 'agendada',
  created_at timestamptz not null default now()
);

-- ============================================================
-- RELATORIOS MENSAIS
-- ============================================================
create table public.relatorios_mensais (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  subscription_id uuid references public.subscriptions (id),
  competencia date not null,
  resumo text,
  storage_path text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- FUNÇÕES HELPER PARA RLS (security definer evita recursão em profiles)
-- ============================================================
create or replace function public.is_staff()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('equipe_juridica', 'admin')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.legal_staff enable row level security;
alter table public.plans enable row level security;
alter table public.plan_benefits enable row level security;
alter table public.subscriptions enable row level security;
alter table public.demandas enable row level security;
alter table public.contratos enable row level security;
alter table public.processos enable row level security;
alter table public.processo_andamentos enable row level security;
alter table public.audiencias enable row level security;
alter table public.relatorios_mensais enable row level security;

-- profiles: cada um vê/edita a própria linha; staff vê todas
create policy "profiles_select_own_or_staff" on public.profiles
  for select using (id = auth.uid() or public.is_staff());
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());

-- clients: cliente vê a própria linha; staff gerencia tudo
create policy "clients_select_own_or_staff" on public.clients
  for select using (id = auth.uid() or public.is_staff());
create policy "clients_write_staff" on public.clients
  for all using (public.is_staff()) with check (public.is_staff());

-- legal_staff: leitura pública (site/landing), escrita só admin
create policy "legal_staff_select_all" on public.legal_staff
  for select using (true);
create policy "legal_staff_write_admin" on public.legal_staff
  for all using (public.is_admin()) with check (public.is_admin());

-- plans / plan_benefits: leitura pública, escrita só admin
create policy "plans_select_all" on public.plans
  for select using (true);
create policy "plans_write_admin" on public.plans
  for all using (public.is_admin()) with check (public.is_admin());

create policy "plan_benefits_select_all" on public.plan_benefits
  for select using (true);
create policy "plan_benefits_write_admin" on public.plan_benefits
  for all using (public.is_admin()) with check (public.is_admin());

-- subscriptions: cliente só lê a própria; só admin atribui/edita (assinatura manual)
create policy "subscriptions_select_own_or_staff" on public.subscriptions
  for select using (client_id = auth.uid() or public.is_staff());
create policy "subscriptions_write_admin" on public.subscriptions
  for all using (public.is_admin()) with check (public.is_admin());

-- demandas: cliente lê/cria as próprias; staff lê/edita/apaga tudo
create policy "demandas_select_own_or_staff" on public.demandas
  for select using (client_id = auth.uid() or public.is_staff());
create policy "demandas_insert_own" on public.demandas
  for insert with check (client_id = auth.uid());
create policy "demandas_update_staff" on public.demandas
  for update using (public.is_staff());
create policy "demandas_delete_staff" on public.demandas
  for delete using (public.is_staff());

-- contratos
create policy "contratos_select_own_or_staff" on public.contratos
  for select using (client_id = auth.uid() or public.is_staff());
create policy "contratos_write_staff" on public.contratos
  for all using (public.is_staff()) with check (public.is_staff());

-- processos
create policy "processos_select_own_or_staff" on public.processos
  for select using (client_id = auth.uid() or public.is_staff());
create policy "processos_write_staff" on public.processos
  for all using (public.is_staff()) with check (public.is_staff());

-- processo_andamentos: segue a visibilidade do processo relacionado
create policy "andamentos_select_own_or_staff" on public.processo_andamentos
  for select using (
    public.is_staff() or exists (
      select 1 from public.processos p
      where p.id = processo_id and p.client_id = auth.uid()
    )
  );
create policy "andamentos_write_staff" on public.processo_andamentos
  for all using (public.is_staff()) with check (public.is_staff());

-- audiencias
create policy "audiencias_select_own_or_staff" on public.audiencias
  for select using (client_id = auth.uid() or public.is_staff());
create policy "audiencias_write_staff" on public.audiencias
  for all using (public.is_staff()) with check (public.is_staff());

-- relatorios_mensais
create policy "relatorios_select_own_or_staff" on public.relatorios_mensais
  for select using (client_id = auth.uid() or public.is_staff());
create policy "relatorios_write_staff" on public.relatorios_mensais
  for all using (public.is_staff()) with check (public.is_staff());
