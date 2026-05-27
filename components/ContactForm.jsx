'use client'

import { useState } from 'react'

const initialState = {
  nome: '',
  email: '',
  assunto: 'Sugestão de jogo',
  mensagem: ''
}

const maxLengths = {
  nome: 80,
  email: 120,
  mensagem: 500
}

export function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('info')
  const [errors, setErrors] = useState({})

  function updateField(event) {
    const { name, value } = event.target
    const nextValue = maxLengths[name] ? value.slice(0, maxLengths[name]) : value
    setForm((current) => ({ ...current, [name]: nextValue }))
    setErrors((current) => ({ ...current, [name]: '' }))
    if (status) setStatus('')
  }

  function submit(event) {
    event.preventDefault()
    const trimmedForm = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      mensagem: form.mensagem.trim()
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedForm.email)
    const nextErrors = {
      nome: trimmedForm.nome.length < 2 ? 'Digite pelo menos 2 caracteres.' : '',
      email: !emailValid ? 'Use um e-mail válido, como nome@email.com.' : '',
      mensagem: trimmedForm.mensagem.length < 20 ? 'Escreva pelo menos 20 caracteres para a equipe entender o pedido.' : ''
    }

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors)
      setStatusType('error')
      setStatus('Revise os campos destacados antes de enviar.')
      return
    }

    setStatusType('success')
    setStatus('Mensagem recebida para análise da equipe. Obrigado por ajudar a melhorar o GameZone.')
    setErrors({})
    setForm(initialState)
  }

  return (
    <form className="panel-surface grid gap-4 p-5" onSubmit={submit} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-bold text-slate-200" htmlFor="contato-nome">Nome completo</label>
          <input
            id="contato-nome"
            className="field"
            name="nome"
            value={form.nome}
            onChange={updateField}
            placeholder="Seu nome completo"
            autoComplete="name"
            required
            minLength={2}
            maxLength={maxLengths.nome}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={`ajuda-nome${errors.nome ? ' erro-nome' : ''}`}
          />
          <span id="ajuda-nome" className="text-xs font-medium text-slate-500">Use o nome que devemos responder.</span>
          {errors.nome ? <span id="erro-nome" className="text-xs font-semibold text-red-200">{errors.nome}</span> : null}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-bold text-slate-200" htmlFor="contato-email">E-mail</label>
          <input
            id="contato-email"
            className="field"
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            placeholder="seu@email.com"
            autoComplete="email"
            required
            maxLength={maxLengths.email}
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={`ajuda-email${errors.email ? ' erro-email' : ''}`}
          />
          <span id="ajuda-email" className="text-xs font-medium text-slate-500">Usamos este endereço para responder sua mensagem.</span>
          {errors.email ? <span id="erro-email" className="text-xs font-semibold text-red-200">{errors.email}</span> : null}
        </div>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-bold text-slate-200" htmlFor="contato-assunto">Assunto</label>
        <select id="contato-assunto" className="field" name="assunto" value={form.assunto} onChange={updateField}>
          <option>Sugestão de jogo</option>
          <option>Dúvida sobre review</option>
          <option>Parceria</option>
          <option>Correção de informação</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-bold text-slate-200" htmlFor="contato-mensagem">Mensagem</label>
        <textarea
          id="contato-mensagem"
          className="field min-h-40"
          name="mensagem"
          value={form.mensagem}
          onChange={updateField}
          placeholder="Conte qual jogo ou melhoria você quer sugerir."
          required
          minLength={20}
          maxLength={maxLengths.mensagem}
          aria-invalid={Boolean(errors.mensagem)}
          aria-describedby={`ajuda-mensagem contador-mensagem${errors.mensagem ? ' erro-mensagem' : ''}`}
        />
        <span id="ajuda-mensagem" className="text-xs font-medium text-slate-500">Inclua o jogo, problema ou proposta em uma frase clara.</span>
        <span id="contador-mensagem" className="text-xs font-medium text-slate-500">{form.mensagem.length}/{maxLengths.mensagem} caracteres</span>
        {errors.mensagem ? <span id="erro-mensagem" className="text-xs font-semibold text-red-200">{errors.mensagem}</span> : null}
      </div>
      <button type="submit" className="button-primary">Enviar sugestão</button>
      {status ? (
        <p
          className={`rounded-md border bg-ink p-3 text-sm ${statusType === 'error' ? 'border-red-400 text-red-100' : 'border-mint text-slate-100'}`}
          role={statusType === 'error' ? 'alert' : 'status'}
          aria-live={statusType === 'error' ? 'assertive' : 'polite'}
        >
          {status}
        </p>
      ) : null}
    </form>
  )
}
