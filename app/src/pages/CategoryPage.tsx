import { useParams, Link } from 'react-router-dom'
import { categories, products } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { Footer } from '@/sections/Footer'
import { ChevronRight } from 'lucide-react'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = categories.find((c) => c.slug === slug)
  const categoryProducts = products.filter((p) => p.category === slug)
  const allMatching = categoryProducts.length > 0 ? categoryProducts : products.filter((p) => p.subcategory === slug || p.brand.toLowerCase() === slug)

  return (
    <div>
      <div className="relative h-[150px] md:h-[200px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${category?.image || '/hero1.jpg'})` }}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-2xl md:text-3xl font-bold capitalize tracking-wide">{category?.name || slug?.replace(/-/g, ' ')}</h1>
          <div className="flex items-center gap-1 mt-2 text-xs"><Link to="/" className="hover:underline">Accueil</Link><ChevronRight size={12} /><span className="capitalize">{category?.name || slug}</span></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {allMatching.length > 0 ? (
          <>
            <p className="text-sm text-stone-500 mb-6">{allMatching.length} produits</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {allMatching.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-stone-500 mb-4">Aucun produit dans cette categorie.</p>
            <Link to="/" className="px-6 py-2.5 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider">Decouvrir les produits</Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
