import { Sparkles, RefreshCw, Moon, Brush, Droplets, Layers, Maximize2, Crown } from 'lucide-react'
import CheckboxCard from '../../components/ui/CheckboxCard'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'

const icons: Record<string, React.ReactNode> = {
  bersih: <Sparkles size={20} />,
  suasana: <RefreshCw size={20} />,
  lebaran: <Moon size={20} />,
  mudah_bersih: <Brush size={20} />,
  jamur: <Droplets size={20} />,
  pudar: <Layers size={20} />,
  luas: <Maximize2 size={20} />,
  premium: <Crown size={20} />,
}

export default function Step3_UserGoal() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()

  const toggle = (value: string, checked: boolean) => {
    const updated = checked
      ? [...state.user_goals, value]
      : state.user_goals.filter(v => v !== value)
    dispatch({ type: 'SET_USER_GOALS', payload: updated })
  }

  return (
    <div
      role="group"
      aria-label={t.steps.s3.title}
      className="grid grid-cols-2 sm:grid-cols-2 gap-3"
    >
      {t.steps.s3.options.map(opt => (
        <CheckboxCard
          key={opt.value}
          value={opt.value}
          label={opt.label}
          icon={icons[opt.value]}
          checked={state.user_goals.includes(opt.value)}
          onChange={toggle}
        />
      ))}
    </div>
  )
}
