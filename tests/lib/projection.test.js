import { describe, expect, it } from 'vitest'
import { calculateProjection, validateProjection } from '@/lib/projection'

describe('validateProjection', () => {
  it.each([
    [{ initialUsers: 0, monthlyRatePercent: 12, months: 6 }, 'initialUsers'],
    [{ initialUsers: 1000001, monthlyRatePercent: 12, months: 6 }, 'initialUsers'],
    [{ initialUsers: 100, monthlyRatePercent: -1, months: 6 }, 'monthlyRatePercent'],
    [{ initialUsers: 100, monthlyRatePercent: 101, months: 6 }, 'monthlyRatePercent'],
    [{ initialUsers: 100, monthlyRatePercent: 12, months: 0 }, 'months'],
    [{ initialUsers: 100, monthlyRatePercent: 12, months: 37 }, 'months']
  ])('rejects an out-of-range field', (input, field) => {
    expect(validateProjection(input).errors[field]).toBeTruthy()
  })

  it('rejects fractional values in integer fields', () => {
    const result = validateProjection({ initialUsers: 2.5, monthlyRatePercent: 12, months: 6.5 })

    expect(result.errors.initialUsers).toBeTruthy()
    expect(result.errors.months).toBeTruthy()
  })
})

describe('calculateProjection', () => {
  it('calculates 100 users growing 12% for 6 months', () => {
    const result = calculateProjection({ initialUsers: 100, monthlyRatePercent: 12, months: 6 })

    expect(result.points).toHaveLength(7)
    expect(result.points[0]).toEqual({ month: 0, users: 100 })
    expect(result.points[6]).toEqual({ month: 6, users: 197 })
    expect(result.finalUsers).toBe(197)
    expect(result.absoluteGrowth).toBe(97)
    expect(result.accumulatedRatePercent).toBeCloseTo(97.38, 2)
  })

  it('keeps the population stable when the rate is zero', () => {
    const result = calculateProjection({ initialUsers: 250, monthlyRatePercent: 0, months: 12 })

    expect(result.points.every(({ users }) => users === 250)).toBe(true)
    expect(result.accumulatedRatePercent).toBe(0)
  })

  it('throws when input is invalid', () => {
    expect(() => calculateProjection({ initialUsers: 1, monthlyRatePercent: 101, months: 1 }))
      .toThrow('Dados de projeção inválidos')
  })
})
