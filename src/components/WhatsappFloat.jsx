import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../data/siteConfig'

// Botão flutuante fixo de WhatsApp (canto inferior direito).
export default function WhatsappFloat() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-sage-500 py-3.5 pl-3.5 pr-3.5 text-white shadow-card transition-all hover:bg-sage-600 hover:pr-5"
    >
      <MessageCircle size={24} className="shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[10rem] group-hover:opacity-100">
        Falar no WhatsApp
      </span>
    </a>
  )
}
