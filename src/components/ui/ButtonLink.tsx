import { type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonLinkProps extends Omit<LinkProps, 'className'> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-forest-700 text-cream-50 hover:bg-forest-800',
  secondary: 'bg-cream-100 text-forest-700 border border-forest-700/20 hover:bg-cream-200',
  outline: 'bg-transparent text-forest-700 border-2 border-forest-700 hover:bg-forest-700 hover:text-cream-50',
  ghost: 'bg-transparent text-ink-700 hover:bg-cream-100',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-5 py-2.5 text-base min-h-[44px]',
  lg: 'px-7 py-3.5 text-lg min-h-[52px]',
}

export default function ButtonLink({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Link>
  )
}
