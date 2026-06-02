import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, Package, Truck, MapPin, Phone, User, Home, Building2, ChevronRight, Clock } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import { clearCart, getCart } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

const checkoutSchema = z.object({
  full_name: z.string().min(3, 'Le nom complet est requis'),
  phone: z.string().min(8, 'Numero de telephone invalide'),
  address: z.string().optional(),
  city: z.string().min(2, 'La ville est requise'),
  state: z.string().min(2, 'La region est requise'),
  delivery_type: z.enum(['maison', 'bureau'], { errorMap: () => ({ message: 'Veuillez choisir le type de livraison' }) }),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

const algeriaWilayas = [
  'Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Bejaia','Biskra','Bechar',
  'Blida','Bouira','Tamanrasset','Tebessa','Tlemcen','Tiaret','Tizi Ouzou','Alger',
  'Djelfa','Jijel','Setif','Saida','Skikda','Sidi Bel Abbes','Annaba','Guelma',
  'Constantine','Medea','Mostaganem','MSila','Mascara','Ouargla','Oran','El Bayadh',
  'Illizi','Bordj Bou Arreridj','Boumerdes','El Tarf','Tindouf','Tissemsilt','El Oued',
  'Khenchela','Souk Ahras','Tipaza','Mila','Ain Defla','Naama','Ain Temouchent',
  'Ghardaia','Relizane','Timimoun','Bordj Badji Mokhtar','Ouled Djellah','Beni Abbes',
  'In Salah','In Guezzam','Touggourt','Djanet','El MGhair','El Meniaa'
]

export default function CheckoutPage() {
  const { items, total, refresh } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutForm>({ resolver: zodResolver(checkoutSchema) })
  const shippingCost = total >= 5000 ? 0 : 700
  const finalTotal = total + shippingCost

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true)
    try {
      const cartItems = getCart()
      const orderItems = cartItems.map(item => ({ product_id: item.product.id, name: item.product.name, image: item.product.image, size: item.size, price: item.product.price, quantity: item.quantity }))
      const { data: order, error } = await supabase.from('orders').insert([{ full_name: data.full_name, phone: data.phone, address: data.address, city: data.city, state: data.state, delivery_type: data.delivery_type, total: finalTotal, items: orderItems, status: 'pending' }]).select().single()
      if (error) {
        const localOrder = { id: 'CMD-' + Date.now(), ...data, total: finalTotal, items: orderItems, status: 'pending', created_at: new Date().toISOString() }
        const existingOrders = JSON.parse(localStorage.getItem('chateau-orders') || '[]')
        existingOrders.push(localOrder)
        localStorage.setItem('chateau-orders', JSON.stringify(existingOrders))
        setOrderId(localOrder.id)
      } else {
        setOrderId(order.id)
      }
      clearCart()
      refresh()
      setOrderSuccess(true)
      toast({ title: 'Commande confirmee!', description: 'Votre commande a ete enregistree.' })
    } catch {
      toast({ title: 'Erreur', description: 'Une erreur est survenue.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0 && !orderSuccess) {
    return <div className="min-h-screen flex flex-col items-center justify-center px-4"><Package size={48} className="text-stone-300 mb-4" /><h1 className="text-xl font-semibold mb-2">Votre panier est vide</h1><Link to="/" className="px-6 py-3 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider">Continuer les achats</Link></div>
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-emerald-600" /></div>
          <h1 className="text-2xl font-semibold mb-2">Commande confirmee!</h1>
          <p className="text-stone-500 mb-2">Merci pour votre commande.</p>
          <p className="text-sm text-stone-600 mb-6">Numero: <span className="font-mono font-bold">{orderId}</span></p>
          <div className="bg-stone-50 rounded-lg p-4 mb-6 text-left space-y-3">
            <div className="flex items-center gap-3"><Clock size={16} className="text-stone-500" /><span className="text-sm">Livraison sous 2-5 jours ouvrables</span></div>
            <div className="flex items-center gap-3"><Phone size={16} className="text-stone-500" /><span className="text-sm">Notre equipe vous contactera pour confirmer</span></div>
          </div>
          <Link to="/" className="inline-block px-6 py-3 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider hover:bg-stone-800">Retour a l&apos;accueil</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            {[{n:1,l:'Panier'},{n:2,l:'Livraison'},{n:3,l:'Confirmation'}].map((s,i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5"><div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${s.n <= 2 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'}`}>{s.n}</div><span className={`text-xs font-medium hidden sm:inline ${s.n > 2 ? 'text-stone-400' : ''}`}>{s.l}</span></div>
                {i < 2 && <ChevronRight size={14} className="text-stone-400" />}
              </div>
            ))}
          </div>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">Passer la commande - Paiement a la livraison</h1>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Section 1: Votre commande */}
          <div className="bg-white rounded-lg p-5 md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center justify-center gap-2"><Package size={16} />Votre commande</h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                  <div className="w-14 h-14 bg-stone-50 rounded overflow-hidden shrink-0"><img src={item.product.image} alt="" className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">{item.product.name}</p><p className="text-[10px] text-stone-400">{item.size} x{item.quantity}</p></div>
                  <span className="text-xs font-medium">{(item.product.price * item.quantity).toFixed(2)} DZD</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Informations personnelles */}
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-5 md:p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2"><User size={16} />Informations personnelles</h2>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Nom complet *</label>
              <input {...register('full_name')} className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400" placeholder="Prenom et nom" />
              {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Telephone principal *</label>
              <div className="relative"><Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input {...register('phone')} className="w-full h-10 pl-9 pr-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400" placeholder="0X XX XX XX XX" /></div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
            <h2 className="text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 pt-2"><MapPin size={16} />Adresse de livraison</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Wilaya *</label>
                <select {...register('state')} className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400 bg-white">
                  <option value="">Selectionner</option>{algeriaWilayas.map((w: string) => <option key={w} value={w}>{w}</option>)}
                </select>
                {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Commune *</label>
                <input {...register('city')} className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400" placeholder="Commune" />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-2">Type de livraison *</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-2.5 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${watch('delivery_type') === 'maison' ? 'border-stone-900 bg-stone-900' : 'border-stone-200 hover:border-stone-400'}`}>
                  <input type="radio" value="maison" {...register('delivery_type')} className="sr-only" />
                  <Home size={16} className={watch('delivery_type') === 'maison' ? 'text-white' : 'text-stone-400'} />
                  <span className={`text-sm font-medium ${watch('delivery_type') === 'maison' ? 'text-white' : 'text-stone-600'}`}>Maison</span>
                </label>
                <label className={`flex items-center gap-2.5 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${watch('delivery_type') === 'bureau' ? 'border-stone-900 bg-stone-900' : 'border-stone-200 hover:border-stone-400'}`}>
                  <input type="radio" value="bureau" {...register('delivery_type')} className="sr-only" />
                  <Building2 size={16} className={watch('delivery_type') === 'bureau' ? 'text-white' : 'text-stone-400'} />
                  <span className={`text-sm font-medium ${watch('delivery_type') === 'bureau' ? 'text-white' : 'text-stone-600'}`}>Bureau</span>
                </label>
              </div>
              {errors.delivery_type && <p className="text-xs text-red-500 mt-1">{errors.delivery_type.message}</p>}
            </div>
            {watch('delivery_type') === 'maison' && (
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Adresse complete *</label>
                <input {...register('address')} className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400" placeholder="Rue, immeuble, appartement..." />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
              </div>
            )}
          </form>

          {/* Section 3: Résumé prix */}
          <div className="bg-white rounded-lg p-5 space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-3 text-center">Resume de la commande</h2>
            <div className="flex justify-between text-sm"><span className="text-stone-600">Sous-total</span><span>{total.toFixed(2)} DZD</span></div>
            <div className="flex justify-between text-sm"><span className="text-stone-600">Livraison</span><span className={shippingCost === 0 ? 'text-emerald-600' : ''}>{shippingCost === 0 ? 'Gratuite' : `${shippingCost.toFixed(2)} DZD`}</span></div>
            <div className="border-t border-stone-100 pt-2 flex justify-between font-semibold"><span>Total</span><span className="text-lg">{finalTotal.toFixed(2)} DZD</span></div>
            <div className="mt-2 bg-stone-50 rounded p-3 flex items-start gap-2"><Truck size={14} className="text-stone-500 mt-0.5 shrink-0" /><p className="text-[11px] text-stone-500">Livraison estimee: 2-5 jours ouvrables. Notre equipe vous contactera pour confirmer.</p></div>
          </div>

          {/* Bouton confirmer */}
          <button type="submit" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="w-full h-12 bg-stone-900 text-white font-semibold text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 rounded-lg">
            {isSubmitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Traitement...</> : <><Truck size={16} />Confirmer - Paiement a la livraison</>}
          </button>
          <p className="text-[11px] text-stone-400 text-center pb-6">Le paiement se fera en especes a la livraison.</p>
        </div>
      </div>
    </div>
  )
}
