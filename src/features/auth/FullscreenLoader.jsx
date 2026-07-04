// Indicador de carregamento simples usado enquanto a sessão é verificada.
export default function FullscreenLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-petrol-950">
      <div className="flex items-center gap-3 text-white/70">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-gold-400" />
        Carregando...
      </div>
    </div>
  )
}
