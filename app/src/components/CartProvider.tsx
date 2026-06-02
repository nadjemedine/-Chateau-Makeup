import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCart, getCartCount, getCartTotal } from '@/lib/supabase'
import type { CartItem } from '@/lib/supabase'

interface CartContextType {
  items: CartItem[]
  count: number
  total: number
  refresh: () => void
}

const CartContext = createContext<CartContextType>({
  items: [], count: 0, total: 0, refresh: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)

  const refresh = () => {
    setItems(getCart())
    setCount(getCartCount())
    setTotal(getCartTotal())
  }

  useEffect(() => {
    refresh()
    window.addEventListener('cart-updated', refresh)
    return () => window.removeEventListener('cart-updated', refresh)
  }, [])

  return (
    <CartContext.Provider value={{ items, count, total, refresh }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
