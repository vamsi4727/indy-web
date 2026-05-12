import { Info, Layers, Ruler } from 'lucide-react'
import { calcPaintLitres, recommendPackSizes } from '../../utils/calculator'

interface QuantityResultCardProps {
  areaSqm: number
  coats?: number
  primerRequired?: boolean
}

export default function QuantityResultCard({ areaSqm, coats = 2, primerRequired = false }: QuantityResultCardProps) {
  const topcoatLitres = calcPaintLitres(areaSqm, coats)
  const primerLitres = primerRequired ? calcPaintLitres(areaSqm, 1, 12) : 0

  return (
    <div className="bg-cream-50 border border-forest-700/20 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Ruler size={18} className="text-forest-700" />
        <h3 className="font-semibold text-ink-900">Estimasi Kebutuhan Cat</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-ink-500 mb-0.5">Luas Dinding</div>
          <div className="text-2xl font-bold text-forest-700">{areaSqm.toFixed(1)}</div>
          <div className="text-xs text-ink-500">m²</div>
        </div>
        <div>
          <div className="text-xs text-ink-500 mb-0.5">Jumlah Lapisan</div>
          <div className="text-2xl font-bold text-forest-700">{coats}</div>
          <div className="text-xs text-ink-500">lapisan cat</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-ink-500/10">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-forest-700" />
            <div>
              <div className="text-sm font-semibold text-ink-900">Cat Utama</div>
              <div className="text-xs text-ink-500">{recommendPackSizes(topcoatLitres)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-forest-700">~{topcoatLitres}L</div>
          </div>
        </div>

        {primerRequired && (
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-200">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-amber-600" />
              <div>
                <div className="text-sm font-semibold text-ink-900">Primer</div>
                <div className="text-xs text-ink-500">{recommendPackSizes(primerLitres)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-amber-600">~{primerLitres}L</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-ink-500">
        <Info size={12} className="shrink-0 mt-0.5" />
        <span>Sudah termasuk 10% buffer. Estimasi berdasarkan coverage 10 m²/L per lapisan.</span>
      </div>
    </div>
  )
}
