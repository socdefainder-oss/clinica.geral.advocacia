import { Check, Star, Crown, MessageCircle } from 'lucide-react'
import { plans } from '../data/plans'
import { buildWhatsappLink } from '../data/siteConfig'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Card individual de plano.
function PlanCard({ plan, index }) {
  const featured = plan.id === 'empresarial-essencial'
  const premium = plan.id === 'empresarial-premium'

  // Os valores não são exibidos na página (conforme normas de publicidade da
  // advocacia) — são informados diretamente pela equipe via WhatsApp, já
  // identificando de qual plano o interessado está falando.
  const planWhatsappLink = buildWhatsappLink(
    `Olá! Tenho interesse no ${plan.name} da Clínica Geral da Advocacia e gostaria de saber os valores e mais detalhes.`,
  )

  return (
    <Reveal delay={index * 90} className="h-full">
      <div
        className={`relative flex h-full flex-col rounded-3xl p-6 transition-all hover:-translate-y-1.5 sm:p-7 ${
          featured
            ? 'border-2 border-gold-400 bg-gradient-to-b from-petrol-800 to-petrol-950 text-white shadow-card lg:-mt-4 lg:mb-0'
            : 'border border-petrol-100 bg-white text-petrol-900 shadow-soft hover:shadow-card'
        }`}
      >
        {/* Selo de destaque */}
        {plan.highlight && (
          <span
            className={`absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-bold shadow-soft ${
              featured ? 'bg-gold-500 text-petrol-950' : 'bg-petrol-900 text-gold-400'
            }`}
          >
            {featured ? <Star size={12} fill="currentColor" /> : <Crown size={12} />}
            {plan.highlight}
          </span>
        )}

        {/* Cabeçalho */}
        <div className="mb-5">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              featured ? 'text-gold-400' : 'text-gold-600'
            }`}
          >
            {plan.audience}
          </span>
          <h3 className="mt-1 font-display text-xl font-extrabold">{plan.name}</h3>
          <p className={`mt-1.5 text-sm ${featured ? 'text-white/60' : 'text-petrol-500'}`}>
            {plan.description}
          </p>
        </div>

        {/* Valores informados sob consulta, diretamente pela equipe via WhatsApp */}
        <div className="mb-6">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ${
              featured ? 'bg-white/10 text-white' : 'bg-petrol-50 text-petrol-700'
            }`}
          >
            <MessageCircle size={15} className={featured ? 'text-gold-400' : 'text-sage-600'} />
            Valores sob consulta
          </span>
          <p className={`mt-2 text-xs ${featured ? 'text-white/50' : 'text-petrol-400'}`}>
            Fale com a nossa equipe pelo WhatsApp para conhecer o investimento deste plano.
          </p>
        </div>

        {/* Benefícios */}
        <ul className="mb-7 flex-1 space-y-2.5">
          {plan.benefits.map((b) => (
            <li key={b.label} className="flex items-start justify-between gap-3 text-sm">
              <span className="flex items-start gap-2">
                <Check
                  size={16}
                  className={`mt-0.5 shrink-0 ${featured ? 'text-gold-400' : 'text-sage-500'}`}
                />
                <span className={featured ? 'text-white/80' : 'text-petrol-600'}>{b.label}</span>
              </span>
              <span
                className={`shrink-0 font-semibold ${
                  featured ? 'text-white' : 'text-petrol-900'
                }`}
              >
                {b.value}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={planWhatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full ${featured ? 'btn-primary' : premium ? 'btn-primary' : 'btn-ghost'}`}
        >
          {plan.cta}
        </a>
      </div>
    </Reveal>
  )
}

export default function PlansSection() {
  return (
    <section id="planos" className="bg-petrol-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Planos"
          title="Escolha o plano ideal para você ou sua empresa"
          subtitle="Comparação simples entre os benefícios de cada plano, para pessoa física e para empresas. Os valores são informados diretamente pela nossa equipe via WhatsApp."
        />

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Observação legal */}
        <Reveal className="mt-10">
          <p className="mx-auto max-w-4xl rounded-2xl border border-petrol-100 bg-white px-6 py-4 text-center text-sm leading-relaxed text-petrol-500">
            Os serviços são prestados conforme as condições do plano contratado, análise de
            viabilidade, regras de atendimento, disponibilidade e termos jurídicos aplicáveis.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
