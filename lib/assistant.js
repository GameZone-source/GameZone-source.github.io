// Assistente GameZone: agente local de recomendação de jogos.
// Funciona sem backend (o site é export estático): interpreta a mensagem em
// português, cruza com o catálogo e responde sempre com justificativa.
// Limites declarados: só conhece as reviews publicadas pelo GameZone.

import { buildGenreWeight, scoreRecommendation } from '@/lib/recommendation'

const GENRE_KEYWORDS = {
  RPG: ['rpg', 'role playing', 'souls', 'soulslike'],
  Corrida: ['corrida', 'correr', 'carro', 'carros', 'rally', 'velocidade'],
  FPS: ['fps', 'tiro', 'shooter', 'guerra', 'pistola', 'armas'],
  Estratégia: ['estrategia', 'turnos', 'tatico', 'civilizacao', '4x'],
  Esportes: ['esporte', 'esportes', 'futebol', 'simulacao de futebol'],
  Aventura: ['aventura', 'exploracao', 'espaco', 'universo', 'mundo aberto', 'sobrevivencia']
}

const PLATFORM_KEYWORDS = {
  PC: ['pc', 'computador', 'windows', 'steam'],
  PlayStation: ['playstation', 'playstation 5', 'playstation 4', 'ps5', 'ps4', 'psn', 'sony'],
  Xbox: ['xbox', 'series x', 'series s', 'game pass', 'microsoft'],
  'Nintendo Switch': ['nintendo', 'switch', 'portatil'],
  Mobile: ['mobile', 'celular', 'ios', 'android']
}

