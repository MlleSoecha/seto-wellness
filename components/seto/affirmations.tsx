'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const affirmations = [
  {
    text: "Tu es suffisant(e) tel(le) que tu es.",
    source: "Sɛto",
    bg: "from-[#1A2D45] to-[#132236]",
  },
  {
    text: "Tes émotions sont valides et méritent d'être entendues.",
    source: "Communauté Sɛto",
    bg: "from-[#1E2E40] to-[#132236]",
  },
  {
    text: "Prendre soin de soi, c'est aussi prendre soin des autres.",
    source: "Sagesse Ewe",
    bg: "from-[#1A2D45] to-[#12283A]",
  },
  {
    text: "Dans la communauté, tu trouves ta force. Tu n'es jamais seul(e).",
    source: "Ubuntu",
    bg: "from-[#192840] to-[#132236]",
  },
  {
    text: "Chaque jour est une nouvelle opportunité de te ressourcer.",
    source: "Sɛto",
    bg: "from-[#1A2D45] to-[#132236]",
  },
  {
    text: "Ta vulnérabilité n'est pas une faiblesse. C'est une forme de courage.",
    source: "Communauté Sɛto",
    bg: "from-[#1E2E40] to-[#132236]",
  },
  {
    text: "Tu mérites du soutien, de la compréhension et de la paix.",
    source: "Sɛto",
    bg: "from-[#1A2D45] to-[#12283A]",
  },
  {
    text: "Comme le baobab, tes racines te soutiennent dans les tempêtes.",
    source: "Proverbe Ouest-africain",
    bg: "from-[#192840] to-[#132236]",
  },
]

export default function Affirmations() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const current = affirmations[index]

  function prev() {
    setDirection('left')
    setIndex(i => (i - 1 + affirmations.length) % affirmations.length)
  }

  function next() {
    setDirection('right')
    setIndex(i => (i + 1) % affirmations.length)
  }

  function random() {
    let next
    do { next = Math.floor(Math.random() * affirmations.length) } while (next === index)
    setIndex(next)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card */}
      <div
        className={`w-full rounded-2xl p-8 bg-gradient-to-br ${current.bg} border border-[#243B55] text-center min-h-[160px] flex flex-col items-center justify-center`}
      >
        <p className="text-[#F0EDE8] text-xl font-light leading-relaxed italic mb-4">
          "{current.text}"
        </p>
        <p className="text-[#8BA3BC] text-xs">{current.source}</p>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5">
        {affirmations.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === index ? 'bg-[#E87040] w-4' : 'bg-[#243B55]'
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          className="p-2 rounded-xl bg-[#132236] border border-[#243B55] text-[#8BA3BC] hover:text-[#F0EDE8] hover:border-[#E87040]/50 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={random}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#132236] border border-[#243B55] text-[#8BA3BC] hover:text-[#F0EDE8] hover:border-[#E87040]/50 transition-colors text-sm"
        >
          <Sparkles size={13} />
          Aléatoire
        </button>

        <button
          onClick={next}
          className="p-2 rounded-xl bg-[#132236] border border-[#243B55] text-[#8BA3BC] hover:text-[#F0EDE8] hover:border-[#E87040]/50 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
