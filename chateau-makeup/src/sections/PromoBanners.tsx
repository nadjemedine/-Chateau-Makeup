'use client'

import Link from 'next/link'
import { promoBanners } from '@/lib/data'

export function PromoBanners() {
  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promoBanners.map((banner) => (
            <Link
              key={banner.id}
              href="/category/parfums"
              className="relative h-[180px] md:h-[250px] rounded-lg overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              </div>
              <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
                <h3 className="text-xl md:text-2xl font-bold tracking-wide">{banner.title}</h3>
                <p className="text-sm mt-1 opacity-90">{banner.subtitle}</p>
                <span className="mt-3 px-5 py-1.5 border border-white/60 text-xs uppercase tracking-wider hover:bg-white hover:text-stone-900 transition-colors">
                  Decouvrir
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
