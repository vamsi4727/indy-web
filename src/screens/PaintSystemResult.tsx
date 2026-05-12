import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAssistant } from '../context/AssistantContext'
import { palettes } from '../data/palettes'
import ApplicationTimeline from '../components/paint/ApplicationTimeline'
import QuantityResultCard from '../components/paint/QuantityResultCard'
import Button from '../components/ui/Button'
import { calcWallArea } from '../utils/calculator'
import { ArrowRight } from 'lucide-react'

type QualityTier = 'hemat' | 'tahan_lama' | 'premium'

interface TierOption {
  id: QualityTier
  label: string
  price: string
  years: string
  odour: number
}

const TIER_ODOUR: Record<QualityTier, number> = { hemat: 3, tahan_lama: 2, premium: 1 }

export default function PaintSystemResult() {
  const { t } = useLanguage()
  const { state, dispatch } = useAssistant()
  const navigate = useNavigate()

  const ps = t.paintSystem
  const tiers: TierOption[] = [
    { id: 'hemat', ...ps.hemat, odour: TIER_ODOUR.hemat },
    { id: 'tahan_lama', ...ps.tahanLama, odour: TIER_ODOUR.tahan_lama },
    { id: 'premium', ...ps.premium, odour: TIER_ODOUR.premium },
  ]

  const selectedPalette = palettes.find(p => p.id === state.selected_palette_id)

  const areaSqm =
    state.known_wall_area_m2 ??
    (state.room_length_m && state.room_width_m && state.wall_height_m
      ? calcWallArea(state.room_length_m, state.room_width_m, state.wall_height_m, state.doors_count, state.windows_count)
      : 30)

  const handleSelectTier = (tier: QualityTier) => {
    dispatch({ type: 'SET_QUALITY', payload: tier })
    dispatch({ type: 'SET_MEASUREMENT', payload: {} })
  }

  const goNext = () => {
    if (!state.quality_tier) {
      dispatch({ type: 'SET_QUALITY', payload: 'tahan_lama' })
    }
    navigate('/panduan/rencana-cat')
  }

  return (
    <main id="main-content" className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-8 text-center">
          {ps.title}
        </h1>

        {/* Selected palette reminder */}
        {selectedPalette && (
          <div className="bg-white rounded-2xl border border-ink-500/10 p-4 flex items-center gap-4 mb-8">
            <div className="flex gap-1">
              {selectedPalette.colours.map(c => (
                <div key={c.code} className="w-8 h-8 rounded-full border border-ink-500/10" style={{ backgroundColor: c.hex }} />
              ))}
            </div>
            <div>
              <div className="font-semibold text-ink-900">{selectedPalette.name}</div>
              <div className="text-sm text-ink-500">{selectedPalette.finish}</div>
            </div>
          </div>
        )}

        {/* Quality selector */}
        <div className="mb-8">
          <h2 className="font-semibold text-ink-900 mb-4">{ps.qualityTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tiers.map(tier => (
              <button
                key={tier.id}
                type="button"
                onClick={() => handleSelectTier(tier.id)}
                className={[
                  'p-5 rounded-2xl border-2 text-left transition-all duration-200',
                  state.quality_tier === tier.id
                    ? 'border-forest-700 bg-forest-50 shadow-md'
                    : 'border-ink-500/20 bg-white hover:border-forest-700/50',
                ].join(' ')}
              >
                <div className="font-bold text-ink-900 text-lg mb-1">{tier.label}</div>
                <div className="text-forest-700 font-semibold text-sm mb-2">{tier.price}</div>
                <div className="text-ink-500 text-xs mb-3">{tier.years}</div>
                <div className="flex gap-1 items-center">
                  <span className="text-xs text-ink-500 mr-1">Odour:</span>
                  {[1, 2, 3].map(n => (
                    <div
                      key={n}
                      className={[
                        'w-3 h-3 rounded-full',
                        n <= tier.odour ? 'bg-terra-400' : 'bg-ink-500/20',
                      ].join(' ')}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Application timeline */}
          <div>
            <h2 className="font-semibold text-ink-900 mb-4">Langkah Pengecatan</h2>
            <ApplicationTimeline
              requiresTreatment={state.requires_treatment}
              primerRequired={state.primer_required}
              areaSqm={areaSqm}
            />
          </div>

          {/* Quantity */}
          <div>
            <QuantityResultCard
              areaSqm={areaSqm}
              coats={2}
              primerRequired={state.primer_required}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="lg" onClick={goNext}>
            Lihat Rencana Lengkap <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </main>
  )
}
