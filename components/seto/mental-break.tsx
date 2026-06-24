'use client'

import { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const prompts = [
  "Posez vos mains à plat sur votre bureau. Sentez la fraîcheur ou la chaleur sous vos paumes.",
  "Regardez par la fenêtre. Nommez 3 choses que vous voyez.",
  "Respirez doucement. Sentez votre poitrine se soulever et s'abaisser.",
  "Étirez lentement votre cou d'un côté, puis de l'autre.",
  "Fermez les yeux. Notez les sons qui vous entourent, sans les juger.",
  "Roulez doucement vos épaules vers l'arrière, 3 fois.",
  "Buvez une gorgée d'eau. Sentez-la sur votre langue.",
  "Souriez doucement, même si vous n'en avez pas envie. Restez ainsi 10 secondes.",
]

export default function MentalBreak() {
  const [running, setRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [promptIndex] = useState(() => Math.floor(Math.random() * prompts.length))
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(intervalRef.current!)
          setRunning(false)
          setDone(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current!)
  }, [running])

  function start() {
    setSecondsLeft(60)
    setDone(false)
    setRunning(true)
  }

  function reset() {
    clearInterval(intervalRef.current!)
    setRunning(false)
    setSecondsLeft(60)
    setDone(false)
  }

  const progress = (60 - secondsLeft) / 60
  const circumference = 2 * Math.PI * 44
  const strokeDash = circumference - progress * circumference

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Timer ring */}
      <div className="relative" style={{ width: 120, height: 120 }}>
        <svg width="120" height="120" className="-rotate-90">
          <circle cx="60" cy="60" r="44" fill="none" stroke="#243B55" strokeWidth="6" />
          <circle
            cx="60" cy="60" r="44"
            fill="none"
            stroke={done ? '#5BAD72' : '#E87040'}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDash}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          {done ? (
            <span className="text-2xl">✓</span>
          ) : (
            <>
              <span className="text-2xl font-light text-[#F0EDE8]">{secondsLeft}</span>
              <span className="text-[10px] text-[#8BA3BC]">sec</span>
            </>
          )}
        </div>
      </div>

      {/* Prompt */}
      <div className="bg-[#132236] border border-[#243B55] rounded-2xl px-5 py-4 text-center max-w-xs">
        {running || done ? (
          <>
            <Eye size={16} className="text-[#E87040] mx-auto mb-2" />
            <p className="text-[#F0EDE8] text-sm leading-relaxed">{prompts[promptIndex]}</p>
          </>
        ) : (
          <>
            <EyeOff size={16} className="text-[#5C7A9A] mx-auto mb-2" />
            <p className="text-[#8BA3BC] text-sm">
              Une pause de 60 secondes pour revenir à vous-même.
            </p>
          </>
        )}
      </div>

      {done ? (
        <div className="text-center">
          <p className="text-[#5BAD72] text-sm font-medium mb-3">Pause terminée. Comment vous sentez-vous ?</p>
          <button
            onClick={reset}
            className="px-6 py-2 rounded-full border border-[#243B55] text-[#8BA3BC] hover:border-[#E87040]/50 hover:text-[#F0EDE8] text-sm transition-colors"
          >
            Recommencer
          </button>
        </div>
      ) : running ? (
        <button
          onClick={reset}
          className="px-6 py-2 rounded-full border border-[#243B55] text-[#8BA3BC] hover:border-[#E87040]/50 hover:text-[#F0EDE8] text-sm transition-colors"
        >
          Annuler
        </button>
      ) : (
        <button
          onClick={start}
          className="px-8 py-3 rounded-full bg-[#E87040] hover:bg-[#F09060] text-white text-sm font-medium transition-colors"
        >
          Prendre une pause · 60 s
        </button>
      )}
    </div>
  )
}
