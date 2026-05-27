import { SectionHeader } from '@/components/SectionHeader'

const commitments = [
  'Critérios claros para nota, preço, pontos fortes e pontos de atenção.',
  'Recomendações explicáveis, sem esconder quando houver IA ou patrocínio.',
  'Linguagem direta para ajudar o jogador a decidir rápido.',
  'Evolução contínua com feedback da comunidade.'
]

const roles = [
  { title: 'Curadoria editorial', text: 'Seleciona jogos, organiza critérios e mantém a independência das análises.' },
  { title: 'Experiência do usuário', text: 'Transforma informações complexas em cards, filtros e fluxos fáceis de comparar.' },
  { title: 'Produto e tecnologia', text: 'Mantém a plataforma rápida, responsiva e preparada para dados dinâmicos.' },
  { title: 'Comunidade', text: 'Recebe sugestões, correções e sinais de confiança enviados pelos jogadores.' }
]

export const metadata = {
  title: 'Sobre | GameZone'
}

export default function AboutPage() {
  return (
    <section className="page-shell py-14 md:py-16">
      <SectionHeader
        as="h1"
        label="Produto"
        title="GameZone como plataforma de decisão gamer"
        description="A experiência combina reviews honestos, critérios visíveis, filtros e recomendação explicável para ajudar a comunidade a escolher melhor."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="panel-surface p-6">
          <h2 className="text-2xl font-black text-slate-50">O que o produto entrega</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            O GameZone reúne catálogo, cards de jogos, notas por critério, favoritos, recomendação explicável, contato e identidade gamer.
            A proposta é simples: reduzir dúvida antes de comprar, instalar ou dedicar horas a um novo jogo.
          </p>
        </article>
        <article className="panel-surface p-6">
          <h2 className="text-2xl font-black text-slate-50">Compromissos</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
            {commitments.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-black text-cyan">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <section className="mt-16 grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
        <div>
          <p className="kicker">Processo</p>
          <h2 className="mt-3 text-2xl font-black text-slate-50">Como trabalhamos</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Papéis claros mantêm o produto organizado sem parecer portal poluído.
          </p>
        </div>
        <div className="panel-surface divide-y divide-line p-6">
          {roles.map((role, index) => (
            <article key={role.title} className={`grid gap-2 py-4 md:grid-cols-[3rem_minmax(0,1fr)] ${index === 0 ? 'pt-0' : ''} ${index === roles.length - 1 ? 'pb-0' : ''}`}>
              <span className="text-sm font-black text-cyan">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-black text-slate-50">{role.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{role.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
