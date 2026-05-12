import { CheckCircle, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import ButtonLink from '../components/ui/ButtonLink'
import WhatsAppCTA from '../components/paint/WhatsAppCTA'

export default function AssistantWelcome() {
  const { t } = useLanguage()

  return (
    <main id="main-content" className="min-h-[80vh] bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-forest-700/10 text-forest-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              Panduan Cat Gratis
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-4">
              {t.assistant.welcome.title.split('\n').map((line, i) => (
                <span key={i} className={i > 0 ? 'text-forest-700 block' : 'block'}>{line}</span>
              ))}
            </h1>
            <p className="text-ink-500 mb-8 leading-relaxed">{t.assistant.welcome.sub}</p>

            <ul className="flex flex-col gap-3 mb-8">
              {t.assistant.welcome.features.map(f => (
                <li key={f} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-forest-700 shrink-0" />
                  <span className="text-ink-700">{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonLink to="/panduan/mulai/step/1" size="lg">
                {t.assistant.welcome.cta} <ChevronRight size={18} />
              </ButtonLink>
              <WhatsAppCTA label="Tanya Dulu via WhatsApp" />
            </div>
          </div>

          {/* Right: Step preview */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg border border-ink-500/10 p-6">
              <div className="font-semibold text-ink-700 text-sm mb-4">Anda akan melewati:</div>
              {[
                'Jenis proyek & area cat',
                'Kondisi & permukaan dinding',
                'Ukuran area & kalkulator',
                'Perubahan warna & gaya',
                'Momen & pencahayaan',
                'Pilihan warna & rekomendasi',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-ink-500/10 last:border-0">
                  <div className="w-7 h-7 rounded-full bg-forest-700/10 text-forest-700 text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm text-ink-700">{step}</span>
                </div>
              ))}
              <div className="mt-4 text-xs text-ink-500 text-center">Selesai dalam ~5 menit</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
