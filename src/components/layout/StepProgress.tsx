import { Check } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

interface StepProgressProps {
  current: number
  total?: number
  labels?: string[]
}

export default function StepProgress({ current, total = 6, labels }: StepProgressProps) {
  const { t } = useLanguage()
  const progressLabel = t.assistant.progress
    .replace('{current}', String(current))
    .replace('{total}', String(total))

  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemax={total}
      aria-label={progressLabel}
      className="w-full"
    >
      {/* Mobile: text only */}
      <div className="sm:hidden text-sm font-medium text-ink-500 mb-4">{progressLabel}</div>

      {/* Desktop: step dots */}
      <div className="hidden sm:flex items-center gap-0">
        {Array.from({ length: total }).map((_, i) => {
          const step = i + 1
          const isCompleted = step < current
          const isCurrent = step === current
          const isUpcoming = step > current

          return (
            <div key={step} className="flex items-center flex-1">
              <div className="relative flex flex-col items-center">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200',
                    isCompleted ? 'bg-forest-700 text-white' : '',
                    isCurrent ? 'border-2 border-forest-700 text-forest-700 bg-white' : '',
                    isUpcoming ? 'border border-ink-500/30 text-ink-500 bg-white' : '',
                  ].join(' ')}
                >
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : step}
                </div>
                {labels?.[i] && (
                  <span className="absolute top-10 text-xs text-ink-500 whitespace-nowrap">
                    {labels[i]}
                  </span>
                )}
              </div>
              {step < total && (
                <div
                  className={[
                    'h-0.5 flex-1 mx-1 transition-colors duration-200',
                    isCompleted ? 'bg-forest-700' : 'bg-ink-500/20',
                  ].join(' ')}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1 bg-ink-500/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-forest-700 rounded-full transition-all duration-300"
          style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}
