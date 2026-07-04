import Reveal from './Reveal'

// Cabeçalho de seção reutilizável (eyebrow + título + subtítulo).
// "dark" controla o esquema de cor para seções com fundo escuro.
export default function SectionHeading({ eyebrow, title, subtitle, dark = false, center = true }) {
  return (
    <Reveal className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      {eyebrow && (
        <span
          className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] ${
            dark ? 'text-gold-400' : 'text-gold-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-extrabold leading-tight sm:text-4xl ${
          dark ? 'text-white' : 'text-petrol-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/65' : 'text-petrol-600'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
