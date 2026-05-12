import ColourSwatch from '../../components/ui/ColourSwatch'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'

export default function Step11_ColourFamily() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()

  const toggle = (value: string) => {
    const current = state.preferred_colour_families
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    dispatch({ type: 'SET_COLOUR_FAMILIES', payload: updated })
  }

  return (
    <div
      role="group"
      aria-label={t.steps.s11.title}
      className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-items-center"
    >
      {t.steps.s11.options.map(opt => (
        <ColourSwatch
          key={opt.value}
          value={opt.value}
          label={opt.label}
          hex={opt.hex}
          selected={state.preferred_colour_families.includes(opt.value)}
          onSelect={toggle}
          multi
        />
      ))}
    </div>
  )
}
