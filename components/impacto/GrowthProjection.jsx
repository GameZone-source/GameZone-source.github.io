'use client'

import { useState } from 'react'
import { calculateProjection, validateProjection } from '@/lib/projection'
import { ProjectionChart } from './ProjectionChart'
import { ProjectionTable } from './ProjectionTable'

const defaults = {
  initialUsers: 100,
  monthlyRatePercent: 12,
  months: 12
}

const fields = [
  { key: 'initialUsers', label: 'Usuários iniciais', min: 1, max: 1000000, step: 1 },
  { key: 'monthlyRatePercent', label: 'Crescimento mensal (%)', min: 0, max: 100, step: 0.01 },
  { key: 'months', label: 'Período (meses)', min: 1, max: 36, step: 1 }
]

export function GrowthProjection() {
  const [values, setValues] = useState(defaults)
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(() => calculateProjection(defaults))

  function updateValue(key, rawValue) {
    const nextValues = { ...values, [key]: rawValue === '' ? '' : Number(rawValue) }
    const numericValues = Object.fromEntries(
      Object.entries(nextValues).map(([entryKey, value]) => [entryKey, value === '' ? Number.NaN : value])
    )
    const validation = validateProjection(numericValues)

    setValues(nextValues)
    setErrors(validation.errors)

    if (validation.valid) {
      setResult(calculateProjection(numericValues))
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.6fr)]">
      <aside className="panel-surface h-fit p-6 sm:p-7" aria-labelledby="projection-parameters-title">
        <p className="kicker">Parâmetros</p>
        <h2 id="projection-parameters-title" className="mt-2 text-2xl font-black text-slate-50">Simule um cenário</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Ajuste as premissas para observar como uma taxa constante afeta o crescimento da comunidade.
        </p>

        <div className="mt-7 space-y-5">
          {fields.map((field) => {
            const errorId = `${field.key}-error`
            const error = errors[field.key]
            return (
              <div key={field.key}>
                <label htmlFor={field.key} className="mb-2 block text-sm font-bold text-slate-200">{field.label}</label>
                <input
                  id={field.key}
                  className="field"
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.key]}
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) => updateValue(field.key, event.target.value)}
                />
                {error && <p id={errorId} className="mt-2 text-sm font-semibold text-red-300">{error}</p>}
              </div>
            )
          })}
        </div>

        <div className="mt-7 rounded-lg border border-cyan/25 bg-cyan/5 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-cyan">Modelo aplicado</p>
          <p className="mt-2 font-display text-sm text-slate-100">U(t) = U₀ × (1 + r)ᵗ</p>
        </div>
      </aside>

      <section className="panel-surface min-w-0 p-6 sm:p-8" aria-labelledby="projection-result-title" aria-live="polite">
        <div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">Resultado da simulação</p>
            <h2 id="projection-result-title" className="mt-2 text-2xl font-black text-slate-50">Comunidade projetada</h2>
          </div>
          <div className="sm:text-right">
            <p className="text-4xl font-black text-cyan">{result.finalUsers.toLocaleString('pt-BR')}</p>
            <p className="mt-1 text-sm font-semibold text-slate-400">usuários ao final do período</p>
          </div>
        </div>

        <dl className="grid gap-4 py-7 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-ink/60 p-4">
            <dt className="text-sm text-slate-400">Crescimento absoluto</dt>
            <dd className="mt-1 text-xl font-black text-slate-100">+{result.absoluteGrowth.toLocaleString('pt-BR')} usuários</dd>
          </div>
          <div className="rounded-lg border border-line bg-ink/60 p-4">
            <dt className="text-sm text-slate-400">Crescimento acumulado</dt>
            <dd className="mt-1 text-xl font-black text-slate-100">{result.accumulatedRatePercent.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</dd>
          </div>
        </dl>

        <ProjectionChart points={result.points} />
        <div className="mt-7">
          <ProjectionTable points={result.points} />
        </div>
      </section>
    </div>
  )
}
