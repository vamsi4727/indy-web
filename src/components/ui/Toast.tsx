import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  onClose: () => void
  duration?: number
}

const icons = {
  success: <CheckCircle size={18} className="text-green-600" />,
  error: <XCircle size={18} className="text-red-600" />,
  warning: <AlertCircle size={18} className="text-amber-600" />,
  info: <Info size={18} className="text-blue-600" />,
}

const bg = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-amber-50 border-amber-200',
  info: 'bg-blue-50 border-blue-200',
}

export default function Toast({ message, type = 'info', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg',
        'animate-in fade-in slide-in-from-bottom-4 duration-300',
        bg[type],
      ].join(' ')}
    >
      {icons[type]}
      <span className="text-sm font-medium text-ink-900">{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi"
        className="ml-2 text-ink-500 hover:text-ink-900 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}
