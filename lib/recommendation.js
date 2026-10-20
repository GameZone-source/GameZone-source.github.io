// Motor de recomendação explicável do GameZone.
// Funções puras para poderem ser reaproveitadas pela Descoberta e pelo Assistente,
// e testadas de forma isolada.

export function buildGenreWeight(favoriteReviews) {
  return favoriteReviews.reduce((map, review) => {
    map[review.genre] = (map[review.genre] || 0) + 1
    return map
  }, {})
}

export function topFavoriteGenres(favoriteReviews) {
  return Object.entries(buildGenreWeight(favoriteReviews))
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre)
}

export function scoreRecommendation(review, genreWeight) {
  return review.score * 0.9 + (genreWeight[review.genre] || 0) * 1.8
}

export function buildRecommendationReasons(review, genreWeight, favoriteCount) {
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

// Ranking padrão do radar: exclui favoritos, pontua por nota + afinidade de gênero
// e devolve no máximo 3 sugestões com justificativa.
export function rankRecommendations(reviews, favoriteSlugs, favoriteReviews = []) {
  const genreWeight = buildGenreWeight(favoriteReviews)

  return reviews
    .filter((review) => !favoriteSlugs.includes(review.slug))
    .map((review) => ({
      review,
      score: scoreRecommendation(review, genreWeight),
      reasons: buildRecommendationReasons(review, genreWeight, favoriteReviews.length)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
