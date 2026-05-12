import { Home, Sun, Droplets, Layers, Wrench, HelpCircle } from 'lucide-react'
import RadioCard from '../../components/ui/RadioCard'
import { useAssistant } from '../../context/AssistantContext'
import { useLanguage } from '../../context/LanguageContext'
import type { AssistantState } from '../../context/AssistantContext'

type ProjectType = NonNullable<AssistantState['project_type']>

const icons: Record<ProjectType, React.ReactNode> = {
  interior: <Home size={22} />,
  exterior: <Sun size={22} />,
  damp: <Droplets size={22} />,
  roof: <Layers size={22} />,
  wood_metal: <Wrench size={22} />,
  unsure: <HelpCircle size={22} />,
}

export default function Step1_ProjectType() {
  const { state, dispatch } = useAssistant()
  const { t } = useLanguage()
  const opts = t.steps.s1.options

  const options: { value: ProjectType; label: string; desc: string }[] = [
    { value: 'interior', ...opts.interior },
    { value: 'exterior', ...opts.exterior },
    { value: 'damp', ...opts.damp },
    { value: 'roof', ...opts.roof },
    { value: 'wood_metal', ...opts.wood_metal },
    { value: 'unsure', ...opts.unsure },
  ]

  return (
    <div>
      <div
        role="radiogroup"
        aria-label={t.steps.s1.title}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {options.map(opt => (
          <RadioCard
            key={opt.value}
            value={opt.value}
            label={opt.label}
            desc={opt.desc}
            icon={icons[opt.value]}
            selected={state.project_type === opt.value}
            onSelect={(v) => dispatch({ type: 'SET_PROJECT_TYPE', payload: v as ProjectType })}
          />
        ))}
      </div>
    </div>
  )
}
