type BadgeVariant = 'popular' | 'editor' | 'seasonal' | 'new' | 'discount'

interface BadgeProps {
  variant: BadgeVariant
  label?: string
}

const styles: Record<BadgeVariant, string> = {
  popular: 'bg-forest-700 text-cream-50',
  editor: 'bg-terra-500 text-white',
  seasonal: 'bg-gold-400 text-forest-900',
  new: 'bg-forest-200 text-forest-800',
  discount: 'bg-red-500 text-white',
}

const defaultLabels: Record<BadgeVariant, string> = {
  popular: 'Populer',
  editor: 'Pilihan Editor',
  seasonal: 'Lebaran Special',
  new: 'Baru',
  discount: 'Promo',
}

export default function Badge({ variant, label }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        styles[variant],
      ].join(' ')}
    >
      {label ?? defaultLabels[variant]}
    </span>
  )
}
