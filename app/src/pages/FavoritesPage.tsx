import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { Footer } from '@/sections/Footer'
import { useFavorites } from '@/components/FavoritesProvider'

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites()
  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id))

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center gap-3 mb-2">
          <Heart size={22} className="text-stone-900 fill-stone-900" />
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900">Mes Favoris</h1>
        </div>
        <p className="text-sm text-stone-500 mb-8">
          {favoriteProducts.length > 0
            ? `${favoriteProducts.length} produit${favoriteProducts.length > 1 ? 's' : ''} sauvegarde${favoriteProducts.length > 1 ? 's' : ''}`
            : 'Aucun favori pour le moment'}
        </p>
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-stone-200 mb-4" />
            <p className="text-stone-500 mb-6">Explorez nos produits et ajoutez vos coups de coeur ici.</p>
            <Link
              to="/"
              className="inline-block px-6 py-2.5 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
            >
              Decouvrir les produits
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
