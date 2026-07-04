import { useAuth } from './AuthContext'
import FullscreenLoader from './FullscreenLoader'

// Exige que o perfil logado tenha um dos "roles" permitidos.
// Diferente do RequireAuth, aqui não redireciona: mostra um aviso,
// pois a sessão já é válida — só o perfil não tem acesso a esta área.
export default function RequireRole({ roles, children }) {
  const { profile, loading } = useAuth()

  if (loading) return <FullscreenLoader />

  if (!profile || !roles.includes(profile.role)) {
    return (
      <div className="grid min-h-screen place-items-center bg-petrol-950 px-6 text-center">
        <div>
          <p className="font-display text-xl font-bold text-white">
            Painel administrativo em construção
          </p>
          <p className="mt-2 text-sm text-white/60">
            Esta área é exclusiva para clientes. A equipe jurídica terá seu próprio painel em
            breve.
          </p>
        </div>
      </div>
    )
  }

  return children
}
