import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  fullWidth?: boolean
}

const variantClasses = {
  primary: 'bg-forest-700 text-cream-50 hover:bg-forest-800 focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2',
  secondary: 'bg-cream-100 text-forest-700 border border-forest-700/20 hover:bg-cream-200',
  outline: 'bg-transparent text-forest-700 border-2 border-forest-700 hover:bg-forest-700 hover:text-cream-50',
  ghost: 'bg-transparent text-ink-700 hover:bg-cream-100',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#20b858]',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-5 py-2.5 text-base min-h-[44px]',
  lg: 'px-7 py-3.5 text-lg min-h-[52px]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
