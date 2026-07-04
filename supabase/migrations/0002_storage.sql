-- ============================================================
-- STORAGE — buckets de arquivos e políticas de acesso
-- Rode depois de 0001_schema.sql.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('contratos', 'contratos', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('relatorios', 'relatorios', false)
on conflict (id) do nothing;

-- Convenção de caminho dos arquivos: "{client_id}/nome-do-arquivo.pdf"
-- storage.foldername(name) retorna um array com os segmentos da pasta;
-- o primeiro segmento precisa ser igual ao uuid do cliente autenticado.

-- ---------- bucket: contratos ----------
create policy "contratos_select_own_or_staff" on storage.objects
  for select using (
    bucket_id = 'contratos'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff())
  );

create policy "contratos_insert_staff" on storage.objects
  for insert with check (bucket_id = 'contratos' and public.is_staff());

create policy "contratos_update_staff" on storage.objects
  for update using (bucket_id = 'contratos' and public.is_staff());

create policy "contratos_delete_staff" on storage.objects
  for delete using (bucket_id = 'contratos' and public.is_staff());

-- ---------- bucket: relatorios ----------
create policy "relatorios_select_own_or_staff" on storage.objects
  for select using (
    bucket_id = 'relatorios'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_staff())
  );

create policy "relatorios_insert_staff" on storage.objects
  for insert with check (bucket_id = 'relatorios' and public.is_staff());

create policy "relatorios_update_staff" on storage.objects
  for update using (bucket_id = 'relatorios' and public.is_staff());

create policy "relatorios_delete_staff" on storage.objects
  for delete using (bucket_id = 'relatorios' and public.is_staff());
