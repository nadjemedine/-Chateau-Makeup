'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white text-lg font-bold tracking-[0.15em] uppercase mb-4">Chateau</h3>
            <p className="text-xs leading-relaxed mb-4">
              Votre destination beaute pour les meilleurs parfums, maquillages et soins. 
              Des marques de luxe aux meilleurs prix.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Parfums', 'Maquillage', 'Cheveux', 'Visage', 'Corps et Bain'].map((item) => (
                <li key={item}>
                  <Link href={`/category/${item.toLowerCase().replace(/ /g, '-')}`} className="text-xs hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Aide</h4>
            <ul className="space-y-2">
              {['Livraison', 'Retours', 'FAQ', 'Contact', 'Conditions'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span className="text-xs">123 Avenue Habib Bourguiba, Tunis 1000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                <span className="text-xs">+216 71 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />
                <span className="text-xs">contact@chateaumakeup.tn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-stone-800 pt-6 pb-6">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-white text-sm font-semibold mb-2">Inscrivez-vous a notre newsletter</h4>
            <p className="text-xs mb-4">Recevez nos offres exclusives et nouveautes</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 h-10 px-3 bg-stone-800 border border-stone-700 rounded text-sm focus:outline-none focus:border-stone-500"
              />
              <button className="h-10 px-5 bg-white text-stone-900 text-xs font-semibold uppercase rounded hover:bg-stone-100 transition-colors">
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-stone-500">
            &copy; 2024 Chateau Makeup. Tous droits reserves.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-[10px] text-stone-500 hover:text-stone-300">Politique de confidentialite</a>
            <a href="#" className="text-[10px] text-stone-500 hover:text-stone-300">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
