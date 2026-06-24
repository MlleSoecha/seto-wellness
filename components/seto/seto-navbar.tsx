'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart } from 'lucide-react'
import ElephantMascot from './elephant-mascot'

const links = [
  { href: '/seto', label: 'Accueil' },
  { href: '/seto/bien-etre', label: 'Bien-être' },
  { href: '/seto/ecoutant', label: 'Devenir écoutant' },
  { href: '/seto/entreprises', label: 'Entreprises' },
  { href: '/seto/confidentialite', label: 'Confidentialité' },
]

export default function SetoNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-[#243B55]" style={{ background: 'rgba(13,27,46,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/seto" className="flex items-center gap-2 group">
          <ElephantMascot size={36} />
          <div>
            <span className="font-bold text-xl text-[#F0EDE8] tracking-tight">Sɛto</span>
            <span className="block text-[10px] text-[#8BA3BC] leading-none -mt-0.5">L'écoute entre pairs</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                pathname === l.href
                  ? 'text-[#E87040] font-medium'
                  : 'text-[#8BA3BC] hover:text-[#F0EDE8]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/seto/chat"
          className="hidden md:flex items-center gap-1.5 bg-[#E87040] hover:bg-[#F09060] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
        >
          <Heart size={14} />
          Je veux parler
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#8BA3BC] hover:text-[#F0EDE8] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#243B55] bg-[#0D1B2E] px-4 pb-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm border-b border-[#243B55] ${
                pathname === l.href ? 'text-[#E87040]' : 'text-[#8BA3BC]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/seto/chat"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-1.5 bg-[#E87040] text-white text-sm font-medium px-4 py-3 rounded-full"
          >
            <Heart size={14} />
            Je veux parler
          </Link>
        </div>
      )}
    </nav>
  )
}
