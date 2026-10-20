import { describe, expect, it } from 'vitest'
import reviewsData from '@/data/reviews'
import { buildAssistantResponse, normalizeText, parseAssistantIntent } from '@/lib/assistant'

const { reviews } = reviewsData

describe('normalizeText', () => {
  it.each([
    ['  RPG até R$ 250  ', 'rpg ate r$ 250'],
    ['AVENTURA', 'aventura'],
    ['Estratégia', 'estrategia']
  ])('normalizes case, spaces and accents', (input, expected) => {
    expect(normalizeText(input)).toBe(expected)
  })
})

describe('parseAssistantIntent', () => {
  it.each([
    ['oi', 'greeting'],
    ['Olá, tudo bem?', 'greeting'],
    ['ajuda', 'help'],
    ['o que você pode fazer?', 'help'],
    ['recomende um RPG', 'recommendation'],
    ['jogo de corrida para Xbox até 200', 'recommendation'],
    ['futebol no PlayStation', 'recommendation'],
    ['algo barato', 'recommendation'],
    ['fale sobre Elden Ring', 'detail'],
    ['qual a opinião de vocês sobre Civilization VI?', 'detail'],
    ['quem ganhou a copa de 2002?', 'unknown'],
    ['', 'unknown']
  ])('classifies "%s" as %s', (message, expected) => {
    expect(parseAssistantIntent(message, reviews).type).toBe(expected)
  })

  it('extracts genre, platform and price from one message', () => {
    const intent = parseAssistantIntent('jogo de corrida para Xbox até 200', reviews)

    expect(intent.genres).toEqual(['Corrida'])
    expect(intent.platforms).toEqual(['Xbox'])
    expect(intent.maxPrice).toBe(200)
  })

  it('maps "barato" to the cheapest tier', () => {
    expect(parseAssistantIntent('quero algo barato', reviews).maxPrice).toBe(199)
  })
})

describe('buildAssistantResponse', () => {
  it('recommends games of the requested genre with justification', () => {
    const response = buildAssistantResponse('recomende um RPG', { reviews, favorites: [] })

    expect(response.type).toBe('recommendation')
    expect(response.recommendations.length).toBeGreaterThan(0)
    expect(response.text).toContain('RPG')
    response.recommendations.forEach(({ review, reasons }) => {
      expect(review.genre).toBe('RPG')
      expect(reasons.length).toBeGreaterThan(0)
    })
  })

  it('never recommends a favorited game', () => {
    const favorites = ['elden-ring']
    const response = buildAssistantResponse('recomende um RPG', { reviews, favorites })
    const recommendedSlugs = response.recommendations.map(({ review }) => review.slug)

    expect(recommendedSlugs).not.toContain('elden-ring')
  })

  it('respects the price ceiling and explains the choice', () => {
    const response = buildAssistantResponse('estratégia até 150', { reviews, favorites: [] })

    expect(response.type).toBe('recommendation')
    response.recommendations.forEach(({ review }) => {
      expect(review.price).toBeLessThanOrEqual(150)
    })
  })

  it('matches platform families ("Xbox" casa com "Xbox Series")', () => {
    const response = buildAssistantResponse('jogo de corrida para Xbox até 200', { reviews, favorites: [] })

    expect(response.recommendations[0].review.title).toBe('Forza Horizon 5')
    expect(response.recommendations[0].reasons.join(' ')).toMatch(/Disponível para Xbox\./)
    expect(response.recommendations[0].reasons.join(' ')).not.toMatch(/não encontramos/)
  })

  it('is honest when no game fits the filter', () => {
    const response = buildAssistantResponse('RPG até 10', { reviews, favorites: [] })

    expect(response.type).toBe('recommendation')
    expect(response.recommendations).toHaveLength(0)
    expect(response.text).toMatch(/não achei/i)
  })

  it('summarizes a specific game on detail intent', () => {
    const response = buildAssistantResponse('fale sobre Elden Ring', { reviews, favorites: [] })

    expect(response.type).toBe('detail')
    expect(response.text).toContain('Elden Ring')
    expect(response.text).toContain('9.4')
  })

  it('answers help with examples and declared limits', () => {
    const response = buildAssistantResponse('ajuda', { reviews, favorites: [] })

    expect(response.type).toBe('help')
    expect(response.text).toContain('reviews publicadas')
  })

  it('does not pretend to know games outside the catalog', () => {
    const response = buildAssistantResponse('quem ganhou a copa de 2002?', { reviews, favorites: [] })

    expect(response.type).toBe('unknown')
    expect(response.text).toContain('ajuda')
  })
})
