import { Upload } from 'lucide-react'
import RadioCard from '../../components/ui/RadioCard'
import WarningBanner from '../../components/ui/WarningBanner'
import Button from '../../components/ui/Button'
import WhatsAppCTA from '../../components/paint/WhatsAppCTA'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'

const DAMP_CONDITIONS = ['mold', 'damp', 'water']

const CONDITION_GRADIENTS: Record<string, string> = {
  faded: 'linear-gradient(135deg, #9a9490 0%, #d4cfc9 100%)',
  peeling: 'linear-gradient(135deg, #c4622d 0%, #e8a87c 50%, #f5ead5 100%)',
  mold: 'linear-gradient(135deg, #1a4a3a 0%, #2d6a4f 50%, #52796f 100%)',
  damp: 'linear-gradient(135deg, #1a3a5c 0%, #2d5f8a 50%, #a8d5e8 100%)',
  crack: 'linear-gradient(135deg, #4a4a4a 0%, #6e6e6e 50%, #b0ada8 100%)',
  water: 'linear-gradient(135deg, #0f3460 0%, #1a5276 50%, #7fb3c8 100%)',
  new: 'linear-gradient(135deg, #f5ead5 0%, #fafaf8 100%)',
}

export default function Step4_WallCondition() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()
  const s4 = t.steps.s4

  const showWarning = state.wall_condition.some(c => DAMP_CONDITIONS.includes(c))

  const handleSelect = (value: string) => {
    dispatch({ type: 'SET_WALL_CONDITION', payload: [value] })
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        role="radiogroup"
        aria-label={s4.title}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {s4.options.map(opt => (
          <RadioCard
            key={opt.value}
            value={opt.value}
            label={opt.label}
            gradient={CONDITION_GRADIENTS[opt.value]}
            selected={state.wall_condition.includes(opt.value)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {showWarning && (
        <WarningBanner
          title={s4.warning.title}
          text={s4.warning.text}
          variant="warning"
          actions={
            <>
              <Button size="sm" variant="secondary" onClick={() => {}}>
                {s4.warning.cta1}
              </Button>
              <WhatsAppCTA label={s4.warning.cta2} variant="button" />
            </>
          }
        />
      )}

      {/* Upload option */}
      <div className="border-2 border-dashed border-ink-500/30 rounded-xl p-6 flex flex-col items-center gap-3 hover:border-forest-700/50 transition-colors cursor-pointer">
        <Upload size={24} className="text-ink-500" />
        <div className="text-center">
          <div className="font-medium text-ink-700 text-sm">{s4.uploadLabel}</div>
          <div className="text-xs text-ink-500 mt-1">{s4.uploadHelper}</div>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-forest-700 hover:underline"
          onClick={() => dispatch({ type: 'SET_PHOTO_UPLOADED', payload: true })}
        >
          Pilih File
        </button>
        {state.photo_uploaded && (
          <span className="text-xs text-forest-700 font-medium">Foto berhasil diunggah</span>
        )}
      </div>
    </div>
  )
}
