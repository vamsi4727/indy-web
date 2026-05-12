interface LogoMarkProps {
  size?: number
}

export function LogoMark({ size = 40 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={Math.round(size * 44 / 40)}
      viewBox="0 0 40 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* House roofline / paint drop hybrid */}
      <path
        d="M20 3L3 17v3h5v21h24V20h5v-3L20 3z"
        fill="#1a4a3a"
      />
      <path
        d="M20 24c-3.5 0-6 2.8-6 6.2C14 34.5 20 42 20 42s6-7.5 6-11.8C26 26.8 23.5 24 20 24z"
        fill="#c4622d"
      />
      <path
        d="M17 15h6v8h-6z"
        fill="#fdf8f0"
        opacity="0.4"
      />
    </svg>
  )
}

interface LogoFullProps {
  className?: string
}

export function LogoFull({ className = '' }: LogoFullProps) {
  return (
    <div className={['flex items-center gap-2', className].join(' ')}>
      <LogoMark size={36} />
      <div className="flex flex-col leading-none">
        <span className="font-serif text-xl font-normal text-forest-700 tracking-tight">
          WarnaRumah
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase text-terra-400 -mt-0.5">
          AI
        </span>
      </div>
    </div>
  )
}
