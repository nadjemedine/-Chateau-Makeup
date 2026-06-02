import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import type { Product } from '@/lib/supabase'
import { addToCart } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { useFavorites } from '@/components/FavoritesProvider'

export function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast()
  const { toggle, isFav } = useFavorites()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ product, size: product.sizes[0], quantity: 1 })
    toast({ title: 'Ajoute au panier', description: `${product.name} a ete ajoute` })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const added = toggle(product.id)
    toast({
      title: added ? 'Ajoute aux favoris' : 'Retire des favoris',
      description: `${product.name} ${added ? 'a ete ajoute a' : 'a ete retire de'} vos favoris`,
    })
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative bg-stone-50 rounded-lg overflow-hidden aspect-[3/4]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            product.badge === 'HIT' ? 'bg-stone-900 text-white' : product.badge === 'NEW' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {product.badge}
          </span>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleToggleFavorite} className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-stone-100" aria-label="Favoris">
            <Heart size={14} className={isFav(product.id) ? 'fill-stone-900 text-stone-900' : ''} />
          </button>
          <button onClick={handleAddToCart} className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-stone-100" aria-label="Panier">
            <ShoppingBag size={14} />
          </button>
        </div>
        {product.original_price > product.price && (
          <div className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] px-1.5 py-0.5 font-bold">
            -{Math.round((1 - product.price / product.original_price) * 100)}%
          </div>
        )}
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="text-xs md:text-sm font-medium text-stone-900 line-clamp-1">{product.name}</h3>
        <p className="text-[11px] md:text-xs text-stone-500">{product.brand}</p>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300'} />
            ))}
          </div>
          <span className="text-[10px] text-stone-400">({product.review_count})</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-bold text-stone-900">{product.price.toFixed(2)} DZD</span>
          {product.original_price > product.price && <span className="text-xs text-stone-400 line-through">{product.original_price.toFixed(2)} DZD</span>}
        </div>
      </div>
    </Link>
  )
}
