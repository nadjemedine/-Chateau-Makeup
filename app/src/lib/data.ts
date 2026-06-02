import type { Product, Category, Brand, Review } from './supabase'

export const brands: Brand[] = [
  { id: '1', name: 'Chanel', image: '/perfume1.jpg' },
  { id: '2', name: 'Dior', image: '/perfume2.jpg' },
  { id: '3', name: 'Versace', image: '/skincare1.jpg' },
  { id: '4', name: 'YSL', image: '/makeup1.jpg' },
  { id: '5', name: 'Lancome', image: '/gift1.jpg' },
  { id: '6', name: 'Armani', image: '/hero1.jpg' },
  { id: '7', name: 'Hugo Boss', image: '/perfume2.jpg' },
  { id: '8', name: 'Valentino', image: '/perfume1.jpg' },
  { id: '9', name: 'Tom Ford', image: '/hero2.jpg' },
  { id: '10', name: 'Gucci', image: '/hero3.jpg' },
]

export const categories: Category[] = [
  { id: '1', name: 'Parfums', slug: 'parfums', image: '/perfume1.jpg', parent: null },
  { id: '2', name: 'Maquillage', slug: 'maquillage', image: '/makeup1.jpg', parent: null },
  { id: '3', name: 'Cheveux', slug: 'cheveux', image: '/hair1.jpg', parent: null },
  { id: '4', name: 'Visage', slug: 'visage', image: '/skincare1.jpg', parent: null },
  { id: '5', name: 'Corps et Bain', slug: 'corps-et-bain', image: '/hero3.jpg', parent: null },
  { id: '6', name: 'Homme', slug: 'homme', image: '/perfume2.jpg', parent: null },
  { id: '7', name: 'Accessoires', slug: 'accessoires', image: '/gift1.jpg', parent: null },
  { id: '8', name: 'Soins', slug: 'soins', image: '/skincare1.jpg', parent: null },
]

