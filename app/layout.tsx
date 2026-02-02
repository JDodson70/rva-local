import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'RVA Local - Discover Richmond, VA',
  description:
    'Discover the best events, places, and community happenings in Richmond, VA. Your guide to local art walks, markets, cafes, and more.',
  keywords: [
    'Richmond VA',
    'RVA',
    'local events',
    'Richmond restaurants',
    'Richmond bars',
    'Richmond art',
    'things to do Richmond',
  ],
  openGraph: {
    title: 'RVA Local - Discover Richmond, VA',
    description:
      'Discover the best events, places, and community happenings in Richmond, VA.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <Navigation />
      </body>
    </html>
  )
}
