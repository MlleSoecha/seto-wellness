'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, MoreVertical } from 'lucide-react'
import { detectCrisis } from './crisis-overlay'
import CrisisOverlay from './crisis-overlay'

interface Message {
  id: string
  text: string
  sender: 'user' | 'listener'
  time: Date
}

const listenerResponses = [
  "Je vous entends. Prenez votre temps.",
  "Merci de partager cela avec moi. C'est courageux.",
  "Je comprends. Comment est-ce que vous vous sentez en ce moment ?",
  "Vous n'êtes pas seul(e). Je suis là.",
  "Qu'est-ce qui vous a amené à chercher quelqu'un à qui parler aujourd'hui ?",
  "Ce que vous décrivez semble vraiment difficile. Pouvez-vous m'en dire plus ?",
  "Il est tout à fait normal de ressentir cela. Vos émotions sont valides.",
  "Comment puis-je vous soutenir dans ce moment ?",
]

let responseIndex = 0

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: "Bonjour. Je m'appelle Éto — votre écoutant du jour. Je suis là pour vous, sans jugement. Comment allez-vous ?",
      sender: 'listener',
      time: new Date(),
    },
  ])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const [crisisVisible, setCrisisVisible] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage() {
    const text = draft.trim()
    if (!text) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      time: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setDraft('')

    if (detectCrisis(text)) {
      setCrisisVisible(true)
    }

    // Simulate listener typing then responding
    setTyping(true)
    const delay = 1200 + Math.random() * 1400
    setTimeout(() => {
      setTyping(false)
      const response = listenerResponses[responseIndex % listenerResponses.length]
      responseIndex++
      const listenerMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'listener',
        time: new Date(),
      }
      setMessages(prev => [...prev, listenerMsg])
    }, delay)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar" style={{ overscrollBehavior: 'contain' }}>
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#E87040] text-white rounded-br-sm'
                  : 'bg-[#1A2D45] text-[#F0EDE8] rounded-bl-sm'
              }`}
            >
              <p>{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.sender === 'user' ? 'text-orange-200' : 'text-[#5C7A9A]'}`}>
                {m.time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-[#1A2D45] px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#8BA3BC] animate-bounce"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#243B55] px-4 py-3 flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Écrivez ici… (Entrée pour envoyer)"
          rows={1}
          className="flex-1 bg-[#1A2D45] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] resize-none outline-none focus:border-[#E87040] transition-colors"
          style={{ maxHeight: '120px', overflowY: 'auto' }}
          onInput={e => {
            const t = e.currentTarget
            t.style.height = 'auto'
            t.style.height = Math.min(t.scrollHeight, 120) + 'px'
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!draft.trim()}
          className={`p-2.5 rounded-xl transition-colors ${
            draft.trim() ? 'bg-[#E87040] hover:bg-[#F09060] text-white' : 'bg-[#243B55] text-[#5C7A9A]'
          }`}
        >
          <Send size={17} />
        </button>
      </div>

      {/* Crisis overlay */}
      {crisisVisible && <CrisisOverlay onClose={() => setCrisisVisible(false)} />}
    </div>
  )
}
