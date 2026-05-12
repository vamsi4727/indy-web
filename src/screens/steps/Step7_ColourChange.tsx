import RadioCard from '../../components/ui/RadioCard'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'
import type { AssistantState } from '../../context/AssistantContext'

type Intensity = NonNullable<AssistantState['colour_change_intensity']>

export default function Step7_ColourChange() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()

  return (
    <div
      role="radiogroup"
      aria-label={t.steps.s7.title}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {t.steps.s7.options.map(opt => (
        <RadioCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          desc={opt.desc}
          badge={opt.badge}
          selected={state.colour_change_intensity === opt.value}
          onSelect={(v) => dispatch({ type: 'SET_COLOUR_CHANGE', payload: v as Intensity })}
        />
      ))}
    </div>
  )
}
