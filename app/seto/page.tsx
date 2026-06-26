import Link from 'next/link'
import { ArrowRight, Shield, Users, BarChart2, Heart, Headphones, Wind } from 'lucide-react'
import ElephantMascot from '@/components/seto/elephant-mascot'

export const metadata = {
  title: 'Sɛto — L\'écoute anonyme entre pairs',
  description: 'Sɛto connecte anonymement des employés à des écoutants formés au sein de leur entreprise.',
}

const features = [
  {
    icon: <Shield size={20} className="text-[#E87040]" />,
    title: 'Anonymat total',
    desc: "Votre identité n'est jamais révélée. Les conversations s'effacent en 24 h.",
  },
  {
    icon: <Users size={20} className="text-[#E87040]" />,
    title: 'Pairs formés',
    desc: 'Les écoutants sont des collègues certifiés en écoute active — pas des étrangers.',
  },
  {
    icon: <Heart size={20} className="text-[#E87040]" />,
    title: 'Sans jugement',
    desc: 'Un espace bienveillant, ancré dans la solidarité ouest-africaine.',
  },
  {
    icon: <Headphones size={20} className="text-[#E87040]" />,
    title: 'Sons apaisants',
    desc: 'Pluie tropicale, rivière, carillons — pour retrouver le calme en quelques secondes.',
  },
  {
    icon: <Wind size={20} className="text-[#E87040]" />,
    title: 'Exercices de respiration',
    desc: 'Technique 4-4-8 pour calmer votre système nerveux avant ou après une session.',
  },
  {
    icon: <BarChart2 size={20} className="text-[#E87040]" />,
    title: 'Suivi de bien-être',
    desc: 'Votre humeur avant et après chaque session, pour mesurer votre progression.',
  },
]

const testimonials = [
  {
    quote: "Pour la première fois, j'ai pu parler de mon épuisement au travail sans craindre que mon manager le sache.",
    role: "Employée, secteur télécom",
  },
  {
    quote: "Devenir écoutant m'a autant aidé que les personnes que j'accompagne. C'est un cercle vertueux.",
    role: "Écoutant certifié, Dakar",
  },
  {
    quote: "Sɛto, c'est l'ubuntu appliqué au lieu de travail — 'Je suis parce que nous sommes.'",
    role: "Responsable RH, Abidjan",
  },
]

export default function SetoHome() {
  return (
    <div className="min-h-screen" style={{ background: '#0D1B2E' }}>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-20 text-center">
        <ElephantMascot size={120} className="mx-auto mb-6" animated />
        <div className="inline-flex items-center gap-2 bg-[#E87040]/10 border border-[#E87040]/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#5BAD72] animate-pulse" />
          <span className="text-[#E87040] text-xs font-medium">Écoutants disponibles maintenant</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-4">
          L'écoute anonyme,<br />
          <span className="text-[#E87040]">entre collègues.</span>
        </h1>

        <p className="text-[#8BA3BC] text-lg max-w-xl mx-auto leading-relaxed mb-6">
          Sɛto connecte chaque employé à un pair formé à l'écoute active — en toute confidentialité,
          en toute bienveillance. Parce que <em className="text-[#FAC5A8]">nous grandissons ensemble</em>.
        </p>

        {/* Badges de confiance */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {['100 % anonyme', 'Toujours gratuit', 'Sans jugement', 'Disponible 24/7'].map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 bg-[#132236] border border-[#243B55] rounded-full px-3 py-1.5 text-[#8BA3BC] text-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5BAD72]" />
              {b}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/seto/chat"
            className="flex items-center justify-center gap-2 bg-[#E87040] hover:bg-[#F09060] text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm"
          >
            <Heart size={16} />
            Je cherche à parler
          </Link>
          <Link
            href="/seto/ecoutant"
            className="flex items-center justify-center gap-2 border border-[#243B55] hover:border-[#E87040]/50 text-[#F0EDE8] px-7 py-3.5 rounded-full transition-colors text-sm"
          >
            Devenir écoutant
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/seto/entreprises"
            className="flex items-center justify-center gap-2 border border-[#243B55] hover:border-[#E87040]/50 text-[#8BA3BC] hover:text-[#F0EDE8] px-7 py-3.5 rounded-full transition-colors text-sm"
          >
            Pour mon entreprise
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-[#8BA3BC] text-xs uppercase tracking-widest text-center mb-2">Ce que Sɛto offre</p>
        <h2 className="text-2xl font-bold text-[#F0EDE8] text-center mb-10">
          Un espace de soin, pas un outil de productivité.
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-[#132236] border border-[#243B55] rounded-2xl p-5 hover:border-[#E87040]/30 transition-colors">
              <div className="mb-3">{f.icon}</div>
              <h3 className="text-[#F0EDE8] font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-[#8BA3BC] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <p className="text-[#8BA3BC] text-xs uppercase tracking-widest text-center mb-2">Fonctionnement</p>
        <h2 className="text-2xl font-bold text-[#F0EDE8] text-center mb-10">Simple. Sécurisé. Humain.</h2>
        <ol className="space-y-5">
          {[
            { n: '01', title: 'Vous arrivez', desc: 'Anonymement. Aucune inscription requise.' },
            { n: '02', title: 'Vous êtes mis en relation', desc: 'Avec un pair formé, disponible au même moment.' },
            { n: '03', title: 'Vous parlez', desc: 'En toute confidentialité. Votre écoutant écoute, sans conseiller ni juger.' },
            { n: '04', title: 'Ça disparaît', desc: 'La conversation est effacée automatiquement au bout de 24 h.' },
          ].map((s, i) => (
            <li key={i} className="flex gap-5 items-start">
              <span className="text-3xl font-bold text-[#E87040]/30 leading-none w-10 shrink-0">{s.n}</span>
              <div>
                <p className="text-[#F0EDE8] font-medium">{s.title}</p>
                <p className="text-[#8BA3BC] text-sm mt-0.5">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-[#8BA3BC] text-xs uppercase tracking-widest text-center mb-10">Ce qu'ils disent</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#132236] border border-[#243B55] rounded-2xl p-5">
              <p className="text-[#FAC5A8] text-2xl mb-2 font-serif">"</p>
              <p className="text-[#F0EDE8] text-sm leading-relaxed italic mb-3">{t.quote}</p>
              <p className="text-[#5C7A9A] text-xs">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-8">
          <Shield size={28} className="text-[#E87040] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#F0EDE8] mb-2">La confidentialité, sans compromis.</h2>
          <p className="text-[#8BA3BC] text-sm leading-relaxed mb-5">
            Sɛto a été conçu dès le départ pour protéger votre intimité. Aucune donnée personnelle,
            aucun historique permanent, aucun accès employeur.
          </p>
          <Link
            href="/seto/confidentialite"
            className="inline-flex items-center gap-1.5 text-[#E87040] hover:text-[#F09060] text-sm font-medium transition-colors"
          >
            Lire notre modèle d'anonymat
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
