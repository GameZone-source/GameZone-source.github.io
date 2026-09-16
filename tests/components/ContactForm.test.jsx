import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ContactForm } from '@/components/ContactForm'

describe('ContactForm', () => {
  it('focuses the first invalid field and announces the form error', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: /enviar sugestão/i }))

    expect(screen.getByRole('textbox', { name: /nome completo/i })).toHaveFocus()
    expect(screen.getByRole('alert')).toHaveTextContent(/revise os campos/i)
  })
})
