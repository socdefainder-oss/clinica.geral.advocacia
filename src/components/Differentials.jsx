import {
  Repeat,
  Users,
  FolderKanban,
  LayoutGrid,
  FileBarChart,
  HeartHandshake,
  Gavel,
  ShieldCheck,
} from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const items = [
  { icon: Repeat, title: 'Atendimento jurídico recorrente', text: 'Suporte contínuo, não apenas quando o problema aparece.' },
  { icon: Users, title: 'Planos para pessoas e empresas', text: 'Estruturas pensadas para cada perfil e necessidade.' },
  { icon: FolderKanban, title: 'Organização digital das demandas', text: 'Tudo registrado, acompanhado e fácil de encontrar.' },
  { icon: LayoutGrid, title: 'Consultas e contratos em um só lugar', text: 'Uma única plataforma para toda a sua vida jurídica.' },
  { icon: FileBarChart, title: 'Relatórios mensais', text: 'Visão clara do que foi feito e do que está em andamento.' },
  { icon: HeartHandshake, title: 'Atendimento humanizado', text: 'Comunicação próxima, clara e sem juridiquês.' },
  { icon: Gavel, title: 'Acompanhamento processual', text: 'Prazos e andamentos sob controle e organizados.' },
  { icon: ShieldCheck, title: 'Estrutura para prevenção jurídica', text: 'Foco em evitar o problema antes que ele cresça.' },
]

export default function Differentials() {
  return (
    <section className="relative overflow-hidden bg-petrol-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-petrol [background-size:26px_26px] opacity-50" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-gold-500/10 blur-[120px]" />

      <div className="container-page relative">
        <SectionHeading
          dark
          eyebrow="Diferenciais"
          title="Por que a Clínica Geral da Advocacia é diferente?"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-gold-400/40 hover:bg-white/10">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gold-500/15 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-petrol-950">
                  <it.icon size={22} />
                </span>
                <h3 className="font-display text-base font-bold text-white">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Destaque */}
        <Reveal className="mt-12">
          <div className="rounded-3xl border border-gold-400/30 bg-gradient-to-r from-gold-500/10 to-transparent p-7 text-center sm:p-9">
            <p className="mx-auto max-w-3xl font-display text-lg font-semibold leading-relaxed text-white sm:text-xl">
              Não é apenas atendimento jurídico. É uma{' '}
              <span className="text-gradient-gold">esteira organizada de cuidado</span>, prevenção e
              acompanhamento.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
