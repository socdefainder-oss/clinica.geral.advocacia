import { Download, FileText } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'
import { useClientQuery } from '../useClientQuery'
import { PageHeader, EmptyState, LoadingBlock } from '../PanelUi'
import StatusBadge, { contratoStatusMap } from '../StatusBadge'

async function fetchContratos(clientId) {
  return supabase
    .from('contratos')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
}

async function handleDownload(storagePath) {
  if (!storagePath) return
  const { data, error } = await supabase.storage.from('contratos').createSignedUrl(storagePath, 60)
  if (!error && data?.signedUrl) window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
}

export default function Contratos() {
  const { data: contratos, loading } = useClientQuery(fetchContratos)

  return (
    <div>
      <PageHeader
        title="Meus contratos"
        subtitle="Contratos enviados para revisão e seus respectivos status."
      />

      {loading ? (
        <LoadingBlock />
      ) : !contratos || contratos.length === 0 ? (
        <EmptyState message="Nenhum contrato enviado até o momento." />
      ) : (
        <div className="space-y-2.5">
          {contratos.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-petrol-100 bg-white px-4 py-3.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-petrol-50 text-petrol-600">
                  <FileText size={18} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-petrol-900">{c.titulo}</p>
                  <p className="text-xs text-petrol-400">
                    Versão {c.versao} · {new Date(c.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <StatusBadge status={c.status} map={contratoStatusMap} />
                {c.storage_path && (
                  <button
                    onClick={() => handleDownload(c.storage_path)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-petrol-200 text-petrol-600 hover:bg-petrol-50"
                    aria-label="Baixar contrato"
                  >
                    <Download size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
