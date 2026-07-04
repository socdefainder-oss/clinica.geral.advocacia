import { MousePointerClick, UserPlus, Send, Scale, MonitorCheck } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const steps = [
  { icon: MousePointerClick, title: 'Escolha seu plano', text: 'Selecione o plano ideal para o seu perfil.' },
  { icon: UserPlus, title: 'Faça seu cadastro', text: 'Crie sua conta e acesse a plataforma.' },
  { icon: Send, title: 'Envie sua demanda', text: 'Registre solicitações e envie documentos.' },
  { icon: Scale, title: 'Receba atendimento jurídico', text: 'Orientação conforme as condições do plano.' },
  { icon: MonitorCheck, title: 'Acompanhe tudo', text: 'Veja status, prazos e relatórios em um só lugar.' },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Passo a passo"
          title="Como funciona na prática"
          subtitle="Cinco passos simples entre você e o cuidado jurídico recorrente."
        />

        <div className="relative mt-14">
          {/* Linha conectora (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-petrol-100 via-gold-400/50 to-petrol-100 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="relative flex flex-col items-center text-center">
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-petrol-700 to-petrol-950 text-gold-400 shadow-card">
                    <s.icon size={24} />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gold-500 font-display text-xs font-extrabold text-petrol-950">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-petrol-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-petrol-500">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
