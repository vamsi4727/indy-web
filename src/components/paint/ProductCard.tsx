import type { Product } from '../../data/products'
import { formatRupiah } from '../../utils/calculator'
import { Package } from 'lucide-react'

interface ProductCardProps {
  product: Product
  litres?: number
  showInstructions?: boolean
}

const categoryLabel: Record<Product['category'], string> = {
  waterproofing: 'Waterproofing',
  primer: 'Primer / Cat Dasar',
  antijamur: 'Cat Anti-Jamur',
  topcoat: 'Cat Utama',
}

const categoryColor: Record<Product['category'], string> = {
  waterproofing: 'bg-blue-50 text-blue-700 border-blue-200',
  primer: 'bg-amber-50 text-amber-700 border-amber-200',
  antijamur: 'bg-green-50 text-green-700 border-green-200',
  topcoat: 'bg-forest-50 text-forest-700 border-forest-700/20',
}

export default function ProductCard({ product, litres, showInstructions = false }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-ink-500/10 p-4 flex gap-4 hover:shadow-sm transition-shadow">
      {/* Product icon/image */}
      <div className="shrink-0 w-16 h-16 rounded-xl bg-cream-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            target.parentElement?.classList.add('items-center', 'justify-center')
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-semibold text-ink-900 text-sm leading-tight">{product.name}</h4>
          <span className={['text-xs font-medium px-2 py-0.5 rounded-full border shrink-0', categoryColor[product.category]].join(' ')}>
            {categoryLabel[product.category]}
          </span>
        </div>
        <p className="text-xs text-ink-500 mb-2">{product.tagline}</p>

        <div className="flex items-center gap-4 text-sm">
          <span className="font-bold text-forest-700">{formatRupiah(product.pricePerLitre)}/L</span>
          <span className="text-ink-500 text-xs">{product.coverage} m²/L</span>
        </div>

        {litres !== undefined && (
          <div className="mt-2 flex items-center gap-2 text-xs text-ink-700">
            <Package size={12} className="text-forest-700" />
            <span>Butuh: ~{litres}L · {formatRupiah(litres * product.pricePerLitre)}</span>
          </div>
        )}

        {showInstructions && (
          <p className="mt-2 text-xs text-ink-500 bg-cream-50 p-2 rounded-lg leading-relaxed">
            {product.instructions}
          </p>
        )}

        <div className="flex gap-1 mt-2 flex-wrap">
          {product.availableSizes.map(size => (
            <span key={size} className="text-xs bg-cream-100 text-ink-700 px-2 py-0.5 rounded font-medium">
              {size}L
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
