'use client'

import { useState, useEffect, useRef } from 'react'

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale'

const phases: { phase: Phase; label: string; duration: number; color: string }[] = [
  { phase: 'inhale', label: 'Inspirez', duration: 4000, color: '#3B9ED8' },
  { phase: 'hold', label: 'Retenez', duration: 4000, color: '#8BA3BC' },
  { phase: 'exhale', label: 'Expirez', duration: 8000, color: '#E87040' },
]

export default function BreathingExercise() {
  const [running, setRunning] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [cycles, setCycles] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef<number>(0)

  const current = running ? phases[phaseIndex] : null

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setProgress(0)
      return
    }

    startRef.current = Date.now()
    const duration = phases[phaseIndex].duration

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)

      if (p >= 1) {
        clearInterval(intervalRef.current!)
        const next = (phaseIndex + 1) % phases.length
        if (next === 0) setCycles(c => c + 1)
        setPhaseIndex(next)
        setProgress(0)
        startRef.current = Date.now()
      }
    }, 50)

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, phaseIndex])

  function toggle() {
    if (running) {
      setRunning(false)
      setPhaseIndex(0)
      setProgress(0)
      setCycles(0)
    } else {
      setRunning(true)
    }
  }

  const circleScale = current?.phase === 'inhale'
    ? 0.5 + progress * 0.5
    : current?.phase === 'exhale'
    ? 1 - progress * 0.5
    : current?.phase === 'hold'
    ? 1
    : 0.5

  const circleColor = current?.color ?? '#243B55'

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Breathing circle */}
      <div className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
        {/* Outer ring */}
        <div
          className="absolute rounded-full border-2 transition-all"
          style={{
            width: 200,
            height: 200,
            borderColor: running ? circleColor : '#243B55',
            opacity: 0.3,
          }}
        />
        {/* Animated circle */}
        <div
          className="rounded-full transition-all flex items-center justify-center"
          style={{
            width: 200 * circleScale,
            height: 200 * circleScale,
            background: running
              ? `radial-gradient(circle at 40% 40%, ${circleColor}66, ${circleColor}33)`
              : '#132236',
            border: `2px solid ${running ? circleColor : '#243B55'}`,
            transition: running ? 'none' : 'all 0.3s ease',
          }}
        >
          <div className="text-center select-none">
            <p className="text-2xl font-light text-[#F0EDE8]">
              {current ? current.label : 'Prêt'}
            </p>
            {running && (
              <p className="text-xs text-[#8BA3BC] mt-1">
                {Math.ceil(phases[phaseIndex].duration / 1000 * (1 - progress))}s
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cycle count */}
      {running && cycles > 0 && (
        <p className="text-[#8BA3BC] text-sm">
          {cycles} cycle{cycles > 1 ? 's' : ''} complété{cycles > 1 ? 's' : ''}
        </p>
      )}

      {/* Control */}
      <button
        onClick={toggle}
        className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
          running
            ? 'bg-[#243B55] text-[#8BA3BC] hover:bg-[#2A4060]'
            : 'bg-[#E87040] hover:bg-[#F09060] text-white'
        }`}
      >
        {running ? 'Arrêter' : 'Commencer · 4-4-8'}
      </button>

      <p className="text-[#5C7A9A] text-xs text-center max-w-xs">
        Technique 4-4-8 : inspirez 4s, retenez 4s, expirez 8s. Idéale pour calmer le système nerveux.
      </p>
    </div>
  )
}
