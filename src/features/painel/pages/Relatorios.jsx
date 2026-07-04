import { Download, FileBarChart } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'
import { useClientQuery } from '../useClientQuery'
import { PageHeader, EmptyState, LoadingBlock } from '../PanelUi'

async function fetchRelatorios(clientId) {
  return supabase
    .from('relatorios_mensais')
    .select('*')
    .eq('client_id', clientId)
    .order('competencia', { ascending: false })
}

async function handleDownload(storagePath) {
  if (!storagePath) return
  const { data, error } = await supabase.storage.from('relatorios').createSignedUrl(storagePath, 60)
  if (!error && data?.signedUrl) window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
}

export default function Relatorios() {
  const { data: relatorios, loading } = useClientQuery(fetchRelatorios)

  return (
    <div>
      <PageHeader
        title="Relatórios"
        subtitle="Um resumo mensal das atividades realizadas na sua conta."
      />

      {loading ? (
        <LoadingBlock />
      ) : !relatorios || relatorios.length === 0 ? (
        <EmptyState message="Nenhum relatório disponível ainda." />
      ) : (
        <div className="space-y-2.5">
          {relatorios.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-petrol-100 bg-white px-4 py-3.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-petrol-50 text-petrol-600">
                  <FileBarChart size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-petrol-900">
                    Relatório de{' '}
                    {new Date(r.competencia).toLocaleDateString('pt-BR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  {r.resumo && <p className="truncate text-xs text-petrol-400">{r.resumo}</p>}
                </div>
              </div>
              {r.storage_path && (
                <button
                  onClick={() => handleDownload(r.storage_path)}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-petrol-200 text-petrol-600 hover:bg-petrol-50"
                  aria-label="Baixar relatório"
                >
                  <Download size={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
