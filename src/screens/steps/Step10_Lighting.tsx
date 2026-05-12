import { Sun, Cloud, Lightbulb, Lamp, Moon, HelpCircle } from 'lucide-react'
import RadioCard from '../../components/ui/RadioCard'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'

const icons: Record<string, React.ReactNode> = {
  bright: <Sun size={20} />,
  low: <Cloud size={20} />,
  cool: <Lightbulb size={20} />,
  warm: <Lamp size={20} />,
  dark: <Moon size={20} />,
  unsure: <HelpCircle size={20} />,
}

export default function Step10_Lighting() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()

  return (
    <div
      role="radiogroup"
      aria-label={t.steps.s10.title}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {t.steps.s10.options.map(opt => (
        <RadioCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          desc={opt.desc}
          icon={icons[opt.value]}
          selected={state.lighting === opt.value}
          onSelect={(v) => dispatch({ type: 'SET_LIGHTING', payload: v })}
        />
      ))}
    </div>
  )
}
