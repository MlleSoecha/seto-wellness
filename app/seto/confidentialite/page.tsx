import { Shield, Trash2, EyeOff, Lock, Server, Users, Camera } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confidentialité — Sɛto',
  description: 'Comment Sɛto protège votre anonymat et vos données.',
}

const sections = [
  {
    icon: <EyeOff size={20} className="text-[#E87040]" />,
    title: 'Qui sait que vous êtes là ?',
    content: `Personne. Sɛto ne vous demande ni votre nom, ni votre email, ni votre identifiant employé. Vous arrivez de façon totalement anonyme. Votre employeur ne sait pas que vous utilisez Sɛto — ni même si votre entreprise a déployé le service.`,
  },
  {
    icon: <Trash2 size={20} className="text-[#E87040]" />,
    title: 'Que devient votre conversation ?',
    content: `Chaque conversation est automatiquement supprimée 24 heures après la fin de la session. Ce délai court permet à votre écoutant de noter des points de suivi si vous le souhaitez, puis les messages disparaissent définitivement. Il n'y a aucun historique permanent, aucune archive.`,
  },
  {
    icon: <Users size={20} className="text-[#E87040]" />,
    title: 'Votre écoutant connaît-il votre identité ?',
    content: `Non. Votre écoutant vous voit simplement comme "Utilisateur anonyme". Il ne connaît ni votre service, ni votre ancienneté, ni votre poste. L'anonymat est symétrique : vous ne le connaissez pas non plus au-delà de son prénom de session.`,
  },
  {
    icon: <Lock size={20} className="text-[#E87040]" />,
    title: 'Comment les messages sont-ils protégés ?',
    content: `Toutes les communications transitent de bout en bout via des connexions chiffrées (TLS 1.3). Les données au repos sont chiffrées avec AES-256. L'équipe Sɛto n'a pas accès au contenu des messages — seuls vous et votre écoutant peuvent les lire, et uniquement pendant la session.`,
  },
  {
    icon: <Server size={20} className="text-[#E87040]" />,
    title: 'Quelles données sont conservées ?',
    content: `Aucune donnée personnelle n'est conservée. Pour les entreprises clientes, nous générons uniquement des métriques agrégées et anonymisées : nombre total de sessions par semaine, score de bien-être moyen de l'équipe. Ces chiffres ne permettent jamais d'identifier un individu.`,
  },
  {
    icon: <Camera size={20} className="text-[#E87040]" />,
    title: "Les captures d'écran sont-elles interdites ?",
    content: `Nous demandons à chaque participant — utilisateur comme écoutant — de s'engager à ne pas capturer le contenu des conversations. Cet engagement est signé au début de chaque session. Techniquement, certains systèmes permettent encore la capture ; c'est pourquoi l'engagement moral est au cœur de la charte Sɛto.`,
  },
  {
    icon: <Shield size={20} className="text-[#E87040]" />,
    title: 'Que se passe-t-il en cas de crise ?',
    content: `Si des signaux de détresse sont détectés dans la conversation, Sɛto affiche automatiquement les ressources professionnelles disponibles (numéros d'urgence, lignes d'écoute). Cette détection est faite en local, dans votre navigateur — rien n'est transmis à des tiers. La conversation avec votre écoutant continue en parallèle.`,
  },
]

export default function ConfidentialitePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <Shield size={32} className="text-[#E87040] mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-[#F0EDE8] mb-3">Notre modèle d'anonymat</h1>
        <p className="text-[#8BA3BC] leading-relaxed">
          La confiance est la fondation de Sɛto. Voici exactement comment nous protégeons votre intimité — sans termes juridiques obscurs.
        </p>
      </div>

      {/* Promise banner */}
      <div className="bg-[#E87040]/10 border border-[#E87040]/30 rounded-2xl px-6 py-5 mb-10 text-center">
        <p className="text-[#FAC5A8] font-medium leading-relaxed">
          "Aucune donnée personnelle. Aucun accès employeur. Aucun historique permanent."
        </p>
        <p className="text-[#8BA3BC] text-xs mt-2">— La promesse Sɛto</p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((s, i) => (
          <div key={i} className="bg-[#132236] border border-[#243B55] rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">{s.icon}</div>
              <div>
                <h2 className="text-[#F0EDE8] font-semibold mb-2">{s.title}</h2>
                <p className="text-[#8BA3BC] text-sm leading-relaxed">{s.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Technical note */}
      <div className="mt-10 bg-[#132236] border border-[#243B55] rounded-2xl p-6">
        <h2 className="text-[#F0EDE8] font-semibold mb-3">Note technique</h2>
        <div className="space-y-2 text-sm text-[#8BA3BC]">
          {[
            ['Base de données', 'Supabase (RLS activé, suppression automatique via cron)'],
            ['Transport', 'TLS 1.3 sur tous les endpoints'],
            ['Données au repos', 'AES-256'],
            ['Auth', 'Token anonyme sessionnel — aucun compte persistant'],
            ['Logs', 'Aucun log contenant des données de contenu'],
            ['Hébergement', 'Serveurs UE (conformité RGPD)'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <span className="text-[#5C7A9A] shrink-0 w-28">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-8 text-center">
        <p className="text-[#8BA3BC] text-sm mb-2">Des questions sur notre approche ?</p>
        <a
          href="mailto:confidentialite@seto.app"
          className="text-[#E87040] hover:text-[#F09060] text-sm font-medium transition-colors"
        >
          confidentialite@seto.app
        </a>
      </div>
    </div>
  )
}
