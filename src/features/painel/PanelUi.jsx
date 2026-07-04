// Pequenos blocos de UI compartilhados entre as telas do painel.

export function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-bold text-petrol-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-petrol-500">{subtitle}</p>}
    </div>
  )
}

export function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-petrol-200 bg-white p-10 text-center text-sm text-petrol-400">
      {message}
    </div>
  )
}

export function LoadingBlock() {
  return (
    <div className="rounded-2xl border border-petrol-100 bg-white p-10 text-center text-sm text-petrol-400">
      Carregando...
    </div>
  )
}

export function MetricCard({ value, label }) {
  return (
    <div className="rounded-xl border border-petrol-100 bg-white p-4 text-center">
      <p className="font-display text-2xl font-extrabold text-petrol-900">{value}</p>
      <p className="mt-0.5 text-xs text-petrol-500">{label}</p>
    </div>
  )
}
