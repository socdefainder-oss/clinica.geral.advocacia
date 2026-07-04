import {
  FileText,
  Gavel,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Building2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { whatsappLink } from '../data/siteConfig'

// Mini-card flutuante reutilizado no mockup do hero.
function DashRow({ icon: Icon, title, status, tone }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-gold-400">
        <Icon size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/50">{status}</p>
      </div>
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          tone === 'green' ? 'bg-sage-400' : tone === 'gold' ? 'bg-gold-400' : 'bg-petrol-300'
        }`}
      />
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-petrol-950 pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28"
    >
      {/* Fundo: gradientes + textura de grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-petrol-600/40 blur-[120px]" />
        <div className="absolute top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-gold-500/15 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-petrol [background-size:26px_26px] opacity-60" />
      </div>

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Coluna de texto */}
        <div className="animate-fade-up">
          <span className="badge mb-6">
            <Stethoscope size={14} className="text-gold-400" />
            Uma nova forma de acesso jurídico
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Cuidado jurídico{' '}
            <span className="text-gradient-gold">recorrente</span> para sua vida e para sua
            empresa.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Tenha acesso mensal a suporte jurídico, consultas, contratos, acompanhamento
            processual e atendimento humanizado em uma plataforma simples, moderna e organizada.
          </p>

          {/* Botões principais */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#planos" className="btn-primary">
              Ver planos <ArrowRight size={16} />
            </a>
            <a href="#solucao" className="btn-secondary">
              Conhecer a proposta
            </a>
          </div>

          {/* Selos visuais */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            <span className="badge">
              <ShieldCheck size={14} className="text-sage-400" /> Modelo por assinatura
            </span>
            <span className="badge">
              <HeartHandshake size={14} className="text-gold-400" /> Atendimento humanizado
            </span>
            <span className="badge">
              <Building2 size={14} className="text-petrol-200" /> Pessoa física e empresas
            </span>
          </div>
        </div>

        {/* Coluna visual: mockup de dashboard + card flutuante */}
        <div className="relative animate-fade-up [animation-delay:150ms]">
          {/* Mockup do painel jurídico */}
          <div className="glass rounded-3xl p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                  Painel do cliente
                </p>
                <p className="font-display text-lg font-bold text-white">Minhas demandas</p>
              </div>
              <span className="badge !bg-sage-500/20 !text-sage-400">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-400" /> Tudo em dia
              </span>
            </div>

            <div className="space-y-2.5">
              <DashRow
                icon={FileText}
                title="Revisão de contrato de aluguel"
                status="Análise concluída"
                tone="green"
              />
              <DashRow
                icon={Gavel}
                title="Acompanhamento processual #0294"
                status="Aguardando prazo · 12 dias"
                tone="gold"
              />
              <DashRow
                icon={Stethoscope}
                title="Consulta jurídica preventiva"
                status="Agendada para amanhã"
                tone="petrol"
              />
              <DashRow
                icon={HeartHandshake}
                title="Atendimento humanizado 24x7"
                status="Disponível agora"
                tone="green"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { n: '04', l: 'Solicitações' },
                { n: '02', l: 'Contratos' },
                { n: '01', l: 'Relatório' },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="font-display text-xl font-bold text-gold-400">{s.n}</p>
                  <p className="text-[11px] text-white/55">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card flutuante de benefício */}
          <div className="absolute -bottom-6 -left-4 hidden w-60 animate-float rounded-2xl bg-white p-4 shadow-card sm:block">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-sage-500/15 text-sage-600">
                <CheckCircle2 size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-petrol-900">Prevenção primeiro</p>
                <p className="text-xs text-petrol-500">Resolva antes de virar processo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frase de impacto */}
      <div className="container-page relative mt-16 lg:mt-24">
        <p className="mx-auto max-w-3xl text-center font-display text-lg font-medium leading-relaxed text-white/80 sm:text-xl">
          “Uma proposta criada para aproximar pessoas e empresas da advocacia, antes que pequenos
          problemas se tornem grandes prejuízos.”
        </p>
      </div>
    </section>
  )
}
