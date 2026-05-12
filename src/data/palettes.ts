export interface PaletteColour {
  name: string
  code: string
  hex: string
  role: 'main' | 'accent' | 'ceiling'
}

export interface Palette {
  id: string
  name: string
  description: string
  badge?: 'popular' | 'editor' | 'seasonal' | 'new'
  image: string
  colours: PaletteColour[]
  styles: string[]
  finish: string
  bestFor: string[]
  rooms: string[]
}

export const palettes: Palette[] = [
  {
    id: 'adem-lebaran',
    name: 'Adem Lebaran',
    description: 'Kombinasi krem hangat, sage lembut, dan putih bersih yang menghadirkan nuansa syukur dan ketenangan di hari raya.',
    badge: 'seasonal',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&q=80',
    colours: [
      { name: 'Warm Cream', code: 'WR-C401', hex: '#F5EAD5', role: 'main' },
      { name: 'Soft Sage', code: 'WR-G210', hex: '#8db09b', role: 'accent' },
      { name: 'Clean White', code: 'WR-W001', hex: '#FAFAF8', role: 'ceiling' },
    ],
    styles: ['Minimalis', 'Japandi', 'Modern Tropical'],
    finish: 'Matte / Eggshell',
    bestFor: ['Ruang Tamu', 'Ruang Keluarga', 'Musholla'],
    rooms: ['living', 'family', 'prayer'],
  },
  {
    id: 'modern-bersih',
    name: 'Modern Bersih',
    description: 'Putih hangat, abu-abu sejuk, dan putih murni — perpaduan abadi untuk rumah modern yang bersih dan elegan.',
    badge: 'editor',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop&q=80',
    colours: [
      { name: 'Soft White', code: 'WR-W102', hex: '#F0EDE8', role: 'main' },
      { name: 'Cool Grey', code: 'WR-G305', hex: '#9A9490', role: 'accent' },
      { name: 'Pure White', code: 'WR-W001', hex: '#FFFFFF', role: 'ceiling' },
    ],
    styles: ['Minimalis', 'Scandinavian', 'Modern'],
    finish: 'Eggshell',
    bestFor: ['Kamar Tidur', 'Ruang Kerja', 'Koridor'],
    rooms: ['bedroom', 'office', 'corridor'],
  },
  {
    id: 'hangat-tropis',
    name: 'Hangat Tropis',
    description: 'Beige tanah liat, hijau tropis yang segar, dan off white — merayakan keindahan alam Nusantara.',
    image: 'https://images.unsplash.com/photo-1600210492486-724cf85e3b6d?w=600&h=400&fit=crop&q=80',
    colours: [
      { name: 'Clay Beige', code: 'WR-B520', hex: '#C4A882', role: 'main' },
      { name: 'Tropical Green', code: 'WR-G115', hex: '#5A8F6E', role: 'accent' },
      { name: 'Off White', code: 'WR-W203', hex: '#F5F0E8', role: 'ceiling' },
    ],
    styles: ['Modern Tropical', 'Natural', 'Earth Tone'],
    finish: 'Eggshell / Satin',
    bestFor: ['Ruang Tamu', 'Teras', 'Eksterior'],
    rooms: ['living', 'terrace', 'exterior'],
  },
  {
    id: 'japandi-tenang',
    name: 'Japandi Tenang',
    description: 'Pasir hangat, arang elegan, dan putih nasi — ketenangan gaya Jepang-Skandinavia untuk jiwa yang damai.',
    badge: 'new',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop&q=80',
    colours: [
      { name: 'Warm Sand', code: 'WR-B410', hex: '#D9C4A0', role: 'main' },
      { name: 'Charcoal', code: 'WR-D601', hex: '#3d4549', role: 'accent' },
      { name: 'Rice White', code: 'WR-W305', hex: '#FAF6EE', role: 'ceiling' },
    ],
    styles: ['Japandi', 'Minimalis', 'Scandinavian'],
    finish: 'Matte',
    bestFor: ['Kamar Tidur', 'Ruang Meditasi', 'Musholla'],
    rooms: ['bedroom', 'meditation', 'prayer'],
  },
  {
    id: 'bumi-nusantara',
    name: 'Bumi Nusantara',
    description: 'Terracotta lembut, hijau hutan dalam, dan gading hangat — palet yang merayakan kekayaan bumi Indonesia.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop&q=80',
    colours: [
      { name: 'Terracotta Soft', code: 'WR-T301', hex: '#C4622D', role: 'main' },
      { name: 'Deep Forest', code: 'WR-G701', hex: '#1a4a3a', role: 'accent' },
      { name: 'Warm Ivory', code: 'WR-W410', hex: '#F5EAD5', role: 'ceiling' },
    ],
    styles: ['Earth Tone', 'Modern Tropical', 'Elegan'],
    finish: 'Satin',
    bestFor: ['Ruang Tamu', 'Ruang Makan', 'Eksterior'],
    rooms: ['living', 'dining', 'exterior'],
  },
]
