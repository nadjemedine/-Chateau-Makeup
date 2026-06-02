'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, Package, Truck, MapPin, Phone, User, FileText, ChevronRight, Clock } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import { getCart, getCartTotal, clearCart } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/ui/use-toast'

const checkoutSchema = z.object({
  full_name: z.string().min(3, 'Le nom complet est requis'),
  phone: z.string().min(8, 'Numero de telephone invalide'),
  phone2: z.string().optional(),
  address: z.string().min(5, 'L\'adresse est requise'),
  city: z.string().min(2, 'La ville est requise'),
  state: z.string().min(2, 'La region est requise'),
  zip_code: z.string().min(4, 'Le code postal est requis'),
  notes: z.string().optional(),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

const tunisiaCities = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan',
  'Bizerte', 'Beja', 'Jendouba', 'Le Kef', 'Siliana', 'Kairouan',
  'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Gafsa', 'Tozeur',
  'Kebili', 'Tataouine', 'Medenine', 'Gabes', 'Sidi Bouzid', 'Kasserine'
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, refresh } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  })

  const shippingCost = total >= 50 ? 0 : 7
  const finalTotal = total + shippingCost

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true)
    try {
      const cartItems = getCart()
      const orderItems = cartItems.map(item => ({
        product_id: item.product.id,
        name: item.product.name,
        image: item.product.image,
        size: item.size,
        price: item.product.price,
        quantity: item.quantity,
      }))

      const { data: order, error } = await supabase
        .from('orders')
        .insert([{
          full_name: data.full_name,
          phone: data.phone,
          phone2: data.phone2 || null,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zip_code,
          notes: data.notes || null,
          total: finalTotal,
          items: orderItems,
          status: 'pending',
        }])
        .select()
        .single()

      if (error) {
        // Fallback: save to localStorage
        const localOrder = {
          id: 'CMD-' + Date.now(),
          ...data,
          total: finalTotal,
          items: orderItems,
          status: 'pending',
          created_at: new Date().toISOString(),
        }
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
      toast({ title: 'Erreur', description: 'Une erreur est survenue. Veuillez reessayer.', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <Package size={48} className="text-stone-300 mb-4" />
        <h1 className="text-xl font-semibold mb-2">Votre panier est vide</h1>
        <Link href="/" className="px-6 py-3 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider">
          Continuer les achats
        </Link>
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Commande confirmee!</h1>
          <p className="text-stone-500 mb-2">Merci pour votre commande.</p>
          <p className="text-sm text-stone-600 mb-6">
            Numero de commande: <span className="font-mono font-bold">{orderId}</span>
          </p>
          <div className="bg-stone-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={16} className="text-stone-500" />
              <span className="text-sm">Votre commande sera livree sous 2-5 jours ouvrables</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-stone-500" />
              <span className="text-sm">Notre equipe vous contactera pour confirmer la livraison</span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider hover:bg-stone-800"
          >
            Retour a l&apos;accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* Steps indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-stone-900 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <span className="text-xs font-medium hidden sm:inline">Panier</span>
            </div>
            <ChevronRight size={14} className="text-stone-400" />
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-stone-900 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <span className="text-xs font-medium hidden sm:inline">Livraison</span>
            </div>
            <ChevronRight size={14} className="text-stone-400" />
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-stone-200 text-stone-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <span className="text-xs font-medium text-stone-400 hidden sm:inline">Confirmation</span>
            </div>
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">Passer la commande - Paiement a la livraison</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-5 md:p-6 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                <User size={16} />
                Informations personnelles
              </h2>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Nom complet *</label>
                <input
                  {...register('full_name')}
                  className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400"
                  placeholder="Prenom et nom"
                />
                {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Telephone principal *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      {...register('phone')}
                      className="w-full h-10 pl-9 pr-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Telephone secondaire</label>
                  <input
                    {...register('phone2')}
                    className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
              </div>

              <h2 className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 pt-2">
                <MapPin size={16} />
                Adresse de livraison
              </h2>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Adresse complete *</label>
                <input
                  {...register('address')}
                  className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400"
                  placeholder="Rue, immeuble, appartement..."
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Gouvernorat *</label>
                  <select
                    {...register('state')}
                    className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400 bg-white"
                  >
                    <option value="">Selectionner</option>
                    {tunisiaCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Ville *</label>
                  <input
                    {...register('city')}
                    className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400"
                    placeholder="Ville"
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Code postal *</label>
                  <input
                    {...register('zip_code')}
                    className="w-full h-10 px-3 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400"
                    placeholder="1000"
                  />
                  {errors.zip_code && <p className="text-xs text-red-500 mt-1">{errors.zip_code.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1 flex items-center gap-1">
                  <FileText size={14} />
                  Notes (optionnel)
                </label>
                <textarea
                  {...register('notes')}
                  className="w-full h-20 px-3 py-2 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-stone-400 resize-none"
                  placeholder="Instructions de livraison supplementaires..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-stone-900 text-white font-semibold text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>
                    <Truck size={16} />
                    Confirmer la commande - Paiement a la livraison
                  </>
                )}
              </button>

              <p className="text-[11px] text-stone-400 text-center">
                En confirmant, vous acceptez nos conditions generales de vente.
                Le paiement se fera en especes a la livraison.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-5 sticky top-24">
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Votre commande</h2>

              <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <div className="w-14 h-14 bg-stone-50 rounded overflow-hidden shrink-0">
                      <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.product.name}</p>
                      <p className="text-[10px] text-stone-400">{item.size} x{item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium">{(item.product.price * item.quantity).toFixed(2)} TND</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Sous-total</span>
                  <span>{total.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Livraison</span>
                  <span className={shippingCost === 0 ? 'text-emerald-600' : ''}>
                    {shippingCost === 0 ? 'Gratuite' : `${shippingCost.toFixed(2)} TND`}
                  </span>
                </div>
                <div className="border-t border-stone-100 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-lg">{finalTotal.toFixed(2)} TND</span>
                </div>
              </div>

              <div className="mt-4 bg-stone-50 rounded p-3 flex items-start gap-2">
                <Package size={14} className="text-stone-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-stone-500">
                  Livraison estimée: 2-5 jours ouvrables. Notre équipe vous contactera pour confirmer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
