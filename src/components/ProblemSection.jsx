import { AlarmClock, Building, FileWarning, CalendarX, Landmark } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const problems = [
  {
    icon: AlarmClock,
    text: 'Muita gente só procura advogado quando o problema já virou urgência.',
  },
  {
    icon: Building,
    text: 'Empresas pequenas vivem sem orientação preventiva.',
  },
  {
    icon: FileWarning,
    text: 'Contratos são assinados sem revisão.',
  },
  {
    icon: CalendarX,
    text: 'Processos e prazos ficam desorganizados.',
  },
  {
    icon: Landmark,
    text: 'O atendimento jurídico tradicional pode parecer distante, caro e burocrático.',
  },
]

export default function ProblemSection() {
  return (
    <section className="bg-petrol-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="O problema"
          title="Por que o acesso jurídico ainda é tão difícil?"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-petrol-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-petrol-900 text-gold-400 transition-colors group-hover:bg-petrol-800">
                  <p.icon size={22} />
                </span>
                <p className="text-[15px] font-medium leading-relaxed text-petrol-700">{p.text}</p>
              </div>
            </Reveal>
          ))}

          {/* Card de fechamento */}
          <Reveal delay={problems.length * 80}>
            <div className="flex h-full items-center rounded-2xl bg-gradient-to-br from-petrol-800 to-petrol-950 p-6 text-white shadow-card">
              <p className="font-display text-lg font-bold leading-snug">
                A Clínica Geral da Advocacia nasce para{' '}
                <span className="text-gradient-gold">mudar essa relação.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
