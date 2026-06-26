'use client'

import { useState } from 'react'
import PrivacyModal from '@/components/seto/privacy-modal'
import MoodTracker from '@/components/seto/mood-tracker'
import ChatInterface from '@/components/seto/chat-interface'
import ElephantMascot from '@/components/seto/elephant-mascot'
import { Shield, Users, Info } from 'lucide-react'

type Phase = 'privacy' | 'pre-mood' | 'matching' | 'chat' | 'post-mood' | 'done'

function saveMoodEntry(score: number, phase: 'pre' | 'post') {
  if (typeof window === 'undefined') return
  const key = 'seto_mood_entries'
  const entries = JSON.parse(localStorage.getItem(key) ?? '[]')
  entries.push({
    date: new Date().toISOString().slice(0, 10),
    score,
    phase,
    ts: Date.now(),
  })
  localStorage.setItem(key, JSON.stringify(entries))
}

export default function ChatPage() {
  const [phase, setPhase] = useState<Phase>('privacy')
  const [preMood, setPreMood] = useState<number | null>(null)
  const [postMood, setPostMood] = useState<number | null>(null)
  const [matchingDots, setMatchingDots] = useState(0)

  function onPrivacyAccept() {
    setPhase('pre-mood')
  }

  function onPreMood(score: number) {
    setPreMood(score)
    saveMoodEntry(score, 'pre')
    setPhase('matching')

    // Simulate matching delay
    let dots = 0
    const interval = setInterval(() => {
      dots++
      setMatchingDots(dots % 4)
    }, 500)
    setTimeout(() => {
      clearInterval(interval)
      setPhase('chat')
    }, 3000)
  }

  function endSession() {
    setPhase('post-mood')
  }

  function onPostMood(score: number) {
    setPostMood(score)
    saveMoodEntry(score, 'post')
    setPhase('done')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col" style={{ background: '#0D1B2E' }}>

      {/* Privacy modal */}
      {phase === 'privacy' && <PrivacyModal onAccept={onPrivacyAccept} />}

      {/* Pre-mood */}
      {phase === 'pre-mood' && (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <MoodTracker phase="pre" onSubmit={onPreMood} />
        </div>
      )}

      {/* Matching */}
      {phase === 'matching' && (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <ElephantMascot size={96} className="mx-auto mb-6" animated />
            <p className="text-[#F0EDE8] text-lg font-medium mb-2">
              Recherche d'un écoutant{'.'.repeat(matchingDots + 1)}
            </p>
            <p className="text-[#8BA3BC] text-sm">Nous vous connectons de manière anonyme.</p>
            <div className="flex items-center justify-center gap-1.5 mt-6">
              <Users size={13} className="text-[#5C7A9A]" />
              <span className="text-[#5C7A9A] text-xs">3 écoutants disponibles</span>
            </div>
          </div>
        </div>
      )}

      {/* Chat */}
      {phase === 'chat' && (
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-[#243B55] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ElephantMascot size={36} />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#5BAD72] rounded-full border-2 border-[#0D1B2E]" />
              </div>
              <div>
                <p className="text-[#F0EDE8] text-sm font-medium">Votre écoutant</p>
                <div className="flex items-center gap-1">
                  <Shield size={10} className="text-[#5C7A9A]" />
                  <span className="text-[#5C7A9A] text-xs">Session anonyme · efface dans 24 h</span>
                </div>
              </div>
            </div>
            <button
              onClick={endSession}
              className="text-[#5C7A9A] hover:text-[#E85555] text-xs border border-[#243B55] hover:border-[#E85555]/30 px-3 py-1.5 rounded-full transition-colors"
            >
              Terminer
            </button>
          </div>

          {/* Démo : honnêteté envers le visiteur */}
          <div className="flex items-start gap-2 px-4 py-2 bg-[#E87040]/8 border-b border-[#E87040]/20">
            <Info size={13} className="text-[#E87040] shrink-0 mt-0.5" />
            <p className="text-[#FAC5A8] text-xs leading-relaxed">
              <span className="font-medium">Démonstration</span> — les réponses sont automatiques pour vous montrer
              l'expérience. Bientôt, Sɛto vous connectera à de vrais écoutants formés.
            </p>
          </div>

          {/* Chat body */}
          <div className="flex-1 min-h-0">
            <ChatInterface />
          </div>
        </div>
      )}

      {/* Post-mood */}
      {phase === 'post-mood' && (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <MoodTracker phase="post" onSubmit={onPostMood} />
        </div>
      )}

      {/* Done */}
      {phase === 'done' && (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-sm">
            <ElephantMascot size={96} className="mx-auto mb-6" />
            <h2 className="text-[#F0EDE8] text-2xl font-bold mb-2">Merci d'avoir partagé.</h2>
            <p className="text-[#8BA3BC] text-sm leading-relaxed mb-6">
              Votre conversation sera supprimée dans 24 h. Prenez soin de vous.
            </p>
            {preMood !== null && postMood !== null && (
              <div className="bg-[#132236] border border-[#243B55] rounded-2xl px-6 py-4 mb-6">
                <p className="text-[#5C7A9A] text-xs mb-3">Votre humeur pendant cette session</p>
                <div className="flex justify-around">
                  <div className="text-center">
                    <p className="text-3xl mb-1">
                      {['😞', '😕', '😐', '🙂', '😊'][preMood - 1]}
                    </p>
                    <p className="text-[#8BA3BC] text-xs">Avant</p>
                  </div>
                  <div className="text-[#243B55] self-center text-xl">→</div>
                  <div className="text-center">
                    <p className="text-3xl mb-1">
                      {['😞', '😕', '😐', '🙂', '😊'][postMood - 1]}
                    </p>
                    <p className="text-[#8BA3BC] text-xs">Après</p>
                  </div>
                </div>
                {postMood > preMood && (
                  <p className="text-[#5BAD72] text-xs text-center mt-3">
                    +{postMood - preMood} point{postMood - preMood > 1 ? 's' : ''} — bonne évolution 🌱
                  </p>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <a
                href="/seto/tableau-de-bord"
                className="px-6 py-2.5 rounded-full bg-[#E87040] hover:bg-[#F09060] text-white text-sm font-medium transition-colors"
              >
                Voir mon tableau de bord
              </a>
              <a
                href="/seto/bien-etre"
                className="px-6 py-2.5 rounded-full border border-[#243B55] text-[#8BA3BC] hover:text-[#F0EDE8] text-sm transition-colors"
              >
                Outils de bien-être
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
