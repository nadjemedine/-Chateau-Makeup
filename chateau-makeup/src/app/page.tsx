import { HeroBanner } from '@/sections/HeroBanner'
import { BrandCircles } from '@/sections/BrandCircles'
import { ProductSection } from '@/sections/ProductSection'
import { PromoBanners } from '@/sections/PromoBanners'
import { Footer } from '@/sections/Footer'
import { products } from '@/lib/data'

export default function Home() {
  const featuredProducts = products.filter((p) => p.badge === 'HIT' || p.badge === 'DEAL').slice(0, 8)
  const newArrivals = products.filter((p) => p.badge === 'NEW')
  const perfumes = products.filter((p) => p.category === 'parfums')
  const makeup = products.filter((p) => p.category === 'maquillage')
  const hair = products.filter((p) => p.category === 'cheveux')

  return (
    <div>
      <HeroBanner />
      <BrandCircles />
      <ProductSection title="Les marques recommandent" products={featuredProducts} />
      <PromoBanners />
      {newArrivals.length > 0 && (
        <ProductSection title="Nouveautes" products={newArrivals} />
      )}
      <ProductSection title="Parfums" products={perfumes} />
      <ProductSection title="Maquillage" products={makeup} />
      <ProductSection title="Cheveux" products={hair} />
      <Footer />
    </div>
  )
}
