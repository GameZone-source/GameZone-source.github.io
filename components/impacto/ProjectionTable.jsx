export function ProjectionTable({ points }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-left" aria-label="Projeção mensal de usuários">
        <caption className="sr-only">Projeção mensal de usuários</caption>
        <thead className="bg-panelSoft text-slate-100">
          <tr>
            <th scope="col" className="px-5 py-3 text-sm font-black">Período</th>
            <th scope="col" className="px-5 py-3 text-sm font-black">Usuários projetados</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => (
            <tr key={point.month} className="border-t border-line text-slate-300">
              <th scope="row" className="px-5 py-3 font-semibold">Mês {point.month}</th>
              <td className="px-5 py-3">{point.users.toLocaleString('pt-BR')} usuários</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
