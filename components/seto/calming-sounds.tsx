'use client'

import { useState, useRef, useCallback } from 'react'
import { Play, Square, Volume2, VolumeX } from 'lucide-react'

// Chaque son sait se lancer et s'arrêter proprement.
interface SoundPlayer {
  start: () => void
  stop: () => void
}

interface Sound {
  id: string
  name: string
  emoji: string
  desc: string
  create: (ctx: AudioContext, gain: GainNode) => SoundPlayer
}

// --- Pluie tropicale : bruit rose (doux, feutré) ---
function pinkNoise(ctx: AudioContext, gain: GainNode): SoundPlayer {
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  for (let i = 0; i < bufferSize; i++) {
    const w = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + w * 0.0555179
    b1 = 0.99332 * b1 + w * 0.0750759
    b2 = 0.96900 * b2 + w * 0.1538520
    b3 = 0.86650 * b3 + w * 0.3104856
    b4 = 0.55000 * b4 + w * 0.5329522
    b5 = -0.7616 * b5 - w * 0.0168980
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11
    b6 = w * 0.115926
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  source.connect(gain)
  return {
    start: () => source.start(),
    stop: () => { try { source.stop() } catch {} },
  }
}

// --- Rivière : bruit brun (flux grave et continu) ---
function brownNoise(ctx: AudioContext, gain: GainNode): SoundPlayer {
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < bufferSize; i++) {
    const w = Math.random() * 2 - 1
    last = (last + 0.02 * w) / 1.02
    data[i] = last * 3.5
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  source.connect(gain)
  return {
    start: () => source.start(),
    stop: () => { try { source.stop() } catch {} },
  }
}

// --- Carillons : de vraies cloches douces qui tintent par intermittence.
//     Notes d'une gamme pentatonique → toujours harmonieux, jamais de fausse note. ---
function chimes(ctx: AudioContext, gain: GainNode): SoundPlayer {
  const notes = [523.25, 587.33, 659.25, 783.99, 880.0] // Do Ré Mi Sol La (octave 5)
  let timer: ReturnType<typeof setTimeout> | null = null
  let stopped = false

  function ring() {
    if (stopped) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = notes[Math.floor(Math.random() * notes.length)]
    // Enveloppe « cloche » : attaque rapide puis longue extinction douce
    env.gain.setValueAtTime(0.0001, now)
    env.gain.exponentialRampToValueAtTime(0.7, now + 0.02)
    env.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)
    osc.connect(env)
    env.connect(gain)
    osc.start(now)
    osc.stop(now + 2.5)
    // Prochaine cloche dans 1,2 à 3,4 s
    timer = setTimeout(ring, 1200 + Math.random() * 2200)
  }

  return {
    start: () => { stopped = false; ring() },
    stop: () => { stopped = true; if (timer) clearTimeout(timer) },
  }
}

// --- Ondes alpha : battements binauraux (10 Hz) pour la détente ---
function binauralBeats(ctx: AudioContext, gain: GainNode): SoundPlayer {
  const oscL = ctx.createOscillator()
  const oscR = ctx.createOscillator()
  const merger = ctx.createChannelMerger(2)
  const gainL = ctx.createGain()
  const gainR = ctx.createGain()
  gainL.gain.value = 0.3
  gainR.gain.value = 0.3
  oscL.frequency.value = 200
  oscR.frequency.value = 210 // 10 Hz d'écart → onde alpha
  oscL.type = 'sine'
  oscR.type = 'sine'
  oscL.connect(gainL)
  oscR.connect(gainR)
  gainL.connect(merger, 0, 0)
  gainR.connect(merger, 0, 1)
  merger.connect(gain)
  return {
    start: () => { oscL.start(); oscR.start() },
    stop: () => { try { oscL.stop(); oscR.stop() } catch {} },
  }
}

const sounds: Sound[] = [
  { id: 'rain', name: 'Pluie tropicale', emoji: '🌧️', desc: 'Bruit rose apaisant', create: pinkNoise },
  { id: 'river', name: 'Rivière', emoji: '🌊', desc: 'Flux naturel et grave', create: brownNoise },
  { id: 'chimes', name: 'Carillons', emoji: '🎐', desc: 'Douces cloches en gamme apaisante', create: chimes },
  { id: 'binaural', name: 'Ondes alpha', emoji: '🧠', desc: 'Battements binauraux 10 Hz (au casque)', create: binauralBeats },
]

export default function CalmingSounds() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.4)
  const ctxRef = useRef<AudioContext | null>(null)
  const playerRef = useRef<SoundPlayer | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const stop = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.stop()
      playerRef.current = null
    }
    setPlaying(null)
  }, [])

  const play = useCallback((sound: Sound) => {
    stop()
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext()
    }
    const ctx = ctxRef.current
    // Les navigateurs démarrent l'audio en pause : on le réveille au clic.
    if (ctx.state === 'suspended') ctx.resume()

    const gain = ctx.createGain()
    gain.gain.value = volume
    gain.connect(ctx.destination)
    gainRef.current = gain

    const player = sound.create(ctx, gain)
    player.start()
    playerRef.current = player
    setPlaying(sound.id)
  }, [stop, volume])

  function toggle(sound: Sound) {
    if (playing === sound.id) {
      stop()
    } else {
      play(sound)
    }
  }

  function handleVolume(v: number) {
    setVolume(v)
    if (gainRef.current) gainRef.current.gain.value = v
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {sounds.map(s => (
          <button
            key={s.id}
            onClick={() => toggle(s)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-left ${
              playing === s.id
                ? 'border-[#E87040] bg-[#E87040]/10'
                : 'border-[#243B55] bg-[#132236] hover:border-[#E87040]/50 hover:bg-[#1A2D45]'
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-2xl">{s.emoji}</span>
              {playing === s.id
                ? <Square size={14} className="text-[#E87040]" />
                : <Play size={14} className="text-[#8BA3BC]" />
              }
            </div>
            <div className="w-full">
              <p className="text-[#F0EDE8] text-sm font-medium leading-tight">{s.name}</p>
              <p className="text-[#8BA3BC] text-xs mt-0.5">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Volume control */}
      <div className="flex items-center gap-3 pt-2">
        {volume === 0 ? <VolumeX size={16} className="text-[#8BA3BC]" /> : <Volume2 size={16} className="text-[#8BA3BC]" />}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => handleVolume(Number(e.target.value))}
          className="flex-1 accent-[#E87040] h-1"
          aria-label="Volume"
        />
        <span className="text-[#5C7A9A] text-xs w-8">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  )
}
