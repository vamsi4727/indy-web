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
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%231a3a5c'/%3E%3Ccircle cx='100' cy='85' r='50' fill='%232d5f8a' opacity='0.5'/%3E%3Ccircle cx='100' cy='115' r='35' fill='%235a9ec4' opacity='0.4'/%3E%3Crect x='60' y='140' width='80' height='24' rx='4' fill='%230f2a44'/%3E%3C/svg%3E",
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
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23f0ede8'/%3E%3Ccircle cx='100' cy='85' r='50' fill='%23d4c9be' opacity='0.6'/%3E%3Ccircle cx='100' cy='115' r='35' fill='%23b0a89e' opacity='0.4'/%3E%3Crect x='60' y='140' width='80' height='24' rx='4' fill='%23c4b8ac'/%3E%3C/svg%3E",
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
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%231a4a3a'/%3E%3Ccircle cx='100' cy='85' r='50' fill='%232d6a4f' opacity='0.5'/%3E%3Ccircle cx='100' cy='115' r='35' fill='%238db09b' opacity='0.4'/%3E%3Crect x='60' y='140' width='80' height='24' rx='4' fill='%230f2e22'/%3E%3C/svg%3E",
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
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23c4a882'/%3E%3Ccircle cx='100' cy='85' r='50' fill='%23d4b892' opacity='0.5'/%3E%3Ccircle cx='100' cy='115' r='35' fill='%23f5ead5' opacity='0.5'/%3E%3Crect x='60' y='140' width='80' height='24' rx='4' fill='%23a08860'/%3E%3C/svg%3E",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category)
}
