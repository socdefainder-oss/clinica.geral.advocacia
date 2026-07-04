import { useState } from 'react'
import { BadgeCheck, ScrollText } from 'lucide-react'
import { legalTeam } from '../data/legalTeam'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Imagem com fallback automático: se a foto não existir,
// mostra um placeholder elegante com as iniciais do nome.
function TeamPhoto({ src, alt, name, objectPosition }) {
  const [error, setError] = useState(false)
  const initials = name
    .replace(/^Dr[a]?\.?\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  if (error) {
    return (
      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-petrol-700 to-petrol-950">
        <span className="font-display text-4xl font-extrabold text-gold-400">{initials}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      style={{ objectPosition }}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  )
}

export default function LegalTeamSection() {
  return (
    <section id="responsaveis" className="bg-petrol-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Equipe"
          title="Conheça os responsáveis jurídicos"
          subtitle="A Clínica Geral da Advocacia conta com responsáveis jurídicos preparados para oferecer orientação, análise e atendimento humanizado, unindo experiência técnica, clareza na comunicação e compromisso com a segurança jurídica dos clientes."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-7 sm:grid-cols-2">
          {legalTeam.map((person, i) => (
            <Reveal key={person.id} delay={i * 120}>
              <article className="group h-full overflow-hidden rounded-3xl border border-petrol-100 bg-white shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card">
                {/* Foto do responsável.
                    >>> Substitua /assets/responsaveis-juridicos.jpg pela foto real do responsável jurídico. <<<
                    O caminho é definido no arquivo src/data/legalTeam.js */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <TeamPhoto
                    src={person.photo}
                    alt={`Foto de ${person.name}`}
                    name={person.name}
                    objectPosition={person.objectPosition}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-petrol-950/70 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-petrol-800 backdrop-blur">
                    <BadgeCheck size={14} className="text-sage-600" /> {person.role}
                  </span>
                </div>

                {/* Dados */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-extrabold text-petrol-900">
                    {person.name}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                    <ScrollText size={15} /> {person.oab}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-petrol-600">
                    {person.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-xs text-petrol-400">
            * Imagens, nomes e registros são exemplos de validação. Substitua pelos dados reais dos
            responsáveis jurídicos antes da publicação oficial.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
