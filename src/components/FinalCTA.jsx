import { MessageCircle, ArrowRight } from 'lucide-react'
import { whatsappLink } from '../data/siteConfig'
import Reveal from './Reveal'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-petrol-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/15 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-petrol [background-size:26px_26px] opacity-40" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl sm:p-12">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Comece a cuidar das suas demandas jurídicas de forma{' '}
              <span className="text-gradient-gold">recorrente.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Escolha um plano e tenha uma estrutura jurídica mais próxima, organizada e
              humanizada.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#planos" className="btn-primary">
                Escolher meu plano <ArrowRight size={16} />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle size={16} /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
