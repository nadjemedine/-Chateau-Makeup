'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid3X3, ShoppingBag, Heart, User } from 'lucide-react'
import { useCart } from '@/components/CartProvider'

const navItems = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/category/parfums', label: 'Categories', icon: Grid3X3 },
  { href: '/cart', label: 'Panier', icon: ShoppingBag },
  { href: '/category/parfums', label: 'Favoris', icon: Heart },
  { href: '/admin', label: 'Compte', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  const { count } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition-colors ${
                isActive ? 'text-stone-900' : 'text-stone-400'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {item.label === 'Panier' && count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-stone-900 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[9px] mt-0.5 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
