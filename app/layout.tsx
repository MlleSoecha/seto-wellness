import type React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// URL du site une fois en ligne (mise à jour automatiquement par Vercel,
// ou remplace par ton domaine, ex. https://seto-wellness.vercel.app)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://seto-wellness.vercel.app'

const description =
  'Sɛto offre un espace sûr pour être entendu : parlez librement et anonymement avec des écoutants bienveillants et formés, à votre rythme, quand vous en avez besoin. « Sɛ » = écouter, « Eto » = oreilles, en Ewe.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sɛto — Un espace sûr pour être entendu',
    template: '%s · Sɛto',
  },
  description,
  keywords: [
    'écoute anonyme', 'santé mentale', 'bien-être au travail', 'soutien entre pairs',
    'Togo', 'Afrique de l\'Ouest', 'écoute active', 'confidentialité',
  ],
  openGraph: {
    title: 'Sɛto — Un espace sûr pour être entendu',
    description,
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Sɛto',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sɛto — Un espace sûr pour être entendu',
    description,
  },
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#0D1B2E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
