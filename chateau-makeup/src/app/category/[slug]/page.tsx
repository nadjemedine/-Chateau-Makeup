'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { categories, products } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { Footer } from '@/sections/Footer'
import { ChevronRight } from 'lucide-react'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const category = categories.find((c) => c.slug === slug)
  const categoryProducts = products.filter((p) => p.category === slug)

  // Also check subcategories
  const allMatchingProducts = categoryProducts.length > 0
    ? categoryProducts
    : products.filter((p) => p.subcategory === slug || p.brand.toLowerCase() === slug)

  return (
    <div>
      {/* Category Hero */}
      <div className="relative h-[150px] md:h-[200px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category?.image || 'https://images.unsplash.com/photo-1594035910387-fea4779426e9?w=1400&h=300&fit=crop'})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-2xl md:text-3xl font-bold capitalize tracking-wide">
            {category?.name || slug.replace(/-/g, ' ')}
          </h1>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <Link href="/" className="hover:underline">Accueil</Link>
            <ChevronRight size={12} />
            <span className="capitalize">{category?.name || slug}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {allMatchingProducts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-stone-500">{allMatchingProducts.length} produits</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {allMatchingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-stone-500 mb-4">Aucun produit dans cette categorie pour le moment.</p>
            <Link
              href="/"
              className="px-6 py-2.5 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider"
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
