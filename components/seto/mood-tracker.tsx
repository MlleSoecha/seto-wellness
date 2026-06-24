'use client'

import { useState } from 'react'

interface MoodTrackerProps {
  phase: 'pre' | 'post'
  onSubmit: (score: number) => void
}

const moods = [
  { score: 1, emoji: '😞', label: 'Très difficile', color: '#E85555' },
  { score: 2, emoji: '😕', label: 'Difficile', color: '#E8843A' },
  { score: 3, emoji: '😐', label: 'Neutre', color: '#C4A842' },
  { score: 4, emoji: '🙂', label: 'Bien', color: '#5BAD72' },
  { score: 5, emoji: '😊', label: 'Très bien', color: '#3B9ED8' },
]

export default function MoodTracker({ phase, onSubmit }: MoodTrackerProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const title = phase === 'pre'
    ? 'Comment vous sentez-vous en ce moment ?'
    : 'Comment vous sentez-vous après cette conversation ?'

  const subtitle = phase === 'pre'
    ? 'Votre ressenti avant de commencer'
    : 'Votre ressenti après la session'

  return (
    <div className="w-full max-w-sm mx-auto text-center">
      <p className="text-[#8BA3BC] text-xs uppercase tracking-widest mb-2">{subtitle}</p>
      <h3 className="text-[#F0EDE8] text-lg font-medium mb-6 leading-snug">{title}</h3>

      <div className="flex justify-center gap-3 mb-6">
        {moods.map(m => (
          <button
            key={m.score}
            onClick={() => setSelected(m.score)}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
              selected === m.score
                ? 'bg-[#1A2D45] scale-110 ring-2'
                : 'hover:bg-[#1A2D45]'
            }`}
            style={selected === m.score ? { ringColor: m.color, outline: `2px solid ${m.color}` } : {}}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-[10px] text-[#8BA3BC] leading-tight w-12">{m.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => selected !== null && onSubmit(selected)}
        disabled={selected === null}
        className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
          selected !== null
            ? 'bg-[#E87040] hover:bg-[#F09060] text-white'
            : 'bg-[#243B55] text-[#5C7A9A] cursor-not-allowed'
        }`}
      >
        Continuer
      </button>
    </div>
  )
}
