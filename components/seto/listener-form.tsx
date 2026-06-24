'use client'

import { useState } from 'react'
import { ExternalLink, CheckCircle, Clock, XCircle, BookOpen } from 'lucide-react'

type Step = 'form' | 'course' | 'certification' | 'review'

interface FormData {
  prenom: string
  entreprise: string
  role: string
  motivation: string
}

const statusOptions = [
  { value: 'pending', label: 'En attente de validation', icon: <Clock size={16} className="text-[#C4A842]" />, color: '#C4A842' },
  { value: 'approved', label: 'Écoutant certifié ✓', icon: <CheckCircle size={16} className="text-[#5BAD72]" />, color: '#5BAD72' },
  { value: 'rejected', label: 'Demande non retenue', icon: <XCircle size={16} className="text-[#E85555]" />, color: '#E85555' },
]

export default function ListenerForm() {
  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState<FormData>({ prenom: '', entreprise: '', role: '', motivation: '' })
  const [certCode, setCertCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const [status] = useState<'pending' | 'approved' | 'rejected'>('pending')

  // Simulate validation — in production this hits Supabase
  function validateCode() {
    if (certCode.trim().length < 8) {
      setCodeError('Le code doit comporter au moins 8 caractères.')
      return
    }
    setCodeError('')
    setStep('review')
  }

  function submitForm(e: React.FormEvent) {
    e.preventDefault()
    setStep('course')
  }

  const canSubmitForm = form.prenom && form.entreprise && form.role && form.motivation.length >= 50

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Stepper */}
      <div className="flex items-center mb-8">
        {(['form', 'course', 'certification', 'review'] as Step[]).map((s, i) => {
          const labels = ['Candidature', 'Formation', 'Certification', 'Statut']
          const isActive = s === step
          const isDone = ['form', 'course', 'certification', 'review'].indexOf(step) > i
          return (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isDone ? 'bg-[#5BAD72] text-white' : isActive ? 'bg-[#E87040] text-white' : 'bg-[#243B55] text-[#5C7A9A]'
                  }`}
                >
                  {isDone ? '✓' : i + 1}
                </div>
                <span className={`text-[10px] mt-1 ${isActive ? 'text-[#E87040]' : 'text-[#5C7A9A]'}`}>{labels[i]}</span>
              </div>
              {i < 3 && <div className={`flex-1 h-px mx-1 ${isDone ? 'bg-[#5BAD72]' : 'bg-[#243B55]'}`} />}
            </div>
          )
        })}
      </div>

      {/* Step: Form */}
      {step === 'form' && (
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label className="block text-[#8BA3BC] text-xs mb-1.5">Prénom</label>
            <input
              type="text"
              value={form.prenom}
              onChange={e => setForm({ ...form, prenom: e.target.value })}
              placeholder="Ex: Aminata"
              className="w-full bg-[#132236] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#8BA3BC] text-xs mb-1.5">Entreprise</label>
            <input
              type="text"
              value={form.entreprise}
              onChange={e => setForm({ ...form, entreprise: e.target.value })}
              placeholder="Nom de votre organisation"
              className="w-full bg-[#132236] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#8BA3BC] text-xs mb-1.5">Rôle / Poste</label>
            <input
              type="text"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              placeholder="Ex: Responsable RH"
              className="w-full bg-[#132236] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#8BA3BC] text-xs mb-1.5">
              Pourquoi souhaitez-vous devenir écoutant ? <span className="text-[#5C7A9A]">(50 car. min.)</span>
            </label>
            <textarea
              value={form.motivation}
              onChange={e => setForm({ ...form, motivation: e.target.value })}
              placeholder="Partagez votre motivation…"
              rows={4}
              className="w-full bg-[#132236] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors resize-none"
            />
            <p className="text-[#5C7A9A] text-xs mt-1 text-right">{form.motivation.length}/50+</p>
          </div>
          <button
            type="submit"
            disabled={!canSubmitForm}
            className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
              canSubmitForm ? 'bg-[#E87040] hover:bg-[#F09060] text-white' : 'bg-[#243B55] text-[#5C7A9A] cursor-not-allowed'
            }`}
          >
            Envoyer ma candidature
          </button>
        </form>
      )}

      {/* Step: Course */}
      {step === 'course' && (
        <div className="text-center space-y-5">
          <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-6">
            <BookOpen size={32} className="text-[#E87040] mx-auto mb-3" />
            <h3 className="text-[#F0EDE8] font-semibold mb-2">Formation requise</h3>
            <p className="text-[#8BA3BC] text-sm leading-relaxed mb-4">
              Complétez le cours <strong className="text-[#F0EDE8]">"Active Listening Skills"</strong> sur Coursera
              (gratuit, ~3 h). Une fois terminé, notez votre code de certification.
            </p>
            <a
              href="https://www.coursera.org/search?query=active+listening"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E87040] hover:bg-[#F09060] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              <ExternalLink size={14} />
              Accéder au cours Coursera
            </a>
          </div>
          <button
            onClick={() => setStep('certification')}
            className="text-[#8BA3BC] hover:text-[#F0EDE8] text-sm transition-colors"
          >
            J'ai terminé la formation →
          </button>
        </div>
      )}

      {/* Step: Certification */}
      {step === 'certification' && (
        <div className="space-y-4">
          <p className="text-[#8BA3BC] text-sm text-center">
            Entrez le code de certification fourni par Coursera à la fin du cours.
          </p>
          <div>
            <label className="block text-[#8BA3BC] text-xs mb-1.5">Code de certification</label>
            <input
              type="text"
              value={certCode}
              onChange={e => { setCertCode(e.target.value); setCodeError('') }}
              placeholder="Ex: COURSERA-AL-2024-XXXXX"
              className="w-full bg-[#132236] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors font-mono"
            />
            {codeError && <p className="text-[#E85555] text-xs mt-1">{codeError}</p>}
          </div>
          <button
            onClick={validateCode}
            className="w-full py-3 rounded-xl bg-[#E87040] hover:bg-[#F09060] text-white font-medium text-sm transition-colors"
          >
            Valider mon code
          </button>
        </div>
      )}

      {/* Step: Review */}
      {step === 'review' && (
        <div className="space-y-5">
          <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-6 text-center">
            {statusOptions.find(o => o.value === status)?.icon}
            <p className="text-[#F0EDE8] font-medium mt-2">
              {statusOptions.find(o => o.value === status)?.label}
            </p>
            {status === 'pending' && (
              <p className="text-[#8BA3BC] text-sm mt-2 leading-relaxed">
                Votre dossier est en cours d'examen par l'équipe Sɛto. Vous recevrez une réponse sous 5 jours ouvrés.
              </p>
            )}
          </div>

          {/* Status tracker */}
          <div className="space-y-2">
            {[
              { label: 'Candidature reçue', done: true },
              { label: 'Formation validée', done: true },
              { label: 'Code vérifié', done: true },
              { label: 'Dossier examiné', done: status !== 'pending' },
              { label: 'Accès écoutant activé', done: status === 'approved' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  item.done ? 'bg-[#5BAD72]' : 'bg-[#243B55]'
                }`}>
                  {item.done && (
                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                      <path d="M1 3.5L3 5.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${item.done ? 'text-[#F0EDE8]' : 'text-[#5C7A9A]'}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
