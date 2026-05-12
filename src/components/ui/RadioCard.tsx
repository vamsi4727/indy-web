import { type ReactNode } from 'react'
import { Check } from 'lucide-react'

interface RadioCardProps {
  value: string
  label: string
  desc?: string
  icon?: ReactNode
  badge?: string
  selected: boolean
  onSelect: (value: string) => void
  thumbnail?: string
  gradient?: string
}

export default function RadioCard({
  value,
  label,
  desc,
  icon,
  badge,
  selected,
  onSelect,
  thumbnail,
  gradient,
}: RadioCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={[
        'relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200 min-h-[44px] w-full',
        'hover:border-forest-700/50 hover:shadow-md',
        selected
          ? 'border-forest-700 bg-forest-50 shadow-md ring-1 ring-forest-700'
          : 'border-ink-500/20 bg-white',
      ].join(' ')}
    >
      {badge && (
        <span className="absolute top-2 right-2 bg-terra-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}

      {thumbnail && (
        <img
          src={thumbnail}
          alt=""
          className="w-full h-16 object-cover rounded-lg"
          loading="lazy"
        />
      )}

      {gradient && (
        <div
          className="w-full h-12 rounded-lg"
          style={{ background: gradient }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-3 w-full">
        {icon && (
          <span className={selected ? 'text-forest-700' : 'text-ink-500'}>
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-ink-900">{label}</div>
          {desc && <div className="text-sm text-ink-500 mt-0.5">{desc}</div>}
        </div>
        {selected && (
          <div className="shrink-0 w-5 h-5 rounded-full bg-forest-700 flex items-center justify-center">
            <Check size={12} className="text-white" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  )
}
