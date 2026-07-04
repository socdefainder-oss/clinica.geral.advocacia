import { NavLink, Outlet } from 'react-router-dom'
import {
  Inbox,
  FileText,
  Gavel,
  CalendarClock,
  FileBarChart,
  CreditCard,
  LogOut,
  Scale,
} from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

const menu = [
  { to: '/painel', label: 'Início', icon: Inbox, end: true },
  { to: '/painel/solicitacoes', label: 'Minhas solicitações', icon: Inbox },
  { to: '/painel/plano', label: 'Plano contratado', icon: CreditCard },
  { to: '/painel/contratos', label: 'Meus contratos', icon: FileText },
  { to: '/painel/processos', label: 'Meus processos', icon: Gavel },
  { to: '/painel/audiencias', label: 'Consultas agendadas', icon: CalendarClock },
  { to: '/painel/relatorios', label: 'Relatórios', icon: FileBarChart },
]

// Shell do painel do cliente: sidebar de navegação + área de conteúdo.
// Reaproveita a mesma paleta petrol/gold/sage da landing page.
export default function PainelLayout() {
  const { profile, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-petrol-50">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden flex-col justify-between border-r border-petrol-900 bg-petrol-950 p-5 lg:flex">
          <div>
            <div className="mb-8 flex items-center gap-2.5 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-petrol-950">
                <Scale size={20} strokeWidth={2.2} />
              </span>
              <span className="font-display text-sm font-extrabold leading-tight">
                Clínica Geral
                <span className="block text-[11px] font-medium text-gold-400">da Advocacia</span>
              </span>
            </div>
            <nav className="space-y-1">
              {menu.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? 'bg-gold-500 text-petrol-950' : 'text-white/65 hover:bg-white/5'
                    }`
                  }
                >
                  <item.icon size={16} /> {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut size={16} /> Sair
          </button>
        </aside>

        <div className="flex flex-col">
          <header className="flex items-center justify-between border-b border-petrol-100 bg-white px-5 py-4 lg:px-8">
            <div>
              <p className="text-xs text-petrol-400">Bem-vindo(a)</p>
              <p className="font-display text-base font-bold text-petrol-900">
                {profile?.full_name || 'Painel do cliente'}
              </p>
            </div>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-petrol-200 px-4 py-2 text-sm font-medium text-petrol-600 lg:hidden"
            >
              <LogOut size={15} /> Sair
            </button>
          </header>
          <main className="flex-1 p-5 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
