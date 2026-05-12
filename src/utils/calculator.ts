export function calcWallArea(
  l: number,
  w: number,
  h: number,
  doors: number,
  windows: number
): number {
  const gross = 2 * (l + w) * h
  const deductions = doors * 1.8 + windows * 1.2
  return Math.max(0, gross - deductions)
}

export function calcPaintLitres(areaSqm: number, coats: number, coverage = 10): number {
  return Math.ceil((areaSqm * coats) / coverage * 1.1)
}

export function recommendPackSizes(litres: number): string {
  if (litres <= 0) return '-'
  const big = Math.floor(litres / 20)
  const remainder = litres % 20
  const medium = Math.floor(remainder / 5)
  const small = Math.ceil((remainder % 5) / 1)

  const parts: string[] = []
  if (big > 0) parts.push(`${big} kaleng 20L`)
  if (medium > 0) parts.push(`${medium} kaleng 5L`)
  if (small > 0 && remainder % 5 > 0) parts.push(`1 kaleng 1L`)

  return parts.length > 0 ? parts.join(' + ') : `${litres}L`
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getPricePerLitre(tier: 'hemat' | 'tahan_lama' | 'premium'): number {
  const prices = { hemat: 45000, tahan_lama: 75000, premium: 110000 }
  return prices[tier]
}

export function estimatePrice(
  areaSqm: number,
  tier: 'hemat' | 'tahan_lama' | 'premium',
  primerRequired: boolean
): { products: number; tools: number; service: number; delivery: number; total: number } {
  const coats = 2
  const litres = calcPaintLitres(areaSqm, coats)
  const pricePerL = getPricePerLitre(tier)
  const products = litres * pricePerL + (primerRequired ? litres * 0.5 * 45000 : 0)
  const tools = 150000
  const service = 0
  const delivery = 50000
  const total = products + tools + service + delivery
  return { products, tools, service, delivery, total }
}
