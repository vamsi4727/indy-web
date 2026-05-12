import { Check } from 'lucide-react'

interface ColourSwatchProps {
  value: string
  label: string
  hex: string
  selected: boolean
  onSelect: (value: string) => void
  multi?: boolean
}

export default function ColourSwatch({ value, label, hex, selected, onSelect, multi = false }: ColourSwatchProps) {
  const isGradient = hex === 'gradient'
  const isWhite = hex === '#FFFFFF'

  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      aria-label={`${label}, ${hex}, ${selected ? 'dipilih' : 'belum dipilih'}`}
      onClick={() => onSelect(value)}
      className="flex flex-col items-center gap-2 group"
    >
      <div
        className={[
          'relative w-16 h-16 rounded-full transition-all duration-200',
          isWhite ? 'border border-ink-500/20' : '',
          selected ? 'ring-2 ring-forest-700 ring-offset-2' : 'ring-0 ring-offset-0',
          'hover:scale-105',
        ].join(' ')}
        style={
          isGradient
            ? { background: 'linear-gradient(135deg, #1a4a3a, #5a8f6e, #c4622d, #c9952a, #5B8DB8)' }
            : { backgroundColor: hex }
        }
      >
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20">
            <Check size={20} className={isWhite || isGradient ? 'text-forest-700' : 'text-white'} strokeWidth={3} />
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-ink-700 text-center leading-tight">{label}</span>
    </button>
  )
}
