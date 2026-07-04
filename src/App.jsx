import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthContext'
import RequireAuth from './features/auth/RequireAuth'
import RequireRole from './features/auth/RequireRole'
import FullscreenLoader from './features/auth/FullscreenLoader'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'

// Lazy-loaded: o painel do cliente não deve engordar o bundle
// carregado por quem só visita a landing page pública.
const PainelLayout = lazy(() => import('./features/painel/PainelLayout'))
const PainelHome = lazy(() => import('./features/painel/pages/PainelHome'))
const Solicitacoes = lazy(() => import('./features/painel/pages/Solicitacoes'))
const PlanoContratado = lazy(() => import('./features/painel/pages/PlanoContratado'))
const Contratos = lazy(() => import('./features/painel/pages/Contratos'))
const Processos = lazy(() => import('./features/painel/pages/Processos'))
const Audiencias = lazy(() => import('./features/painel/pages/Audiencias'))
const Relatorios = lazy(() => import('./features/painel/pages/Relatorios'))

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<FullscreenLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/painel"
              element={
                <RequireAuth>
                  <RequireRole roles={['cliente']}>
                    <PainelLayout />
                  </RequireRole>
                </RequireAuth>
              }
            >
              <Route index element={<PainelHome />} />
              <Route path="solicitacoes" element={<Solicitacoes />} />
              <Route path="plano" element={<PlanoContratado />} />
              <Route path="contratos" element={<Contratos />} />
              <Route path="processos" element={<Processos />} />
              <Route path="audiencias" element={<Audiencias />} />
              <Route path="relatorios" element={<Relatorios />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}
