import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { NetworkFooter } from '@/components/layout/network-footer'

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
        <main className="min-h-screen bg-background pb-20">
          {children}
        </main>
        <NetworkFooter />
        <Toaster />
      </body>
    </html>
  )
} 