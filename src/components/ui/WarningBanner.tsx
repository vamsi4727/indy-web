import { AlertTriangle } from 'lucide-react'
import { type ReactNode } from 'react'

interface WarningBannerProps {
  title: string
  text: string
  actions?: ReactNode
  variant?: 'warning' | 'error' | 'info'
}

const styles = {
  warning: {
    container: 'bg-warning-light border-warning-border',
    icon: 'text-amber-600',
    title: 'text-warning-text',
  },
  error: {
    container: 'bg-error-light border-error-border',
    icon: 'text-red-600',
    title: 'text-error-text',
  },
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
  },
}

export default function WarningBanner({ title, text, actions, variant = 'warning' }: WarningBannerProps) {
  const s = styles[variant]
  return (
    <div
      role="alert"
      aria-live="polite"
      className={['rounded-xl border p-4 flex flex-col gap-3', s.container].join(' ')}
    >
      <div className="flex gap-3">
        <AlertTriangle size={20} className={['shrink-0 mt-0.5', s.icon].join(' ')} />
        <div className="flex-1">
          <div className={['font-semibold text-sm', s.title].join(' ')}>{title}</div>
          <p className="text-sm text-ink-700 mt-1">{text}</p>
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
