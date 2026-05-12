import { Droplets, Layers, ZapOff, CloudRain } from 'lucide-react'
import WhatsAppCTA from '../components/paint/WhatsAppCTA'
import type { ReactNode } from 'react'

interface Problem {
  title: string
  solution: string
  bgClass: string
  icon: ReactNode
}

const problems: Problem[] = [
  {
    title: 'Jamur & Lembap',
    solution: 'WarnaSeal + WarnaFresh Anti-Jamur',
    bgClass: 'from-emerald-900 via-green-800 to-teal-700',
    icon: <Droplets size={48} className="text-emerald-200 opacity-70" />,
  },
  {
    title: 'Cat Mengelupas',
    solution: 'Scraping + WarnaBase Primer + Cat Baru',
    bgClass: 'from-orange-900 via-amber-700 to-amber-500',
    icon: <Layers size={48} className="text-orange-200 opacity-70" />,
  },
  {
    title: 'Retak Rambut',
    solution: 'Patching Compound + Pengecatan Ulang',
    bgClass: 'from-stone-800 via-stone-600 to-stone-400',
    icon: <ZapOff size={48} className="text-stone-200 opacity-70" />,
  },
  {
    title: 'Rembes / Bocor',
    solution: 'WarnaSeal Waterproofing System',
    bgClass: 'from-blue-950 via-blue-800 to-blue-600',
    icon: <CloudRain size={48} className="text-blue-200 opacity-70" />,
  },
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
            <div key={p.title} className="bg-white rounded-2xl overflow-hidden border border-ink-500/10 shadow-sm hover:shadow-md transition-shadow">
              <div className={`h-48 bg-gradient-to-br ${p.bgClass} flex items-center justify-center`}>
                {p.icon}
              </div>
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
