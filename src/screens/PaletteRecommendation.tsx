import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAssistant } from '../context/AssistantContext'
import PaletteCard from '../components/paint/PaletteCard'
import { palettes } from '../data/palettes'
import WhatsAppCTA from '../components/paint/WhatsAppCTA'

export default function PaletteRecommendation() {
  const { t } = useLanguage()
  const { state, dispatch } = useAssistant()
  const navigate = useNavigate()

  const handleSelect = (id: string) => {
    dispatch({ type: 'SET_PALETTE', payload: id })
    navigate('/panduan/sistem-cat')
  }

  const subtitle = [
    state.area_type.length > 0 ? state.area_type.slice(0, 2).join(', ') : null,
    state.style_preference.length > 0 ? `gaya ${state.style_preference[0]}` : null,
    state.lighting ? `pencahayaan ${state.lighting}` : null,
    state.occasion.length > 0 ? `momen ${state.occasion[0]}` : null,
  ].filter(Boolean).join(', ')

  return (
    <main id="main-content" className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-3">
            {t.palette.title}
          </h1>
          {subtitle && (
            <p className="text-ink-500 max-w-xl mx-auto">
              Berdasarkan {subtitle}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {palettes.map(palette => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              onSelect={handleSelect}
              selected={state.selected_palette_id === palette.id}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/panduan/mulai/step/11"
            className="text-sm font-semibold text-ink-500 hover:text-forest-700 transition-colors flex items-center gap-1"
          >
            ← Ubah preferensi warna
          </Link>
          {state.selected_palette_id && (
            <button
              type="button"
              onClick={() => navigate('/panduan/sistem-cat')}
              className="inline-flex items-center gap-2 bg-forest-700 text-cream-50 px-6 py-3 rounded-xl font-semibold hover:bg-forest-800 transition-colors min-h-[44px]"
            >
              Lanjut ke Sistem Cat <ArrowRight size={18} />
            </button>
          )}
        </div>

        <div className="mt-10 p-6 bg-white rounded-2xl border border-ink-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-ink-900 mb-1">Tidak yakin memilih warna?</div>
            <div className="text-sm text-ink-500">Tim konsultan kami siap membantu via WhatsApp.</div>
          </div>
          <WhatsAppCTA label="Konsultasi Gratis" />
        </div>
      </div>
    </main>
  )
}
