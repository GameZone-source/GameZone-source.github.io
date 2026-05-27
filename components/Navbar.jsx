'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Início' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/descoberta', label: 'Descoberta' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' }
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/95">
      <nav className="page-shell flex h-20 items-center justify-between" aria-label="Navegação principal">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/imagens/Logo.svg" alt="GameZone" className="h-9 w-auto" />
        </Link>

        <button
          type="button"
          className="rounded-md border border-line px-3 py-2 text-sm font-bold text-slate-100 md:hidden"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((value) => !value)}
        >
          ☰ Menu
        </button>

        <div
          id="menu-principal"
          className={`${open ? 'flex' : 'hidden'} absolute left-4 right-4 top-24 flex-col gap-2 rounded-md border border-line bg-panel p-3 shadow-lift md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {links.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${active ? 'nav-link-active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
