import reviewsData from '@/data/reviews'
import { Hero } from '@/components/Hero'
import { GameCard } from '@/components/GameCard'
import { SectionHeader } from '@/components/SectionHeader'
import { StatCard } from '@/components/StatCard'

const { reviews } = reviewsData
const featured = reviews.find((review) => review.featured) || reviews[0]

export default function HomePage() {
  const recentReviews = reviews.slice(0, 3)

  return (
    <>
      <Hero featured={featured} />

      <section className="page-shell py-10 md:py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard value="6" label="Reviews estruturados" description="Catálogo inicial com notas, critérios, prós, contras e preço de referência." />
          <StatCard value="5" label="Critérios por jogo" description="Gameplay, narrativa, visual, som e custo-benefício aparecem de forma comparável." />
          <StatCard value="3" label="Sugestões personalizadas" description="A descoberta usa favoritos para indicar jogos com lógica transparente." />
        </div>
      </section>

      <section className="page-shell py-14 md:py-16">
        <SectionHeader
          label="Escolhas rápidas"
          title="Reviews pensados para comparar, não só ler"
          description="Cada card resume o que importa antes do clique: gênero, nota, preço, plataformas e uma opinião editorial curta."
        />
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {recentReviews.map((review) => (
            <GameCard
              key={review.slug}
              review={review}
            />
          ))}
        </div>
      </section>

      <section className="section-band py-16 md:py-20">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            split={false}
            label="Critério editorial"
            title="Nota só tem valor quando mostra motivo"
            description="Gameplay, narrativa, visual, som e custo-benefício aparecem com peso próprio. O usuário entende onde o jogo brilha e onde exige atenção."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {featured.criteria.map((criterion) => (
              <article key={criterion.label} className="panel-surface p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-black text-slate-50">{criterion.label}</h3>
                  <span className="text-lg font-black text-cyan">{criterion.score.toFixed(1)}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">Peso no cálculo: {criterion.weight}%</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
