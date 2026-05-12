import { Bell } from 'lucide-react'
import WhatsAppCTA from '../components/paint/WhatsAppCTA'

const inspirations = [
  { image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&q=80', label: 'Ruang Tamu Modern' },
  { image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop&q=80', label: 'Kamar Tidur Minimalis' },
  { image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&q=80', label: 'Dapur Ceria' },
  { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&q=80', label: 'Teras Tropis' },
  { image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop&q=80', label: 'Kamar Mandi Spa' },
  { image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop&q=80', label: 'Ruang Keluarga' },
  { image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&q=80', label: 'Eksterior Elegan' },
  { image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop&q=80', label: 'Musholla Tenang' },
  { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80', label: 'Kamar Anak' },
]

export default function InsirasiWarna() {
  return (
    <main id="main-content" className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-700 to-forest-800 text-cream-50 py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-cream-50/10 text-cream-200 text-sm font-semibold px-4 py-2 rounded-full mb-5">
            Segera Hadir
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl mb-4">
            Temukan Inspirasi Warna untuk Setiap Sudut Rumah Anda
          </h1>
          <p className="text-cream-200 text-lg mb-8">
            Ratusan palet warna terkurasi oleh desainer interior terbaik Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-cream-50 text-forest-700 px-6 py-3 rounded-xl font-semibold hover:bg-cream-100 transition-colors min-h-[44px]"
            >
              <Bell size={18} />
              Notifikasi saya saat tersedia
            </button>
            <WhatsAppCTA label="Konsultasi Sekarang" />
          </div>
        </div>
      </section>

      {/* Colour of the Month */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-terra-400 to-gold-400 rounded-2xl p-8 text-white mb-10">
          <div className="text-sm font-semibold opacity-80 mb-2">Warna Bulan Ini</div>
          <h2 className="font-serif text-3xl mb-2">Terracotta Hangat</h2>
          <p className="opacity-90">Warna bumi yang hangat dan membumi — sempurna untuk ruang tamu dan teras Anda.</p>
        </div>

        {/* Masonry grid placeholder */}
        <h2 className="font-serif text-2xl text-ink-900 mb-6">Inspirasi Populer</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {inspirations.map(item => (
            <div key={item.label} className="relative rounded-xl overflow-hidden bg-cream-100">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
