export interface Room {
  id: string
  name: string
  image: string
  href: string
}

export const rooms: Room[] = [
  { id: 'ruang-tamu', name: 'Ruang Tamu', image: 'https://picsum.photos/seed/livingroom-room/400/300', href: '/panduan' },
  { id: 'kamar-tidur', name: 'Kamar Tidur', image: 'https://picsum.photos/seed/bedroom-room/400/300', href: '/panduan' },
  { id: 'kamar-anak', name: 'Kamar Anak', image: 'https://picsum.photos/seed/kidsroom-room/400/300', href: '/panduan' },
  { id: 'dapur', name: 'Dapur', image: 'https://picsum.photos/seed/kitchen-room/400/300', href: '/panduan' },
  { id: 'kamar-mandi', name: 'Kamar Mandi', image: 'https://picsum.photos/seed/bathroom-room/400/300', href: '/panduan' },
  { id: 'musholla', name: 'Musholla', image: 'https://picsum.photos/seed/prayerroom-room/400/300', href: '/panduan' },
  { id: 'eksterior', name: 'Eksterior', image: 'https://picsum.photos/seed/exterior-room/400/300', href: '/panduan' },
  { id: 'teras', name: 'Teras', image: 'https://picsum.photos/seed/terrace-room/400/300', href: '/panduan' },
]
