import { MessageCircle } from 'lucide-react'

interface WhatsAppCTAProps {
  message?: string
  label?: string
  className?: string
  variant?: 'button' | 'fab'
}

const DEFAULT_MESSAGE = 'Halo WarnaRumah AI, saya ingin konsultasi pilihan cat.'
const WA_NUMBER = '6281200000000'

export function waUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export default function WhatsAppCTA({
  message = DEFAULT_MESSAGE,
  label = 'Konsultasi via WhatsApp',
  className = '',
  variant = 'button',
}: WhatsAppCTAProps) {
  if (variant === 'fab') {
    return (
      <a
        href={waUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi via WhatsApp"
        className={[
          'fixed bottom-20 right-4 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20b858] transition-colors lg:hidden',
          className,
        ].join(' ')}
      >
        <MessageCircle size={24} />
      </a>
    )
  }

  return (
    <a
      href={waUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20b858] transition-colors min-h-[44px]',
        className,
      ].join(' ')}
    >
      <MessageCircle size={18} />
      {label}
    </a>
  )
}
