import reviewsData from '@/data/reviews'
import { SectionHeader } from '@/components/SectionHeader'
import { Chatbot } from '@/components/Chatbot'

const { reviews } = reviewsData

export const metadata = {
  title: 'Assistente | GameZone'
}

export default function AssistantPage() {
  return (
    <section className="page-shell py-14 md:py-16">
      <SectionHeader
        label="Inteligência artificial"
        title="Assistente de recomendações GameZone"
        description="Um agente que interpreta o que você procura, cruza com as reviews da equipe e explica cada sugestão. Sem caixa-preta: motivo, nota e preço sempre à vista."
      />
      <div className="mt-10">
        <Chatbot reviews={reviews} />
      </div>
    </section>
  )
}
