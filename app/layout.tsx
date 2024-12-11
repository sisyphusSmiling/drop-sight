import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/layout/footer'
import { NetworkProvider } from '@/lib/context/network-context'
import { Analytics } from '@/components/layout/analytics'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { ThemeProvider } from '@/lib/context/theme-context'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'DropSight 🎯 | Flow Blockchain Address Lookup Tool',
  description: 'Easily lookup and verify cross-VM accounts across Cadence & EVM on Flow blockchain with this free tool.',
  keywords: [
    'Flow blockchain',
    'Cadence address',
    'EVM address',
    'Flow address lookup',
    'cross-VM lookup',
    'blockchain tools',
    'Flow network',
    'Web3 tools',
    'blockchain explorer',
    'address converter'
  ],
  authors: [{ name: 'Giovanni Sanchez', url: 'https://x.com/gio_incognito' }],
  creator: 'Giovanni Sanchez',
  publisher: 'DropSight',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: 'DropSight 🎯 | Flow Blockchain Address Lookup Tool',
    description: 'Easily lookup and verify cross-VM accounts across Cadence & EVM on Flow blockchain with this free tool.',
    siteName: 'DropSight',
    locale: 'en_US',
    images: [{
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: 'DropSight - Flow Address Lookup Tool',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DropSight 🎯 | Flow Blockchain Address Lookup Tool',
    description: 'Easily lookup and verify cross-VM accounts across Cadence & EVM on Flow blockchain with this free tool.',
    creator: '@gio_incognito',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://dropsight.xyz',
  },
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        url: '/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
      }
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  manifest: '/site.webmanifest',
  other: {
    'theme-color': '#09090B',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme')
                if (theme === 'system' || !theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                }
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "DropSight",
              "description": "Look up cross-VM account associations on Flow blockchain",
              "url": "https://dropsight.xyz",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "featureList": [
                "Cross-VM account lookup",
                "Flow blockchain integration",
                "Mainnet and testnet support",
                "Bulk address lookup",
                "CSV export functionality"
              ],
              "screenshot": {
                "@type": "ImageObject",
                "url": "https://dropsight.xyz/og.png"
              }
            })
          }}
        />
      </head>
      <body className={cn(inter.className, jetbrainsMono.variable)}>
        <ThemeProvider>
          <NetworkProvider>
            <main className="min-h-screen bg-background pb-[140px]">
              {children}
            </main>
            <Footer />
            <Toaster />
          </NetworkProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
} 