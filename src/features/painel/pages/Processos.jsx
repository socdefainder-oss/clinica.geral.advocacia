import { supabase } from '../../../lib/supabaseClient'
import { useClientQuery } from '../useClientQuery'
import { PageHeader, EmptyState, LoadingBlock } from '../PanelUi'

async function fetchProcessos(clientId) {
  return supabase
    .from('processos')
    .select('*, processo_andamentos(*)')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
}

export default function Processos() {
  const { data: processos, loading } = useClientQuery(fetchProcessos)

  return (
    <div>
      <PageHeader
        title="Meus processos"
        subtitle="Andamento processual atualizado pela equipe jurídica."
      />

      {loading ? (
        <LoadingBlock />
      ) : !processos || processos.length === 0 ? (
        <EmptyState message="Nenhum processo em acompanhamento no momento." />
      ) : (
        <div className="space-y-4">
          {processos.map((p) => {
            const andamentos = [...(p.processo_andamentos ?? [])].sort(
              (a, b) => new Date(b.data_andamento) - new Date(a.data_andamento),
            )
            return (
              <div key={p.id} className="rounded-2xl border border-petrol-100 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-petrol-900">
                      {p.numero_processo || 'Número ainda não informado'}
                    </p>
                    <p className="text-xs text-petrol-400">
                      {p.tipo === 'eletronico' ? 'Processo eletrônico' : 'Processo físico'}
                      {p.vara_instancia ? ` · ${p.vara_instancia}` : ''}
                    </p>
                  </div>
                </div>

                {p.andamento_atual && (
                  <p className="mt-3 rounded-lg bg-petrol-50 px-3.5 py-2.5 text-sm text-petrol-700">
                    {p.andamento_atual}
                  </p>
                )}

                {andamentos.length > 0 && (
                  <div className="mt-4 space-y-2 border-t border-petrol-100 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-petrol-400">
                      Histórico
                    </p>
                    {andamentos.map((a) => (
                      <div key={a.id} className="flex gap-3 text-sm">
                        <span className="shrink-0 text-petrol-400">
                          {new Date(a.data_andamento).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-petrol-700">{a.descricao}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
