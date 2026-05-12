import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import InputField from '../components/ui/InputField'
import NumberInput from '../components/ui/NumberInput'
import RadioCard from '../components/ui/RadioCard'
import CheckboxCard from '../components/ui/CheckboxCard'
import ColourSwatch from '../components/ui/ColourSwatch'
import WarningBanner from '../components/ui/WarningBanner'
import Accordion from '../components/ui/Accordion'
import { useState } from 'react'
import { Home } from 'lucide-react'

const BRAND_COLOURS = [
  { name: 'forest-700', hex: '#1a4a3a', label: 'Primary Brand' },
  { name: 'forest-500', hex: '#2d7a5a', label: 'Forest Mid' },
  { name: 'cream-50', hex: '#fdf8f0', label: 'Page Background' },
  { name: 'cream-100', hex: '#f5ead5', label: 'Surface' },
  { name: 'terra-400', hex: '#c4622d', label: 'Accent Terracotta' },
  { name: 'gold-400', hex: '#c9952a', label: 'Accent Gold' },
  { name: 'ink-900', hex: '#1a1e1f', label: 'Primary Text' },
  { name: 'ink-500', hex: '#6b7280', label: 'Muted Text' },
]

export default function DesignSystem() {
  const [radioVal, setRadioVal] = useState('')
  const [checkVals, setCheckVals] = useState<string[]>([])
  const [numVal, setNumVal] = useState(3)
  const [swatchVals, setSwatchVals] = useState<string[]>([])

  const toggleCheck = (v: string, c: boolean) =>
    setCheckVals(prev => c ? [...prev, v] : prev.filter(x => x !== v))

  return (
    <main id="main-content" className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-ink-900 mb-2">Design System</h1>
        <p className="text-ink-500 mb-12">WarnaRumah AI — Component Reference</p>

        {/* Colours */}
        <Section title="Brand Colours">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRAND_COLOURS.map(c => (
              <div key={c.name}>
                <div className="h-16 rounded-xl border border-ink-500/10 mb-2" style={{ backgroundColor: c.hex }} />
                <div className="text-sm font-medium text-ink-900">{c.name}</div>
                <div className="text-xs text-ink-500">{c.hex}</div>
                <div className="text-xs text-ink-500">{c.label}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <div className="flex flex-col gap-3">
            <div className="font-serif text-5xl text-ink-900">Display — DM Serif Display</div>
            <div className="font-serif text-3xl text-ink-900">Heading H2 — Serif</div>
            <div className="font-serif text-xl text-ink-900">Heading H3 — Serif</div>
            <div className="text-base text-ink-900">Body text — DM Sans Regular 16px</div>
            <div className="text-sm text-ink-500">Helper / caption — 14px muted</div>
            <div className="text-xs text-ink-500 uppercase tracking-wide">Tag / badge — 12px uppercase</div>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="whatsapp">WhatsApp</Button>
            <Button variant="danger">Danger</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="popular" />
            <Badge variant="editor" />
            <Badge variant="seasonal" />
            <Badge variant="new" />
            <Badge variant="discount" />
          </div>
        </Section>

        {/* Form inputs */}
        <Section title="Form Inputs">
          <div className="flex flex-col gap-4 max-w-sm">
            <InputField id="ds-text" label="Text Input" placeholder="Masukkan teks..." />
            <InputField id="ds-error" label="With Error" value="invalid" error="Nilai tidak valid" onChange={() => {}} />
            <NumberInput id="ds-num" label="Number Input" value={numVal} onChange={setNumVal} unit="m" />
          </div>
        </Section>

        {/* RadioCard */}
        <Section title="RadioCard">
          <div role="radiogroup" className="grid grid-cols-2 gap-3 max-w-sm">
            {['Interior', 'Eksterior'].map(v => (
              <RadioCard
                key={v}
                value={v}
                label={v}
                desc={`Pilih ${v.toLowerCase()}`}
                icon={<Home size={20} />}
                selected={radioVal === v}
                onSelect={setRadioVal}
              />
            ))}
          </div>
        </Section>

        {/* CheckboxCard */}
        <Section title="CheckboxCard">
          <div role="group" className="grid grid-cols-2 gap-3 max-w-sm">
            {['Bersih', 'Premium'].map(v => (
              <CheckboxCard
                key={v}
                value={v}
                label={v}
                checked={checkVals.includes(v)}
                onChange={toggleCheck}
              />
            ))}
          </div>
        </Section>

        {/* ColourSwatches */}
        <Section title="Colour Swatches">
          <div className="flex flex-wrap gap-6">
            {[
              { value: 'white', label: 'Putih', hex: '#FFFFFF' },
              { value: 'cream', label: 'Krem', hex: '#F5EAD5' },
              { value: 'forest', label: 'Hijau', hex: '#1a4a3a' },
              { value: 'terra', label: 'Terracotta', hex: '#c4622d' },
              { value: 'gradient', label: 'Multi', hex: 'gradient' },
            ].map(s => (
              <ColourSwatch
                key={s.value}
                {...s}
                selected={swatchVals.includes(s.value)}
                onSelect={(v) => setSwatchVals(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])}
                multi
              />
            ))}
          </div>
        </Section>

        {/* Warning banners */}
        <Section title="Banners">
          <div className="flex flex-col gap-3">
            <WarningBanner title="Warning Banner" text="Ini adalah contoh pesan peringatan penting." variant="warning" />
            <WarningBanner title="Error Banner" text="Terjadi kesalahan yang perlu segera diatasi." variant="error" />
            <WarningBanner title="Info Banner" text="Informasi tambahan untuk membantu Anda." variant="info" />
          </div>
        </Section>

        {/* Accordion */}
        <Section title="Accordion">
          <Accordion items={[
            { id: '1', title: 'Pertanyaan 1: Berapa banyak cat yang dibutuhkan?', content: 'Gunakan kalkulator kami di Langkah 6 untuk menghitung kebutuhan cat berdasarkan ukuran area Anda.' },
            { id: '2', title: 'Pertanyaan 2: Apakah perlu primer?', content: 'Primer diperlukan untuk dinding baru, dinding yang berubah dari warna gelap ke terang, atau dinding yang bermasalah.' },
          ]} />
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-semibold text-ink-900 text-xl mb-6 pb-3 border-b border-ink-500/10">{title}</h2>
      {children}
    </section>
  )
}
