// ============================================================
//  CONFIGURAÇÃO GERAL DO SITE — edite aqui textos globais e contatos.
// ============================================================

export const siteConfig = {
  brand: 'Clínica Geral da Advocacia',
  // Link do WhatsApp (placeholder). Troque pelo número real no formato 55 + DDD + número.
  whatsapp: 'https://wa.me/5500000000000',
  whatsappMessage:
    'Olá! Vim pela página da Clínica Geral da Advocacia e quero saber mais sobre os planos.',
}

// Monta o link do WhatsApp com mensagem pré-preenchida.
export const whatsappLink = `${siteConfig.whatsapp}?text=${encodeURIComponent(
  siteConfig.whatsappMessage,
)}`

// Itens de navegação do header (id = âncora da seção).
export const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Planos', href: '#planos' },
  { label: 'Para empresas', href: '#empresas' },
  { label: 'Responsáveis Jurídicos', href: '#responsaveis' },
  { label: 'FAQ', href: '#faq' },
]
