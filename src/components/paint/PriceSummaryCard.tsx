import { Tag } from 'lucide-react'
import { formatRupiah } from '../../utils/calculator'
import type { EstimatedPrice } from '../../context/AssistantContext'

interface PriceSummaryCardProps {
  price: EstimatedPrice
}

export default function PriceSummaryCard({ price }: PriceSummaryCardProps) {
  const rows = [
    { label: 'Produk cat & material', value: price.products },
    { label: 'Alat & kuas', value: price.tools },
    { label: 'Jasa tukang', value: price.service },
    { label: 'Estimasi pengiriman', value: price.delivery },
  ]

  return (
    <div className="bg-white border border-forest-700/20 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Tag size={18} className="text-forest-700" />
        <h3 className="font-semibold text-ink-900">Estimasi Total Biaya</h3>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {rows.map(row => (
          row.value > 0 && (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-ink-500">{row.label}</span>
              <span className="font-medium text-ink-900">{formatRupiah(row.value)}</span>
            </div>
          )
        ))}
      </div>

      <div className="border-t border-ink-500/10 pt-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-ink-900">Total Estimasi</span>
          <span className="text-2xl font-bold text-forest-700">{formatRupiah(price.total)}</span>
        </div>
        <p className="text-xs text-ink-500 mt-2">
          * Harga estimasi. Konfirmasi harga aktual saat checkout.
        </p>
      </div>
    </div>
  )
}
