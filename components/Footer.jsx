import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src="/imagens/Logo.svg" alt="GameZone" className="h-10 w-auto" />
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Reviews honestos feitos por gamers para gamers. Notas com critério, filtros úteis e descoberta explicável.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-100">Páginas</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link href="/reviews" className="hover:text-cyan">Reviews</Link></li>
            <li><Link href="/descoberta" className="hover:text-cyan">Descoberta</Link></li>
            <li><Link href="/sobre" className="hover:text-cyan">Sobre</Link></li>
            <li><Link href="/contato" className="hover:text-cyan">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-100">Confiança editorial</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Critérios claros, recomendações explicáveis e monetização transparente para preservar independência.
          </p>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-slate-500">
        GameZone · Reviews com critério
      </div>
    </footer>
  )
}
