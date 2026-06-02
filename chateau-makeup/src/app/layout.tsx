import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/sections/Header'
import { BottomNav } from '@/sections/BottomNav'
import { CartProvider } from '@/components/CartProvider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Chateau Makeup - Beauty Without Limits',
  description: 'Your destination for luxury perfumes, makeup, and beauty products. Discover the best brands at unbeatable prices.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white">
        <CartProvider>
          <Header />
          <main className="pb-16 md:pb-0">{children}</main>
          <BottomNav />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
