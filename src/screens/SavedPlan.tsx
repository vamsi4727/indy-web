import { useState } from 'react'
import { PaintBucket, Download, Link as LinkIcon, ShoppingBag, MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAssistant } from '../context/AssistantContext'
import { palettes } from '../data/palettes'
import ButtonLink from '../components/ui/ButtonLink'
import Toast from '../components/ui/Toast'
import { waUrl } from '../components/paint/WhatsAppCTA'

export default function SavedPlan() {
  const { t } = useLanguage()
  const { state } = useAssistant()
  const sp = t.savedPlan
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const hasPlan = !!state.selected_palette_id || state.area_type.length > 0
  const selectedPalette = palettes.find(p => p.id === state.selected_palette_id)
  const planId = '#WR-2025-001245'

  const toast = (msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
  }

  if (!hasPlan) {
    return (
      <main id="main-content" className="min-h-[60vh] bg-cream-50 flex items-center justify-center">
        <div className="text-center px-4">
          <PaintBucket size={64} className="text-forest-700/20 mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-ink-900 mb-3">{sp.empty}</h1>
          <ButtonLink to="/panduan">{sp.emptyCta}</ButtonLink>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-ink-900">{sp.title}</h1>
            <div className="text-sm text-ink-500 mt-1">
              {planId} · Dibuat: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Plan summary card */}
        <div className="bg-white rounded-2xl border border-ink-500/10 p-6 mb-6">
          {selectedPalette && (
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                {selectedPalette.colours.map(c => (
                  <div key={c.code} className="flex-1 h-4 rounded" style={{ backgroundColor: c.hex }} />
                ))}
              </div>
              <div className="font-serif font-semibold text-ink-900">{selectedPalette.name}</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            {state.area_type.length > 0 && (
              <div>
                <div className="text-ink-500">Area</div>
                <div className="font-medium text-ink-900">{state.area_type.slice(0, 2).join(', ')}</div>
              </div>
            )}
            {(state.known_wall_area_m2 || state.room_length_m) && (
              <div>
                <div className="text-ink-500">Luas</div>
                <div className="font-medium text-ink-900">{state.known_wall_area_m2 ?? '~'} m²</div>
              </div>
            )}
            {state.quality_tier && (
              <div>
                <div className="text-ink-500">Kualitas</div>
                <div className="font-medium text-ink-900 capitalize">{state.quality_tier}</div>
              </div>
            )}
            {state.style_preference.length > 0 && (
              <div>
                <div className="text-ink-500">Gaya</div>
                <div className="font-medium text-ink-900">{state.style_preference[0]}</div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <ButtonLink to="/checkout" fullWidth>
            <ShoppingBag size={16} />
            {sp.lanjutCheckout}
          </ButtonLink>
          <a
            href={waUrl(`Halo, saya sudah punya rencana cat ${planId}. Bisa bantu proses selanjutnya?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20b858] transition-colors min-h-[44px]"
          >
            <MessageCircle size={16} />
            {sp.shareWa}
          </a>
        </div>

        <div className="flex gap-3 mt-3">
          <button
            type="button"
            onClick={() => toast(sp.pdfComingSoon)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-ink-500/20 text-sm font-semibold text-ink-700 hover:bg-cream-100 transition-colors min-h-[44px]"
          >
            <Download size={16} />
            {sp.downloadPdf}
          </button>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).catch(() => {})
              toast('Tautan berhasil disalin!')
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-ink-500/20 text-sm font-semibold text-ink-700 hover:bg-cream-100 transition-colors min-h-[44px]"
          >
            <LinkIcon size={16} />
            {sp.copyLink}
          </button>
        </div>
      </div>

      {showToast && (
        <Toast message={toastMsg} type="info" onClose={() => setShowToast(false)} />
      )}
    </main>
  )
}
