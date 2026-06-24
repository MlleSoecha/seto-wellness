'use client'

import { useState, useRef, useCallback } from 'react'
import { Play, Square, Volume2, VolumeX } from 'lucide-react'

interface Sound {
  id: string
  name: string
  emoji: string
  desc: string
  generate: (ctx: AudioContext, gain: GainNode) => AudioNode
}

function createPinkNoise(ctx: AudioContext, gain: GainNode): AudioNode {
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
  return source
}

function createBrownNoise(ctx: AudioContext, gain: GainNode): AudioNode {
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
  return source
}

function createChimes(ctx: AudioContext, gain: GainNode): AudioNode {
  // Create a simple oscillator-based chime effect
  const osc = ctx.createOscillator()
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 432
  filter.Q.value = 0.8
  osc.type = 'sine'
  osc.frequency.value = 432
  osc.connect(filter)
  filter.connect(gain)
  return osc
}

function createBinauralBeats(ctx: AudioContext, gain: GainNode): AudioNode {
  const oscL = ctx.createOscillator()
  const oscR = ctx.createOscillator()
  const merger = ctx.createChannelMerger(2)
  const gainL = ctx.createGain()
  const gainR = ctx.createGain()
  gainL.gain.value = 0.3
  gainR.gain.value = 0.3
  oscL.frequency.value = 200
  oscR.frequency.value = 210 // 10 Hz alpha wave difference
  oscL.type = 'sine'
  oscR.type = 'sine'
  oscL.connect(gainL)
  oscR.connect(gainR)
  gainL.connect(merger, 0, 0)
  gainR.connect(merger, 0, 1)
  merger.connect(gain)
  return oscL
}

const sounds: Sound[] = [
  { id: 'rain', name: 'Pluie tropicale', emoji: '🌧️', desc: 'Bruit rose apaisant', generate: createPinkNoise },
  { id: 'river', name: 'Rivière', emoji: '🌊', desc: 'Bruit brun, flux naturel', generate: createBrownNoise },
  { id: 'chimes', name: 'Carillons', emoji: '🎐', desc: 'Tones doux à 432 Hz', generate: createChimes },
  { id: 'binaural', name: 'Ondes alpha', emoji: '🧠', desc: 'Battements binauraux 10 Hz', generate: createBinauralBeats },
]

export default function CalmingSounds() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.4)
  const ctxRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const stop = useCallback(() => {
    if (sourceRef.current) {
      try {
        (sourceRef.current as AudioBufferSourceNode).stop?.()
        ;(sourceRef.current as OscillatorNode).stop?.()
      } catch {}
      sourceRef.current = null
    }
    setPlaying(null)
  }, [])

  const play = useCallback((sound: Sound) => {
    stop()
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext()
    }
    const ctx = ctxRef.current
    const gain = ctx.createGain()
    gain.gain.value = volume
    gain.connect(ctx.destination)
    gainRef.current = gain

    const source = sound.generate(ctx, gain)
    ;(source as AudioBufferSourceNode).start?.()
    ;(source as OscillatorNode).start?.()
    sourceRef.current = source
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
        />
        <span className="text-[#5C7A9A] text-xs w-8">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  )
}
