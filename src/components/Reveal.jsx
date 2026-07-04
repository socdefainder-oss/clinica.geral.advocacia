import { useReveal } from '../hooks/useReveal'

// Wrapper de animação de entrada. Aplica a classe .reveal (definida em index.css)
// e adiciona .is-visible quando o elemento entra na viewport.
// "delay" em ms cria efeito escalonado (stagger) entre cards.
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const { ref, visible } = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
