'use client'

import { useEffect, useState } from 'react'

const storageKey = 'gamezone.favoritos'

export function AddToRadarButton({ slug, title }) {
  const [saved, setSaved] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    try {
      const current = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setSaved(Array.isArray(current) && current.includes(slug))
    } catch {
      setSaved(false)
    }
  }, [slug])

  function toggleSaved() {
    try {
      const current = JSON.parse(localStorage.getItem(storageKey) || '[]')
      const safeCurrent = Array.isArray(current) ? current : []
      const next = safeCurrent.includes(slug)
        ? safeCurrent.filter((item) => item !== slug)
        : [...safeCurrent, slug]

      localStorage.setItem(storageKey, JSON.stringify(next))
      const nextSaved = next.includes(slug)
      setSaved(nextSaved)
      setStatus(nextSaved ? `${title} entrou no seu radar.` : `${title} saiu do seu radar.`)
    } catch {
      setStatus('Não conseguimos atualizar seu radar neste navegador.')
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        className={saved ? 'button-secondary w-full sm:w-auto' : 'button-primary w-full sm:w-auto'}
        aria-pressed={saved}
        onClick={toggleSaved}
      >
        {saved ? 'Remover do radar' : 'Adicionar ao radar'}
      </button>
      {status ? <p className="text-xs font-semibold text-slate-400" role="status">{status}</p> : null}
    </div>
  )
}
