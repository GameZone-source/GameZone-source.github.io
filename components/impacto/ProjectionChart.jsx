export function ProjectionChart({ points }) {
  const width = 760
  const height = 300
  const padding = 36
  const maxMonth = Math.max(points.at(-1)?.month ?? 1, 1)
  const maxUsers = Math.max(...points.map((point) => point.users), 1)
  const minUsers = Math.min(...points.map((point) => point.users), 0)
  const userRange = Math.max(maxUsers - minUsers, 1)

  const coordinates = points.map((point) => ({
    ...point,
    x: padding + (point.month / maxMonth) * (width - padding * 2),
    y: height - padding - ((point.users - minUsers) / userRange) * (height - padding * 2)
  }))

  const path = coordinates
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(' ')
  const lastPoint = coordinates.at(-1)

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-ink/60 p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-labelledby="projection-chart-title projection-chart-description"
      >
        <title id="projection-chart-title">Curva de crescimento de usuários</title>
        <desc id="projection-chart-description">
          Projeção exponencial de {points[0].users.toLocaleString('pt-BR')} usuários no mês zero para{' '}
          {lastPoint.users.toLocaleString('pt-BR')} usuários no mês {lastPoint.month}.
        </desc>
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#2A2B50" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#2A2B50" strokeWidth="2" />
        <path d={path} fill="none" stroke="#22D3EE" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {coordinates.map((point) => (
          <circle key={point.month} cx={point.x} cy={point.y} r="4" fill="#8B5CF6" />
        ))}
        <text x={padding} y={height - 9} fill="#94A3B8" fontSize="15">Mês 0</text>
        <text x={width - padding} y={height - 9} fill="#94A3B8" fontSize="15" textAnchor="end">Mês {lastPoint.month}</text>
        <text x={lastPoint.x - 8} y={Math.max(lastPoint.y - 14, 22)} fill="#F8FAFC" fontSize="16" fontWeight="700" textAnchor="end">
          {lastPoint.users.toLocaleString('pt-BR')} usuários
        </text>
      </svg>
      <figcaption className="mt-3 text-sm leading-6 text-slate-400">
        A curva representa uma simulação matemática, não uma previsão garantida de crescimento.
      </figcaption>
    </figure>
  )
}
