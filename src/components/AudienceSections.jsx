import {
  FileSignature,
  HelpCircle,
  Gavel,
  Video,
  Eye,
  FolderArchive,
  ShieldCheck,
  Handshake,
  Truck,
  Banknote,
  Briefcase,
  TrendingDown,
  FileBarChart,
  CalendarCheck,
  AlertTriangle,
} from 'lucide-react'
import Reveal from './Reveal'

const pessoaItems = [
  { icon: FileSignature, label: 'Contratos' },
  { icon: HelpCircle, label: 'Dúvidas jurídicas' },
  { icon: Gavel, label: 'Processos' },
  { icon: Video, label: 'Audiências online' },
  { icon: Eye, label: 'Acompanhamento' },
  { icon: FolderArchive, label: 'Organização de documentos' },
  { icon: ShieldCheck, label: 'Prevenção' },
]

const empresaItems = [
  { icon: Handshake, label: 'Contratos com clientes' },
  { icon: Truck, label: 'Contratos com fornecedores' },
  { icon: Banknote, label: 'Cobranças' },
  { icon: Briefcase, label: 'Orientação trabalhista' },
  { icon: Gavel, label: 'Acompanhamento processual' },
  { icon: TrendingDown, label: 'Prevenção de riscos' },
  { icon: FileBarChart, label: 'Relatórios' },
  { icon: CalendarCheck, label: 'Organização jurídica mensal' },
]

// Lista de "pílulas" com ícone.
function PillList({ items, dark }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((it) => (
        <span
          key={it.label}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            dark
              ? 'border border-white/15 bg-white/5 text-white/85 hover:bg-white/10'
              : 'border border-petrol-100 bg-white text-petrol-700 hover:border-gold-400/60'
          }`}
        >
          <it.icon size={16} className={dark ? 'text-gold-400' : 'text-petrol-600'} />
          {it.label}
        </span>
      ))}
    </div>
  )
}

export default function AudienceSections() {
  return (
    <>
      {/* ===== Pessoas físicas ===== */}
      <section id="pessoas" className="bg-white py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
              Para pessoas físicas
            </span>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-petrol-900 sm:text-4xl">
              Para quem quer orientação jurídica sem esperar o problema crescer.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-petrol-600 sm:text-lg">
              Tenha um lugar organizado para tirar dúvidas, revisar contratos, acompanhar processos
              e receber orientação preventiva — tudo com atendimento humanizado e linguagem clara.
            </p>
            <div className="mt-7">
              <a href="#planos" className="btn-primary">
                Ver plano pessoal
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-petrol-100 bg-petrol-50/70 p-7 shadow-soft sm:p-9">
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-petrol-400">
                No seu dia a dia
              </p>
              <PillList items={pessoaItems} dark={false} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Empresas ===== */}
      <section
        id="empresas"
        className="relative overflow-hidden bg-petrol-950 py-20 sm:py-28"
      >
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-petrol-600/30 blur-[120px]" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              Para empresas
            </span>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Suporte jurídico sem precisar criar um departamento interno.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
              Da revisão de contratos à prevenção de riscos, sua empresa ganha uma estrutura
              jurídica mensal, organizada e previsível — com relatórios e acompanhamento contínuo.
            </p>
            <div className="mt-7">
              <a href="#planos" className="btn-primary">
                Ver planos empresariais
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:order-1">
            <div className="glass rounded-3xl p-7 sm:p-9">
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/45">
                Cobertura para o seu negócio
              </p>
              <PillList items={empresaItems} dark />
            </div>
          </Reveal>
        </div>

        {/* Destaque */}
        <div className="container-page relative mt-12">
          <Reveal>
            <div className="flex items-center gap-4 rounded-3xl border border-gold-400/30 bg-gold-500/10 p-6 sm:p-7">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-500 text-petrol-950">
                <AlertTriangle size={22} />
              </span>
              <p className="font-display text-base font-semibold leading-snug text-white sm:text-lg">
                Pequenas decisões jurídicas mal orientadas podem gerar grandes prejuízos.{' '}
                <span className="text-gradient-gold">A prevenção é mais barata que o problema.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
