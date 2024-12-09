import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { NetworkFooter } from '@/components/layout/network-footer'
import { NetworkProvider } from '@/lib/context/network-context'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Flow Address Lookup',
  description: 'Utility tools for Flow blockchain addresses',
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
      <body className={inter.className}>
        <NetworkProvider>
          <main className="min-h-screen bg-background pb-20">
            {children}
          </main>
          <NetworkFooter />
          <Toaster />
        </NetworkProvider>
        <Analytics />
      </body>
    </html>
  )
} 