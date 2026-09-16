import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { GrowthProjection } from '@/components/impacto/GrowthProjection'

describe('GrowthProjection', () => {
  it('shows a default projection in text, chart and table', () => {
    render(<GrowthProjection />)

    expect(screen.getByLabelText(/usuários iniciais/i)).toHaveValue(100)
    expect(screen.getByLabelText(/crescimento mensal/i)).toHaveValue(12)
    expect(screen.getByLabelText(/período/i)).toHaveValue(12)
    expect(screen.getByText('390')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /curva de crescimento/i })).toBeInTheDocument()
    expect(screen.getByRole('table', { name: /projeção mensal/i })).toBeInTheDocument()
  })

  it('calculates 197 users after six months at twelve percent', async () => {
    const user = userEvent.setup()
    render(<GrowthProjection />)

    const months = screen.getByLabelText(/período/i)
    await user.clear(months)
    await user.type(months, '6')

    expect(screen.getByText('197')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(8)
    expect(screen.getByRole('row', { name: /mês 6 197/i })).toBeInTheDocument()
  })

  it('explains an invalid period and preserves the last valid result', async () => {
    const user = userEvent.setup()
    render(<GrowthProjection />)

    const months = screen.getByLabelText(/período/i)
    fireEvent.change(months, { target: { value: '37' } })

    expect(screen.getByText('Informe um período inteiro entre 1 e 36 meses.')).toBeInTheDocument()
    expect(months).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('390')).toBeInTheDocument()
  })
})
