'use client'

import { useState } from 'react'
import { Wind, Music, Clock, Star } from 'lucide-react'
import BreathingExercise from '@/components/seto/breathing-exercise'
import CalmingSounds from '@/components/seto/calming-sounds'
import MentalBreak from '@/components/seto/mental-break'
import Affirmations from '@/components/seto/affirmations'

type Tool = 'breathing' | 'sounds' | 'break' | 'affirmations'

const tools = [
  { id: 'breathing' as Tool, label: 'Respiration', emoji: '🌬️', icon: <Wind size={18} />, desc: 'Technique 4-4-8' },
  { id: 'sounds' as Tool, label: 'Sons', emoji: '🎵', icon: <Music size={18} />, desc: 'Sons apaisants' },
  { id: 'break' as Tool, label: 'Pause 60 s', emoji: '⏱️', icon: <Clock size={18} />, desc: 'Pause mentale' },
  { id: 'affirmations' as Tool, label: 'Affirmations', emoji: '✨', icon: <Star size={18} />, desc: 'Pensées douces' },
]

export default function BienEtrePage() {
  const [active, setActive] = useState<Tool>('breathing')

  return (
    <div className="max-w-2xl mx-auto px-4 py-12" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[#8BA3BC] text-xs uppercase tracking-widest mb-2">Outils de bien-être</p>
        <h1 className="text-3xl font-bold text-[#F0EDE8] mb-3">Votre espace de ressourcement</h1>
        <p className="text-[#8BA3BC] leading-relaxed">
          Des outils simples, disponibles à tout moment, pour retrouver le calme et la clarté.
        </p>
      </div>

      {/* Tool selector */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {tools.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border transition-all ${
              active === t.id
                ? 'border-[#E87040] bg-[#E87040]/10 text-[#E87040]'
                : 'border-[#243B55] bg-[#132236] text-[#8BA3BC] hover:border-[#E87040]/30 hover:text-[#F0EDE8]'
            }`}
          >
            <span className="text-xl">{t.emoji}</span>
            <span className="text-xs font-medium leading-tight text-center">{t.label}</span>
            <span className="text-[10px] opacity-70 leading-tight text-center">{t.desc}</span>
          </button>
        ))}
      </div>

      {/* Tool panel */}
      <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-6">
        {active === 'breathing' && (
          <>
            <h2 className="text-[#F0EDE8] font-semibold text-center mb-6">Exercice de respiration</h2>
            <BreathingExercise />
          </>
        )}
        {active === 'sounds' && (
          <>
            <h2 className="text-[#F0EDE8] font-semibold text-center mb-6">Sons apaisants</h2>
            <CalmingSounds />
          </>
        )}
        {active === 'break' && (
          <>
            <h2 className="text-[#F0EDE8] font-semibold text-center mb-6">Pause mentale de 60 secondes</h2>
            <MentalBreak />
          </>
        )}
        {active === 'affirmations' && (
          <>
            <h2 className="text-[#F0EDE8] font-semibold text-center mb-6">Affirmations du jour</h2>
            <Affirmations />
          </>
        )}
      </div>

      {/* Tip */}
      <div className="mt-6 bg-[#E87040]/10 border border-[#E87040]/20 rounded-2xl px-5 py-4">
        <p className="text-[#FAC5A8] text-sm text-center leading-relaxed">
          💡 Ces outils sont plus efficaces utilisés <strong>régulièrement</strong> — même 5 minutes par jour font une différence.
        </p>
      </div>

      {/* Link to chat */}
      <div className="mt-6 text-center">
        <p className="text-[#8BA3BC] text-sm mb-3">Vous souhaitez parler à quelqu'un ?</p>
        <a
          href="/seto/chat"
          className="inline-flex items-center gap-1.5 bg-[#E87040] hover:bg-[#F09060] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          Démarrer une session d'écoute
        </a>
      </div>
    </div>
  )
}
