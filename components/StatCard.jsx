export function StatCard({ value, label, description }) {
  return (
    <article className="panel-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="text-sm font-black text-slate-100">{label}</span>
        <strong className="rounded-md bg-ink px-3 py-1 text-sm font-black text-cyan">{value}</strong>
      </div>
      {description ? <p className="mt-4 text-sm leading-6 text-slate-400">{description}</p> : null}
    </article>
  )
}
