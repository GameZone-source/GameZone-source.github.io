import reviewsData from '@/data/reviews'
import { SectionHeader } from '@/components/SectionHeader'
import { DiscoveryPanel } from '@/components/DiscoveryPanel'

const { reviews } = reviewsData

export const metadata = {
  title: 'Descoberta | GameZone'
}

export default function DiscoveryPage() {
  return (
    <section className="page-shell py-14 md:py-16">
      <SectionHeader
        as="h1"
        label="Favoritos"
        title="Monte seu radar de jogos"
        description="Salve jogos que chamam atenção. Cada sugestão mostra o motivo da recomendação, com base em gênero, favoritos e nota editorial."
      />
      <div className="mt-10">
        <DiscoveryPanel reviews={reviews} />
      </div>
    </section>
  )
}
