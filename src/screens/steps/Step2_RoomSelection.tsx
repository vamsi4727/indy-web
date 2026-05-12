import CheckboxCard from '../../components/ui/CheckboxCard'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'

export default function Step2_RoomSelection() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()

  const isExterior = state.project_type === 'exterior'
  const options = isExterior ? t.steps.s2.exterior : t.steps.s2.interior

  const toggle = (value: string, checked: boolean) => {
    const updated = checked
      ? [...state.area_type, value]
      : state.area_type.filter(v => v !== value)
    dispatch({ type: 'SET_AREA_TYPE', payload: updated })
  }

  return (
    <div
      role="group"
      aria-label={t.steps.s2.title}
      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
    >
      {options.map(label => (
        <CheckboxCard
          key={label}
          value={label}
          label={label}
          checked={state.area_type.includes(label)}
          onChange={toggle}
        />
      ))}
    </div>
  )
}
