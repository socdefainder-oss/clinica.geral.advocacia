-- ============================================================
-- SEED DE TESTE — 1 cliente de teste com assinatura, demanda,
-- contrato, processo e audiência de exemplo.
--
-- ESTE SCRIPT DEPENDE DE UM USUÁRIO REAL NO AUTH.
--
-- PASSO A PASSO:
-- 1. No Supabase Dashboard, vá em Authentication → Users → Add user
--    (defina um e-mail e senha de teste, ex: cliente.teste@clinica.com).
-- 2. Copie o UUID gerado para esse usuário (coluna "UID" da tabela de users).
-- 3. Substitua TODAS as ocorrências de 'COLE_O_UUID_AQUI' abaixo por esse UUID.
-- 4. Rode este script inteiro no SQL Editor.
--
-- O trigger on_auth_user_created já cria a linha em "profiles"
-- automaticamente (role = 'cliente' por padrão) assim que o usuário
-- é criado — este script só completa o cadastro de cliente e os dados
-- de exemplo.
-- ============================================================

-- Completa o cadastro como cliente pessoa física
insert into public.clients (id, client_type, cpf)
values ('COLE_O_UUID_AQUI', 'pf', '000.000.000-00')
on conflict (id) do nothing;

-- Assinatura de teste no Plano Empresarial (R$ 599)
insert into public.subscriptions (client_id, plan_id, status)
select 'COLE_O_UUID_AQUI', p.id, 'ativa'
from public.plans p
where p.slug = 'empresarial-essencial';

-- Uma solicitação de exemplo
insert into public.demandas (client_id, tipo, titulo, descricao, status)
values (
  'COLE_O_UUID_AQUI',
  'revisao_contrato',
  'Revisão de contrato de prestação de serviço',
  'Cliente solicitou revisão de cláusulas de rescisão.',
  'em_analise'
);

-- Um processo de exemplo
insert into public.processos (client_id, numero_processo, tipo, vara_instancia, andamento_atual)
values (
  'COLE_O_UUID_AQUI',
  '0001234-56.2026.8.19.0001',
  'eletronico',
  '1ª Vara Cível',
  'Aguardando manifestação da parte contrária.'
);

-- Uma audiência de exemplo
insert into public.audiencias (client_id, tipo, data_hora, local_ou_link, status)
values (
  'COLE_O_UUID_AQUI',
  'online',
  now() + interval '7 days',
  'https://meet.exemplo.com/audiencia-teste',
  'agendada'
);

-- ============================================================
-- PARA CRIAR UM USUÁRIO DE EQUIPE (responsável jurídico / admin):
-- Repita o passo 1-2 acima com outro e-mail, depois rode:
--
-- update public.profiles set role = 'admin' where id = 'COLE_O_UUID_DA_EQUIPE_AQUI';
-- insert into public.legal_staff (id, cargo, oab, bio)
-- values ('COLE_O_UUID_DA_EQUIPE_AQUI', 'Responsável Jurídico', 'OAB/RJ 000.000',
--         'Atuação em consultoria jurídica, contratos e acompanhamento processual.');
-- ============================================================
