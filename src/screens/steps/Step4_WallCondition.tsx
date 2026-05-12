import { Upload } from 'lucide-react'
import RadioCard from '../../components/ui/RadioCard'
import WarningBanner from '../../components/ui/WarningBanner'
import Button from '../../components/ui/Button'
import WhatsAppCTA from '../../components/paint/WhatsAppCTA'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'

const DAMP_CONDITIONS = ['mold', 'damp', 'water']

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
            thumbnail={`https://picsum.photos/seed/${opt.value}-wall/160/80`}
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
