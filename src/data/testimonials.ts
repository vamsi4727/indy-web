export interface Testimonial {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  context: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dewi Rahayu',
    location: 'Bekasi, Jawa Barat',
    avatar: 'https://picsum.photos/seed/avatar-dewi/80/80',
    rating: 5,
    text: 'Saya bingung pilih warna untuk ruang tamu, tapi panduan ini luar biasa! Rekomendasi Warm Cream-nya pas banget, bikin rumah terasa lebih hangat dan nyaman. Sekarang tamu selalu memuji interiornya.',
    context: 'Ruang Tamu — Palet Adem Lebaran',
  },
  {
    id: '2',
    name: 'Budi Santoso',
    location: 'Bandung, Jawa Barat',
    avatar: 'https://picsum.photos/seed/avatar-budi/80/80',
    rating: 5,
    text: 'Kamar mandi saya sudah bertahun-tahun berjamur dan lembap. WarnaRumah AI langsung rekomendasikan WarnaSeal + WarnaFresh Anti-Jamur. Hasilnya? Bersih total dan sudah 8 bulan bebas jamur!',
    context: 'Kamar Mandi — Solusi Anti Bocor & Jamur',
  },
  {
    id: '3',
    name: 'Siti Nurhaliza',
    location: 'Surabaya, Jawa Timur',
    avatar: 'https://picsum.photos/seed/avatar-siti/80/80',
    rating: 5,
    text: 'Kalkulator catnya sangat akurat! Saya hitung untuk 3 kamar tidur, ternyata beli sesuai rekomendasi tidak ada sisa berlebih. Hemat uang dan tidak ada cat yang terbuang sia-sia.',
    context: '3 Kamar Tidur — Kalkulator Kebutuhan Cat',
  },
]
