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