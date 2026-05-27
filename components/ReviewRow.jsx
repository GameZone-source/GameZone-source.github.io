import Link from 'next/link'

const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export function ReviewRow({ review, rank, reason, actionLabel = 'Ler review' }) {
  return (
    <article className="panel-surface grid gap-4 p-4 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center">
      <div className="relative overflow-hidden rounded-md border border-line bg-ink">
        <img src={review.cover} alt={review.title} className="aspect-video h-full w-full object-cover sm:aspect-square" />
        {rank ? (
          <span className="absolute left-2 top-2 rounded-md bg-cyan px-2 py-1 text-xs font-black text-ink">
            #{rank}
          </span>
        ) : null}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase text-cyan">{review.genre} · {review.studio}</p>
        <h3 className="mt-1 text-lg font-black leading-tight text-slate-50">{review.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{reason || review.summary}</p>
        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
          <div>
            <dt className="font-bold text-slate-200">Nota</dt>
            <dd>{review.score.toFixed(1)}/10</dd>
          </div>
          <div>
            <dt className="font-bold text-slate-200">Preço ref.</dt>
            <dd>{priceFormatter.format(review.price)}</dd>
          </div>
          <div>
            <dt className="font-bold text-slate-200">Lançamento</dt>
            <dd>{dateFormatter.format(new Date(review.releaseDate))}</dd>
          </div>
        </dl>
      </div>

      <Link href={`/reviews/${review.slug}`} className="button-secondary w-full sm:w-auto">
        {actionLabel}
      </Link>
    </article>
  )
}
