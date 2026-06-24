'use client'

import type React from 'react'
import { Inter } from 'next/font/google'
import SetoNavbar from '@/components/seto/seto-navbar'

const inter = Inter({ subsets: ['latin'] })

export default function SetoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.className} min-h-screen`}
      style={{ background: '#0D1B2E', color: '#F0EDE8' }}
    >
      <SetoNavbar />
      <main>{children}</main>
      <footer className="border-t border-[#243B55] py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#8BA3BC] text-sm">
            Sɛto — L'écoute entre pairs, en toute anonymité.
          </p>
          <p className="text-[#5C7A9A] text-xs mt-2">
            "Sɛ" = écouter · "Eto" = oreilles, en Ewe. Toutes les conversations sont supprimées après 24 h.
          </p>
        </div>
      </footer>
    </div>
  )
}
