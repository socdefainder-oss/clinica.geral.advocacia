import {
  Inbox,
  FileText,
  Gavel,
  CalendarClock,
  FileBarChart,
  Activity,
  CreditCard,
  Search,
  Bell,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Itens da barra lateral do mockup.
const menu = [
  { icon: Inbox, label: 'Minhas solicitações', active: true },
  { icon: FileText, label: 'Meus contratos' },
  { icon: Gavel, label: 'Meus processos' },
  { icon: CalendarClock, label: 'Consultas agendadas' },
  { icon: FileBarChart, label: 'Relatórios' },
  { icon: Activity, label: 'Status das demandas' },
  { icon: CreditCard, label: 'Plano contratado' },
]

const requests = [
  { title: 'Revisão de contrato de prestação de serviço', tag: 'Em análise', tone: 'gold', date: 'Hoje' },
  { title: 'Acompanhamento processual nº 0294-22', tag: 'Prazo em 12 dias', tone: 'petrol', date: 'Ontem' },
  { title: 'Consulta jurídica preventiva — trabalhista', tag: 'Agendada', tone: 'green', date: '2 dias' },
  { title: 'Distribuição de ação de cobrança', tag: 'Concluído', tone: 'green', date: '5 dias' },
]

const toneMap = {
  gold: 'bg-gold-500/15 text-gold-600',
  green: 'bg-sage-500/15 text-sage-600',
  petrol: 'bg-petrol-500/15 text-petrol-600',
}

export default function DashboardMockup() {
  return (
    <section className="relative overflow-hidden bg-petrol-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-petrol [background-size:26px_26px] opacity-40" />
      <div className="pointer-events-none absolute -top-20 right-10 h-80 w-80 rounded-full bg-gold-500/10 blur-[110px]" />

      <div className="container-page relative">
        <SectionHeading
          dark
          eyebrow="Plataforma"
          title="Tudo organizado em um só lugar."
          subtitle="Uma prévia de como será o painel do cliente: demandas, contratos, processos e relatórios sempre à mão."
        />

        {/* Janela do app */}
        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-petrol-900/60 shadow-card backdrop-blur-xl">
            {/* Barra de janela */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
              <div className="ml-4 hidden flex-1 items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/40 sm:flex">
                <Search size={13} /> app.clinicageraladvocacia.com.br/painel
              </div>
            </div>

            <div className="grid lg:grid-cols-[230px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-white/10 bg-white/[0.03] p-4 lg:block">
                <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                  Menu
                </p>
                <nav className="space-y-1">
                  {menu.map((m) => (
                    <span
                      key={m.label}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                        m.active
                          ? 'bg-gold-500 text-petrol-950'
                          : 'text-white/65 hover:bg-white/5'
                      }`}
                    >
                      <m.icon size={16} /> {m.label}
                    </span>
                  ))}
                </nav>
              </aside>

              {/* Conteúdo */}
              <div className="p-5 sm:p-7">
                {/* Topo */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/45">Bem-vindo de volta</p>
                    <p className="font-display text-lg font-bold text-white">Painel de demandas</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-white/70">
                      <Bell size={16} />
                    </span>
                    <span className="badge !bg-sage-500/20 !text-sage-400">
                      Plano Gestão · Ativo
                    </span>
                  </div>
                </div>

                {/* Métricas */}
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { n: '04', l: 'Solicitações ativas' },
                    { n: '02', l: 'Contratos' },
                    { n: '03', l: 'Processos' },
                    { n: '01', l: 'Relatório do mês' },
                  ].map((s) => (
                    <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="font-display text-2xl font-extrabold text-gold-400">{s.n}</p>
                      <p className="mt-0.5 text-xs text-white/55">{s.l}</p>
                    </div>
                  ))}
                </div>

                {/* Lista de solicitações */}
                <p className="mb-3 text-sm font-semibold text-white/70">Minhas solicitações</p>
                <div className="space-y-2.5">
                  {requests.map((r) => (
                    <div
                      key={r.title}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors hover:bg-white/10"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{r.title}</p>
                        <p className="text-xs text-white/40">Atualizado há {r.date}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${toneMap[r.tone]}`}
                      >
                        {r.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-xs text-white/40">
          Mockup ilustrativo. A área do cliente será desenvolvida nas próximas etapas do projeto.
        </p>
      </div>
    </section>
  )
}
