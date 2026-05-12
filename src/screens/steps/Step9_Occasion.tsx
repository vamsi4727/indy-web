import CheckboxCard from '../../components/ui/CheckboxCard'
import Button from '../../components/ui/Button'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'
import { useNavigate } from 'react-router-dom'

export default function Step9_Occasion() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const toggle = (value: string, checked: boolean) => {
    const updated = checked
      ? [...state.occasion, value]
      : state.occasion.filter(v => v !== value)
    dispatch({ type: 'SET_OCCASION', payload: updated })
  }

  const skip = () => {
    dispatch({ type: 'SET_OCCASION', payload: [] })
    navigate('/panduan/mulai/step/10')
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        role="group"
        aria-label={t.steps.s9.title}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {t.steps.s9.options.map(opt => (
          <CheckboxCard
            key={opt.value}
            value={opt.value}
            label={opt.label}
            checked={state.occasion.includes(opt.value)}
            onChange={toggle}
          />
        ))}
      </div>
      <Button variant="ghost" onClick={skip} className="self-start text-sm text-ink-500">
        {t.steps.s9.skip}
      </Button>
    </div>
  )
}
