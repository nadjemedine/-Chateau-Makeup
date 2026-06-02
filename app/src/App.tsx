import { Routes, Route } from 'react-router-dom'
import { Header } from '@/sections/Header'
import { BottomNav } from '@/sections/BottomNav'
import { CartProvider } from '@/components/CartProvider'
import { FavoritesProvider } from '@/components/FavoritesProvider'
import { Toaster } from '@/components/ui/sonner'
import Home from '@/pages/Home'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import CategoryPage from '@/pages/CategoryPage'
import CategoriesPage from '@/pages/CategoriesPage'
import FavoritesPage from '@/pages/FavoritesPage'

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Header />
        <main className="pb-16 md:pb-0 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
          </Routes>
        </main>
        <BottomNav />
        <Toaster />
      </FavoritesProvider>
    </CartProvider>
  )
}

export default App
