import { type InputHTMLAttributes, type ReactNode } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helper?: string
  leadingIcon?: ReactNode
  trailingText?: string
  id: string
}

export default function InputField({
  label,
  error,
  helper,
  leadingIcon,
  trailingText,
  id,
  className = '',
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-ink-700">
        {label}
      </label>
      <div className="relative flex items-center">
        {leadingIcon && (
          <div className="absolute left-3 text-ink-500">{leadingIcon}</div>
        )}
        <input
          id={id}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
          aria-invalid={!!error}
          className={[
            'w-full rounded-lg border bg-white px-4 py-2.5 text-base text-ink-900 placeholder:text-ink-500',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700',
            'min-h-[44px]',
            leadingIcon ? 'pl-10' : '',
            trailingText ? 'pr-16' : '',
            error ? 'border-red-400 bg-red-50' : 'border-ink-500/30',
            className,
          ].join(' ')}
          {...props}
        />
        {trailingText && (
          <span className="absolute right-3 text-sm font-medium text-ink-500">{trailingText}</span>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      {helper && !error && (
        <p id={`${id}-helper`} className="text-sm text-ink-500">
          {helper}
        </p>
      )}
    </div>
  )
}
