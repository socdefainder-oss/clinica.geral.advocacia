import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import FullscreenLoader from './FullscreenLoader'

// Bloqueia o acesso a rotas que exigem uma sessão ativa.
export default function RequireAuth({ children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullscreenLoader />
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />

  return children
}
