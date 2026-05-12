import WhatsAppCTA from '../components/paint/WhatsAppCTA'

const problems = [
  { seed: 'mold-wall2', title: 'Jamur & Lembap', solution: 'WarnaSeal + WarnaFresh Anti-Jamur' },
  { seed: 'peeling2', title: 'Cat Mengelupas', solution: 'Scraping + WarnaBase Primer + Cat Baru' },
  { seed: 'crack-wall2', title: 'Retak Rambut', solution: 'Patching Compound + Pengecatan Ulang' },
  { seed: 'water-seepage', title: 'Rembes / Bocor', solution: 'WarnaSeal Waterproofing System' },
]

export default function AntiBocor() {
  return (
    <main id="main-content" className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-forest-800 text-cream-50 py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-cream-50/10 text-cream-200 text-sm font-semibold px-4 py-2 rounded-full mb-5">
            Segera Hadir — Fitur Lengkap
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl mb-4">
            Solusi Dinding Lembap & Bocor yang Tepat
          </h1>
          <p className="text-cream-200 text-lg mb-8">
            Diagnosis masalah dinding Anda dan dapatkan rekomendasi produk yang tepat.
          </p>
          <WhatsAppCTA label="Konsultasi Gratis via WhatsApp" />
        </div>
      </section>

      {/* Problem cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl text-ink-900 mb-6">Kenali Masalah Dinding Anda</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {problems.map(p => (
            <div key={p.seed} className="bg-white rounded-2xl overflow-hidden border border-ink-500/10 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={`https://picsum.photos/seed/${p.seed}/600/250`}
                alt={p.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="font-semibold text-ink-900 mb-2">{p.title}</h3>
                <div className="text-sm text-ink-500">Solusi: <span className="text-forest-700 font-medium">{p.solution}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Product highlight */}
        <div className="bg-gradient-to-r from-forest-700 to-forest-800 rounded-2xl p-8 text-cream-50">
          <div className="text-sm font-semibold text-cream-200 mb-2">Produk Unggulan</div>
          <h3 className="font-serif text-2xl mb-2">WarnaSeal Waterproofing</h3>
          <p className="text-cream-200 mb-4">Proteksi bocor & lembap tahan cuaca ekstrem. Garansi 5 tahun.</p>
          <div className="flex gap-3">
            <WhatsAppCTA label="Konsultasi Gratis" />
          </div>
        </div>
      </section>
    </main>
  )
}
