import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroBanners } from '@/lib/data'

export function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    const interval = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => { emblaApi.off('select', onSelect); clearInterval(interval) }
  }, [emblaApi, onSelect])

  return (
    <section className="relative w-full overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {heroBanners.map((banner) => (
            <div key={banner.id} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${banner.image})` }}>
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-wide">{banner.title}</h2>
                  <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 opacity-90 max-w-lg">{banner.subtitle}</p>
                  <button className="px-6 py-2.5 md:px-8 md:py-3 bg-white text-stone-900 text-xs md:text-sm font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors">{banner.cta}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={scrollPrev} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white flex items-center justify-center rounded-full shadow-md transition-all z-10" aria-label="Previous"><ChevronLeft size={18} /></button>
      <button onClick={scrollNext} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 hover:bg-white flex items-center justify-center rounded-full shadow-md transition-all z-10" aria-label="Next"><ChevronRight size={18} /></button>
      <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroBanners.map((_, index) => (
          <button key={index} onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? 'bg-white w-5' : 'bg-white/60'}`} aria-label={`Slide ${index + 1}`} />
        ))}
      </div>
    </section>
  )
}
