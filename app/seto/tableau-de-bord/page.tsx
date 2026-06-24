'use client'

import { useEffect, useState } from 'react'
import MoodChart from '@/components/seto/mood-chart'
import { TrendingUp, TrendingDown, Minus, Heart, Calendar } from 'lucide-react'

interface MoodEntry {
  date: string
  score: number
  phase: 'pre' | 'post'
}

const moodEmojis = ['', '😞', '😕', '😐', '🙂', '😊']
const moodLabels = ['', 'Très difficile', 'Difficile', 'Neutre', 'Bien', 'Très bien']

// Demo data for first visit
const demoData: MoodEntry[] = [
  { date: '2026-06-10', score: 2, phase: 'pre' },
  { date: '2026-06-10', score: 3, phase: 'post' },
  { date: '2026-06-12', score: 2, phase: 'pre' },
  { date: '2026-06-12', score: 3, phase: 'post' },
  { date: '2026-06-15', score: 3, phase: 'pre' },
  { date: '2026-06-15', score: 4, phase: 'post' },
  { date: '2026-06-17', score: 3, phase: 'pre' },
  { date: '2026-06-17', score: 4, phase: 'post' },
  { date: '2026-06-19', score: 4, phase: 'pre' },
  { date: '2026-06-19', score: 4, phase: 'post' },
  { date: '2026-06-21', score: 4, phase: 'pre' },
  { date: '2026-06-21', score: 5, phase: 'post' },
  { date: '2026-06-24', score: 3, phase: 'pre' },
  { date: '2026-06-24', score: 4, phase: 'post' },
]

export default function TableauDeBordPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('seto_mood_entries')
    if (saved) {
      const parsed = JSON.parse(saved) as MoodEntry[]
      setEntries(parsed.length > 0 ? parsed : demoData)
    } else {
      setEntries(demoData)
    }
    setLoaded(true)
  }, [])

  const preScores = entries.filter(e => e.phase === 'pre').map(e => e.score)
  const postScores = entries.filter(e => e.phase === 'post').map(e => e.score)
  const avgPre = preScores.length ? preScores.reduce((a, b) => a + b, 0) / preScores.length : 0
  const avgPost = postScores.length ? postScores.reduce((a, b) => a + b, 0) / postScores.length : 0
  const avgDiff = avgPost - avgPre
  const sessions = Math.max(preScores.length, postScores.length)
  const lastPost = postScores[postScores.length - 1]

  const trend = avgDiff > 0.3 ? 'up' : avgDiff < -0.3 ? 'down' : 'stable'

  return (
    <div className="max-w-2xl mx-auto px-4 py-12" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[#8BA3BC] text-xs uppercase tracking-widest mb-2">Tableau de bord personnel</p>
        <h1 className="text-3xl font-bold text-[#F0EDE8] mb-2">Votre bien-être</h1>
        <p className="text-[#8BA3BC] text-sm">Ces données sont stockées uniquement sur votre appareil.</p>
      </div>

      {loaded && (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-1">
                <Calendar size={16} className="text-[#8BA3BC]" />
              </div>
              <p className="text-2xl font-bold text-[#F0EDE8]">{sessions}</p>
              <p className="text-[#8BA3BC] text-xs mt-0.5">Session{sessions !== 1 ? 's' : ''}</p>
            </div>

            <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-1">
                {trend === 'up' ? <TrendingUp size={16} className="text-[#5BAD72]" />
                  : trend === 'down' ? <TrendingDown size={16} className="text-[#E85555]" />
                  : <Minus size={16} className="text-[#8BA3BC]" />}
              </div>
              <p className={`text-2xl font-bold ${trend === 'up' ? 'text-[#5BAD72]' : trend === 'down' ? 'text-[#E85555]' : 'text-[#F0EDE8]'}`}>
                {avgDiff > 0 ? '+' : ''}{avgDiff.toFixed(1)}
              </p>
              <p className="text-[#8BA3BC] text-xs mt-0.5">Évolution moy.</p>
            </div>

            <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-1">
                <Heart size={16} className="text-[#E87040]" />
              </div>
              <p className="text-2xl font-bold text-[#F0EDE8]">
                {lastPost ? moodEmojis[lastPost] : '—'}
              </p>
              <p className="text-[#8BA3BC] text-xs mt-0.5">Dernier ressenti</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#F0EDE8] font-medium text-sm">Tendance sur 14 jours</h2>
              <div className="flex items-center gap-4 text-xs text-[#8BA3BC]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8BA3BC]" />
                  Avant
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E87040]" />
                  Après
                </span>
              </div>
            </div>
            <MoodChart data={entries} />
            <div className="flex justify-between mt-2 text-[10px] text-[#5C7A9A]">
              <span>1 = Très difficile</span>
              <span>5 = Très bien</span>
            </div>
          </div>

          {/* Session history */}
          <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-5 mb-6">
            <h2 className="text-[#F0EDE8] font-medium text-sm mb-4">Historique récent</h2>
            <div className="space-y-2">
              {Object.entries(
                entries.reduce<Record<string, { pre?: number; post?: number }>>((acc, e) => {
                  if (!acc[e.date]) acc[e.date] = {}
                  acc[e.date][e.phase] = e.score
                  return acc
                }, {})
              )
                .sort(([a], [b]) => b.localeCompare(a))
                .slice(0, 7)
                .map(([date, { pre, post }]) => (
                  <div key={date} className="flex items-center justify-between py-2 border-b border-[#243B55] last:border-0">
                    <span className="text-[#8BA3BC] text-xs">
                      {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                    <div className="flex items-center gap-3 text-sm">
                      {pre && (
                        <span title={`Avant: ${moodLabels[pre]}`}>{moodEmojis[pre]}</span>
                      )}
                      {pre && post && <span className="text-[#5C7A9A] text-xs">→</span>}
                      {post && (
                        <span title={`Après: ${moodLabels[post]}`}>{moodEmojis[post]}</span>
                      )}
                      {pre && post && (
                        <span className={`text-xs font-medium ${post > pre ? 'text-[#5BAD72]' : post < pre ? 'text-[#E85555]' : 'text-[#8BA3BC]'}`}>
                          {post > pre ? `+${post - pre}` : post < pre ? `${post - pre}` : '='}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Insight */}
          {trend === 'up' && (
            <div className="bg-[#5BAD72]/10 border border-[#5BAD72]/20 rounded-2xl px-5 py-4 text-center">
              <p className="text-[#5BAD72] text-sm font-medium">🌱 Votre bien-être progresse après les sessions.</p>
              <p className="text-[#8BA3BC] text-xs mt-1">Continuez — chaque conversation compte.</p>
            </div>
          )}
          {trend === 'down' && (
            <div className="bg-[#E87040]/10 border border-[#E87040]/20 rounded-2xl px-5 py-4 text-center">
              <p className="text-[#FAC5A8] text-sm font-medium">💛 Vous traversez une période difficile.</p>
              <p className="text-[#8BA3BC] text-xs mt-1">N'hésitez pas à parler à quelqu'un — vous le méritez.</p>
            </div>
          )}

          <div className="mt-4 text-center">
            <a
              href="/seto/chat"
              className="inline-flex items-center gap-1.5 text-[#E87040] hover:text-[#F09060] text-sm font-medium transition-colors"
            >
              <Heart size={14} />
              Démarrer une nouvelle session
            </a>
          </div>
        </>
      )}
    </div>
  )
}
