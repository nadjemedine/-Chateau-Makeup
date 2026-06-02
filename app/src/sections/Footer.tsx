import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white text-lg font-bold tracking-[0.15em] uppercase mb-4">Chateau</h3>
            <p className="text-xs leading-relaxed mb-4">Votre destination beaute pour les meilleurs parfums, maquillages et soins. Des marques de luxe aux meilleurs prix.</p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center hover:bg-stone-700 transition-colors"><Icon size={14} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Parfums', 'Maquillage', 'Cheveux', 'Visage', 'Corps et Bain'].map((item) => (
                <li key={item}><Link to={`/category/${item.toLowerCase().replace(/ /g, '-')}`} className="text-xs hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Aide</h4>
            <ul className="space-y-2">
              {['Livraison', 'Retours', 'FAQ', 'Contact', 'Conditions'].map((item) => (
                <li key={item}><a href="#" className="text-xs hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /><span className="text-xs">123 Avenue Habib Bourguiba, Tunis 1000</span></li>
              <li className="flex items-center gap-2"><Phone size={14} className="shrink-0" /><span className="text-xs">+216 71 123 456</span></li>
              <li className="flex items-center gap-2"><Mail size={14} className="shrink-0" /><span className="text-xs">contact@chateaumakeup.tn</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-stone-500">&copy; 2024 Chateau Makeup. Tous droits reserves.</p>
          <div className="flex gap-4">
            <a href="#" className="text-[10px] text-stone-500 hover:text-stone-300">Politique de confidentialite</a>
            <a href="#" className="text-[10px] text-stone-500 hover:text-stone-300">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
