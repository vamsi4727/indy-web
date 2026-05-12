export interface Room {
  id: string
  name: string
  image: string
  href: string
}

export const rooms: Room[] = [
  { id: 'ruang-tamu', name: 'Ruang Tamu', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&q=80', href: '/panduan' },
  { id: 'kamar-tidur', name: 'Kamar Tidur', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop&q=80', href: '/panduan' },
  { id: 'kamar-anak', name: 'Kamar Anak', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80', href: '/panduan' },
  { id: 'dapur', name: 'Dapur', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&q=80', href: '/panduan' },
  { id: 'kamar-mandi', name: 'Kamar Mandi', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop&q=80', href: '/panduan' },
  { id: 'musholla', name: 'Musholla', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop&q=80', href: '/panduan' },
  { id: 'eksterior', name: 'Eksterior', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&q=80', href: '/panduan' },
  { id: 'teras', name: 'Teras', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&q=80', href: '/panduan' },
]
