export function SectionHeader({ label, title, description, as: Heading = 'h2', split = true }) {
  if (!split) {
    return (
      <div className="max-w-3xl">
        {label ? <p className="kicker">{label}</p> : null}
        <Heading className="mt-3 text-3xl font-black leading-tight text-slate-50 md:text-4xl">{title}</Heading>
        {description ? <p className="mt-4 text-base leading-7 text-slate-400">{description}</p> : null}
      </div>
    )
  }

  return (
    <div className="grid max-w-none gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.72fr)] lg:items-end lg:gap-14">
      <div>
        {label ? <p className="kicker">{label}</p> : null}
        <Heading className="mt-3 text-3xl font-black leading-tight text-slate-50 md:text-4xl">{title}</Heading>
      </div>
      {description ? <p className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end">{description}</p> : null}
    </div>
  )
}
