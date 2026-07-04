import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'

// Hook genérico para telas do painel: executa "queryFn(clientId)" sempre que
// a sessão estiver pronta, e novamente quando algo em "deps" mudar
// (ex: depois de criar uma nova solicitação).
export function useClientQuery(queryFn, deps = []) {
  const { session } = useAuth()
  const clientId = session?.user?.id
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!clientId) return
    let active = true
    setLoading(true)

    queryFn(clientId).then((result) => {
      if (!active) return
      setData(result.data ?? null)
      setError(result.error ?? null)
      setLoading(false)
    })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, ...deps])

  return { data, error, loading, clientId }
}
