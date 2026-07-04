import { supabase } from '../../../lib/supabaseClient'
import { useClientQuery } from '../useClientQuery'
import { PageHeader, EmptyState, LoadingBlock } from '../PanelUi'

// Cada métrica contável de um benefício sabe de qual tabela/coluna
// tirar o consumo real dentro do ciclo vigente da assinatura.
const metricQueries = {
  processo_eletronico: (clientId, start, end) =>
    supabase
      .from('processos')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .eq('tipo', 'eletronico')
      .gte('created_at', start)
      .lte('created_at', end),
  processo_fisico: (clientId, start, end) =>
    supabase
      .from('processos')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .eq('tipo', 'fisico')
      .gte('created_at', start)
      .lte('created_at', end),
  audiencia_online: (clientId, start, end) =>
    supabase
      .from('audiencias')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .eq('tipo', 'online')
      .gte('data_hora', start)
      .lte('data_hora', end),
  audiencia_presencial: (clientId, start, end) =>
    supabase
      .from('audiencias')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .eq('tipo', 'presencial')
      .gte('data_hora', start)
      .lte('data_hora', end),
  relatorio_mensal: (clientId, start, end) =>
    supabase
      .from('relatorios_mensais')
      .select('id', { count: 'exact', head: true })
      .eq('client_id', clientId)
      .gte('competencia', start)
      .lte('competencia', end),
}

async function fetchPlano(clientId) {
  const { data: sub, error } = await supabase
    .from('subscriptions')
    .select('*, plan:plans(*, plan_benefits(*))')
    .eq('client_id', clientId)
    .eq('status', 'ativa')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error || !sub) return { data: null, error }

  const benefits = [...(sub.plan?.plan_benefits ?? [])].sort((a, b) => a.sort_order - b.sort_order)
  const countable = benefits.filter((b) => b.metric_key)

  const usageEntries = await Promise.all(
    countable.map(async (b) => {
      const queryFn = metricQueries[b.metric_key]
      if (!queryFn) return [b.metric_key, 0]
      const { count } = await queryFn(clientId, sub.current_period_start, sub.current_period_end)
      return [b.metric_key, count ?? 0]
    }),
  )

  return {
    data: { subscription: sub, benefits, usage: Object.fromEntries(usageEntries) },
    error: null,
  }
}

function BenefitRow({ benefit, usage }) {
  if (!benefit.metric_key) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-petrol-100 bg-white px-4 py-3.5">
        <span className="text-sm font-medium text-petrol-700">{benefit.label}</span>
        <span className="rounded-full bg-sage-500/15 px-3 py-1 text-xs font-semibold text-sage-600">
          {benefit.display_value}
        </span>
      </div>
    )
  }

  const limit = benefit.limit_value ?? 0
  const used = usage[benefit.metric_key] ?? 0
  const pct = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0

  return (
    <div className="rounded-xl border border-petrol-100 bg-white px-4 py-3.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-petrol-700">{benefit.label}</span>
        <span className="font-semibold text-petrol-900">
          {limit === 0 ? 'Não incluso' : `${used} de ${limit} usados`}
        </span>
      </div>
      {limit > 0 && (
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-petrol-100">
          <div
            className={`h-full rounded-full ${pct >= 100 ? 'bg-red-400' : 'bg-gold-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default function PlanoContratado() {
  const { data, loading } = useClientQuery(fetchPlano)

  return (
    <div>
      <PageHeader
        title="Plano contratado"
        subtitle="Consumo dos benefícios dentro do ciclo mensal atual."
      />

      {loading ? (
        <LoadingBlock />
      ) : !data ? (
        <EmptyState message="Nenhuma assinatura ativa encontrada para esta conta." />
      ) : (
        <>
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-petrol-800 to-petrol-950 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
              {data.subscription.plan?.audience === 'pf' ? 'Pessoa física' : 'Empresas'}
            </p>
            <p className="mt-1 font-display text-xl font-extrabold">{data.subscription.plan?.name}</p>
            <p className="mt-2 text-sm text-white/60">
              Ciclo atual:{' '}
              {new Date(data.subscription.current_period_start).toLocaleDateString('pt-BR')} até{' '}
              {new Date(data.subscription.current_period_end).toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div className="space-y-2.5">
            {data.benefits.map((b) => (
              <BenefitRow key={b.id} benefit={b} usage={data.usage} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
