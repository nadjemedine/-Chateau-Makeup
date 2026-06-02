'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback } from 'react'
import { Product } from '@/lib/supabase'
import { ProductCard } from '@/components/ProductCard'

interface ProductSectionProps {
  title: string
  products: Product[]
  showBadges?: boolean
}

export function ProductSection({ title, products, showBadges }: ProductSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 2,
    containScroll: 'trimSnaps',
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (products.length === 0) return null

  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-semibold text-stone-900">{title}</h2>
          <div className="flex gap-1">
            <button
              onClick={scrollPrev}
              className="w-8 h-8 border border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={scrollNext}
              className="w-8 h-8 border border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-3 md:gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex-[0_0_46%] sm:flex-[0_0_30%] lg:flex-[0_0_23%] min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
