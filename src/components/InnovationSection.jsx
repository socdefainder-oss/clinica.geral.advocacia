import { CalendarRange, ClipboardList, Cpu } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const highlights = [
  {
    icon: CalendarRange,
    title: 'Previsibilidade mensal',
    text: 'Custo fixo e acesso recorrente, sem surpresas a cada nova demanda.',
  },
  {
    icon: ClipboardList,
    title: 'Atendimento organizado',
    text: 'Solicitações, documentos e prazos centralizados e fáceis de acompanhar.',
  },
  {
    icon: Cpu,
    title: 'Tecnologia com responsabilidade jurídica',
    text: 'Plataforma moderna apoiando o trabalho de responsáveis jurídicos preparados.',
  },
]

export default function InnovationSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Inovação"
          title="Uma proposta criada para um novo momento da advocacia."
          subtitle="O mercado mudou. Pessoas e empresas querem acesso, previsibilidade, atendimento rápido, clareza e organização. A Clínica Geral da Advocacia une tecnologia, recorrência e atendimento jurídico humanizado para criar uma experiência mais próxima, acessível e eficiente."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="h-full rounded-3xl border border-petrol-100 bg-petrol-50/60 p-7 text-center transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-petrol-700 to-petrol-950 text-gold-400">
                  <h.icon size={26} />
                </span>
                <h3 className="font-display text-lg font-bold text-petrol-900">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-petrol-600">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="mx-auto max-w-2xl text-center text-sm font-medium italic text-petrol-500">
            Uma proposta ainda pouco explorada no mercado jurídico tradicional.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
