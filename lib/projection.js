const LIMITS = {
  initialUsers: { min: 1, max: 1_000_000 },
  monthlyRatePercent: { min: 0, max: 100 },
  months: { min: 1, max: 36 }
}

function hasAtMostTwoDecimalPlaces(value) {
  return Number.isInteger(value * 100)
}

export function validateProjection(input) {
  const errors = {}
  const { initialUsers, monthlyRatePercent, months } = input

  if (
    !Number.isFinite(initialUsers) ||
    !Number.isInteger(initialUsers) ||
    initialUsers < LIMITS.initialUsers.min ||
    initialUsers > LIMITS.initialUsers.max
  ) {
    errors.initialUsers = 'Informe um número inteiro entre 1 e 1.000.000.'
  }

  if (
    !Number.isFinite(monthlyRatePercent) ||
    monthlyRatePercent < LIMITS.monthlyRatePercent.min ||
    monthlyRatePercent > LIMITS.monthlyRatePercent.max ||
    !hasAtMostTwoDecimalPlaces(monthlyRatePercent)
  ) {
    errors.monthlyRatePercent = 'Informe uma taxa entre 0% e 100%, com até duas casas decimais.'
  }

  if (
    !Number.isFinite(months) ||
    !Number.isInteger(months) ||
    months < LIMITS.months.min ||
    months > LIMITS.months.max
  ) {
    errors.months = 'Informe um período inteiro entre 1 e 36 meses.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export function calculateProjection(input) {
  const validation = validateProjection(input)

  if (!validation.valid) {
    throw new Error('Dados de projeção inválidos')
  }

  const { initialUsers, monthlyRatePercent, months } = input
  const rate = monthlyRatePercent / 100
  const growthFactor = (1 + rate) ** months
  const points = Array.from({ length: months + 1 }, (_, month) => ({
    month,
    users: Math.round(initialUsers * (1 + rate) ** month)
  }))
  const finalUsers = points.at(-1).users

  return {
    points,
    finalUsers,
    absoluteGrowth: finalUsers - initialUsers,
    accumulatedRatePercent: (growthFactor - 1) * 100
  }
}
