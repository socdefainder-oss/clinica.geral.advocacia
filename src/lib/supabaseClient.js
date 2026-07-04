import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env (veja .env.example). ' +
      'A landing page funciona normalmente; apenas o login e o painel do cliente dependem dessas variáveis.',
  )
}

// Usa valores de placeholder quando o .env ainda não existe, para que a landing
// pública (que carrega o AuthProvider) nunca quebre por falta de configuração —
// só o login e o painel (que de fato chamam a API) dependem de credenciais reais.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
)
