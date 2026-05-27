import Link from 'next/link'

export function GameCard({ review, compact = false, favorite = false, onFavoriteToggle, insightTitle, insightItems = [] }) {
  return (
    <article className="card-surface group overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-cyan/60 hover:shadow-lift">
      <div className="relative">
        <img src={review.cover} alt={review.title} className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        <div className="absolute left-3 top-3 score-badge">{review.score.toFixed(1)}</div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase text-cyan">{review.genre} · {review.studio}</p>
            <h3 className="mt-2 text-xl font-black leading-tight text-slate-50">{review.title}</h3>
          </div>
          {onFavoriteToggle ? (
            <button
              type="button"
              className={`shrink-0 rounded-md border px-3 py-2 text-sm font-black transition ${favorite ? 'border-cyan bg-cyan text-ink' : 'border-line text-slate-200 hover:border-cyan hover:text-cyan'}`}
              aria-label={favorite ? `Remover ${review.title} dos favoritos` : `Adicionar ${review.title} aos favoritos`}
              onClick={() => onFavoriteToggle(review.slug)}
            >
              {favorite ? 'Salvo' : 'Salvar'}
            </button>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-400">{review.summary}</p>
        {!compact ? (
          <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-400">
            <div>
              <dt className="font-bold text-slate-200">Lançamento</dt>
              <dd>{new Date(review.releaseDate).toLocaleDateString('pt-BR')}</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-200">Preço ref.</dt>
              <dd>R$ {review.price}</dd>
            </div>
          </dl>
        ) : null}
        {!compact ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {review.platforms.slice(0, 3).map((platform) => <span key={platform} className="meta-chip">{platform}</span>)}
            {review.platforms.length > 3 ? <span className="meta-chip">+{review.platforms.length - 3}</span> : null}
          </div>
        ) : null}
        {insightItems.length ? (
          <div className="mt-4 border-t border-line pt-4">
            <p className="text-xs font-bold uppercase text-cyan">{insightTitle || 'Por que apareceu'}</p>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-400">
              {insightItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ) : null}
        <Link href={`/reviews/${review.slug}`} className="button-secondary mt-5 w-full">
          Ler review
        </Link>
      </div>
    </article>
  )
}
