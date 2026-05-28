import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/providers/SessionProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'CampusIQ - College Discovery Platform',
  description: 'Find, compare, and shortlist the best colleges in India.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
