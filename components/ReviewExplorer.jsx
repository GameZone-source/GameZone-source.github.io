'use client'

import { useMemo, useState } from 'react'
import { GameCard } from '@/components/GameCard'
import { ReviewRow } from '@/components/ReviewRow'

const priceRanges = [
  { value: 'Todos', label: 'Todos os preços' },
  { value: 'ate-199', label: 'Até R$199' },
  { value: '200-299', label: 'R$200 a R$299' },
  { value: '300+', label: 'R$300+' }
]

export function ReviewExplorer({ initialReviews }) {
  const [reviews] = useState(initialReviews)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [platform, setPlatform] = useState('Todas')
  const [priceRange, setPriceRange] = useState('Todos')
  const [order, setOrder] = useState('nota-desc')
  const [viewMode, setViewMode] = useState('cards')

  const genres = useMemo(() => ['Todos', ...Array.from(new Set(reviews.map((review) => review.genre))).sort()], [reviews])
  const platforms = useMemo(() => ['Todas', ...Array.from(new Set(reviews.flatMap((review) => review.platforms))).sort()], [reviews])

  const visibleReviews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = reviews.filter((review) => {
      const matchQuery = !normalizedQuery || review.title.toLowerCase().includes(normalizedQuery)
      const matchGenre = genre === 'Todos' || review.genre === genre
      const matchPlatform = platform === 'Todas' || review.platforms.includes(platform)
      const matchPrice =
        priceRange === 'Todos' ||
        (priceRange === 'ate-199' && review.price <= 199) ||
        (priceRange === '200-299' && review.price >= 200 && review.price <= 299) ||
        (priceRange === '300+' && review.price >= 300)

      return matchQuery && matchGenre && matchPlatform && matchPrice
    })

    return filtered.sort((a, b) => {
      if (order === 'nota-desc') return b.score - a.score
      if (order === 'nota-asc') return a.score - b.score
      if (order === 'titulo') return a.title.localeCompare(b.title)
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    })
  }, [genre, order, platform, priceRange, query, reviews])

  const hasFilters = query || genre !== 'Todos' || platform !== 'Todas' || priceRange !== 'Todos' || order !== 'nota-desc'

  function resetFilters() {
    setQuery('')
    setGenre('Todos')
    setPlatform('Todas')
    setPriceRange('Todos')
    setOrder('nota-desc')
  }

  return (
    <div className="space-y-8">
      <div className="panel-surface grid gap-5 p-6 lg:grid-cols-[minmax(0,1fr)_180px_180px_180px_180px] xl:gap-6">
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Buscar jogo
          <input className="field" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Elden Ring, Forza, Civilization..." />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Gênero
          <select className="field" value={genre} onChange={(event) => setGenre(event.target.value)}>
            {genres.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Plataforma
          <select className="field" value={platform} onChange={(event) => setPlatform(event.target.value)}>
            {platforms.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Preço
          <select className="field" value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
            {priceRanges.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-200">
          Ordenar
          <select className="field" value={order} onChange={(event) => setOrder(event.target.value)}>
            <option value="nota-desc">Maior nota</option>
            <option value="nota-asc">Menor nota</option>
            <option value="data">Mais recente</option>
            <option value="titulo">Título A-Z</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-400" aria-live="polite">
          {visibleReviews.length} {visibleReviews.length === 1 ? 'review encontrado' : 'reviews encontrados'}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={`button-quiet ${viewMode === 'cards' ? 'bg-panelSoft text-cyan' : ''}`}
            aria-pressed={viewMode === 'cards'}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
          <button
            type="button"
            className={`button-quiet ${viewMode === 'lista' ? 'bg-panelSoft text-cyan' : ''}`}
            aria-pressed={viewMode === 'lista'}
            onClick={() => setViewMode('lista')}
          >
            Lista
          </button>
          <button type="button" className="button-secondary" disabled={!hasFilters} onClick={resetFilters}>
            Limpar filtros
          </button>
        </div>
      </div>

      {visibleReviews.length ? (
        viewMode === 'cards' ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {visibleReviews.map((review) => <GameCard key={review.slug} review={review} />)}
          </div>
        ) : (
          <div className="grid gap-5">
            {visibleReviews.map((review, index) => <ReviewRow key={review.slug} review={review} rank={index + 1} />)}
          </div>
        )
      ) : (
        <div className="card-surface p-5">
          <p className="text-sm text-slate-300">Nenhum review encontrado com esses filtros.</p>
          <button type="button" className="button-secondary mt-4" onClick={resetFilters}>
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
