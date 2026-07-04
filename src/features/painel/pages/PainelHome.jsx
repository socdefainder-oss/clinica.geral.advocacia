import { supabase } from '../../../lib/supabaseClient'
import { useClientQuery } from '../useClientQuery'
import { PageHeader, EmptyState, LoadingBlock, MetricCard } from '../PanelUi'
import StatusBadge, { demandaStatusMap } from '../StatusBadge'

async function fetchHomeData(clientId) {
  const [demandasRes, contratosRes, processosRes, relatoriosRes] = await Promise.all([
    supabase
      .from('demandas')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('contratos').select('id', { count: 'exact', head: true }).eq('client_id', clientId),
    supabase.from('processos').select('id', { count: 'exact', head: true }).eq('client_id', clientId),
    supabase
      .from('relatorios_mensais')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId),
  ])

  return {
    data: {
      recentDemandas: demandasRes.data ?? [],
      contratosCount: contratosRes.count ?? 0,
      processosCount: processosRes.count ?? 0,
      relatoriosCount: relatoriosRes.count ?? 0,
    },
    error: demandasRes.error,
  }
}

export default function PainelHome() {
  const { data, loading } = useClientQuery(fetchHomeData)

  return (
    <div>
      <PageHeader
        title="Minhas demandas"
        subtitle="Resumo rápido de tudo que está em andamento na sua conta."
      />

      {loading ? (
        <LoadingBlock />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard value={data.recentDemandas.length} label="Solicitações recentes" />
            <MetricCard value={data.contratosCount} label="Contratos" />
            <MetricCard value={data.processosCount} label="Processos" />
            <MetricCard value={data.relatoriosCount} label="Relatórios" />
          </div>

          <p className="mb-3 text-sm font-semibold text-petrol-700">Solicitações recentes</p>

          {data.recentDemandas.length === 0 ? (
            <EmptyState message="Você ainda não abriu nenhuma solicitação." />
          ) : (
            <div className="space-y-2.5">
              {data.recentDemandas.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-petrol-100 bg-white px-4 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-petrol-900">{d.titulo}</p>
                    <p className="text-xs text-petrol-400">
                      Aberta em {new Date(d.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <StatusBadge status={d.status} map={demandaStatusMap} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
