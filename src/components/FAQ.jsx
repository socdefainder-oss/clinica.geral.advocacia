import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const faqs = [
  {
    q: 'O que é a Clínica Geral da Advocacia?',
    a: 'É uma proposta de acesso jurídico por assinatura. Assim como uma clínica geral oferece um primeiro atendimento e direcionamento na saúde, a Clínica Geral da Advocacia oferece acesso recorrente, organizado e humanizado a orientação e suporte jurídico para pessoas e empresas.',
  },
  {
    q: 'O plano substitui a contratação tradicional de advogado?',
    a: 'O plano organiza e facilita o acesso à orientação e ao acompanhamento jurídico de forma recorrente. A atuação ocorre conforme as condições do plano contratado, análise de viabilidade e os termos jurídicos aplicáveis a cada caso.',
  },
  {
    q: 'O atendimento é realmente humanizado?',
    a: 'Sim. A proposta valoriza a comunicação clara, próxima e sem juridiquês, com responsáveis jurídicos preparados para orientar cada cliente de acordo com a sua demanda.',
  },
  {
    q: 'Posso contratar como pessoa física?',
    a: 'Sim. O Plano Pessoal foi pensado justamente para quem busca orientação preventiva, revisão de contratos, dúvidas e acompanhamento, sem esperar o problema crescer.',
  },
  {
    q: 'Minha empresa pode contratar?',
    a: 'Sim. Existem planos empresariais para diferentes portes e necessidades, oferecendo suporte jurídico recorrente sem a necessidade de criar um departamento interno.',
  },
  {
    q: 'Os processos estão inclusos?',
    a: 'Cada plano possui limites e condições específicas para atuação em processos eletrônicos, audiências e processos físicos. Os detalhes estão descritos na seção de planos e seguem análise de viabilidade.',
  },
  {
    q: 'Há atendimento presencial?',
    a: 'O atendimento é majoritariamente digital. Alguns planos empresariais incluem uma quantidade de audiências presenciais, conforme descrito nas condições de cada plano.',
  },
  {
    q: 'Como funciona o relatório mensal?',
    a: 'A cada ciclo mensal é disponibilizado um relatório com um resumo das demandas, andamentos e atividades realizadas, ajudando a manter tudo organizado e transparente.',
  },
  {
    q: 'Como faço para enviar contratos e documentos?',
    a: 'Pela plataforma você abre suas solicitações e anexa os documentos necessários. Tudo fica registrado e organizado em um só lugar para facilitar o acompanhamento.',
  },
  {
    q: 'Posso mudar de plano depois?',
    a: 'Sim. A proposta é flexível, permitindo ajustar o plano conforme a evolução das suas necessidades ou do momento da sua empresa.',
  },
]

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={(index % 5) * 60}>
      <div
        className={`overflow-hidden rounded-2xl border transition-colors ${
          open ? 'border-gold-400/60 bg-white shadow-soft' : 'border-petrol-100 bg-white'
        }`}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
          aria-expanded={open}
        >
          <span className="font-display text-[15px] font-bold text-petrol-900 sm:text-base">
            {item.q}
          </span>
          <ChevronDown
            size={20}
            className={`shrink-0 text-gold-600 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-5 text-sm leading-relaxed text-petrol-600 sm:px-6">{item.a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-petrol-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas e respostas" />

        <div className="mx-auto mt-12 grid max-w-5xl gap-3.5 lg:grid-cols-2">
          {faqs.map((item, i) => (
            <FaqItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
