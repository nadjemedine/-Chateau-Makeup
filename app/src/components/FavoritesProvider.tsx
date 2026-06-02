import React, { createContext, useContext, useState, useEffect } from 'react'
import { getFavorites, toggleFavorite as toggleFav, isFavorite as isFav } from '@/lib/supabase'

interface FavoritesContextType {
  favoriteIds: string[]
  count: number
  toggle: (productId: string) => boolean
  isFav: (productId: string) => boolean
  refresh: () => void
}

const FavoritesContext = createContext<FavoritesContextType>({
  favoriteIds: [], count: 0,
  toggle: () => false, isFav: () => false, refresh: () => {},
})

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  const refresh = () => {
    setFavoriteIds(getFavorites())
  }

  const toggle = (productId: string) => {
    const added = toggleFav(productId)
    refresh()
    return added
  }

  const checkIsFav = (productId: string) => favoriteIds.includes(productId)

  useEffect(() => {
    refresh()
    window.addEventListener('favorites-updated', refresh)
    return () => window.removeEventListener('favorites-updated', refresh)
  }, [])

  return (
    <FavoritesContext.Provider value={{ favoriteIds, count: favoriteIds.length, toggle, isFav: checkIsFav, refresh }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
