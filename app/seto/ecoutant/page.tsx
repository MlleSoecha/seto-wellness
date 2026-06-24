import { Metadata } from 'next'
import ListenerForm from '@/components/seto/listener-form'
import { Heart, BookOpen, Award, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Devenir écoutant — Sɛto',
  description: 'Formez-vous à l\'écoute active et accompagnez vos collègues avec bienveillance.',
}

const values = [
  {
    icon: <Heart size={18} className="text-[#E87040]" />,
    title: 'Écoute sans jugement',
    desc: "Votre rôle n'est pas de conseiller ni de résoudre — mais d'être pleinement présent.",
  },
  {
    icon: <BookOpen size={18} className="text-[#E87040]" />,
    title: 'Formation certifiante',
    desc: "Un cours Coursera d'écoute active (~3 h), reconnu internationalement.",
  },
  {
    icon: <Award size={18} className="text-[#E87040]" />,
    title: 'Certification Sɛto',
    desc: "Une fois votre code validé, vous rejoignez le réseau d'écoutants certifiés.",
  },
  {
    icon: <Users size={18} className="text-[#E87040]" />,
    title: 'Impact communautaire',
    desc: 'Chaque session que vous animez contribue au bien-être collectif de votre équipe.',
  },
]

export default function EcoutantPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[#8BA3BC] text-xs uppercase tracking-widest mb-2">Rejoignez le réseau</p>
        <h1 className="text-3xl font-bold text-[#F0EDE8] mb-3">Devenir écoutant Sɛto</h1>
        <p className="text-[#8BA3BC] leading-relaxed">
          Être écoutant, c'est offrir le don le plus précieux qui soit : votre présence totale.
          Une heure par semaine peut changer la trajectoire de quelqu'un.
        </p>
      </div>

      {/* Values */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {values.map((v, i) => (
          <div key={i} className="bg-[#132236] border border-[#243B55] rounded-2xl p-4 flex gap-3">
            <div className="mt-0.5 shrink-0">{v.icon}</div>
            <div>
              <p className="text-[#F0EDE8] text-sm font-medium mb-1">{v.title}</p>
              <p className="text-[#8BA3BC] text-xs leading-relaxed">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The path */}
      <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-6 mb-10">
        <h2 className="text-[#F0EDE8] font-semibold mb-4">Le parcours en 4 étapes</h2>
        <ol className="space-y-3">
          {[
            { label: 'Remplissez votre candidature', sub: 'Prénom, entreprise, motivation.' },
            { label: 'Suivez la formation Coursera', sub: '"Active Listening Skills" — gratuit, ~3 heures.' },
            { label: 'Saisissez votre code de certification', sub: 'Fourni à la fin du cours par Coursera.' },
            { label: 'Attendez la validation Sɛto', sub: 'Réponse sous 5 jours ouvrés. Accès activé immédiatement.' },
          ].map((s, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-[#E87040]/20 text-[#E87040] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-[#F0EDE8] text-sm">{s.label}</p>
                <p className="text-[#8BA3BC] text-xs mt-0.5">{s.sub}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Form */}
      <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-6">
        <h2 className="text-[#F0EDE8] font-semibold mb-6 text-center">Commencer ma candidature</h2>
        <ListenerForm />
      </div>
    </div>
  )
}
