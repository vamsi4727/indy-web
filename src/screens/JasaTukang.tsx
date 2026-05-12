import { MapPin, CheckCircle } from 'lucide-react'
import WhatsAppCTA from '../components/paint/WhatsAppCTA'

const serviceTiers = [
  {
    name: 'Survey & Konsultasi',
    desc: 'Tukang datang ke lokasi, ukur area, dan berikan estimasi biaya.',
    price: 'Gratis',
    features: ['Kunjungan langsung', 'Estimasi biaya akurat', 'Rekomendasi produk'],
  },
  {
    name: 'Jasa Pengecatan',
    desc: 'Tukang berpengalaman mengerjakan pengecatan dari awal hingga selesai.',
    price: 'Mulai Rp 25rb/m²',
    features: ['Tukang bersertifikat', 'Garansi hasil kerja', 'Alat & material siap'],
    highlight: true,
  },
  {
    name: 'Paket Full Service',
    desc: 'Survey, prep dinding, pengecatan, dan pembersihan. All-in-one.',
    price: 'Mulai Rp 40rb/m²',
    features: ['All-inclusive', 'Garansi 1 tahun', 'Prioritas jadwal'],
  },
]

const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Bali', 'Medan', 'Yogyakarta', 'Semarang', 'Makassar', 'Palembang', 'Malang']

export default function JasaTukang() {
  return (
    <main id="main-content" className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-700 to-forest-900 text-cream-50 py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-cream-50/10 text-cream-200 text-sm font-semibold px-4 py-2 rounded-full mb-5">
            Segera Hadir — Booking Online
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl mb-4">
            Tukang Cat Bersertifikat, Siap di Kota Anda
          </h1>
          <p className="text-cream-200 text-lg mb-8">
            Lebih dari 500 tukang terverifikasi siap mengerjakan proyek cat Anda dengan standar kualitas terjamin.
          </p>
          <WhatsAppCTA label="Cek Ketersediaan di Kota Anda" />
        </div>
      </section>

      {/* Service tiers */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl text-ink-900 mb-6 text-center">Paket Layanan</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {serviceTiers.map(tier => (
            <div
              key={tier.name}
              className={[
                'rounded-2xl p-6 border',
                tier.highlight
                  ? 'bg-forest-700 text-cream-50 border-forest-700'
                  : 'bg-white border-ink-500/10',
              ].join(' ')}
            >
              <div className={['font-bold text-2xl mb-1', tier.highlight ? 'text-gold-400' : 'text-forest-700'].join(' ')}>
                {tier.price}
              </div>
              <h3 className={['font-semibold text-lg mb-2', tier.highlight ? 'text-cream-50' : 'text-ink-900'].join(' ')}>
                {tier.name}
              </h3>
              <p className={['text-sm mb-4', tier.highlight ? 'text-cream-200' : 'text-ink-500'].join(' ')}>{tier.desc}</p>
              <ul className="flex flex-col gap-2">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className={tier.highlight ? 'text-gold-400' : 'text-forest-700'} />
                    <span className={tier.highlight ? 'text-cream-100' : 'text-ink-700'}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* City availability */}
        <div className="bg-white rounded-2xl border border-ink-500/10 p-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-forest-700" />
            <h2 className="font-semibold text-ink-900 text-lg">Kota yang Dilayani</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {cities.map(city => (
              <span key={city} className="px-4 py-2 bg-cream-100 text-ink-700 rounded-full text-sm font-medium">
                {city}
              </span>
            ))}
            <span className="px-4 py-2 bg-forest-50 text-forest-700 rounded-full text-sm font-medium border border-forest-700/20">
              + 50 kota lainnya
            </span>
          </div>
          <WhatsAppCTA label="Cek Ketersediaan di Kota Anda" />
        </div>
      </section>
    </main>
  )
}
