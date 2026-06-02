import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import { categories } from '@/lib/data'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { count } = useCart()
  const location = useLocation()

  return (
    <>
      <div className="bg-stone-900 text-white text-center py-2 px-4 text-xs md:text-sm">
        <span>Livraison GRATUITE des 5000 DZD d&apos;achat | Retours gratuits sous 30 jours</span>
      </div>
      <header className="sticky top-0 z-50 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3 md:py-4">
            <button className="md:hidden p-2 -ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link to="/" className="flex flex-col items-center">
              <h1 className="text-2xl md:text-3xl font-bold tracking-[0.25em] uppercase text-stone-900">Chateau</h1>
              <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] uppercase text-stone-500 -mt-1">Makeup</span>
            </Link>
            <div className="flex items-center gap-1 md:gap-2">
              <button className="p-2 hover:bg-stone-100 rounded-full transition-colors" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
                <Search size={20} />
              </button>
              <button className="hidden md:flex p-2 hover:bg-stone-100 rounded-full transition-colors" aria-label="Favorites">
                <Heart size={20} />
              </button>
              <Link to="/cart" className="relative p-2 hover:bg-stone-100 rounded-full transition-colors">
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>
                )}
              </Link>
            </div>
          </div>
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 px-4 pb-3 overflow-x-auto">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`}
                className={`text-xs lg:text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-colors hover:text-stone-600 ${
                  location.pathname === `/category/${cat.slug}` ? 'text-stone-900 border-b-2 border-stone-900 pb-0.5' : 'text-stone-600'
                }`}>
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-stone-200 shadow-lg px-4 py-4 z-50">
            <div className="max-w-2xl mx-auto relative">
              <input type="text" placeholder="Rechercher un produit, une marque..."
                className="w-full h-12 pl-12 pr-4 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500 text-sm"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600" onClick={() => { setSearchOpen(false); setSearchQuery('') }}>
                <X size={18} />
              </button>
            </div>
          </div>
        )}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-200 shadow-lg z-50 max-h-[70vh] overflow-y-auto">
            <div className="p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Link key={cat.id} to={`/category/${cat.slug}`}
                    className="flex items-center py-3 px-3 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}>{cat.name}</Link>
                ))}
              </div>
              <div className="border-t border-stone-100 mt-4 pt-4 space-y-1">
                <Link to="/cart" className="flex items-center py-3 px-3 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                  <ShoppingBag size={18} className="mr-3" /> Mon Panier</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
