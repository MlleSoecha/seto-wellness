'use client'

import { useState } from 'react'
import { BarChart2, Users, TrendingUp, Shield, Send, CheckCircle } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

const weeklyData = [
  { week: 'S1', sessions: 12, score: 3.1 },
  { week: 'S2', sessions: 18, score: 3.3 },
  { week: 'S3', sessions: 15, score: 3.4 },
  { week: 'S4', sessions: 22, score: 3.6 },
  { week: 'S5', sessions: 28, score: 3.7 },
  { week: 'S6', sessions: 24, score: 3.8 },
]

const deptData = [
  { dept: 'Tech', pct: 72 },
  { dept: 'RH', pct: 58 },
  { dept: 'Finance', pct: 45 },
  { dept: 'Ops', pct: 63 },
  { dept: 'Comm.', pct: 51 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1A2D45] border border-[#243B55] rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="text-[#8BA3BC] mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

const stats = [
  { value: '87%', label: "des utilisateurs rapportent une amélioration après une session", color: '#5BAD72', Icon: TrendingUp },
  { value: '3,6/5', label: "score de bien-être moyen — en hausse de +0,7 sur 6 semaines", color: '#E87040', Icon: BarChart2 },
  { value: '0', label: "donnée individuelle accessible par l'employeur", color: '#3B9ED8', Icon: Shield },
]

export default function EntreprisesPage() {
  const [form, setForm] = useState({ nom: '', entreprise: '', email: '', taille: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[#8BA3BC] text-xs uppercase tracking-widest mb-2">Pour les décideurs RH</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-4">
          Déployez Sɛto dans votre organisation
        </h1>
        <p className="text-[#8BA3BC] leading-relaxed max-w-xl mx-auto">
          Un programme de soutien par les pairs, conçu pour les réalités africaines du travail.
          Mesurable. Confidentiel. Culturellement enraciné.
        </p>
      </div>

      {/* Key stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#132236] border border-[#243B55] rounded-2xl p-5 text-center">
            <div className="flex justify-center mb-2"><s.Icon size={18} style={{ color: s.color }} /></div>
            <p className="text-3xl font-bold text-[#F0EDE8] mb-1">{s.value}</p>
            <p className="text-[#8BA3BC] text-xs leading-relaxed">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Dashboard preview */}
      <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#F0EDE8] font-semibold">Tableau de bord RH agrégé</h2>
            <p className="text-[#5C7A9A] text-xs mt-0.5">Données anonymisées — aucune identification individuelle</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#5BAD72]/10 border border-[#5BAD72]/20 rounded-full px-3 py-1">
            <Shield size={11} className="text-[#5BAD72]" />
            <span className="text-[#5BAD72] text-xs">Anonymisé</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Session volume */}
          <div>
            <p className="text-[#8BA3BC] text-xs mb-3 flex items-center gap-1.5">
              <Users size={12} />
              Nombre de sessions par semaine
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="week" tick={{ fill: '#5C7A9A', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5C7A9A', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sessions" name="Sessions" fill="#E87040" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Wellness score trend */}
          <div>
            <p className="text-[#8BA3BC] text-xs mb-3 flex items-center gap-1.5">
              <TrendingUp size={12} />
              Score de bien-être moyen (1–5)
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B9ED8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B9ED8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fill: '#5C7A9A', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[1, 5]} tick={{ fill: '#5C7A9A', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="score" name="Score" stroke="#3B9ED8" strokeWidth={2} fill="url(#scoreGrad)" dot={{ r: 3, fill: '#3B9ED8', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dept breakdown */}
        <div className="mt-6">
          <p className="text-[#8BA3BC] text-xs mb-3">% d'utilisation par département (anonymisé)</p>
          <div className="space-y-2">
            {deptData.map(d => (
              <div key={d.dept} className="flex items-center gap-3">
                <span className="text-[#8BA3BC] text-xs w-12">{d.dept}</span>
                <div className="flex-1 bg-[#243B55] rounded-full h-2">
                  <div
                    className="bg-[#E87040] h-2 rounded-full transition-all"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="text-[#8BA3BC] text-xs w-8 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {[
          { title: 'Aucune configuration technique', desc: "Déploiement par lien d'invitation — pas d'intégration IT requise." },
          { title: 'Tarif selon la taille', desc: 'Formules adaptées aux PME comme aux grandes entreprises.' },
          { title: 'Formation des écoutants incluse', desc: 'Nous accompagnons vos volontaires jusqu\'à la certification.' },
          { title: 'Rapport mensuel anonymisé', desc: 'Tendances de bien-être, taux d\'utilisation — sans donnée individuelle.' },
        ].map((b, i) => (
          <div key={i} className="bg-[#132236] border border-[#243B55] rounded-2xl p-4">
            <p className="text-[#F0EDE8] text-sm font-medium mb-1">{b.title}</p>
            <p className="text-[#8BA3BC] text-xs leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="bg-[#132236] border border-[#243B55] rounded-2xl p-6">
        <h2 className="text-[#F0EDE8] font-semibold text-center mb-2">Déployer Sɛto</h2>
        <p className="text-[#8BA3BC] text-sm text-center mb-6">Nous vous répondons sous 48 h ouvrées.</p>

        {sent ? (
          <div className="text-center py-6">
            <CheckCircle size={32} className="text-[#5BAD72] mx-auto mb-3" />
            <p className="text-[#F0EDE8] font-medium">Demande reçue !</p>
            <p className="text-[#8BA3BC] text-sm mt-1">L'équipe Sɛto vous contactera bientôt.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8BA3BC] text-xs mb-1.5">Votre prénom</label>
                <input
                  type="text"
                  required
                  value={form.nom}
                  onChange={e => setForm({ ...form, nom: e.target.value })}
                  className="w-full bg-[#0D1B2E] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors"
                  placeholder="Ex: Fatou"
                />
              </div>
              <div>
                <label className="block text-[#8BA3BC] text-xs mb-1.5">Entreprise</label>
                <input
                  type="text"
                  required
                  value={form.entreprise}
                  onChange={e => setForm({ ...form, entreprise: e.target.value })}
                  className="w-full bg-[#0D1B2E] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors"
                  placeholder="Nom de votre organisation"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8BA3BC] text-xs mb-1.5">Email professionnel</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#0D1B2E] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors"
                  placeholder="vous@entreprise.com"
                />
              </div>
              <div>
                <label className="block text-[#8BA3BC] text-xs mb-1.5">Taille de l'équipe</label>
                <select
                  required
                  value={form.taille}
                  onChange={e => setForm({ ...form, taille: e.target.value })}
                  className="w-full bg-[#0D1B2E] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] outline-none focus:border-[#E87040] transition-colors appearance-none"
                >
                  <option value="" disabled>Sélectionnez</option>
                  <option value="10-50">10 à 50 personnes</option>
                  <option value="50-200">50 à 200 personnes</option>
                  <option value="200-1000">200 à 1 000 personnes</option>
                  <option value="1000+">Plus de 1 000 personnes</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[#8BA3BC] text-xs mb-1.5">Message (optionnel)</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={3}
                placeholder="Décrivez votre contexte ou vos questions…"
                className="w-full bg-[#0D1B2E] border border-[#243B55] rounded-xl px-4 py-2.5 text-sm text-[#F0EDE8] placeholder:text-[#5C7A9A] outline-none focus:border-[#E87040] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#E87040] hover:bg-[#F09060] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Send size={15} />
              Envoyer ma demande
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
