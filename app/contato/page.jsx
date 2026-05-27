import { ContactForm } from '@/components/ContactForm'
import { SectionHeader } from '@/components/SectionHeader'

export const metadata = {
  title: 'Contato | GameZone'
}

export default function ContactPage() {
  return (
    <section className="page-shell py-14 md:py-16">
      <SectionHeader
        as="h1"
        label="Comunidade"
        title="Fale com a equipe"
        description="Envie sugestão de jogo, correção editorial ou proposta de parceria. Toda mensagem ajuda a melhorar a curadoria."
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <ContactForm />
        <aside className="panel-surface p-6">
          <h2 className="text-xl font-black text-slate-50">O que ajuda na resposta</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
            <li className="flex gap-2"><span className="font-black text-cyan">+</span><span>Nome do jogo ou assunto principal.</span></li>
            <li className="flex gap-2"><span className="font-black text-cyan">+</span><span>Contexto da sugestão, correção ou parceria.</span></li>
            <li className="flex gap-2"><span className="font-black text-cyan">+</span><span>E-mail válido para retorno da equipe.</span></li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
