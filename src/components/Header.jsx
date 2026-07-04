import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle, Scale } from 'lucide-react'
import { navItems, whatsappLink } from '../data/siteConfig'

// Header fixo com navegação desktop e menu hamburguer no mobile.
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Header ganha fundo sólido após rolar a página.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloqueia scroll do body quando o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-petrol-950/85 backdrop-blur-xl border-b border-white/10 shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between">
        {/* Logo textual */}
        <a href="#inicio" className="flex items-center gap-2.5 text-white" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-petrol-950 shadow-glow">
            <Scale size={20} strokeWidth={2.2} />
          </span>
          <span className="font-display text-base font-extrabold leading-tight sm:text-lg">
            Clínica Geral
            <span className="block text-[11px] font-medium tracking-wide text-gold-400 sm:text-xs">
              da Advocacia
            </span>
          </span>
        </a>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Ações desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a href="#planos" className="btn-primary">
            Escolher meu plano
          </a>
        </div>

        {/* Botão hamburguer (mobile) */}
        <button
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile (overlay) */}
      <div
        className={`lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } fixed inset-x-0 top-[72px] bottom-0 bg-petrol-950/97 backdrop-blur-xl transition-opacity duration-300`}
      >
        <nav className="container-page flex flex-col gap-1 pt-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-lg font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <a href="#planos" onClick={() => setOpen(false)} className="btn-primary w-full">
              Escolher meu plano
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full"
            >
              <MessageCircle size={16} /> Falar no WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
