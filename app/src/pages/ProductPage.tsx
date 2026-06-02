import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star, Truck, Handshake, Shield } from 'lucide-react'
import { getProductById, getRelatedProducts, getReviewsByProduct } from '@/lib/data'
import { addToCart } from '@/lib/supabase'
import { ProductCard } from '@/components/ProductCard'
import { useToast } from '@/hooks/use-toast'
import { useFavorites } from '@/components/FavoritesProvider'
import { Footer } from '@/sections/Footer'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = getProductById(id || '')
  const related = getRelatedProducts(id || '')
  const reviews = getReviewsByProduct(id || '')
  const { toast } = useToast()
  const { toggle, isFav } = useFavorites()
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '')
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Produit non trouve</h1>
          <Link to="/" className="text-sm underline">Retour a l&apos;accueil</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ product, size: selectedSize, quantity: 1 })
    toast({ title: 'Ajoute au panier', description: `${product.name} - ${selectedSize}` })
  }

  const handleBuyNow = () => {
    addToCart({ product, size: selectedSize, quantity: 1 })
    window.location.href = '/checkout'
  }

  const handleToggleFavorite = () => {
    const added = toggle(product.id)
    toast({
      title: added ? 'Ajoute aux favoris' : 'Retire des favoris',
      description: `${product.name} ${added ? 'a ete ajoute a' : 'a ete retire de'} vos favoris`,
    })
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-4 md:mb-6">
          <Link to="/" className="hover:text-stone-900">Accueil</Link><span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-stone-900 capitalize">{product.category}</Link><span>/</span>
          <span className="text-stone-900">{product.name}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div>
            <div className="relative bg-stone-50 rounded-lg overflow-hidden aspect-square mb-3">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && <span className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase ${product.badge === 'HIT' ? 'bg-stone-900 text-white' : 'bg-red-600 text-white'}`}>{product.badge}</span>}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-stone-900' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-stone-900">{product.name}</h1>
            <p className="text-sm text-stone-500 mt-1">{product.brand}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300'} />)}
              </div>
              <span className="text-sm text-stone-500">{product.rating} ({product.review_count} avis)</span>
            </div>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl md:text-3xl font-bold text-stone-900">{product.price.toFixed(2)} DZD</span>
              {product.original_price > product.price && <><span className="text-lg text-stone-400 line-through">{product.original_price.toFixed(2)} DZD</span><span className="text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium">-{Math.round((1 - product.price / product.original_price) * 100)}%</span></>}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-emerald-700 font-medium">En stock</span>
              <span className="text-xs text-stone-400">- Livraison gratuite des 5000 DZD</span>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Taille: {selectedSize}</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border text-sm rounded transition-colors ${selectedSize === size ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 hover:border-stone-400'}`}>{size}</button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={handleAddToCart} className="flex-1 h-12 bg-stone-900 text-white font-semibold text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"><ShoppingBag size={18} />Ajouter au panier</button>
              <button onClick={handleToggleFavorite} className={`w-12 h-12 border rounded flex items-center justify-center transition-colors ${isFav(product.id) ? 'border-stone-900 bg-stone-900 text-white hover:bg-stone-800' : 'border-stone-200 hover:border-stone-400'}`} aria-label="Favoris">
                <Heart size={18} className={isFav(product.id) ? 'fill-white' : ''} />
              </button>
            </div>
            <button onClick={handleBuyNow} className="w-full h-12 mt-3 border-2 border-stone-900 text-stone-900 font-semibold text-sm uppercase tracking-wider hover:bg-stone-50 transition-colors">Acheter maintenant</button>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-stone-100 pt-6">
              {[{icon: Truck, label: 'Livraison rapide'}, {icon: Handshake, label: 'Paiement main a main'}, {icon: Shield, label: '100% authentique'}].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5"><item.icon size={20} className="text-stone-600" /><span className="text-[11px] text-stone-600">{item.label}</span></div>
              ))}
            </div>
            <div className="mt-6 border-t border-stone-100 pt-6">
              <h3 className="text-sm font-semibold mb-2">Description</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
        {reviews.length > 0 && (
          <div className="mt-10 md:mt-16 border-t border-stone-100 pt-8">
            <h2 className="text-lg md:text-xl font-semibold mb-6">Avis clients ({reviews.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-stone-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold">{review.name.charAt(0)}</div>
                    <div><p className="text-sm font-medium">{review.name}</p><div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={10} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-stone-300'} />)}</div></div>
                    <span className="ml-auto text-xs text-stone-400">{review.created_at}</span>
                  </div>
                  <p className="text-sm text-stone-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {related.length > 0 && (
          <div className="mt-10 md:mt-16 border-t border-stone-100 pt-8">
            <h2 className="text-lg md:text-xl font-semibold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
