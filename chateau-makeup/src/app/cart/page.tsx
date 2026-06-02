'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/CartProvider'
import { getCart, removeFromCart, updateCartQuantity, getCartTotal } from '@/lib/supabase'
import { Footer } from '@/sections/Footer'

export default function CartPage() {
  const { items, refresh } = useCart()

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity < 1) return
    updateCartQuantity(productId, size, quantity)
    refresh()
  }

  const handleRemove = (productId: string, size: string) => {
    removeFromCart(productId, size)
    refresh()
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingBag size={48} className="text-stone-300 mb-4" />
        <h1 className="text-xl font-semibold mb-2">Votre panier est vide</h1>
        <p className="text-sm text-stone-500 mb-4">Decouvrez nos produits et ajoutez-les a votre panier</p>
        <Link
          href="/"
          className="px-6 py-3 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
        >
          Continuer les achats
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">Mon Panier ({items.length} articles)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4 bg-white border border-stone-100 rounded-lg p-3">
                <Link href={`/product/${item.product.id}`} className="shrink-0">
                  <div className="w-20 h-24 md:w-24 md:h-28 bg-stone-50 rounded-md overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product.id}`}>
                    <h3 className="text-sm font-medium text-stone-900 truncate">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-stone-500">{item.product.brand}</p>
                  <p className="text-xs text-stone-400 mt-0.5">Taille: {item.size}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-200 rounded">
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-stone-50"
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-stone-50"
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{(item.product.price * item.quantity).toFixed(2)} TND</span>
                      <button
                        onClick={() => handleRemove(item.product.id, item.size)}
                        className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-stone-50 rounded-lg p-5 h-fit">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4">Resume</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Sous-total</span>
                <span>{getCartTotal().toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Livraison</span>
                <span className="text-emerald-600">
                  {getCartTotal() >= 50 ? 'Gratuite' : '7.00 TND'}
                </span>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-3 mb-4">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">
                  {(getCartTotal() + (getCartTotal() >= 50 ? 0 : 7)).toFixed(2)} TND
                </span>
              </div>
              <p className="text-[10px] text-stone-400 mt-1">TVA incluse</p>
            </div>

            {getCartTotal() < 50 && (
              <p className="text-xs text-stone-500 mb-3">
                Plus que {(50 - getCartTotal()).toFixed(2)} TND pour la livraison gratuite!
              </p>
            )}

            <Link
              href="/checkout"
              className="block w-full h-12 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider text-center leading-[48px] hover:bg-stone-800 transition-colors"
            >
              Passer la commande
            </Link>

            <Link
              href="/"
              className="block w-full h-10 text-center text-sm text-stone-600 mt-2 hover:text-stone-900"
            >
              Continuer les achats
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
