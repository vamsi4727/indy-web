import { useState } from 'react'
import { Eye, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react'
import type { Palette } from '../../data/palettes'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { useLanguage } from '../../context/LanguageContext'

interface PaletteCardProps {
  palette: Palette
  onSelect?: (id: string) => void
  selected?: boolean
}

function RoomVisualizer({ palette }: { palette: Palette }) {
  const [isDaytime, setIsDaytime] = useState(true)
  const { t } = useLanguage()
  const mainColour = palette.colours.find(c => c.role === 'main')?.hex ?? '#F5EAD5'
  const accentColour = palette.colours.find(c => c.role === 'accent')?.hex ?? '#8db09b'
  const ceilingColour = palette.colours.find(c => c.role === 'ceiling')?.hex ?? '#FFFFFF'

  return (
    <div>
      {/* CSS Room Silhouette */}
      <div
        className={[
          'relative w-full h-64 rounded-xl overflow-hidden border border-ink-500/10',
          !isDaytime ? 'brightness-75 sepia-[0.2]' : '',
        ].join(' ')}
        style={{ backgroundColor: mainColour }}
      >
        {/* Ceiling */}
        <div className="absolute top-0 left-0 right-0 h-12" style={{ backgroundColor: ceilingColour }} />
        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-ink-900/10" />
        {/* Left wall */}
        <div className="absolute left-0 top-12 bottom-8 w-12 opacity-80" style={{ backgroundColor: mainColour, filter: 'brightness(0.85)' }} />
        {/* Right wall */}
        <div className="absolute right-0 top-12 bottom-8 w-12 opacity-80" style={{ backgroundColor: mainColour, filter: 'brightness(0.75)' }} />
        {/* Window */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-28 h-20 rounded border-4 border-ink-900/20 bg-sky-200/60" />
        {/* Accent element */}
        <div className="absolute bottom-8 left-8 w-4 h-24 rounded-t-full" style={{ backgroundColor: accentColour }} />
        <div className="absolute bottom-8 right-8 w-4 h-16 rounded-t-full" style={{ backgroundColor: accentColour }} />
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-ink-500">{t.palette.disclaimer}</p>
        <button
          type="button"
          onClick={() => setIsDaytime(v => !v)}
          className="text-xs font-semibold text-forest-700 hover:underline"
        >
          {isDaytime ? t.palette.malamHari : t.palette.siangHari} →
        </button>
      </div>
    </div>
  )
}

export default function PaletteCard({ palette, onSelect, selected }: PaletteCardProps) {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div
        className={[
          'bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300',
          selected ? 'border-forest-700 ring-2 ring-forest-700' : 'border-ink-500/10',
        ].join(' ')}
      >
        {/* Image */}
        <div className="relative">
          <img
            src={palette.image}
            alt={palette.name}
            className="w-full h-56 object-cover"
            loading="lazy"
          />
          {palette.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={palette.badge} />
            </div>
          )}
        </div>

        {/* Colour swatches */}
        <div className="flex">
          {palette.colours.map(colour => (
            <div
              key={colour.code}
              className="flex-1 h-3"
              style={{ backgroundColor: colour.hex }}
              title={`${colour.name} (${colour.code})`}
            />
          ))}
        </div>

        <div className="p-5">
          <h3 className="font-serif text-xl font-semibold text-ink-900 mb-1">{palette.name}</h3>
          <p className="text-sm text-ink-500 mb-4 leading-relaxed">{palette.description}</p>

          {/* Colours detail */}
          <div className="flex flex-col gap-2 mb-4">
            {palette.colours.map(colour => (
              <div key={colour.code} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border border-ink-500/20 shrink-0"
                  style={{ backgroundColor: colour.hex }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink-900">{colour.name}</div>
                  <div className="text-xs text-ink-500">{colour.code} · {colour.role === 'main' ? 'Warna utama' : colour.role === 'accent' ? 'Aksen' : 'Plafon'}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {palette.styles.map(s => (
              <span key={s} className="text-xs bg-cream-100 text-ink-700 px-2.5 py-1 rounded-full font-medium">
                {s}
              </span>
            ))}
            <span className="text-xs bg-forest-50 text-forest-700 px-2.5 py-1 rounded-full font-medium border border-forest-700/20">
              {palette.finish}
            </span>
          </div>

          {/* Expanded detail */}
          {expanded && (
            <div className="mb-4 p-3 bg-cream-50 rounded-xl">
              <div className="text-sm font-semibold text-ink-700 mb-2">Cocok untuk:</div>
              <div className="flex flex-wrap gap-1">
                {palette.bestFor.map(r => (
                  <span key={r} className="text-xs bg-white border border-ink-500/20 text-ink-700 px-2 py-0.5 rounded">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-forest-700 text-forest-700 text-sm font-semibold hover:bg-forest-50 transition-colors min-h-[44px]"
              >
                <Eye size={16} />
                {t.palette.lihatRuangan}
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-ink-500/30 text-ink-700 text-sm font-semibold hover:bg-cream-50 transition-colors min-h-[44px]"
              >
                <ShoppingBag size={16} />
                {t.palette.pesan}
              </button>
            </div>

            <Button
              fullWidth
              onClick={() => onSelect?.(palette.id)}
              variant={selected ? 'primary' : 'primary'}
            >
              {t.palette.pilih}
            </Button>

            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="flex items-center justify-center gap-1 text-sm text-ink-500 hover:text-ink-900 transition-colors py-1"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {t.palette.detail}
            </button>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`${t.palette.lihatRuangan} — ${palette.name}`}>
        <RoomVisualizer palette={palette} />
      </Modal>
    </>
  )
}
