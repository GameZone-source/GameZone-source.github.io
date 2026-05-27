'use client'

import { useEffect, useMemo, useState } from 'react'
import { ReviewRow } from '@/components/ReviewRow'

const storageKey = 'gamezone.favoritos'

export function DiscoveryPanel({ reviews }) {
  const [favorites, setFavorites] = useState([])
  const [hydrated, setHydrated] = useState(false)
  const [notice, setNotice] = useState('')
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setFavorites(Array.isArray(stored) ? stored : [])
    } catch {
      setFavorites([])
      setStorageError('Não conseguimos ler favoritos salvos neste navegador.')
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return

    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites))
    } catch {
      setStorageError('Não conseguimos salvar favoritos neste navegador.')
    }
  }, [favorites, hydrated])

  function toggleFavorite(slug) {
    const review = reviews.find((item) => item.slug === slug)
    setFavorites((current) => {
      const exists = current.includes(slug)
      const next = exists ? current.filter((item) => item !== slug) : [...current, slug]
      setNotice(exists ? `${review?.title || 'Jogo'} saiu do radar.` : `${review?.title || 'Jogo'} entrou no radar.`)
      return next
    })
  }

  function clearFavorites() {
    setFavorites([])
    setNotice('Radar limpo. Salve novos jogos para recalcular sugestões.')
  }

  const favoriteReviews = useMemo(
    () => reviews.filter((review) => favorites.includes(review.slug)),
    [favorites, reviews]
  )

  const recommendations = useMemo(() => {
    const genreWeight = favoriteReviews.reduce((map, review) => {
      map[review.genre] = (map[review.genre] || 0) + 1
      return map
    }, {})

    return reviews
      .filter((review) => !favorites.includes(review.slug))
      .map((review) => ({
        review,
        score: review.score * 0.9 + (genreWeight[review.genre] || 0) * 1.8,
        reasons: buildRecommendationReasons(review, genreWeight, favoriteReviews.length)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }, [favoriteReviews, favorites, reviews])

  const topFavoriteGenres = Object.entries(
    favoriteReviews.reduce((map, review) => {
      map[review.genre] = (map[review.genre] || 0) + 1
      return map
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre)

  return (
    <div className="space-y-10">
      <section className="panel-surface grid gap-10 p-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:p-7">
        <div>
          <p className="kicker">Personalização transparente</p>
          <h2 className="mt-3 text-2xl font-black text-slate-50">Escolha jogos e veja o radar mudar</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Salve alguns jogos. O GameZone puxa gêneros parecidos, usa a nota editorial como desempate e explica cada sugestão.
          </p>
          {topFavoriteGenres.length ? (
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Seu radar aponta para <span className="font-bold text-cyan">{topFavoriteGenres.slice(0, 2).join(' e ')}</span>.
            </p>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Sem favoritos ainda. Comece com 2 ou 3 jogos que você jogaria hoje.
            </p>
          )}
        </div>
        <div className="grid gap-4 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <dl className="grid gap-3">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm font-bold text-slate-400">No radar</dt>
              <dd className="text-2xl font-black text-cyan">{favoriteReviews.length}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm font-bold text-slate-400">Sugestões</dt>
              <dd className="text-2xl font-black text-cyan">{recommendations.length}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="button-secondary w-full"
            disabled={!favoriteReviews.length}
            onClick={clearFavorites}
          >
            Limpar radar
          </button>
        </div>
      </section>

      {(notice || storageError) ? (
        <p className={`rounded-md border bg-ink p-3 text-sm ${storageError ? 'border-red-400 text-red-100' : 'border-line text-slate-300'}`} role="status">
          {storageError || notice}
        </p>
      ) : null}

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-50">Salve jogos para ensinar o radar</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Botões compactos reduzem ruído. O review completo continua a um clique.</p>
          </div>
          {favoriteReviews.length ? <span className="meta-chip">{favoriteReviews.length} salvos</span> : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => {
            const saved = favorites.includes(review.slug)
            return (
              <button
                key={review.slug}
                type="button"
                className={`grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-md border p-3 text-left transition duration-200 ${saved ? 'border-cyan bg-cyan/10' : 'border-line bg-panel hover:border-cyan'}`}
                aria-pressed={saved}
                onClick={() => toggleFavorite(review.slug)}
              >
                <img src={review.cover} alt="" className="aspect-square rounded-md object-cover" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-black text-slate-50">{review.title}</span>
                  <span className="mt-1 block text-xs font-bold uppercase text-cyan">{review.genre}</span>
                  <span className="mt-1 block text-xs text-slate-400">Nota {review.score.toFixed(1)} · R$ {review.price}</span>
                </span>
                <span className={`rounded-md px-3 py-2 text-xs font-black ${saved ? 'bg-cyan text-ink' : 'bg-ink text-slate-200'}`}>
                  {saved ? 'Salvo' : 'Salvar'}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h3 className="text-xl font-black text-slate-50">
            {favoriteReviews.length ? 'Sugestões recalculadas' : 'Ponto de partida'}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">A lista se mantém curta para facilitar comparação real.</p>
        </div>
        <div className="grid gap-5">
          {recommendations.map(({ review, reasons }, index) => (
            <ReviewRow
              key={review.slug}
              review={review}
              rank={index + 1}
              reason={reasons.join(' ')}
              actionLabel="Abrir review"
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function buildRecommendationReasons(review, genreWeight, favoriteCount) {
  const reasons = []
  const matchingGenreCount = genreWeight[review.genre] || 0

  if (matchingGenreCount) {
    const favoriteLabel = matchingGenreCount === 1 ? '1 favorito salvo é' : `${matchingGenreCount} favoritos salvos são`
    reasons.push(`${favoriteLabel} de ${review.genre}.`)
  } else if (favoriteCount) {
    reasons.push('Equilibra seu radar com um gênero diferente dos favoritos.')
  } else {
    reasons.push('Ainda sem favoritos, usamos a nota editorial como ponto de partida.')
  }

  if (review.score >= 9) {
    reasons.push(`Nota editorial ${review.score.toFixed(1)} mantém este jogo no topo.`)
  } else {
    reasons.push(`Nota editorial ${review.score.toFixed(1)} sustenta a sugestão.`)
  }

  if (review.price <= 199) {
    reasons.push(`Preço ref. R$ ${review.price}, bom para comparar custo-benefício.`)
  }

  return reasons
}
