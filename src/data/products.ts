export interface Product {
  id: string
  name: string
  tagline: string
  category: 'waterproofing' | 'primer' | 'antijamur' | 'topcoat'
  pricePerLitre: number
  availableSizes: number[]
  coverage: number // m² per litre per coat
  coatsRecommended: number
  instructions: string
  image: string
}

export const products: Product[] = [
  {
    id: 'warnaseal-waterproofing',
    name: 'WarnaSeal Waterproofing',
    tagline: 'Proteksi bocor & lembap tahan cuaca ekstrem',
    category: 'waterproofing',
    pricePerLitre: 85000,
    availableSizes: [1, 4, 20],
    coverage: 5,
    coatsRecommended: 2,
    instructions: 'Bersihkan permukaan, aplikasikan 2 lapis dengan kuas/rol. Tunggu 4 jam antar lapis.',
    image: 'https://picsum.photos/seed/product-waterproofing/200/200',
  },
  {
    id: 'warnabase-primer',
    name: 'WarnaBase Primer',
    tagline: 'Primer alkali untuk dinding baru & renovasi',
    category: 'primer',
    pricePerLitre: 45000,
    availableSizes: [1, 5, 20],
    coverage: 12,
    coatsRecommended: 1,
    instructions: 'Larutkan 1:1 dengan air untuk dinding baru. Aplikasikan 1 lapis merata. Tunggu kering 2 jam.',
    image: 'https://picsum.photos/seed/product-primer/200/200',
  },
  {
    id: 'warnafresh-antijamur',
    name: 'WarnaFresh Anti-Jamur Interior',
    tagline: 'Cat interior anti-jamur untuk kamar mandi & dapur',
    category: 'antijamur',
    pricePerLitre: 65000,
    availableSizes: [1, 5, 20],
    coverage: 10,
    coatsRecommended: 2,
    instructions: 'Aplikasikan setelah primer kering. 2-3 lapis untuk hasil optimal.',
    image: 'https://picsum.photos/seed/product-antijamur/200/200',
  },
  {
    id: 'warnalux-interior',
    name: 'WarnaLux Interior Washable',
    tagline: 'Cat interior premium mudah dibersihkan',
    category: 'topcoat',
    pricePerLitre: 55000,
    availableSizes: [1, 5, 20],
    coverage: 10,
    coatsRecommended: 2,
    instructions: 'Aplikasikan 2 lapis tipis. Tunggu 2 jam antar lapis. Dapat dicuci setelah 14 hari.',
    image: 'https://picsum.photos/seed/product-topcoat/200/200',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category)
}
