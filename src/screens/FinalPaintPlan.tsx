import { Link, useNavigate } from 'react-router-dom'
import { FileText, Palette, Ruler, HardHat, Tag, AlertCircle, ShoppingBag, MessageCircle, Users, Save, Share2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useAssistant } from '../context/AssistantContext'
import { palettes } from '../data/palettes'
import PriceSummaryCard from '../components/paint/PriceSummaryCard'
import QuantityResultCard from '../components/paint/QuantityResultCard'
import { calcWallArea, estimatePrice } from '../utils/calculator'
import { waUrl } from '../components/paint/WhatsAppCTA'
import Button from '../components/ui/Button'

export default function FinalPaintPlan() {
  const { t } = useLanguage()
  const { state } = useAssistant()
  const navigate = useNavigate()
  const fp = t.finalPlan

  const selectedPalette = palettes.find(p => p.id === state.selected_palette_id) ?? palettes[0]
  const areaSqm =
    state.known_wall_area_m2 ??
    (state.room_length_m && state.room_width_m && state.wall_height_m
      ? calcWallArea(state.room_length_m, state.room_width_m, state.wall_height_m, state.doors_count, state.windows_count)
      : 30)

  const tier = state.quality_tier ?? 'tahan_lama'
  const price = estimatePrice(areaSqm, tier, state.primer_required)

  const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-forest-700">{icon}</span>
      <h2 className="font-semibold text-ink-900 text-lg">{title}</h2>
    </div>
  )

  const projectRows = [
    { label: 'Area Cat', value: state.area_type.length > 0 ? state.area_type.slice(0, 3).join(', ') : 'Interior' },
    { label: 'Luas Dinding', value: `${areaSqm.toFixed(1)} m²` },
    { label: 'Kondisi Dinding', value: state.wall_condition[0] ?? 'Normal' },
    { label: 'Gaya', value: state.style_preference.length > 0 ? state.style_preference.join(', ') : 'Minimalis' },
    { label: 'Momen', value: state.occasion.length > 0 ? state.occasion.join(', ') : 'Tidak ada' },
    { label: 'Kualitas Cat', value: tier.charAt(0).toUpperCase() + tier.slice(1).replace('_', ' ') },
  ]

  return (
    <main id="main-content" className="min-h-screen bg-cream-50 pb-32 lg:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">#WR-2025-{Math.floor(Math.random() * 90000 + 10000)}</div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink-900">{fp.title}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main column */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Project Summary */}
            <section className="bg-white rounded-2xl border border-ink-500/10 p-6">
              <SectionTitle icon={<FileText size={20} />} title={fp.project} />
              <div className="divide-y divide-ink-500/10">
                {projectRows.map(row => (
                  <div key={row.label} className="flex justify-between py-2.5 text-sm">
                    <span className="text-ink-500">{row.label}</span>
                    <span className="font-medium text-ink-900 text-right max-w-[60%]">{row.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Colour */}
            <section className="bg-white rounded-2xl border border-ink-500/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <SectionTitle icon={<Palette size={20} />} title={fp.colour} />
                <Link to="/panduan/rekomendasi-warna" className="text-sm text-forest-700 font-semibold hover:underline">
                  {fp.editColour}
                </Link>
              </div>
              {selectedPalette && (
                <div>
                  <div className="flex gap-1 mb-3">
                    {selectedPalette.colours.map(c => (
                      <div key={c.code} className="flex-1 h-8 rounded-lg" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                  <div className="font-serif font-semibold text-ink-900 text-lg">{selectedPalette.name}</div>
                  <div className="text-sm text-ink-500 mt-1">{selectedPalette.description}</div>
                </div>
              )}
            </section>

            {/* Quantity */}
            <section className="bg-white rounded-2xl border border-ink-500/10 p-6">
              <SectionTitle icon={<Ruler size={20} />} title={fp.quantity} />
              <QuantityResultCard areaSqm={areaSqm} primerRequired={state.primer_required} />
            </section>

            {/* Application */}
            <section className="bg-white rounded-2xl border border-ink-500/10 p-6">
              <SectionTitle icon={<HardHat size={20} />} title={fp.application} />
              <p className="text-sm text-ink-500 mb-3">
                {state.requires_treatment
                  ? 'Kondisi dinding Anda memerlukan tukang berpengalaman untuk hasil optimal.'
                  : 'Anda bisa melakukannya sendiri atau menggunakan jasa tukang kami.'}
              </p>
              <Link
                to="/jasa-tukang"
                className="text-sm font-semibold text-forest-700 hover:underline flex items-center gap-1"
              >
                <Users size={14} />
                {fp.findTukang}
              </Link>
            </section>

            {/* Price */}
            <section className="bg-white rounded-2xl border border-ink-500/10 p-6">
              <SectionTitle icon={<Tag size={20} />} title={fp.price} />
              <PriceSummaryCard price={price} />
            </section>

            {/* Notes */}
            <section className="bg-white rounded-2xl border border-ink-500/10 p-6">
              <SectionTitle icon={<AlertCircle size={20} />} title={fp.notes} />
              <ul className="flex flex-col gap-2">
                {fp.notes_items.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-500">
                    <span className="text-forest-700 shrink-0 mt-0.5">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sticky right panel (desktop) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 flex flex-col gap-3">
              <Button fullWidth size="lg" onClick={() => navigate('/checkout')}>
                <ShoppingBag size={18} />
                {fp.beli}
              </Button>
              <Button fullWidth variant="outline" onClick={() => navigate('/checkout')}>
                {fp.sample}
              </Button>
              <a
                href={waUrl(`Halo, saya sudah punya rencana cat. Bisa bantu proses selanjutnya?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20b858] transition-colors min-h-[44px]"
              >
                <MessageCircle size={18} />
                {fp.whatsapp}
              </a>
              <Button fullWidth variant="secondary" onClick={() => navigate('/jasa-tukang')}>
                <HardHat size={16} />
                {fp.bookTukang}
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" className="flex-1 text-sm" onClick={() => navigate('/rencana-tersimpan')}>
                  <Save size={14} /> {fp.save}
                </Button>
                <Button variant="ghost" className="flex-1 text-sm">
                  <Share2 size={14} /> {fp.share}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden h-[72px] bg-cream-50/95 backdrop-blur-sm border-t border-ink-500/10 flex items-center gap-3 px-4 z-20">
        <Button variant="outline" size="sm" onClick={() => navigate('/rencana-tersimpan')}>
          <Save size={16} />
        </Button>
        <Button fullWidth onClick={() => navigate('/checkout')}>
          <ShoppingBag size={16} />
          {fp.beli}
        </Button>
        <a
          href={waUrl(`Halo, saya sudah punya rencana cat.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#25D366] text-white shrink-0"
        >
          <MessageCircle size={18} />
        </a>
      </div>
    </main>
  )
}
