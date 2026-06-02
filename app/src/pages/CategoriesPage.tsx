import { Link } from 'react-router-dom'
import { categories } from '@/lib/data'
import { Footer } from '@/sections/Footer'

export default function CategoriesPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">Categories</h1>
        <p className="text-sm text-stone-500 mb-8">Decouvrez toutes nos categories</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h2 className="text-white font-semibold text-sm md:text-base tracking-wide">{cat.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
