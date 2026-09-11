import { SectionHeader } from '@/components/SectionHeader'
import { GrowthProjection } from '@/components/impacto/GrowthProjection'

export const metadata = {
  title: 'Impacto | GameZone',
  description: 'Simulação de crescimento exponencial da comunidade GameZone.'
}

export default function ImpactPage() {
  return (
    <section className="page-shell py-14 md:py-16">
      <SectionHeader
        as="h1"
        label="Modelagem exponencial"
        title="Projete o crescimento da comunidade"
        description="Explore cenários de adoção do GameZone com uma projeção transparente, ajustável e acompanhada dos dados completos."
      />
      <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-400">
        Esta ferramenta tem finalidade acadêmica. Os resultados dependem das premissas informadas e não representam uma garantia de desempenho futuro.
      </p>
      <div className="mt-10">
        <GrowthProjection />
      </div>
    </section>
  )
}
