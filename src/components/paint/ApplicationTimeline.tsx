import { CheckCircle } from 'lucide-react'
import ProductCard from './ProductCard'
import { products } from '../../data/products'
import type { Product } from '../../data/products'

interface TimelineStep {
  num: number
  title: string
  desc: string
  productIds?: string[]
}

interface ApplicationTimelineProps {
  requiresTreatment: boolean
  primerRequired: boolean
  areaSqm: number
}

export default function ApplicationTimeline({ requiresTreatment, primerRequired, areaSqm }: ApplicationTimelineProps) {
  const steps: TimelineStep[] = []

  let stepNum = 1

  steps.push({
    num: stepNum++,
    title: 'Persiapan Permukaan',
    desc: 'Bersihkan dinding dari debu, minyak, dan cat yang terkelupas. Amplas bila perlu.',
  })

  if (requiresTreatment) {
    steps.push({
      num: stepNum++,
      title: 'Perbaikan Kebocoran',
      desc: 'Tambal retakan dan area bocor dengan semen atau epoxy. Pastikan kering sempurna.',
    })
    steps.push({
      num: stepNum++,
      title: 'Aplikasi Waterproofing',
      desc: '2 lapis WarnaSeal untuk proteksi maksimal. Tunggu 4 jam antar lapis.',
      productIds: ['warnaseal-waterproofing'],
    })
  }

  if (primerRequired) {
    steps.push({
      num: stepNum++,
      title: 'Aplikasi Primer',
      desc: '1 lapis WarnaBase Primer. Tunggu hingga benar-benar kering (2-4 jam).',
      productIds: ['warnabase-primer'],
    })
  }

  steps.push({
    num: stepNum++,
    title: 'Aplikasi Cat Utama',
    desc: '2 lapis tipis cat utama. Tunggu minimal 2 jam antar lapis untuk hasil optimal.',
    productIds: requiresTreatment ? ['warnafresh-antijamur'] : ['warnalux-interior'],
  })

  const getProductsForStep = (productIds?: string[]): Product[] => {
    if (!productIds) return []
    return productIds.map(id => products.find(p => p.id === id)).filter((p): p is Product => !!p)
  }

  return (
    <div className="flex flex-col gap-6">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {step.num}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-0.5 flex-1 bg-forest-700/20 mt-2" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-ink-900">{step.title}</h4>
              {idx === steps.length - 1 && (
                <CheckCircle size={16} className="text-forest-700" />
              )}
            </div>
            <p className="text-sm text-ink-500 mb-3">{step.desc}</p>
            {getProductsForStep(step.productIds).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                litres={Math.ceil(areaSqm / product.coverage * product.coatsRecommended * 1.1)}
                showInstructions
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
