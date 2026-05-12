import RadioCard from '../../components/ui/RadioCard'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'

export default function Step5_SurfaceType() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()

  return (
    <div
      role="radiogroup"
      aria-label={t.steps.s5.title}
      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
    >
      {t.steps.s5.options.map(opt => (
        <RadioCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          selected={state.surface_type === opt.value}
          onSelect={(v) => dispatch({ type: 'SET_SURFACE_TYPE', payload: v })}
        />
      ))}
    </div>
  )
}
