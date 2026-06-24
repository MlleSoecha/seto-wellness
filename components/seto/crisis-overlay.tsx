'use client'

import { useState } from 'react'
import { X, Phone, Heart, ExternalLink } from 'lucide-react'

interface CrisisOverlayProps {
  onClose: () => void
}

const resources = [
  {
    name: 'Numéro national prévention suicide',
    number: '3114',
    desc: 'Disponible 24h/24, 7j/7 — France',
    urgent: true,
  },
  {
    name: 'SOS Amitié',
    number: '09 72 39 40 50',
    desc: 'Écoute bénévole, confidentielle',
    urgent: false,
  },
  {
    name: 'Croix-Rouge Écoute',
    number: '0 800 858 858',
    desc: 'Numéro gratuit, anonyme',
    urgent: false,
  },
]

export default function CrisisOverlay({ onClose }: CrisisOverlayProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="fixed bottom-4 right-4 z-40 w-80 rounded-2xl border border-[#E87040] shadow-2xl overflow-hidden"
      style={{ background: '#0D1B2E' }}
    >
      {/* Header */}
      <div className="bg-[#E87040] px-4 py-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-white shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold leading-tight">Vous n'êtes pas seul(e)</p>
            <p className="text-orange-100 text-xs mt-0.5">Des professionnels sont là pour vous</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors ml-2 shrink-0 mt-0.5">
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-[#8BA3BC] text-xs leading-relaxed mb-3">
          Votre conversation avec votre écoutant continue. Ces ressources sont là si vous souhaitez parler à un professionnel.
        </p>

        {resources.map((r, i) => (
          <a
            key={i}
            href={`tel:${r.number.replace(/\s/g, '')}`}
            className={`flex items-center justify-between mb-2 p-3 rounded-xl border transition-colors hover:bg-[#1A2D45] ${
              r.urgent ? 'border-[#E87040]/50 bg-[#E87040]/10' : 'border-[#243B55]'
            }`}
          >
            <div>
              <p className="text-[#F0EDE8] text-sm font-medium leading-tight">{r.name}</p>
              <p className="text-[#8BA3BC] text-xs mt-0.5">{r.desc}</p>
            </div>
            <div className="flex items-center gap-1.5 ml-2 shrink-0">
              <span className={`text-sm font-bold ${r.urgent ? 'text-[#E87040]' : 'text-[#F0EDE8]'}`}>{r.number}</span>
              <Phone size={13} className="text-[#8BA3BC]" />
            </div>
          </a>
        ))}

        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full text-center text-xs text-[#8BA3BC] hover:text-[#F0EDE8] py-1 transition-colors"
          >
            + Autres ressources
          </button>
        )}

        {expanded && (
          <a
            href="https://www.psycom.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#E87040] hover:text-[#F09060] mt-1 transition-colors"
          >
            <ExternalLink size={11} />
            psycom.org — annuaire des professionnels de santé mentale
          </a>
        )}
      </div>
    </div>
  )
}

// Simple keyword detector — call this on each new message
export function detectCrisis(text: string): boolean {
  const keywords = [
    'mourir', 'mort', 'tuer', 'suicide', 'suicider',
    'plus envie de vivre', 'ne plus exister', 'disparaître',
    'plus la force', 'tout abandonner', 'en finir',
    'mettre fin', 'fin à mes jours', 'fin à ma vie',
    'me faire du mal', 'blesser', 'automutil',
  ]
  const lower = text.toLowerCase()
  return keywords.some(k => lower.includes(k))
}
