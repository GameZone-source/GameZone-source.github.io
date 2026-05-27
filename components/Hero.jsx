import Link from 'next/link'

export function Hero({ featured }) {
  return (
    <section className="border-b border-line bg-ink">
      <div className="page-shell grid min-h-[540px] items-center gap-12 py-14 lg:min-h-[620px] lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.82fr)] lg:gap-20">
        <div className="min-w-0 max-w-[22rem] sm:max-w-none">
          <p className="kicker">GameZone · reviews com critério</p>
          <h1 className="mt-5 max-w-full text-3xl font-black leading-tight text-slate-50 sm:text-4xl md:max-w-4xl md:text-5xl">
            Escolha seu próximo jogo sem depender de hype.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Compare notas, preço, gênero, prós, contras e critérios editoriais em uma experiência feita para decisão rápida.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/reviews" className="button-primary w-full sm:w-auto">Explorar reviews</Link>
            <Link href="/descoberta" className="button-secondary w-full sm:w-auto">Personalizar descoberta</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="meta-chip">Nota por critérios</span>
            <span className="meta-chip">Favoritos locais</span>
            <span className="meta-chip">Recomendação explicável</span>
          </div>
        </div>

        {featured ? (
          <aside className="panel-surface min-w-0 max-w-[22rem] p-6 sm:max-w-none lg:justify-self-stretch">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kicker">Review em destaque</p>
                <h2 className="mt-3 text-2xl font-black leading-tight text-slate-50">{featured.title}</h2>
              </div>
              <span className="score-badge">{featured.score.toFixed(1)}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{featured.summary}</p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {featured.criteria.slice(0, 4).map((criterion) => (
                <div key={criterion.label} className="rounded-md border border-line bg-ink p-3">
                  <dt className="text-xs font-bold uppercase text-slate-400">{criterion.label}</dt>
                  <dd className="mt-1 text-lg font-black text-cyan">{criterion.score.toFixed(1)}</dd>
                </div>
              ))}
            </dl>
            <Link href={`/reviews/${featured.slug}`} className="button-primary mt-5 w-full">
              Ler análise completa
            </Link>
          </aside>
        ) : null}
      </div>
    </section>
  )
}
