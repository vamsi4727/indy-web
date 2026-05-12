import CheckboxCard from '../../components/ui/CheckboxCard'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'

export default function Step8_StylePreference() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()

  const toggle = (value: string, checked: boolean) => {
    const updated = checked
      ? [...state.style_preference, value]
      : state.style_preference.filter(v => v !== value)
    dispatch({ type: 'SET_STYLE', payload: updated })
  }

  return (
    <div
      role="group"
      aria-label={t.steps.s8.title}
      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
    >
      {t.steps.s8.options.map(opt => (
        <CheckboxCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          gradient={opt.gradient}
          checked={state.style_preference.includes(opt.value)}
          onChange={toggle}
        />
      ))}
    </div>
  )
}
