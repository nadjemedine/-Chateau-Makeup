import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://glwmjfqmnzzzrlamlbff.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_DAuui7_7IBqW9qcgoWwHtQ_BtiJYiIT'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Product {
  id: string
  name: string
  brand: string
  category: string
  subcategory: string
  price: number
  original_price: number
  image: string
  images: string[]
  description: string
  rating: number
  review_count: number
  badge: string | null
  sizes: string[]
  in_stock: boolean
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  parent: string | null
}

export interface Order {
  id: string
  full_name: string
  phone: string
  phone2: string | null
  address: string
  city: string
  state: string
  zip_code: string
  notes: string | null
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  created_at: string
}

export interface OrderItem {
  product_id: string
  name: string
  image: string
  size: string
  price: number
  quantity: number
}

export interface Review {
  id: string
  product_id: string
  name: string
  rating: number
  comment: string
  created_at: string
}

export interface Brand {
  id: string
  name: string
  image: string
}

// Local storage cart helpers
export interface CartItem {
  product: Product
  size: string
  quantity: number
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem('chateau-cart')
  return cart ? JSON.parse(cart) : []
}

export function addToCart(item: CartItem) {
  const cart = getCart()
  const existing = cart.find(
    (c) => c.product.id === item.product.id && c.size === item.size
  )
  if (existing) {
    existing.quantity += item.quantity
  } else {
    cart.push(item)
  }
  localStorage.setItem('chateau-cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export function removeFromCart(productId: string, size: string) {
  const cart = getCart().filter(
    (c) => !(c.product.id === productId && c.size === size)
  )
  localStorage.setItem('chateau-cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export function updateCartQuantity(productId: string, size: string, quantity: number) {
  const cart = getCart()
  const item = cart.find((c) => c.product.id === productId && c.size === size)
  if (item) {
    item.quantity = quantity
  }
  localStorage.setItem('chateau-cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart-updated'))
}

export function clearCart() {
  localStorage.removeItem('chateau-cart')
  window.dispatchEvent(new Event('cart-updated'))
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}