export const products: Product[] = [
  {
    id: 'p1', name: 'Aurora Noir Eau de Parfum', brand: 'Chateau', category: 'parfums',
    subcategory: 'eau-de-parfum', price: 12000, original_price: 15000, image: '/perfume1.jpg',
    images: ['/perfume1.jpg', '/perfume2.jpg', '/hero1.jpg'],
    description: 'Un parfum oriental envoutant avec des notes de jasmine, rose et patchouli. Une fragrance longue duree parfaite pour le jour comme pour le soir.',
    rating: 4.8, review_count: 324, badge: 'HIT', sizes: ['30ml', '50ml', '100ml'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p2', name: 'Nocture Pour Homme', brand: 'Chateau', category: 'parfums',
    subcategory: 'eau-de-toilette', price: 9500, original_price: 12000, image: '/perfume2.jpg',
    images: ['/perfume2.jpg', '/perfume1.jpg', '/hero1.jpg'],
    description: 'Une fragrance fraiche et puissante avec des notes de bergamote, ambroxan et poivre. Audacieuse et charismatique.',
    rating: 4.7, review_count: 256, badge: 'HIT', sizes: ['60ml', '100ml', '200ml'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p3', name: 'Laxuny Skincare Serum', brand: 'Chateau', category: 'visage',
    subcategory: 'serum', price: 8500, original_price: 11000, image: '/skincare1.jpg',
    images: ['/skincare1.jpg', '/hero3.jpg', '/gift1.jpg'],
    description: 'Serum hydratant anti-age avec acide hyaluronique et vitamine C. Pour une peau radieuse et repulpee.',
    rating: 4.6, review_count: 189, badge: 'DEAL', sizes: ['30ml', '50ml'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p4', name: 'Rouge Velours Lipstick', brand: 'Chateau', category: 'maquillage',
    subcategory: 'lipstick', price: 4200, original_price: 5500, image: '/makeup1.jpg',
    images: ['/makeup1.jpg', '/hero2.jpg', '/gift1.jpg'],
    description: 'Rouge a levres iconique avec une tenue longue duree et un fini velours. Disponible en plusieurs teintes.',
    rating: 4.7, review_count: 278, badge: 'HIT', sizes: ['3.5g'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p5', name: 'Aurum Nectar Hair Oil', brand: 'Chateau', category: 'cheveux',
    subcategory: 'hair-oil', price: 5500, original_price: 7000, image: '/hair1.jpg',
    images: ['/hair1.jpg', '/skincare1.jpg', '/hero3.jpg'],
    description: 'Huile capillaire nourrissante pour cheveux secs et sensibilises. Apporte brillance et douceur.',
    rating: 4.8, review_count: 412, badge: 'DEAL', sizes: ['50ml', '100ml'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p6', name: 'Luxe Aura Gift Set', brand: 'Chateau', category: 'parfums',
    subcategory: 'coffret', price: 13000, original_price: 16500, image: '/gift1.jpg',
    images: ['/gift1.jpg', '/perfume1.jpg', '/hero1.jpg'],
    description: 'Coffret cadeau elegant avec parfum, lotion corporelle et gel douche. Le cadeau parfait pour chaque occasion.',
    rating: 4.9, review_count: 167, badge: 'HIT', sizes: ['Set'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p7', name: 'Aurum Face Cream', brand: 'Chateau', category: 'visage',
    subcategory: 'creme', price: 7500, original_price: 9500, image: '/hero3.jpg',
    images: ['/hero3.jpg', '/skincare1.jpg', '/gift1.jpg'],
    description: 'Creme visage anti-rides regenerante avec or colloidal et acide hyaluronique. Texture fondante.',
    rating: 4.5, review_count: 198, badge: null, sizes: ['50ml', '75ml'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p8', name: 'Glow Palette Makeup', brand: 'Chateau', category: 'maquillage',
    subcategory: 'palette', price: 6500, original_price: 8000, image: '/hero2.jpg',
    images: ['/hero2.jpg', '/makeup1.jpg', '/gift1.jpg'],
    description: 'Palette maquillage avec fards a paupieres, highlighter et blush. Tons chauds et universels.',
    rating: 4.6, review_count: 145, badge: 'HIT', sizes: ['Standard'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p9', name: 'Midnight Orchid Parfum', brand: 'Chateau', category: 'parfums',
    subcategory: 'eau-de-parfum', price: 14000, original_price: 18000, image: '/hero1.jpg',
    images: ['/hero1.jpg', '/perfume1.jpg', '/perfume2.jpg'],
    description: 'Un parfum floral luxueux avec orchidee noire, truffe et vanille. Sombre et sensuel.',
    rating: 4.9, review_count: 89, badge: 'NEW', sizes: ['30ml', '50ml', '100ml'], in_stock: true, created_at: '2024-03-01',
  },
  {
    id: 'p10', name: 'Rose Eclat Collection', brand: 'Chateau', category: 'parfums',
    subcategory: 'eau-de-parfum', price: 11000, original_price: 14000, image: '/perfume1.jpg',
    images: ['/perfume1.jpg', '/gift1.jpg', '/hero1.jpg'],
    description: 'Collection fragrance riche et florale blanche avec jasmin, tubereuse et fleur de Rangoon.',
    rating: 4.5, review_count: 134, badge: 'NEW', sizes: ['30ml', '50ml', '100ml'], in_stock: true, created_at: '2024-03-01',
  },
  {
    id: 'p11', name: 'Mascara Volume Intense', brand: 'Chateau', category: 'maquillage',
    subcategory: 'mascara', price: 3200, original_price: 4000, image: '/makeup1.jpg',
    images: ['/makeup1.jpg', '/hero2.jpg', '/gift1.jpg'],
    description: 'Mascara volumateur et allongeant avec un complexe fortifiant. Des cils spectaculaires.',
    rating: 4.6, review_count: 567, badge: 'HIT', sizes: ['Standard'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p12', name: 'Rouge Chateau Lipstick', brand: 'Chateau', category: 'maquillage',
    subcategory: 'lipstick', price: 4200, original_price: 5200, image: '/hero2.jpg',
    images: ['/hero2.jpg', '/makeup1.jpg', '/gift1.jpg'],
    description: 'Rouge a levres iconique avec couleur longue tenue et soin floral. Rouge profond.',
    rating: 4.7, review_count: 423, badge: 'DEAL', sizes: ['3.5g'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p13', name: 'Huile Reparatrice Cheveux', brand: 'Chateau', category: 'cheveux',
    subcategory: 'hair-oil', price: 4500, original_price: 5500, image: '/hair1.jpg',
    images: ['/hair1.jpg', '/hero3.jpg', '/skincare1.jpg'],
    description: 'Huile capillaire nourrissante pour cheveux secs et sensibilises. Brillance et douceur.',
    rating: 4.8, review_count: 312, badge: 'HIT', sizes: ['100ml'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p14', name: 'Serum Nuit Reparateur', brand: 'Chateau', category: 'visage',
    subcategory: 'serum', price: 9500, original_price: 12000, image: '/skincare1.jpg',
    images: ['/skincare1.jpg', '/hero3.jpg', '/gift1.jpg'],
    description: 'Serum anti-age qui repare et renouvelle la peau pendant la nuit. Reduit les rides.',
    rating: 4.9, review_count: 678, badge: 'HIT', sizes: ['30ml', '50ml', '75ml'], in_stock: true, created_at: '2024-01-01',
  },
  {
    id: 'p15', name: 'Creme Corps Karite', brand: 'Chateau', category: 'corps-et-bain',
    subcategory: 'body-cream', price: 3800, original_price: 4800, image: '/hero3.jpg',
    images: ['/hero3.jpg', '/skincare1.jpg', '/hair1.jpg'],
    description: 'Creme corps ultra-rich avec 25% de beurre de karite. Nourrit intensment la peau seche.',
    rating: 4.7, review_count: 234, badge: null, sizes: ['100ml', '200ml'], in_stock: true, created_at: '2024-01-01',
  },
]

export const reviews: Review[] = [
  { id: 'r1', product_id: 'p1', name: 'Sarah M.', rating: 5, comment: 'Un parfum absolument divin! Tient toute la journee et je recois toujours des compliments.', created_at: '2024-03-15' },
  { id: 'r2', product_id: 'p1', name: 'Amelia K.', rating: 4, comment: 'Belle fragrance, tres feminine et sophistiquee. Vaut chaque dinar.', created_at: '2024-02-20' },
  { id: 'r3', product_id: 'p1', name: 'Jessica L.', rating: 5, comment: 'Mon parfum signature! Je le porte depuis des annees.', created_at: '2024-01-10' },
  { id: 'r4', product_id: 'p2', name: 'Michael T.', rating: 5, comment: 'Le meilleur parfum homme sans conteste. Frais mais masculin.', created_at: '2024-03-01' },
  { id: 'r5', product_id: 'p2', name: 'David R.', rating: 4, comment: 'Bonne tenue et projection.', created_at: '2024-02-15' },
]

export const heroBanners = [
  { id: 'b1', title: 'Nouvelle Collection', subtitle: 'Decouvrez les nouveaux parfums de la saison', cta: 'Decouvrir', image: '/hero1.jpg', color: '#1a1a1a' },
  { id: 'b2', title: 'Maquillage Glamour', subtitle: 'Les tendances maquillage du printemps', cta: 'Acheter', image: '/hero2.jpg', color: '#2d2d2d' },
  { id: 'b3', title: 'Soins Visage', subtitle: 'Routine beaute pour une peau parfaite', cta: 'Explorer', image: '/hero3.jpg', color: '#1a1a1a' },
]

export const promoBanners = [
  { id: 'pb1', title: 'LIVRAISON GRATUITE', subtitle: 'Des 5000 DZD d\'achat', image: '/gift1.jpg' },
  { id: 'pb2', title: 'CADEAU OFFERT', subtitle: 'Pour tout achat de parfum', image: '/perfume1.jpg' },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId)
  if (!product) return []
  return products.filter((p) => p.category === product.category && p.id !== productId).slice(0, 4)
}

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter((r) => r.product_id === productId)
}
