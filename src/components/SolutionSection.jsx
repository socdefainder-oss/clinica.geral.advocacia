import { CreditCard, Inbox, MessagesSquare, LineChart, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const steps = [
  {
    icon: CreditCard,
    title: 'Contrate um plano mensal',
    text: 'Escolha o plano ideal para sua vida ou para o porte da sua empresa.',
  },
  {
    icon: Inbox,
    title: 'Abra suas solicitações',
    text: 'Registre demandas pela plataforma de forma simples e organizada.',
  },
  {
    icon: MessagesSquare,
    title: 'Receba atendimento humanizado',
    text: 'Orientação jurídica conforme as condições do plano contratado.',
  },
  {
    icon: LineChart,
    title: 'Acompanhe e receba relatórios',
    text: 'Envie documentos, acompanhe o andamento e veja tudo registrado.',
  },
]

// Etapas da jornada (linha visual).
const journey = [
  'Escolha o plano',
  'Envie sua demanda',
  'Atendimento jurídico',
  'Acompanhamento e relatório',
]

export default function SolutionSection() {
  return (
    <section id="solucao" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="A solução"
          title="Uma nova experiência de atendimento jurídico por assinatura."
          subtitle="Tudo o que você precisa para cuidar das suas demandas jurídicas de forma recorrente, organizada e próxima."
        />

        {/* Blocos */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="relative h-full rounded-2xl border border-petrol-100 bg-petrol-50/60 p-6 transition-all hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-card">
                <span className="absolute right-5 top-5 font-display text-3xl font-extrabold text-petrol-100">
                  0{i + 1}
                </span>
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-petrol-700 to-petrol-900 text-gold-400">
                  <s.icon size={22} />
                </span>
                <h3 className="font-display text-lg font-bold text-petrol-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-petrol-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Linha da jornada */}
        <Reveal className="mt-14">
          <div className="rounded-3xl bg-gradient-to-br from-petrol-800 to-petrol-950 p-6 sm:p-8">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              A jornada do cliente
            </p>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              {journey.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-3 sm:flex-col sm:gap-3 sm:text-center">
                  <div className="flex items-center gap-3 sm:flex-col">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-gold-400/60 font-display font-bold text-gold-400">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-white sm:max-w-[10rem]">{label}</span>
                  </div>
                  {i < journey.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="ml-auto hidden text-white/30 sm:ml-0 sm:block sm:rotate-0"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
