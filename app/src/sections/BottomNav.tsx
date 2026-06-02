import { Link, useLocation } from 'react-router-dom'
import { Home, Grid3X3, Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import { useFavorites } from '@/components/FavoritesProvider'

const navItems = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/categories', label: 'Categories', icon: Grid3X3 },
  { href: '/favorites', label: 'Favoris', icon: Heart },
  { href: '/cart', label: 'Panier', icon: ShoppingBag },
]

export function BottomNav() {
  const location = useLocation()
  const { count } = useCart()
  const { count: favCount } = useFavorites()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link key={item.label} to={item.href} className={`flex flex-col items-center py-1.5 px-3 rounded-lg transition-colors ${isActive ? 'text-stone-900' : 'text-stone-400'}`}>
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {item.label === 'Panier' && count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-stone-900 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">{count}</span>
                )}
                {item.label === 'Favoris' && favCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-stone-900 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">{favCount}</span>
                )}
              </div>
              <span className="text-[9px] mt-0.5 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
