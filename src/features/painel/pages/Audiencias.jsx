import { Video, MapPin } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'
import { useClientQuery } from '../useClientQuery'
import { PageHeader, EmptyState, LoadingBlock } from '../PanelUi'
import StatusBadge, { audienciaStatusMap } from '../StatusBadge'

async function fetchAudiencias(clientId) {
  return supabase
    .from('audiencias')
    .select('*')
    .eq('client_id', clientId)
    .order('data_hora', { ascending: true })
}

export default function Audiencias() {
  const { data: audiencias, loading } = useClientQuery(fetchAudiencias)

  return (
    <div>
      <PageHeader
        title="Consultas agendadas"
        subtitle="Audiências online e presenciais marcadas pela equipe jurídica."
      />

      {loading ? (
        <LoadingBlock />
      ) : !audiencias || audiencias.length === 0 ? (
        <EmptyState message="Nenhuma audiência agendada no momento." />
      ) : (
        <div className="space-y-2.5">
          {audiencias.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-petrol-100 bg-white px-4 py-3.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-petrol-50 text-petrol-600">
                  {a.tipo === 'online' ? <Video size={18} /> : <MapPin size={18} />}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-petrol-900">
                    {a.tipo === 'online' ? 'Audiência online' : 'Audiência presencial'}
                  </p>
                  <p className="truncate text-xs text-petrol-400">
                    {new Date(a.data_hora).toLocaleString('pt-BR')}
                    {a.local_ou_link ? ` · ${a.local_ou_link}` : ''}
                  </p>
                </div>
              </div>
              <StatusBadge status={a.status} map={audienciaStatusMap} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
