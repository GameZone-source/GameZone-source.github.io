'use client'

import { useEffect, useRef, useState } from 'react'
import { buildAssistantResponse } from '@/lib/assistant'

const storageKey = 'gamezone.favoritos'

const suggestionPrompts = [
  'Recomende um RPG',
  'Jogo de corrida para Xbox até 200',
  'Futebol no PlayStation',
  'Fale sobre Elden Ring'
]

const initialMessages = [
  {
    role: 'assistant',
    text: 'Olá! Sou o assistente do GameZone. Pergunte por gênero, plataforma ou faixa de preço e eu sugiro jogos das nossas reviews, sempre explicando o motivo.'
  }
]

export function Chatbot({ reviews }) {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [favorites, setFavorites] = useState([])
  const [storageError, setStorageError] = useState('')
  const conversationRef = useRef(null)
  const userInteractedRef = useRef(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setFavorites(Array.isArray(stored) ? stored : [])
    } catch {
      setFavorites([])
      setStorageError('Não conseguimos ler favoritos salvos neste navegador.')
    }
  }, [])

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (userInteractedRef.current && lastMessage?.role === 'assistant') {
      conversationRef.current?.focus()
    }
  }, [messages])

  function sendMessage(rawText) {
    const text = String(rawText || '').trim()
    if (!text) return

    userInteractedRef.current = true

    const answer = buildAssistantResponse(text, { reviews, favorites })
    setMessages((current) => [
      ...current,
      { role: 'user', text },
      { role: 'assistant', text: answer.text, recommendations: answer.recommendations }
    ])
    setDraft('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(draft)
  }

  return (
    <div className="panel-surface grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start xl:p-7">
      <div>
        <div
          ref={conversationRef}
          className="grid max-h-[32rem] gap-4 overflow-y-auto border border-line bg-ink p-4"
          tabIndex={0}
          role="log"
          aria-label="Conversa com o assistente GameZone"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <article
              key={index}
              className={`max-w-[52rem] rounded-md border p-4 ${message.role === 'user' ? 'justify-self-end border-violet bg-violet/10' : 'justify-self-start border-line bg-panel'}`}
            >
              <h3 className="text-xs font-black uppercase tracking-wide text-cyan">
                {message.role === 'user' ? 'Você' : 'Assistente GameZone'}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{message.text}</p>

              {message.recommendations?.length ? (
                <ul className="mt-3 grid gap-2">
                  {message.recommendations.map(({ review, reasons }) => (
                    <li key={review.slug} className="rounded-md border border-line bg-ink p-3">
                      <p className="text-sm font-black text-slate-50">
                        {review.title} <span className="font-bold text-cyan">· nota {review.score.toFixed(1)} · R$ {review.price}</span>
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{reasons.join(' ')}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        <form className="mt-4 flex flex-wrap gap-3" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="mensagem-assistente">
            Sua pergunta para o assistente
          </label>
          <input
            id="mensagem-assistente"
            className="field min-w-0 flex-1"
            type="text"
            value={draft}
            placeholder="Ex.: recomende um RPG até 250"
            autoComplete="off"
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className="button-primary" disabled={!draft.trim()}>
            Enviar
          </button>
        </form>

        {storageError ? (
          <p className="mt-3 rounded-md border border-red-400 bg-ink p-3 text-sm text-red-100" role="alert">
            {storageError}
          </p>
        ) : null}
      </div>

      <aside className="grid gap-4 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-50">Como eu funciono</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Cruzo o seu pedido com o catálogo de reviews do GameZone e rankeio por nota editorial e afinidade. Cada sugestão vem com a justificativa — nenhuma resposta é uma caixa-preta.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-50">Limites</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Conheço apenas os jogos reviewados pela equipe. Não indico lojas, não comparo preços de mercado e não decido por você: a escolha final é sua.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-50">Tente perguntar</h3>
          <div className="mt-2 grid gap-2">
            {suggestionPrompts.map((prompt) => (
              <button key={prompt} type="button" className="button-quiet text-left" onClick={() => sendMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
