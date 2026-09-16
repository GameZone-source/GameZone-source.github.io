import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Navbar } from '@/components/Navbar'
import { SkipLink } from '@/components/SkipLink'

vi.mock('next/navigation', () => ({
  usePathname: () => '/'
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>
}))

describe('SkipLink', () => {
  it('points to the main content landmark', () => {
    render(<SkipLink />)

    expect(screen.getByRole('link', { name: /pular para o conteúdo principal/i }))
      .toHaveAttribute('href', '#conteudo-principal')
  })
})

describe('Navbar', () => {
  it('closes the mobile menu with Escape and restores focus', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const trigger = screen.getByRole('button', { name: /menu/i })

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: 'Início' })).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveFocus()
  })

  it('closes the menu after a route is selected', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    const trigger = screen.getByRole('button', { name: /menu/i })

    await user.click(trigger)
    await user.click(screen.getByRole('link', { name: 'Reviews' }))

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})
