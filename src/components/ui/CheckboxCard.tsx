import { type ReactNode } from 'react'
import { Check } from 'lucide-react'

interface CheckboxCardProps {
  value: string
  label: string
  desc?: string
  icon?: ReactNode
  checked: boolean
  onChange: (value: string, checked: boolean) => void
  gradient?: string
}

export default function CheckboxCard({
  value,
  label,
  desc,
  icon,
  checked,
  onChange,
  gradient,
}: CheckboxCardProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(value, !checked)}
      className={[
        'relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200 min-h-[44px] w-full',
        'hover:border-forest-700/50 hover:shadow-md',
        checked
          ? 'border-forest-700 bg-forest-50 shadow-md ring-1 ring-forest-700'
          : 'border-ink-500/20 bg-white',
      ].join(' ')}
    >
      {gradient && (
        <div
          className="w-full h-12 rounded-lg"
          style={{ background: gradient }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-3 w-full">
        {icon && (
          <span className={checked ? 'text-forest-700' : 'text-ink-500'}>
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-ink-900">{label}</div>
          {desc && <div className="text-sm text-ink-500 mt-0.5">{desc}</div>}
        </div>
        <div
          className={[
            'shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
            checked ? 'bg-forest-700 border-forest-700' : 'border-ink-500/40 bg-white',
          ].join(' ')}
        >
          {checked && <Check size={12} className="text-white" strokeWidth={3} />}
        </div>
      </div>
    </button>
  )
}
