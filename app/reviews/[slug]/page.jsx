import Link from 'next/link'
import { notFound } from 'next/navigation'
import reviewsData from '@/data/reviews'
import { AddToRadarButton } from '@/components/AddToRadarButton'

const { reviews } = reviewsData
const { weightedScore } = reviewsData

export function generateStaticParams() {
  return reviews.map((review) => ({ slug: review.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const review = reviews.find((item) => item.slug === slug)
  return {
    title: review ? `${review.title} | GameZone` : 'Review | GameZone'
  }
}

export default async function ReviewDetailPage({ params }) {
  const { slug } = await params
  const review = reviews.find((item) => item.slug === slug)

  if (!review) notFound()

  const calculatedScore = weightedScore(review)
  const releaseDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(review.releaseDate))
  const priceLabel = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(review.price)
  const similarReviews = [...reviews]
    .filter((item) => item.slug !== review.slug)
    .sort((a, b) => {
      const genrePriority = Number(b.genre === review.genre) - Number(a.genre === review.genre)
      if (genrePriority) return genrePriority
      return b.score - a.score
    })
    .slice(0, 3)
  const infoRows = [
    ['Desenvolvedor', review.studio],
    ['Publisher', review.publisher],
    ['Lançamento', releaseDate],
    ['Gênero', review.detailedGenre || review.genre],
    ['Plataformas', review.platforms.join(', ')],
    review.duration ? ['Duração', review.duration] : null,
    review.gamePass ? ['Game Pass', review.gamePass] : null,
    review.servicePrice ? ['Preço', review.servicePrice] : ['Preço ref.', priceLabel],
    ['Testado em', review.testedOn || 'Equipe GameZone']
  ].filter(Boolean)

  return (
    <article>
      <div className="page-shell py-6">
        <Link href="/reviews" className="button-secondary" aria-label="Voltar para todos os reviews">Todos os reviews</Link>
      </div>

      <header className="relative min-h-[420px] overflow-hidden border-y border-line">
        <img src={review.cover} alt={review.title} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,19,0.18),rgba(7,7,19,0.92)),linear-gradient(90deg,rgba(7,7,19,0.92),rgba(7,7,19,0.22))]" />
        <div className="page-shell relative flex min-h-[420px] items-end py-10">
          <div className="max-w-4xl">
            <p className="kicker">{review.detailedGenre || review.genre} · {review.studio} · {new Date(review.releaseDate).getFullYear()}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-slate-50 md:text-6xl">{review.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{review.platforms.join(' · ')}</p>
          </div>
        </div>
      </header>

      <div className="page-shell grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start xl:gap-16">
        <main className="min-w-0">
          <section className="review-prose">
            {review.articleSections.map((section) => (
              <div key={section.title} className="review-prose__section">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ))}
          </section>

          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="review-list-panel review-list-panel--pros">
              <h2>Pontos Positivos</h2>
              <ul>
                {review.pros.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="review-list-panel review-list-panel--cons">
              <h2>Pontos Negativos</h2>
              <ul>
                {review.cons.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          <section className="mt-10 rounded-lg border border-violet/50 bg-panel p-6 shadow-surface">
            <p className="kicker">Veredicto Final</p>
            <p className="mt-4 text-base leading-8 text-slate-300">{review.verdict}</p>
          </section>

          <section className="mt-10">
            <div className="mb-5 max-w-3xl">
              <p className="kicker">Critérios transparentes</p>
              <h2 className="mt-3 text-2xl font-black text-slate-50">Como a nota foi formada</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Cada critério recebe nota de 0 a 10. O peso mostra quanto esse item influencia a nota por critérios.
              </p>
            </div>
            <div className="panel-surface p-5">
              <div className="space-y-4">
                {review.criteria.map((criterion) => (
                  <div key={criterion.label}>
                    <div className="flex items-center justify-between gap-4 text-sm font-bold">
                      <span>{criterion.label}</span>
                      <span>{criterion.score.toFixed(1)}/10 · peso no cálculo: {criterion.weight}%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink">
                      <div
                        className="h-full rounded-full bg-cyan"
                        style={{ width: `${criterion.score * 10}%` }}
                        role="progressbar"
                        aria-label={`${criterion.label}: ${criterion.score.toFixed(1)} de 10, peso ${criterion.weight}%`}
                        aria-valuemin="0"
                        aria-valuemax="10"
                        aria-valuenow={criterion.score}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-6 max-w-3xl">
              <p className="kicker">Decisão rápida</p>
              <h2 className="mt-3 text-2xl font-black text-slate-50">Vale entrar no seu radar?</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Use este resumo para decidir se o jogo combina com seu perfil antes de comparar com outras opções.
              </p>
            </div>

            <div className="rounded-lg border border-line bg-panel p-6 shadow-surface xl:p-7">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.25fr_auto] lg:items-start">
                <div className="max-w-md">
                  <p className="text-sm font-bold text-cyan">{review.verdictLabel}</p>
                  <h3 className="mt-2 text-xl font-black leading-tight text-slate-50">
                    {review.score.toFixed(1)} para quem quer {review.genre} com critério.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    A nota é forte, mas a decisão depende do seu estilo de jogo. Use os pontos abaixo antes de salvar.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-black uppercase text-mint">Ideal para</h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      {review.pros.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="font-black text-mint">+</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-red-300">Pense duas vezes se</h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      {review.cons.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="font-black text-red-300">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <AddToRadarButton slug={review.slug} title={review.title} />
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-50">Compare com jogos próximos</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Alternativas para abrir em seguida.</p>
                </div>
                <Link href="/reviews" className="hidden text-sm font-black text-cyan hover:text-slate-50 sm:inline">
                  Ver catálogo
                </Link>
              </div>

              <div className="mt-5 grid gap-6 md:grid-cols-3">
                {similarReviews.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/reviews/${item.slug}`}
                    className="group block overflow-hidden rounded-lg border border-line bg-panel shadow-surface transition duration-200 hover:-translate-y-1 hover:border-cyan/70 focus-visible:outline-cyan"
                    aria-label={`Comparar com ${item.title}`}
                  >
                    <div className="relative overflow-hidden border-b border-line">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                      <span className="score-badge absolute left-3 top-3 px-2 py-1 text-xs">{item.score.toFixed(1)}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-black uppercase text-cyan">{item.genre}</p>
                      <h4 className="mt-1 text-base font-black leading-tight text-slate-50">{item.title}</h4>
                      <p className="mt-2 text-xs leading-5 text-slate-400">
                        {item.genre === review.genre ? `Mesmo gênero: ${item.genre}.` : `Alternativa em ${item.genre}.`}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs font-bold">
                        <span className="text-slate-500">Preço ref.</span>
                        <span className="text-slate-100">R$ {item.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <aside className="lg:sticky lg:top-24 lg:self-start" data-review-sidebar>
          <div className="grid gap-5 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
            <section className="rounded-lg border border-line bg-panel p-6 text-center shadow-surface">
              <div className="text-6xl font-black leading-none text-mint">{review.score.toFixed(1)}</div>
              <div className="mt-1 text-sm font-bold text-slate-500">/ 10</div>
              <div className="mt-4 text-lg text-amber">★★★★★</div>
              <p className="mt-2 text-xs font-black uppercase text-mint">{review.verdictLabel}</p>
            </section>

            <section className="rounded-lg border border-line bg-panel p-5 shadow-surface">
              <h2 className="text-xs font-black uppercase text-slate-400">Informações</h2>
              <dl className="mt-4 divide-y divide-line">
                {infoRows.map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <dt className="shrink-0 text-slate-500">{label}</dt>
                    <dd className="text-right font-semibold text-slate-100">{value}</dd>
                  </div>
                ))}
                <div className="flex items-start justify-between gap-4 py-3 text-sm">
                  <dt className="shrink-0 text-slate-500">Nota por critérios</dt>
                  <dd className="text-right font-semibold text-slate-100">{calculatedScore.toFixed(1)}/10</dd>
                </div>
              </dl>
            </section>
          </div>
        </aside>
      </div>
    </article>
  )
}
