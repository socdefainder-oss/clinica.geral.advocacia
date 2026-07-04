import { useState } from 'react'
import { Plus } from 'lucide-react'
import { supabase } from '../../../lib/supabaseClient'
import { useAuth } from '../../auth/AuthContext'
import { useClientQuery } from '../useClientQuery'
import { PageHeader, EmptyState, LoadingBlock } from '../PanelUi'
import StatusBadge, { demandaStatusMap } from '../StatusBadge'

const tipoOptions = [
  { value: 'consulta_juridica', label: 'Consulta jurídica' },
  { value: 'revisao_contrato', label: 'Revisão de contrato' },
  { value: 'acompanhamento_processual', label: 'Acompanhamento processual' },
  { value: 'distribuicao_acao', label: 'Distribuição de ação' },
  { value: 'outro', label: 'Outro assunto' },
]

const filterTabs = [
  { value: 'todos', label: 'Todas' },
  ...Object.entries(demandaStatusMap).map(([value, { label }]) => ({ value, label })),
]

async function fetchDemandas(clientId) {
  return supabase
    .from('demandas')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
}

export default function Solicitacoes() {
  const { session } = useAuth()
  const [filter, setFilter] = useState('todos')
  const [formOpen, setFormOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [form, setForm] = useState({ tipo: tipoOptions[0].value, titulo: '', descricao: '' })

  const { data: demandas, loading } = useClientQuery(fetchDemandas, [refreshKey])

  const filtered = (demandas ?? []).filter((d) => filter === 'todos' || d.status === filter)

  async function handleCreate(e) {
    e.preventDefault()
    if (!form.titulo.trim()) return
    setSubmitting(true)
    await supabase.from('demandas').insert({
      client_id: session.user.id,
      tipo: form.tipo,
      titulo: form.titulo,
      descricao: form.descricao,
    })
    setSubmitting(false)
    setForm({ tipo: tipoOptions[0].value, titulo: '', descricao: '' })
    setFormOpen(false)
    setRefreshKey((k) => k + 1)
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <PageHeader
          title="Minhas solicitações"
          subtitle="Acompanhe o status de cada demanda aberta."
        />
        <button onClick={() => setFormOpen((v) => !v)} className="btn-primary">
          <Plus size={16} /> Nova solicitação
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleCreate}
          className="mb-6 space-y-4 rounded-2xl border border-petrol-100 bg-white p-5"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-petrol-700">Tipo</label>
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              className="w-full rounded-xl border border-petrol-200 px-4 py-2.5 text-sm text-petrol-900 focus:border-gold-500 focus:outline-none"
            >
              {tipoOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-petrol-700">Título</label>
            <input
              required
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full rounded-xl border border-petrol-200 px-4 py-2.5 text-sm text-petrol-900 focus:border-gold-500 focus:outline-none"
              placeholder="Ex: Revisão de contrato de aluguel"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-petrol-700">
              Descrição (opcional)
            </label>
            <textarea
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-petrol-200 px-4 py-2.5 text-sm text-petrol-900 focus:border-gold-500 focus:outline-none"
              placeholder="Conte um pouco mais sobre a sua demanda"
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Enviando...' : 'Enviar solicitação'}
          </button>
        </form>
      )}

      <div className="mb-5 flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === tab.value
                ? 'bg-petrol-900 text-white'
                : 'bg-white text-petrol-500 border border-petrol-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingBlock />
      ) : filtered.length === 0 ? (
        <EmptyState message="Nenhuma solicitação encontrada para este filtro." />
      ) : (
        <div className="space-y-2.5">
          {filtered.map((d) => (
            <div key={d.id} className="rounded-xl border border-petrol-100 bg-white px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-petrol-900">{d.titulo}</p>
                <StatusBadge status={d.status} map={demandaStatusMap} />
              </div>
              {d.descricao && <p className="mt-1.5 text-sm text-petrol-500">{d.descricao}</p>}
              <p className="mt-2 text-xs text-petrol-400">
                Aberta em {new Date(d.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
