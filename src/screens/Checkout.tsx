import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAssistant } from '../context/AssistantContext'
import { palettes } from '../data/palettes'
import Tabs from '../components/ui/Tabs'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import { calcWallArea, calcPaintLitres, formatRupiah, getPricePerLitre } from '../utils/calculator'
import { MessageCircle } from 'lucide-react'

export default function Checkout() {
  const { t } = useLanguage()
  const { state } = useAssistant()
  const co = t.checkout
  const [activeTab, setActiveTab] = useState('beli')
  const [tintingAgreed, setTintingAgreed] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [payment, setPayment] = useState<string | null>(null)

  const selectedPalette = palettes.find(p => p.id === state.selected_palette_id) ?? palettes[0]
  const tier = state.quality_tier ?? 'tahan_lama'
  const areaSqm = state.known_wall_area_m2 ??
    (state.room_length_m && state.room_width_m && state.wall_height_m
      ? calcWallArea(state.room_length_m, state.room_width_m, state.wall_height_m, state.doors_count, state.windows_count)
      : 30)
  const litres = calcPaintLitres(areaSqm, 2)
  const totalPrice = litres * getPricePerLitre(tier)

  const paymentMethods = ['Transfer Bank', 'COD', 'E-Wallet (GoPay/OVO)']

  const tabs = [
    {
      id: 'beli',
      label: co.tabBeli,
      content: (
        <div className="flex flex-col gap-6">
          {/* Order summary */}
          <div className="bg-cream-50 rounded-xl p-4 border border-ink-500/10">
            <div className="font-semibold text-ink-900 mb-3 text-sm">Ringkasan Pesanan</div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                {selectedPalette.colours.map(c => (
                  <div key={c.code} className="w-6 h-6 rounded-full border border-ink-500/10" style={{ backgroundColor: c.hex }} />
                ))}
              </div>
              <div>
                <div className="font-medium text-sm text-ink-900">{selectedPalette.name}</div>
                <div className="text-xs text-ink-500">Kualitas: {tier} · ~{litres}L</div>
              </div>
              <div className="ml-auto font-bold text-forest-700">{formatRupiah(totalPrice)}</div>
            </div>

            {/* Promo */}
            <div className="flex gap-2">
              <InputField
                id="promo"
                label=""
                placeholder={co.promoCode}
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="sm">{co.apply}</Button>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-4">
            <InputField id="name" label="Nama Penerima" value={name} onChange={e => setName(e.target.value)} />
            <InputField id="phone" label="No. WhatsApp" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
            <InputField id="address" label="Alamat Pengiriman Lengkap" value={address} onChange={e => setAddress(e.target.value)} />
          </div>

          {/* Payment */}
          <div>
            <div className="font-semibold text-ink-900 mb-3 text-sm">Metode Pembayaran</div>
            <div className="flex flex-col gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method}
                  type="button"
                  role="radio"
                  aria-checked={payment === method}
                  onClick={() => setPayment(method)}
                  className={[
                    'flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors',
                    payment === method ? 'border-forest-700 bg-forest-50' : 'border-ink-500/20 bg-white',
                  ].join(' ')}
                >
                  <div className={['w-4 h-4 rounded-full border-2', payment === method ? 'border-forest-700 bg-forest-700' : 'border-ink-500/40'].join(' ')} />
                  <span className="text-sm font-medium text-ink-900">{method}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tinting acknowledgement */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <input
              id="tinting"
              type="checkbox"
              checked={tintingAgreed}
              onChange={e => setTintingAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-forest-700 cursor-pointer"
            />
            <label htmlFor="tinting" className="text-sm text-ink-700 cursor-pointer">
              {co.tintingNote}
            </label>
          </div>

          <Button
            fullWidth
            size="lg"
            disabled={!tintingAgreed || !payment}
          >
            {co.lanjutBayar}
          </Button>
        </div>
      ),
    },
    {
      id: 'sample',
      label: co.tabSample,
      content: (
        <div className="flex flex-col gap-5">
          <div className="p-4 bg-cream-50 rounded-xl border border-ink-500/10">
            <div className="font-semibold text-ink-900 mb-1 text-sm">Pilih Sample Warna</div>
            <p className="text-xs text-ink-500">{co.sampleNote}</p>
          </div>
          <div className="flex flex-col gap-3">
            {palettes.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-ink-500/10">
                <input type="checkbox" id={`sample-${p.id}`} className="w-4 h-4 accent-forest-700" />
                <div className="flex gap-1">
                  {p.colours.map(c => (
                    <div key={c.code} className="w-5 h-5 rounded-full border border-ink-500/10" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
                <label htmlFor={`sample-${p.id}`} className="text-sm font-medium text-ink-900 flex-1 cursor-pointer">{p.name}</label>
                <span className="text-xs text-ink-500">Rp 25.000</span>
              </div>
            ))}
          </div>
          <InputField id="sample-address" label="Alamat Pengiriman" value={address} onChange={e => setAddress(e.target.value)} />
          <Button fullWidth size="lg">Pesan Sample</Button>
        </div>
      ),
    },
    {
      id: 'tukang',
      label: co.tabTukang,
      content: (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <InputField id="date-from" label="Tanggal Mulai" type="date" />
            <InputField id="date-to" label="Tanggal Selesai" type="date" />
          </div>
          <InputField id="tukang-address" label="Alamat Pengerjaan" value={address} onChange={e => setAddress(e.target.value)} />
          <InputField id="tukang-area" label="Luas Area (m²)" type="number" value={areaSqm} readOnly />
          <InputField id="tukang-notes" label="Catatan Tambahan" placeholder="Kondisi khusus, akses, dll." />
          <a
            href={`https://wa.me/6281200000000?text=${encodeURIComponent('Halo, saya ingin book jasa tukang cat. Alamat: ' + address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20b858] transition-colors min-h-[44px]"
          >
            <MessageCircle size={18} />
            {co.konfirmasiWa}
          </a>
        </div>
      ),
    },
  ]

  return (
    <main id="main-content" className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-ink-900 mb-8">{co.title}</h1>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>
    </main>
  )
}
