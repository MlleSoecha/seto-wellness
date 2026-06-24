import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sɛto — L\'écoute anonyme entre pairs',
  description:
    'Sɛto connecte anonymement des employés à des écoutants formés au sein de leur entreprise. "Sɛ" = écouter, "Eto" = oreilles, en Ewe.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
