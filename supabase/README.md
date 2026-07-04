# Supabase — scripts de configuração

Estes scripts **não são aplicados automaticamente**. Rode cada um, **na ordem abaixo**, no painel do seu projeto Supabase:

**Supabase Dashboard → seu projeto → SQL Editor → New query → cole o conteúdo → Run**

## Ordem de execução

1. **`migrations/0001_schema.sql`** — cria os enums, todas as tabelas, as funções auxiliares (`is_staff`, `is_admin`) e as políticas de RLS (segurança por linha). Pode rodar imediatamente, não depende de nada.
2. **`migrations/0002_storage.sql`** — cria os buckets de arquivos (`contratos`, `relatorios`) e as políticas de acesso. Pode rodar logo em seguida.
3. **`seed/plans_seed.sql`** — popula os 4 planos reais (Pessoal, Empresarial, Gestão, Premium) com os mesmos benefícios de `src/data/plans.js`. Não depende de usuários, pode rodar a qualquer momento.
4. **`seed/test_data_seed.sql`** — cria um cliente de teste e uma assinatura de exemplo. **Depende de um usuário real já existir no Auth** — siga as instruções dentro do próprio arquivo antes de rodar.

## Depois de rodar os scripts

Volte para a conversa com o Claude e informe:

- **Project URL** (Settings → API → Project URL, algo como `https://xxxxxxxx.supabase.co`)
- **anon / public key** (Settings → API → Project API keys → `anon` `public`)

⚠️ **Nunca compartilhe a `service_role key`** — ela dá acesso total ao banco ignorando as regras de segurança (RLS) e não deve aparecer em nenhum lugar do front-end.
