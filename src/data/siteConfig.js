// ============================================================
//  CONFIGURAÇÃO GERAL DO SITE — edite aqui textos globais e contatos.
// ============================================================

export const siteConfig = {
  brand: 'Clínica Geral da Advocacia',
  // Link do WhatsApp. Número: +55 21 98167-1308
  whatsapp: 'https://wa.me/5521981671308',
  whatsappMessage:
    'Olá! Vim pela página da Clínica Geral da Advocacia e quero saber mais sobre os planos.',
}

// Monta um link de WhatsApp com uma mensagem pré-preenchida específica
// (ex: usado nos planos, para o cliente já chegar dizendo qual plano quer).
export function buildWhatsappLink(message) {
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
}

// Link padrão do WhatsApp com a mensagem genérica.
export const whatsappLink = buildWhatsappLink(siteConfig.whatsappMessage)

// Itens de navegação do header (id = âncora da seção).
export const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Planos', href: '#planos' },
  { label: 'Para empresas', href: '#empresas' },
  { label: 'Responsáveis Jurídicos', href: '#responsaveis' },
  { label: 'FAQ', href: '#faq' },
]
