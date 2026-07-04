-- ============================================================
-- SEED — planos reais (espelha src/data/plans.js)
-- Pode rodar a qualquer momento, não depende de usuários.
-- Reflita aqui qualquer alteração futura feita em src/data/plans.js.
-- ============================================================

insert into public.plans (slug, name, audience, price_cents, period, description, highlight, cta_label, sort_order)
values
  ('pessoal', 'Plano Pessoal', 'pf', 9900, '/mês',
    'Para quem quer orientação jurídica antes de o problema crescer.',
    null, 'Quero o plano pessoal', 1),
  ('empresarial-essencial', 'Plano Empresarial', 'pj', 59900, '/mês',
    'Suporte jurídico essencial para pequenas empresas.',
    'Mais recomendado para empresas em crescimento', 'Contratar plano empresarial', 2),
  ('empresarial-gestao', 'Plano Gestão', 'pj', 199900, '/mês',
    'Estrutura jurídica para empresas em crescimento.',
    null, 'Escolher plano gestão', 3),
  ('empresarial-premium', 'Plano Premium', 'pj', 499900, '/mês',
    'Estrutura jurídica premium para operações robustas.',
    'Estrutura jurídica premium', 'Falar com especialista', 4)
on conflict (slug) do nothing;

-- ---------- Benefícios: Plano Pessoal (R$ 99) ----------
insert into public.plan_benefits (plan_id, label, display_value, metric_key, limit_value, sort_order)
select p.id, v.label, v.display_value, v.metric_key, v.limit_value, v.sort_order
from public.plans p, (values
  ('Consultas jurídicas', 'Ilimitado', null, null, 1),
  ('Revisão de contrato', 'Ilimitado', null, null, 2),
  ('Acompanhamento processual', 'Ilimitado', null, null, 3),
  ('Atuação em processos eletrônicos', '5', 'processo_eletronico', 5, 4),
  ('Distribuição de ações', 'Ilimitado', null, null, 5),
  ('Audiência online', '5', 'audiencia_online', 5, 6),
  ('Relatório mensal', '1', 'relatorio_mensal', 1, 7),
  ('Atendimento humanizado', '24x7', null, null, 8),
  ('Processos físicos', '0', 'processo_fisico', 0, 9),
  ('Audiências presenciais', '0', 'audiencia_presencial', 0, 10)
) as v(label, display_value, metric_key, limit_value, sort_order)
where p.slug = 'pessoal'
  and not exists (select 1 from public.plan_benefits pb where pb.plan_id = p.id);

-- ---------- Benefícios: Plano Empresarial (R$ 599) ----------
insert into public.plan_benefits (plan_id, label, display_value, metric_key, limit_value, sort_order)
select p.id, v.label, v.display_value, v.metric_key, v.limit_value, v.sort_order
from public.plans p, (values
  ('Consultas jurídicas', 'Ilimitado', null, null, 1),
  ('Revisão de contrato', 'Ilimitado', null, null, 2),
  ('Acompanhamento processual', 'Ilimitado', null, null, 3),
  ('Atuação em processos eletrônicos', '10', 'processo_eletronico', 10, 4),
  ('Distribuição de ações', 'Ilimitado', null, null, 5),
  ('Audiência online', '10', 'audiencia_online', 10, 6),
  ('Relatório mensal', '1', 'relatorio_mensal', 1, 7),
  ('Atendimento humanizado', '24x7', null, null, 8),
  ('Processos físicos', '1', 'processo_fisico', 1, 9),
  ('Audiências presenciais', '3', 'audiencia_presencial', 3, 10)
) as v(label, display_value, metric_key, limit_value, sort_order)
where p.slug = 'empresarial-essencial'
  and not exists (select 1 from public.plan_benefits pb where pb.plan_id = p.id);

-- ---------- Benefícios: Plano Gestão (R$ 1.999) ----------
insert into public.plan_benefits (plan_id, label, display_value, metric_key, limit_value, sort_order)
select p.id, v.label, v.display_value, v.metric_key, v.limit_value, v.sort_order
from public.plans p, (values
  ('Consultas jurídicas', 'Ilimitado', null, null, 1),
  ('Revisão de contrato', 'Ilimitado', null, null, 2),
  ('Acompanhamento processual', 'Ilimitado', null, null, 3),
  ('Atuação em processos eletrônicos', '20', 'processo_eletronico', 20, 4),
  ('Distribuição de ações', 'Ilimitado', null, null, 5),
  ('Audiência online', '20', 'audiencia_online', 20, 6),
  ('Relatório mensal', '1', 'relatorio_mensal', 1, 7),
  ('Atendimento humanizado', '24x7', null, null, 8),
  ('Processos físicos', '3', 'processo_fisico', 3, 9),
  ('Audiências presenciais', '5', 'audiencia_presencial', 5, 10)
) as v(label, display_value, metric_key, limit_value, sort_order)
where p.slug = 'empresarial-gestao'
  and not exists (select 1 from public.plan_benefits pb where pb.plan_id = p.id);

-- ---------- Benefícios: Plano Premium (R$ 4.999) ----------
insert into public.plan_benefits (plan_id, label, display_value, metric_key, limit_value, sort_order)
select p.id, v.label, v.display_value, v.metric_key, v.limit_value, v.sort_order
from public.plans p, (values
  ('Consultas jurídicas', 'Ilimitado', null, null, 1),
  ('Revisão de contrato', 'Ilimitado', null, null, 2),
  ('Acompanhamento processual', 'Ilimitado', null, null, 3),
  ('Atuação em processos eletrônicos', '50', 'processo_eletronico', 50, 4),
  ('Distribuição de ações', 'Ilimitado', null, null, 5),
  ('Audiência online', '50', 'audiencia_online', 50, 6),
  ('Relatório mensal', '1', 'relatorio_mensal', 1, 7),
  ('Atendimento humanizado', '24x7', null, null, 8),
  ('Processos físicos', '5', 'processo_fisico', 5, 9),
  ('Audiências presenciais', '10', 'audiencia_presencial', 10, 10)
) as v(label, display_value, metric_key, limit_value, sort_order)
where p.slug = 'empresarial-premium'
  and not exists (select 1 from public.plan_benefits pb where pb.plan_id = p.id);
