import { useEffect, useRef, useState } from 'react'

// Hook de animação "reveal on scroll" usando IntersectionObserver.
// Retorna uma ref para o elemento e um booleano "visible".
// Sem dependências externas — leve e performático.
export function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, visible }
}
