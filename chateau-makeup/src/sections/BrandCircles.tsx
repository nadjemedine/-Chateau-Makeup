'use client'

import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { brands } from '@/lib/data'
import { useCallback } from 'react'

export function BrandCircles() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 2,
    containScroll: 'trimSnaps',
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-3 md:gap-6">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-[0_0_80px] md:flex-[0_0_120px] min-w-0"
                >
                  <Link
                    href={`/category/parfums?brand=${brand.name}`}
                    className="flex flex-col items-center group"
                  >
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-stone-100 group-hover:border-stone-300 transition-all shadow-sm">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-2 text-[10px] md:text-xs text-stone-600 text-center font-medium group-hover:text-stone-900 transition-colors truncate max-w-full">
                      {brand.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/3 -translate-y-1/2 w-7 h-7 bg-white shadow-md border border-stone-100 rounded-full flex items-center justify-center hover:bg-stone-50 z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/3 -translate-y-1/2 w-7 h-7 bg-white shadow-md border border-stone-100 rounded-full flex items-center justify-center hover:bg-stone-50 z-10"
            aria-label="Next"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
