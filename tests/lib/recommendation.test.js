import { describe, expect, it } from 'vitest'
import reviewsData from '@/data/reviews'
import {
  buildGenreWeight,
  buildRecommendationReasons,
  rankRecommendations,
  scoreRecommendation,
  topFavoriteGenres
} from '@/lib/recommendation'

const { reviews } = reviewsData

const rpg = reviews.find((review) => review.genre === 'RPG')
const corrida = reviews.find((review) => review.genre === 'Corrida')

describe('buildGenreWeight', () => {
  it('counts favorites per genre', () => {
    expect(buildGenreWeight([rpg, rpg, corrida])).toEqual({ RPG: 2, Corrida: 1 })
  })

  it('returns an empty map when there are no favorites', () => {
    expect(buildGenreWeight([])).toEqual({})
  })
})

describe('topFavoriteGenres', () => {
  it('orders genres by frequency', () => {
    expect(topFavoriteGenres([rpg, rpg, corrida])).toEqual(['RPG', 'Corrida'])
  })
})

describe('scoreRecommendation', () => {
  it('combines editorial score with genre affinity', () => {
    expect(scoreRecommendation(rpg, { RPG: 2 })).toBeCloseTo(rpg.score * 0.9 + 2 * 1.8, 5)
    expect(scoreRecommendation(rpg, {})).toBeCloseTo(rpg.score * 0.9, 5)
  })
})

describe('buildRecommendationReasons', () => {
  it('explains a genre match from favorites', () => {
    const reasons = buildRecommendationReasons(rpg, { RPG: 1 }, 1)

    expect(reasons[0]).toContain('1 favorito salvo é de RPG.')
    expect(reasons.some((reason) => reason.includes('Nota editorial'))).toBe(true)
  })

  it('uses the editorial score as the cold-start justification', () => {
    const reasons = buildRecommendationReasons(rpg, {}, 0)

    expect(reasons[0]).toBe('Ainda sem favoritos, usamos a nota editorial como ponto de partida.')
  })
})

describe('rankRecommendations', () => {
  it('returns at most 3 suggestions excluding favorites', () => {
    const favorites = reviews.slice(0, 3).map((review) => review.slug)
    const ranked = rankRecommendations(reviews, favorites)

    expect(ranked).toHaveLength(3)
    ranked.forEach(({ review }) => {
      expect(favorites).not.toContain(review.slug)
      expect(reasonsOf(ranked, review.slug).length).toBeGreaterThan(0)
    })
  })

  it('sorts by descending recommendation score', () => {
    const ranked = rankRecommendations(reviews, [])
    const scores = ranked.map((item) => item.score)

    expect([...scores].sort((a, b) => b - a)).toEqual(scores)
  })
})

function reasonsOf(ranked, slug) {
  return ranked.find((item) => item.review.slug === slug).reasons
}
