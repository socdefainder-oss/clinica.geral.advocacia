// Mapas de rótulo/cor por tipo de status (espelham os enums do Supabase).
export const demandaStatusMap = {
  em_analise: { label: 'Em análise', tone: 'gold' },
  em_andamento: { label: 'Em andamento', tone: 'petrol' },
  aguardando_cliente: { label: 'Aguardando você', tone: 'gold' },
  concluido: { label: 'Concluído', tone: 'green' },
  cancelado: { label: 'Cancelado', tone: 'red' },
}

export const contratoStatusMap = {
  em_revisao: { label: 'Em revisão', tone: 'gold' },
  aprovado: { label: 'Aprovado', tone: 'green' },
  assinado: { label: 'Assinado', tone: 'green' },
  rejeitado: { label: 'Rejeitado', tone: 'red' },
}

export const audienciaStatusMap = {
  agendada: { label: 'Agendada', tone: 'petrol' },
  realizada: { label: 'Realizada', tone: 'green' },
  cancelada: { label: 'Cancelada', tone: 'red' },
  remarcada: { label: 'Remarcada', tone: 'gold' },
}

const toneClasses = {
  gold: 'bg-gold-500/15 text-gold-600',
  green: 'bg-sage-500/15 text-sage-600',
  petrol: 'bg-petrol-500/15 text-petrol-600',
  red: 'bg-red-500/10 text-red-600',
}

export default function StatusBadge({ status, map }) {
  const entry = map[status] ?? { label: status, tone: 'petrol' }
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[entry.tone]}`}>
      {entry.label}
    </span>
  )
}
