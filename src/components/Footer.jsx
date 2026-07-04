import { Scale, MessageCircle, Mail } from 'lucide-react'
import { siteConfig, whatsappLink } from '../data/siteConfig'

const linkCols = [
  {
    title: 'Navegação',
    links: [
      { label: 'Planos', href: '#planos' },
      { label: 'Para empresas', href: '#empresas' },
      { label: 'Responsáveis jurídicos', href: '#responsaveis' },
      { label: 'Como funciona', href: '#como-funciona' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Termos de uso', href: '#' },
      { label: 'Política de privacidade', href: '#' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contato', href: whatsappLink },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-petrol-950 pt-16 text-white/70">
      <div className="container-page">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-petrol-950">
                <Scale size={20} strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-extrabold">
                {siteConfig.brand}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Cuidado jurídico recorrente para sua vida e para sua empresa. Tecnologia para
              organizar, advocacia para proteger e atendimento humano para orientar.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                <MessageCircle size={15} className="text-gold-400" /> WhatsApp
              </a>
              <a
                href="mailto:contato@clinicageraldaadvocacia.com.br"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                <Mail size={15} className="text-gold-400" /> E-mail
              </a>
            </div>
          </div>

          {/* Colunas de links */}
          {linkCols.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold text-white">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/55 transition-colors hover:text-gold-400"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Aviso de validação */}
        <div className="py-7">
          <p className="rounded-2xl border border-gold-400/20 bg-gold-500/5 px-5 py-4 text-center text-xs leading-relaxed text-white/55">
            Esta página é uma versão de validação local. Informações, condições e termos jurídicos
            deverão ser revisados pelos responsáveis jurídicos antes da publicação oficial.
          </p>
        </div>

        {/* Base */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.brand}. Todos os direitos reservados.</p>
          <p>Projeto em validação · Dados ilustrativos</p>
        </div>
      </div>
    </footer>
  )
}
