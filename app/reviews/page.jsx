import { SectionHeader } from '@/components/SectionHeader'
import { ReviewExplorer } from '@/components/ReviewExplorer'
import reviewsData from '@/data/reviews'

export const metadata = {
  title: 'Reviews | GameZone'
}

export default function ReviewsPage() {
  return (
    <section className="page-shell py-14 md:py-16">
      <SectionHeader
        as="h1"
        label="Catálogo"
        title="Encontre o review certo mais rápido"
        description="Busque por nome, filtre por gênero e ordene por nota, data ou título para comparar jogos sem perder tempo."
      />
      <div className="mt-10">
        <ReviewExplorer initialReviews={reviewsData.reviews} />
      </div>
    </section>
  )
}
