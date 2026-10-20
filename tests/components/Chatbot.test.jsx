import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import reviewsData from '@/data/reviews'
import { Chatbot } from '@/components/Chatbot'

const { reviews } = reviewsData

function stubStorage(favorites) {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => JSON.stringify(favorites)),
    setItem: vi.fn()
  })
}

function conversation() {
  return screen.getByRole('log', { name: /conversa/i })
}

beforeEach(() => {
  stubStorage([])
})

describe('Chatbot', () => {
  it('answers a genre request with justified recommendations', async () => {
    const user = userEvent.setup()
    render(<Chatbot reviews={reviews} />)

    await user.type(screen.getByLabelText(/sua pergunta/i), 'recomende um RPG')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(conversation()).toHaveTextContent('recomende um RPG')
    expect(conversation()).toHaveTextContent('Elden Ring')
    expect(conversation()).toHaveTextContent('Nota editorial 9.4')
  })

  it('answers a suggestion prompt without typing', async () => {
    const user = userEvent.setup()
    render(<Chatbot reviews={reviews} />)

    await user.click(screen.getByRole('button', { name: 'Fale sobre Elden Ring' }))

    expect(conversation()).toHaveTextContent('RPG de mundo aberto')
  })

  it('keeps a favorited game out of the recommendations', async () => {
    stubStorage(['no-mans-sky'])
    const user = userEvent.setup()
    render(<Chatbot reviews={reviews} />)

    await user.type(screen.getByLabelText(/sua pergunta/i), 'recomende um RPG')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(conversation()).toHaveTextContent('Elden Ring')
    expect(conversation().textContent).not.toContain("No Man's Sky")
  })

  it('admits when it does not understand the request', async () => {
    const user = userEvent.setup()
    render(<Chatbot reviews={reviews} />)

    await user.type(screen.getByLabelText(/sua pergunta/i), 'quem ganhou a copa de 2002?')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(conversation()).toHaveTextContent('Não entendi')
  })
})