export function normalizeText(message) {
  return String(message || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

function matchDictionary(normalized, dictionary) {
  return Object.entries(dictionary)
    .filter(([, keywords]) => keywords.some((keyword) => normalized.includes(keyword)))
    .map(([value]) => value)
}

function extractMaxPrice(normalized) {
  const match = normalized.match(/(?:ate|menos de|maximo(?: de)?|abaixo de|R\$)\s*(?:r\$\s*)?(\d{2,4})/)
  if (match) return Number(match[1])

  if (normalized.includes('barato')) return 199
  return null
}

// Interpreta a mensagem e devolve a intenção estruturada.
// Tipos: greeting | help | detail | recommendation | unknown
export function parseAssistantIntent(message, reviews = []) {
  const normalized = normalizeText(message)

  if (!normalized) return { type: 'unknown' }

  if (/^(oi|ola|bom dia|boa tarde|boa noite|eai|e ai)\b/.test(normalized)) {
    return { type: 'greeting' }
  }

  if (/(ajuda|ajudar|como funciona|o que voce faz|o que voce pode|opcoes)/.test(normalized)) {
    return { type: 'help' }
  }

  const genres = matchDictionary(normalized, GENRE_KEYWORDS)
  const platforms = matchDictionary(normalized, PLATFORM_KEYWORDS)
  const maxPrice = extractMaxPrice(normalized)

  const detail = findReviewByTitle(normalized, reviews)
  const asksAboutGame = /(fale sobre|me fale|sobre o|vale a pena|opiniao|review de|analise de)/.test(normalized)

  if (detail && (asksAboutGame || (!genres.length && !platforms.length && maxPrice === null))) {
    return { type: 'detail', review: detail }
  }

  if (genres.length || platforms.length || maxPrice !== null) {
    return { type: 'recommendation', genres, platforms, maxPrice }
  }

  if (detail) return { type: 'detail', review: detail }

  return { type: 'unknown' }
}

function findReviewByTitle(normalized, reviews) {
  return (reviews || []).find((review) => {
    const title = normalizeText(review.title)
    return title.length > 3 && normalized.includes(title)
  })
}

// Casamento tolerante de plataformas: "Xbox" casa com "Xbox Series",
// "PlayStation" com "PlayStation 5", etc.
function platformMatches(reviewPlatforms, requestedPlatform) {
  const requested = normalizeText(requestedPlatform)
  return reviewPlatforms.some((platform) => {
    const available = normalizeText(platform)
    return available.includes(requested) || requested.includes(available)
  })
}

function buildRecommendation(review, genres, platforms, genreWeight) {
  const reasons = []

  if (genres.includes(review.genre)) {
    reasons.push(`É do gênero ${review.genre}, que você pediu.`)
  } else if (genreWeight[review.genre]) {
    reasons.push(`Combina com seu radar: ${genreWeight[review.genre]} favorito(s) são de ${review.genre}.`)
  }

  if (review.score >= 9) {
    reasons.push(`Nota editorial ${review.score.toFixed(1)}, entre as melhores do catálogo.`)
  } else {
    reasons.push(`Nota editorial ${review.score.toFixed(1)} com critérios e pesos abertos no review.`)
  }

  if (platforms.length) {
    const matches = platforms.filter((platform) => platformMatches(review.platforms, platform))
    if (matches.length) {
      reasons.push(`Disponível para ${matches.join(' e ')}.`)
    } else {
      reasons.push(`Atenção: não encontramos ${platforms.join(' e ')} nas plataformas dessa review (${review.platforms.join(', ')}).`)
    }
  }

  if (review.price <= 199) {
    reasons.push(`Preço ref. R$ ${review.price}, bom custo-benefício.`)
  }

  return { review, score: scoreRecommendation(review, genreWeight), reasons }
}

function recommendationResponse(intent, { reviews, favorites, genreWeight }) {
  let pool = reviews.filter((review) => !favorites.includes(review.slug))

  if (intent.genres?.length) {
    const byGenre = pool.filter((review) => intent.genres.includes(review.genre))
    if (byGenre.length) pool = byGenre
  }

  if (intent.platforms?.length) {
    const byPlatform = pool.filter((review) =>
      intent.platforms.some((platform) => platformMatches(review.platforms, platform))
    )
    if (byPlatform.length) pool = byPlatform
  }

  if (intent.maxPrice !== null && intent.maxPrice !== undefined) {
    const byPrice = pool.filter((review) => review.price <= intent.maxPrice)
    if (byPrice.length) pool = byPrice
    else {
      const cheapest = [...pool].sort((a, b) => a.price - b.price)[0]
      return {
        type: 'recommendation',
        text: `Não achei reviews do catálogo abaixo de R$ ${intent.maxPrice} com esses critérios. O mais próximo é ${cheapest.title}, por R$ ${cheapest.price}.`,
        recommendations: []
      }
    }
  }

  if (!pool.length) {
    return {
      type: 'recommendation',
      text: 'Não achei uma review do catálogo com esses critérios. Tente outro gênero, plataforma ou faixa de preço — ou peça ajuda para ver o que eu sei responder.',
      recommendations: []
    }
  }

  const ranked = pool
    .map((review) => buildRecommendation(review, intent.genres || [], intent.platforms || [], genreWeight))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  const scope = [intent.genres?.join(' e '), intent.platforms?.join(' e '), intent.maxPrice !== null && intent.maxPrice !== undefined ? `até R$ ${intent.maxPrice}` : null]
    .filter(Boolean)
    .join(', ')

  return {
    type: 'recommendation',
    text: `Para ${scope}, minhas sugestões do catálogo GameZone são:`,
    recommendations: ranked
  }
}

function detailResponse(review) {
  const pros = (review.pros || []).slice(0, 2).join(', ').replace(/, ([^,]*)$/, ' e $1')
  return {
    type: 'detail',
    text: `${review.title} (${review.genre}, nota ${review.score.toFixed(1)}): ${review.summary} Destaques: ${pros}. O review completo tem critérios, prós e contras — vale conferir antes de comprar. Preço ref. R$ ${review.price}.`,
    recommendations: [{ review, score: review.score, reasons: ['Resumo baseado na review publicada pelo GameZone.'] }]
  }
}

const HELP_TEXT =
  'Sou o assistente do GameZone. Recomendo jogos a partir das reviews publicadas pela equipe, sempre explicando o motivo. Exemplos do que você pode pedir: "recomende um RPG", "jogo de corrida para Xbox até 200", "futebol no PlayStation", "fale sobre Elden Ring". Não respondo sobre jogos fora do catálogo nem dou conselhos de compra além das reviews.'

function greetingResponse() {
  return {
    type: 'greeting',
    text: 'Olá! Eu sou o assistente do GameZone. Posso recomendar jogos das nossas reviews explicando o motivo. Que tipo de jogo você procura?',
    recommendations: []
  }
}

// Ponto de entrada: mensagem em texto + contexto do site -> resposta explicável.
export function buildAssistantResponse(message, { reviews = [], favorites = [] } = {}) {
  const intent = parseAssistantIntent(message, reviews)
  const genreWeight = buildGenreWeight(reviews.filter((review) => favorites.includes(review.slug)))

  switch (intent.type) {
    case 'greeting':
      return greetingResponse()
    case 'help':
      return { type: 'help', text: HELP_TEXT, recommendations: [] }
    case 'detail':
      return detailResponse(intent.review)
    case 'recommendation':
      return recommendationResponse(intent, { reviews, favorites, genreWeight })
    default:
      return {
        type: 'unknown',
        text: 'Não entendi esse pedido. Eu sei comparar gêneros, plataformas e preço das reviews publicadas. Peça "ajuda" para ver exemplos.',
        recommendations: []
      }
  }
}
