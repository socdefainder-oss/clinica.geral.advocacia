import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Scale, LogIn } from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'

export default function LoginPage() {
  const { session, signInWithPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Já logado: não faz sentido mostrar a tela de login.
  if (session) {
    const from = location.state?.from?.pathname || '/painel'
    return <Navigate to={from} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error } = await signInWithPassword(email, password)
    setSubmitting(false)
    if (error) {
      setError('E-mail ou senha inválidos. Verifique seus dados e tente novamente.')
      return
    }
    navigate(location.state?.from?.pathname || '/painel', { replace: true })
  }

  return (
    <div className="grid min-h-screen place-items-center bg-petrol-950 px-4">
      <div className="glass w-full max-w-md rounded-3xl p-8">
        <div className="mb-8 flex items-center gap-2.5 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500 text-petrol-950">
            <Scale size={22} strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-extrabold leading-tight">
            Clínica Geral
            <span className="block text-xs font-medium text-gold-400">da Advocacia</span>
          </span>
        </div>

        <h1 className="font-display text-2xl font-bold text-white">Acessar o painel</h1>
        <p className="mt-1.5 text-sm text-white/60">
          Entre com o e-mail e a senha cadastrados para o seu plano.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/80">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-400 focus:outline-none"
              placeholder="voce@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/80">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-400">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            <LogIn size={16} /> {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          Ainda não tem acesso? Fale com a Clínica Geral da Advocacia para contratar um plano.
        </p>
      </div>
    </div>
  )
}
