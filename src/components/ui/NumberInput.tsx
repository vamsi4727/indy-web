import { Minus, Plus } from 'lucide-react'

interface NumberInputProps {
  label: string
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  step?: number
  id: string
  helper?: string
  unit?: string
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  id,
  helper,
  unit,
}: NumberInputProps) {
  const decrement = () => onChange(Math.max(min, value - step))
  const increment = () => onChange(Math.min(max, value + step))

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-ink-700">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          aria-label={`Kurangi ${label}`}
          disabled={value <= min}
          className="flex items-center justify-center w-11 h-11 rounded-lg border border-ink-500/30 bg-white text-ink-700 hover:bg-cream-100 disabled:opacity-40 transition-colors"
        >
          <Minus size={16} />
        </button>
        <div className="flex items-center gap-1.5 flex-1">
          <input
            id={id}
            type="number"
            value={value}
            onChange={(e) => {
              const v = parseFloat(e.target.value)
              if (!isNaN(v) && v >= min && v <= max) onChange(v)
            }}
            min={min}
            max={max}
            step={step}
            className="w-full text-center rounded-lg border border-ink-500/30 bg-white px-3 py-2.5 text-base font-semibold text-ink-900 focus:outline-none focus:ring-2 focus:ring-forest-700 min-h-[44px]"
          />
          {unit && <span className="text-sm text-ink-500 shrink-0">{unit}</span>}
        </div>
        <button
          type="button"
          onClick={increment}
          aria-label={`Tambah ${label}`}
          disabled={value >= max}
          className="flex items-center justify-center w-11 h-11 rounded-lg border border-ink-500/30 bg-white text-ink-700 hover:bg-cream-100 disabled:opacity-40 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      {helper && <p className="text-sm text-ink-500">{helper}</p>}
    </div>
  )
}
