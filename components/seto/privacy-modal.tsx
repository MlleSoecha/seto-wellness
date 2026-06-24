'use client'

import { useState } from 'react'
import { Shield, Trash2, EyeOff, Camera } from 'lucide-react'
import ElephantMascot from './elephant-mascot'

interface PrivacyModalProps {
  onAccept: () => void
}

export default function PrivacyModal({ onAccept }: PrivacyModalProps) {
  const [checked, setChecked] = useState(false)

  const rules = [
    {
      icon: <Trash2 size={18} className="text-[#E87040]" />,
      title: 'Suppression automatique en 24 h',
      desc: "L'intégralité de votre conversation est effacée 24 heures après la fin de la session.",
    },
    {
      icon: <EyeOff size={18} className="text-[#E87040]" />,
      title: 'Anonymat total',
      desc: "Aucun nom, aucune adresse e-mail, aucun identifiant interne n'est partagé avec votre écoutant.",
    },
    {
      icon: <Camera size={18} className="text-[#E87040]" />,
      title: "Captures d'écran désactivées",
      desc: "Nous vous demandons de ne pas capturer cette conversation. Votre écoutant s'y est engagé.",
    },
    {
      icon: <Shield size={18} className="text-[#E87040]" />,
      title: 'Données chiffrées',
      desc: "Toutes les communications transitent de façon chiffrée. Sɛto n'a pas accès au contenu.",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(13,27,46,0.96)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md bg-[#132236] rounded-2xl border border-[#243B55] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#1A2D45] px-6 pt-6 pb-4 text-center">
          <ElephantMascot size={72} className="mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#F0EDE8]">Avant de commencer</h2>
          <p className="text-[#8BA3BC] text-sm mt-1">
            Eto vous protège. Voici comment.
          </p>
        </div>

        {/* Rules */}
        <div className="px-6 py-4 space-y-3">
          {rules.map((r, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="mt-0.5 shrink-0">{r.icon}</div>
              <div>
                <p className="text-[#F0EDE8] text-sm font-medium">{r.title}</p>
                <p className="text-[#8BA3BC] text-xs mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Consent */}
        <div className="px-6 pb-6">
          <label className="flex items-start gap-3 cursor-pointer mb-4 group">
            <div
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                checked ? 'bg-[#E87040] border-[#E87040]' : 'border-[#243B55] group-hover:border-[#E87040]'
              }`}
              onClick={() => setChecked(!checked)}
            >
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[#8BA3BC] text-sm leading-relaxed">
              J'ai lu et j'accepte les règles de confidentialité de Sɛto. Je m'engage à ne pas capturer le contenu de cette conversation.
            </span>
          </label>

          <button
            onClick={onAccept}
            disabled={!checked}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
              checked
                ? 'bg-[#E87040] hover:bg-[#F09060] text-white'
                : 'bg-[#243B55] text-[#5C7A9A] cursor-not-allowed'
            }`}
          >
            Commencer la session en toute sécurité
          </button>
        </div>
      </div>
    </div>
  )
}
