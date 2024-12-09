import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/layout/footer'
import { NetworkProvider } from '@/lib/context/network-context'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'DropSight 🎯',
  description: 'Look up cross-VM account associations on Flow blockchain.',
  keywords: ['Flow', 'blockchain', 'Cadence', 'EVM', 'address lookup', 'cross-VM'],
  authors: [{ name: 'Gio', url: 'https://x.com/gio_incognito' }],
  openGraph: {
    type: 'website',
    title: 'DropSight 🎯',
    description: 'Look up cross-VM account associations on Flow blockchain.',
    siteName: 'DropSight',
    images: [{
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: 'DropSight - Flow Address Lookup Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DropSight 🎯',
    description: 'Look up cross-VM account associations on Flow blockchain.',
    creator: '@gio_incognito',
    images: ['/og.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, jetbrainsMono.variable)}>
        <NetworkProvider>
          <main className="min-h-screen bg-background pb-[140px]">
            {children}
          </main>
          <Footer />
          <Toaster />
        </NetworkProvider>
        <Analytics />
      </body>
    </html>
  )
} 