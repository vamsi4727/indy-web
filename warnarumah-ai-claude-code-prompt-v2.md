# WarnaRumah AI — Claude Code Build Prompt v2
### Indonesian Paint Store & Guided Paint Assistant — Vercel-Ready React POC

---

## 0. Project Brief

Build a **production-quality, Vercel-deployable React website** for **WarnaRumah AI** — an Indonesian online paint store and AI-guided paint selection assistant.

**Reference standard:** Match the visual quality, navigation depth, and UX polish of [Asian Paints India](https://www.asianpaints.com) — but localised for Indonesia, warmer in tone, and centred on a guided assistant experience rather than a catalogue.

**Purpose of this build:** This is a customer-facing POC shared as a live Vercel URL instead of a Figma file. The customer must feel they are looking at a real, near-production product — not a wireframe or template. Every screen must have real placeholder content, professional typography, polished layout, and working navigation.

**User promise:**
> *"Pilih warna yang tepat, hitung jumlah cat, dan dapatkan rekomendasi cara pengecatan tanpa ribet."*
> *(Choose the right colour, calculate the right quantity, and get the right painting method — with confidence.)*

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Framework | **React 18 + Vite** |
| Styling | **Tailwind CSS v3** — custom config, no component library |
| Routing | **React Router v6** — use `HashRouter` for Vercel static compatibility |
| State | **React Context + useReducer** |
| Icons | **Lucide React** — no emoji icons in production UI |
| Fonts | **Google Fonts** via `<link>` in `index.html`: `DM Serif Display` (display/hero) + `DM Sans` (all UI text). See Section 4 for rationale. |
| Images | **Picsum Photos** `https://picsum.photos/seed/{keyword}/{w}/{h}` for all room/lifestyle photos. Always deterministic seeds so images don't change on reload. |
| Animations | Tailwind `transition` + `duration-200/300` — subtle, purposeful. Respect `prefers-reduced-motion`. |
| i18n | React Context language store. `/src/i18n/id.ts` (default) + `/src/i18n/en.ts`. No external i18n library. |
| Deployment | Vercel. Include `vercel.json` for SPA routing. |

---

## 2. Vercel Setup Files

### `/vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### `/vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

### `/.gitignore`
```
node_modules/
dist/
.env
.env.local
```

### `/package.json` — include these scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

The site must build with `npm run build` and deploy to Vercel with zero configuration.

---

## 3. Project Structure

```
/warnarumah-ai
├── public/
│   └── favicon.svg              # Paint drop SVG favicon (see Section 5)
├── src/
│   ├── i18n/
│   │   ├── id.ts
│   │   └── en.ts
│   ├── context/
│   │   ├── LanguageContext.tsx
│   │   └── AssistantContext.tsx
│   ├── components/              # Reusable design-system components
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── NumberInput.tsx
│   │   │   ├── RadioCard.tsx
│   │   │   ├── CheckboxCard.tsx
│   │   │   ├── ColourSwatch.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── WarningBanner.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SkipToContent.tsx
│   │   │   └── StepProgress.tsx
│   │   └── paint/
│   │       ├── PaletteCard.tsx
│   │       ├── ProductCard.tsx
│   │       ├── QuantityResultCard.tsx
│   │       ├── ApplicationTimeline.tsx
│   │       ├── PriceSummaryCard.tsx
│   │       ├── RoomCard.tsx
│   │       └── WhatsAppCTA.tsx
│   ├── screens/
│   │   ├── Home.tsx
│   │   ├── AssistantWelcome.tsx
│   │   ├── AssistantFlow.tsx
│   │   ├── steps/
│   │   │   ├── Step1_ProjectType.tsx
│   │   │   ├── Step2_RoomSelection.tsx
│   │   │   ├── Step3_UserGoal.tsx
│   │   │   ├── Step4_WallCondition.tsx
│   │   │   ├── Step5_SurfaceType.tsx
│   │   │   ├── Step6_Measurement.tsx
│   │   │   ├── Step7_ColourChange.tsx
│   │   │   ├── Step8_StylePreference.tsx
│   │   │   ├── Step9_Occasion.tsx
│   │   │   ├── Step10_Lighting.tsx
│   │   │   └── Step11_ColourFamily.tsx
│   │   ├── PaletteRecommendation.tsx
│   │   ├── PaintSystemResult.tsx
│   │   ├── FinalPaintPlan.tsx
│   │   ├── Checkout.tsx
│   │   ├── SavedPlan.tsx
│   │   ├── InsirasiWarna.tsx    # Stub
│   │   ├── AntiBocor.tsx        # Stub
│   │   ├── JasaTukang.tsx       # Stub
│   │   └── DesignSystem.tsx
│   ├── data/
│   │   ├── palettes.ts
│   │   ├── products.ts
│   │   ├── rooms.ts
│   │   └── testimonials.ts
│   ├── hooks/
│   │   └── useAssistant.ts
│   ├── utils/
│   │   └── calculator.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── vercel.json
└── package.json
```

---

## 4. Typography — DM Serif Display + DM Sans

### Why this pairing
- **DM Serif Display** — elegant, warm serif for hero headlines and palette names. Feels premium and editorial, like a high-end home brand. Similar in spirit to Asian Paints' use of serif display type.
- **DM Sans** — clean, modern, highly legible sans-serif for all UI. Excellent at small sizes. Works perfectly for Indonesian text (no missing characters). Neutral yet warm.
- This pairing avoids the "AI website" look (no Inter, no Space Grotesk) and creates a confident, home-brand feel.

### Font loading in `/index.html`
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

### Tailwind config
```js
fontFamily: {
  display: ['"DM Serif Display"', 'Georgia', 'serif'],
  body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
}
```

### Scale
| Token | Desktop | Mobile | Usage |
|---|---|---|---|
| `text-5xl` / display | 48px | 32px | Hero headline |
| `text-4xl` / h1 | 40px | 28px | Page titles |
| `text-3xl` / h2 | 32px | 24px | Section headings |
| `text-2xl` / h3 | 24px | 20px | Card titles |
| `text-lg` / body-lg | 18px | 18px | Lead paragraphs |
| `text-base` / body | 16px | 16px | All UI text minimum |
| `text-sm` / helper | 14px | 14px | Helper text, captions |
| `text-xs` / label | 12px | 12px | Tags, badges only |

---

## 5. Logo & Brand Mark

### Do NOT use:
- Anthropic/Claude default logos
- Generic paint bucket clip art
- Emoji
- Any stock icon library logo

### Build this SVG logo programmatically:

**Concept:** A stylised paint drop that doubles as a house roofline — two geometric shapes merged. Modern, simple, memorable. Deep forest green.

```tsx
// src/components/layout/Logo.tsx
// Build as an inline SVG React component — NOT an img tag
// Concept: diamond/drop shape with a small triangular "roof" notch cut from the top
// suggesting both a paint drop and a home in one mark

export const LogoMark = ({ size = 36 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Paint drop body */}
    <path
      d="M20 2L36 18C36 29 29 40 20 42C11 40 4 29 4 18L20 2Z"
      fill="#1a4a3a"
    />
    {/* House roof cutout / highlight — white triangle near top */}
    <path
      d="M20 8L27 15H13L20 8Z"
      fill="#fdf8f0"
      opacity="0.9"
    />
    {/* Inner window dot */}
    <circle cx="20" cy="24" r="4" fill="#fdf8f0" opacity="0.6" />
  </svg>
)

export const LogoFull = () => (
  <div className="flex items-center gap-2.5" aria-label="WarnaRumah AI">
    <LogoMark size={36} />
    <div className="flex flex-col leading-none">
      <span className="font-display text-xl text-forest-800 tracking-tight">WarnaRumah</span>
      <span className="font-body text-xs font-semibold text-terra-500 tracking-widest uppercase">AI</span>
    </div>
  </div>
)
```

**Favicon:** Use the same `LogoMark` SVG exported as `public/favicon.svg`.

### Colour badge / tag system (also SVG-based):
- "Populer" badge: pill shape, forest-700 background, cream text
- "Pilihan Editor" badge: pill shape, terra-500 background, white text  
- "Lebaran Special" badge: pill shape, gold-400 background, forest-900 text
- Build as `<Badge variant="popular|editor|seasonal|new|discount" />` component

---

## 6. Colour System

All colours must pass WCAG AA (4.5:1 body text, 3:1 large text + UI components).

```js
// tailwind.config.js — extend.colors
colors: {
  forest: {
    50:  '#e8f0ec',
    100: '#c4d8cc',
    200: '#8db09b',
    300: '#5a8f6e',
    500: '#2d7a5a',
    700: '#1a4a3a',   // Primary brand — deep forest green
    800: '#123326',
    900: '#0b2219',
  },
  cream: {
    50:  '#fdf8f0',   // Page background
    100: '#f5ead5',
    200: '#ead4ac',
    300: '#d9bb85',
  },
  terra: {
    300: '#e08050',
    400: '#c4622d',   // Accent — terracotta
    500: '#a84d20',
    600: '#8c3d17',
  },
  gold: {
    300: '#e0b84a',
    400: '#c9952a',   // Accent — warm gold (sparingly)
    500: '#a87b1f',
  },
  // Semantic
  error:   { light: '#fef2f2', border: '#fca5a5', text: '#9b1c1c' },
  warning: { light: '#fffbeb', border: '#fcd34d', text: '#78350f' },
  success: { light: '#f0fdf4', border: '#86efac', text: '#14532d' },
  // Text
  ink: {
    900: '#1a1e1f',   // Primary text — near black
    700: '#3d4549',   // Secondary text
    500: '#6b7280',   // Disabled / placeholder
  }
}
```

**Usage rules:**
- Page background: `cream-50` — never stark white
- Cards: `white` with `border border-forest-700/10` and `shadow-sm`
- Primary button: `bg-forest-700 text-cream-50 hover:bg-forest-800`
- Accent elements: `terra-400` used sparingly (max 2 accents per screen)
- All text: `ink-900` on light backgrounds — never `gray-400` or pale grey
- Never communicate state with colour alone (always add icon + text)

---

## 7. Homepage — Full Specification

Route: `/`

This is the most important screen. It must feel like visiting Asian Paints or a premium Indonesian home brand — not a generic React template.

### Navbar
```
[SkipToContent] — visible on focus only
[Logo: WarnaRumah AI]    [Nav Links]                    [Actions]
                          Panduan Pilih Cat              🔍  ID|EN  WhatsApp  ☰(mobile)
                          Inspirasi Warna
                          Kalkulator Cat
                          Anti Bocor & Jamur
                          Jasa Tukang
                          Bantuan
```

Desktop: full horizontal nav, sticky, `bg-cream-50/95 backdrop-blur-sm`.
Mobile: hamburger → full-screen slide-over drawer with all links + WhatsApp CTA.
Active link: `text-forest-700 font-semibold border-b-2 border-terra-400`.

### Hero Section
Full-width, height `min-h-[85vh]` on desktop, `min-h-[75vh]` on mobile.

Layout: 2-column on desktop (left: text + CTAs, right: image). Full-width stacked on mobile.

**Left column:**
```
[Small pill badge: "🏠 Asisten Cat #1 di Indonesia"]

<h1 font-display text-5xl/4xl>
  Bingung pilih warna
  dan jumlah cat?
</h1>

<p text-lg text-ink-700 max-w-lg>
  Kami bantu pilih warna, hitung kebutuhan cat, rekomendasikan 
  primer, dan tentukan cara pengecatan yang tepat — dalam 
  5 menit, tanpa ribet.
</p>

[Button primary lg: "Mulai Panduan Cat →"]
[Button secondary lg: "Hitung Kebutuhan Cat"]

[Mini trust row: ✓ Gratis konsultasi  ✓ 500+ warna  ✓ Tukang bersertifikat]
```

**Right column:**
Picsum image — warm Indonesian living room feel: `https://picsum.photos/seed/livingroom/800/600`
Rounded corners, subtle shadow, slight rotation `-rotate-1` for dynamism.
Overlay: floating colour swatch card (pure CSS, no image) showing "Adem Lebaran" palette.

**Background:** `cream-50` base with a very subtle paint-stroke SVG watermark (decorative, `aria-hidden`).

### Trust Bar
4 cards, horizontal scroll on mobile, `grid-cols-4` on desktop.
Each: icon (Lucide) + bold number/label + supporting text.

```
[MessageCircle]    [Package]          [Droplets]         [HardHat]
Konsultasi         500+ Warna         Rekomendasi         Tukang
via WhatsApp       Tersedia           Primer & Anti-Bocor  Bersertifikat
Gratis             Termasuk tinting   Untuk setiap kondisi  Di 50+ kota
```

### Seasonal Module — "Rumah Siap Lebaran"
Background: warm gradient `from-gold-300/20 to-cream-100`.
Crescent moon icon (Lucide `Moon`). Heading in DM Serif Display.
3 palette cards in a horizontal row.
CTA: "Lihat Inspirasi Lebaran →"

### Problem Module — "Dinding Bermasalah?"
2-column on desktop. Left: text + CTAs. Right: 2×2 grid of problem thumbnails.

```
Heading: "Dinding lembap, jamur, atau cat mengelupas?"
Body: "Jangan langsung dicat. Kami bantu identifikasi masalah dan 
      rekomendasikan solusi yang tepat sebelum Anda memilih warna."

[CTA: "Cek Kondisi Dinding"]  [CTA ghost: "Pelajari Anti Bocor"]
```

Problem thumbnails (Picsum seeds + text overlay):
- `seed/mold-wall` → "Jamur & Lembap"
- `seed/peeling-paint` → "Cat Mengelupas"  
- `seed/crack-wall` → "Retak Rambut"
- `seed/water-stain` → "Rembes / Bocor"

### Room Cards
Section title: "Apa yang ingin Anda cat?"
8-card grid (4×2 desktop, 2×4 mobile, horizontal scroll on mobile).

Each RoomCard:
- Picsum photo (deterministic seed per room)
- Room name (Bahasa Indonesia)
- "Lihat rekomendasi →" link
- Hover: slight scale + shadow

```
Ruang Tamu        → seed/living-room/400/300
Kamar Tidur       → seed/bedroom/400/300
Kamar Anak        → seed/kids-room/400/300
Dapur             → seed/kitchen/400/300
Kamar Mandi       → seed/bathroom/400/300
Musholla          → seed/prayer-room/400/300
Eksterior         → seed/house-exterior/400/300
Teras             → seed/terrace/400/300
```

### How It Works
4 steps, horizontal on desktop, vertical on mobile.
Large step number in DM Serif Display + forest-700/10 circle.

```
01 Ceritakan Proyek       02 Cek Kondisi Dinding
   Pilih ruangan, tujuan,    Upload foto atau pilih
   dan ukuran area           kondisi dari daftar

03 Pilih Warna & Kualitas  04 Dapatkan Rencana Lengkap
   Dari 500+ pilihan warna    Cat, primer, jumlah,
   dengan panduan gaya        tukang — semua siap
```

CTA: `[Mulai Sekarang — gratis]`

### Testimonials
3 testimonial cards. Mock data:

```ts
// src/data/testimonials.ts
export const testimonials = [
  {
    name: "Dewi Rahayu",
    location: "Bekasi",
    avatar: "https://picsum.photos/seed/dewi/64/64",
    rating: 5,
    text: "Saya tidak menyangka bisa dapat rekomendasi cat yang tepat dalam 5 menit. Warna Warm Cream yang disarankan pas banget untuk ruang tamu saya!",
    context: "Ruang tamu 4×5m, renovasi Lebaran"
  },
  {
    name: "Budi Santoso",
    location: "Bandung",
    avatar: "https://picsum.photos/seed/budi/64/64",
    rating: 5,
    text: "Dinding lembap saya akhirnya bisa diatasi. Sebelumnya saya langsung cat tapi mengelupas lagi. WarnaRumah AI kasih rekomendasi waterproofing dulu, hasilnya bagus banget.",
    context: "Dinding eksterior, masalah bocor"
  },
  {
    name: "Siti Nurhaliza",
    location: "Surabaya",
    avatar: "https://picsum.photos/seed/siti/64/64",
    rating: 5,
    text: "Kalkulator catnya akurat. Estimasi 10L ternyata cukup untuk 2 kamar tidur. Tidak perlu beli lebih, tidak kekurangan juga.",
    context: "2 kamar tidur, Rumah 45"
  }
]
```

### Footer
4-column desktop, 2-column tablet, single-column mobile.

```
Col 1: Logo + tagline + social links (Instagram, YouTube, TikTok — Lucide icons)
Col 2: Panduan
        - Mulai Panduan Cat
        - Kalkulator Cat
        - Cek Kondisi Dinding
        - Inspirasi Warna
Col 3: Produk & Layanan
        - Anti Bocor & Jamur
        - Jasa Tukang
        - Sample Warna
        - Beli di Marketplace
Col 4: Bantuan
        - Konsultasi WhatsApp
        - FAQ
        - Pernyataan Aksesibilitas
        - Kebijakan Privasi
        
Bottom bar: © 2025 WarnaRumah AI · Dibuat di Indonesia 🇮🇩 · [ID | EN]
```

---

## 8. Navigation & Routing

```tsx
// App.tsx routes
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/panduan" element={<AssistantWelcome />} />
  <Route path="/panduan/mulai" element={<AssistantFlow />}>
    <Route path="step/:stepId" element={<StepRouter />} />
  </Route>
  <Route path="/panduan/rekomendasi-warna" element={<PaletteRecommendation />} />
  <Route path="/panduan/sistem-cat" element={<PaintSystemResult />} />
  <Route path="/panduan/rencana-cat" element={<FinalPaintPlan />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/rencana-tersimpan" element={<SavedPlan />} />
  <Route path="/inspirasi-warna" element={<InspirasiWarna />} />
  <Route path="/anti-bocor" element={<AntiBocor />} />
  <Route path="/jasa-tukang" element={<JasaTukang />} />
  <Route path="/design-system" element={<DesignSystem />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

All nav links must work. Stub pages must show the Navbar + Footer + a proper "Segera Hadir" placeholder section with relevant hero copy — not a blank page.

---

## 9. Guided Assistant Flow

### Progress Bar (always visible at top of assistant screens)
```
[  1. Area  ] — [ 2. Kondisi ] — [ 3. Ukuran ] — [ 4. Warna ] — [ 5. Produk ] — [ 6. Rekomendasi ]
     ●                 ○                ○               ○              ○                  ○
```
- Completed steps: `bg-forest-700 text-white`
- Current step: `border-2 border-forest-700 text-forest-700`
- Upcoming: `border border-ink-500/30 text-ink-500`
- On mobile: show only current step name + "Langkah 2 dari 6"
- ARIA: `role="progressbar" aria-valuenow={2} aria-valuemax={6}`

### Step layout (mobile-first)
- Single question per screen
- Large, clear question heading (DM Serif Display)
- Options below — full width on mobile
- "Lanjut" CTA: sticky bottom bar on mobile (`fixed bottom-0 left-0 right-0 bg-white border-t p-4`)
- "← Kembali" link: top left, always visible
- Desktop: 2-column — question (60%) + live summary panel (40%, sticky)

### State — AssistantContext
```ts
interface AssistantState {
  language: 'id' | 'en';
  currentStep: number;
  
  // Captured answers
  entry_intent: string | null;
  project_type: 'interior' | 'exterior' | 'damp' | 'roof' | 'wood_metal' | 'unsure' | null;
  area_type: string[];
  user_goals: string[];
  wall_condition: string[];
  photo_uploaded: boolean;
  requires_treatment: boolean;
  surface_type: string | null;
  room_length_m: number | null;
  room_width_m: number | null;
  wall_height_m: number | null;
  doors_count: number;
  windows_count: number;
  known_wall_area_m2: number | null;
  house_type_preset: string | null;
  colour_change_intensity: 'similar' | 'light_to_dark' | 'dark_to_light' | 'unknown' | 'new_wall' | null;
  style_preference: string[];
  occasion: string[];
  lighting: string | null;
  preferred_colour_families: string[];
  
  // Derived
  selected_palette_id: string | null;
  quality_tier: 'hemat' | 'tahan_lama' | 'premium' | null;
  primer_required: boolean;
  putty_required: boolean;
  waterproofing_required: boolean;
  topcoat_litres_final: number | null;
  primer_litres_final: number | null;
  application_method: 'diy' | 'own_tukang' | 'find_tukang' | 'full_service' | 'unsure' | null;
  estimated_price: { products: number; tools: number; service: number; delivery: number; total: number } | null;
  next_best_action: 'buy' | 'sample' | 'whatsapp' | 'book_tukang' | null;
}
```

Auto-save to `sessionStorage`. Restore on return. Full back navigation without data loss.

---

## 10. Step-by-Step Screens

### Step 1 — Project Type
**Question (DM Serif Display):** "Apa yang ingin Anda cat?"
**Helper:** "Pilihan ini membantu kami menentukan jenis cat, primer, dan sistem yang tepat."

6 RadioCards in 2×3 grid (desktop) / 2×3 grid (mobile):
```
🏠 Interior rumah          🏡 Eksterior rumah
💧 Dinding lembap / bocor  🏗 Atap / dak / teras
🪵 Kayu atau besi          ❓ Belum yakin
```
Use Lucide icons: `Home`, `Building2`, `Droplets`, `Layers`, `TreePine`, `HelpCircle`

Logic: damp/roof → `requires_treatment = true`

---

### Step 2 — Room / Area Selection
**Question:** "Bagian mana yang ingin dicat?"

Show interior OR exterior options based on Step 1.

**Interior** (CheckboxCard grid 2-col mobile, 3-col desktop):
```
Ruang Tamu          Kamar Tidur Utama    Kamar Anak
Dapur               Kamar Mandi          Musholla / Ruang Ibadah
Ruang Keluarga      Apartemen / Kos      Seluruh Rumah
Lainnya
```

**Exterior:**
```
Fasad Depan    Pagar         Teras
Balkon         Dinding Samping    Seluruh Eksterior
```

Helper: *"Pilihan ruangan membantu kami menyesuaikan rekomendasi cat, warna, dan daya tahan."*

---

### Step 3 — User Goal
**Question:** "Apa tujuan utama pengecatan ini?"
Multi-select CheckboxCards.

```
✨ Rumah terlihat lebih bersih       🔄 Ganti suasana / makeover
🌙 Siap Lebaran / Natal / Imlek      🧽 Dinding mudah dibersihkan
🍄 Mengatasi jamur atau lembap       🎨 Cat lama pudar / mengelupas
📐 Ruangan terlihat lebih luas       💎 Tampilan premium / estetik
```

Lucide icons: `Sparkles`, `RefreshCw`, `Moon`, `Brush`, `Droplets`, `Layers`, `Maximize2`, `Crown`

---

### Step 4 — Wall Condition
**Question:** "Bagaimana kondisi dinding saat ini?"

RadioCards with small Picsum image thumbnails (80×60) per condition:

```
seed/clean-wall     → "Masih bagus, hanya ingin ganti warna"
seed/faded-paint    → "Cat lama pudar"
seed/peeling        → "Cat mengelupas"
seed/mold-black     → "Ada noda hitam / jamur"
seed/damp-wall      → "Dinding lembap"
seed/hairline-crack → "Ada retak rambut"
seed/water-seep     → "Ada rembes / bocor"
seed/new-cement     → "Dinding baru belum pernah dicat"
                    → "Tidak yakin"
```

**Image upload option:**
```tsx
<ImageUpload
  label="Upload foto dinding (opsional)"
  hint="Format JPG/PNG, maks 5MB. Untuk rekomendasi lebih akurat."
  onUpload={() => {/* set photo_uploaded = true, show success toast */}}
/>
```
On upload success: show green SuccessBanner "Foto diterima. Kami akan sesuaikan rekomendasi."

**Warning banner (appears when lembap/jamur/rembes/bocor selected):**
```tsx
<WarningBanner
  role="alert"
  aria-live="polite"
  icon={<AlertTriangle />}
  heading="Perhatian: Kondisi Dinding Bermasalah"
  body="Dinding lembap sebaiknya tidak langsung dicat. Cat baru bisa cepat mengelupas jika sumber lembap belum diatasi."
  actions={[
    { label: "Cek Solusi Anti-Bocor", href: "/anti-bocor", variant: "primary" },
    { label: "Konsultasi WhatsApp", href: "https://wa.me/6281200000000", variant: "whatsapp" },
    { label: "Lanjutkan dengan catatan risiko", onClick: dismissWarning, variant: "ghost" }
  ]}
/>
```

---

### Step 5 — Surface Type
**Question:** "Permukaan dinding Anda seperti apa?"

RadioCards:
```
Dinding semen / plester    Dinding sudah dicat    Dinding baru acian
Gypsum / GRC               Bata ekspos            Kayu
Besi / metal               Tidak yakin
```
Helper: *"Jenis permukaan menentukan apakah Anda perlu primer, sealer, atau cat khusus."*

---

### Step 6 — Measurement Calculator
**Question:** "Berapa ukuran area yang ingin dicat?"

**Accessible Tabs** (3 tabs):

**Tab A: Ukur Ruangan**
```
Panjang (m)     [    3    ] ← NumberInput, min 1, max 50, step 0.5
Lebar (m)       [    4    ]
Tinggi dinding  [    3    ] default 3m
Jumlah pintu    [    1    ] default 1 (deduct 1.8m² each)
Jumlah jendela  [    1    ] default 1 (deduct 1.2m² each)

Live result box:
┌─────────────────────────────────────┐
│ Estimasi luas dinding: 39.0 m²      │
│ Luas kotor: 42.0 m²                 │
│ Pengurangan (1 pintu + 1 jendela):  │
│ − 3.0 m²                            │
└─────────────────────────────────────┘
```

**Tab B: Saya tahu luas dinding**
```
Luas dinding (m²)   [    39    ]
```

**Tab C: Pilih tipe rumah**
RadioCards in 3-col grid:
```
Studio / Kos (~20m²)     Apartemen 1BR (~35m²)    Rumah 36 (~45m²)
Rumah 45 (~55m²)         Rumah 60 (~72m²)         Rumah 90 (~108m²)
1 Kamar                  2 Kamar                  3 Kamar
Custom (masukkan sendiri)
```

Calculator:
```ts
// utils/calculator.ts
export const DEFAULT_AREAS: Record<string, number> = {
  'studio': 20, 'apt-1br': 35, 'rumah-36': 45, 'rumah-45': 55,
  'rumah-60': 72, 'rumah-90': 108, '1-kamar': 18, '2-kamar': 32, '3-kamar': 45
}

export function calcWallArea(l: number, w: number, h: number, doors: number, windows: number): number {
  return Math.max(0, 2 * (l + w) * h - (doors * 1.8) - (windows * 1.2))
}

export function calcPaintLitres(areaSqm: number, coats: number, coverage = 10): number {
  return Math.ceil((areaSqm * coats / coverage) * 1.1) // +10% buffer
}

export function recommendPackSizes(litres: number): string {
  const cans20 = Math.floor(litres / 20)
  const rem = litres % 20
  const cans5 = Math.floor(rem / 5)
  const cans1 = Math.ceil(rem % 5)
  let result = []
  if (cans20 > 0) result.push(`${cans20} kaleng 20L`)
  if (cans5 > 0)  result.push(`${cans5} kaleng 5L`)
  if (cans1 > 0)  result.push(`${cans1} kaleng 1L`)
  return result.join(' + ')
}
```

---

### Step 7 — Colour Change Intensity
**Question:** "Warna dinding sekarang dan warna baru berbeda jauh?"

RadioCards with visual colour transition illustration (CSS gradient pair):
```
⬜→⬜  Mirip / hanya refresh         (no primer needed if wall good)
⬜→⬛  Dari terang ke gelap           (primer optional)
⬛→⬜  Dari gelap ke terang ★         (primer REQUIRED)
❓     Belum tahu warna baru
🆕     Dinding baru                   (primer REQUIRED)
```
★ badge on "dark to light" and "new wall": "Primer diperlukan"

---

### Step 8 — Style Preference
**Question:** "Gaya rumah seperti apa yang Anda suka?"

Visual mood-board CheckboxCards. Each has a CSS-generated gradient thumbnail (no external image — built with 3-colour CSS gradient) + style name + short descriptor.

```
Minimalis          — gradient: white→light grey→white
Japandi            — gradient: warm beige→sage→natural white
Modern Tropical    — gradient: clay→tropical green→warm white
Scandinavian       — gradient: bright white→light birch→sky
Industrial         — gradient: dark grey→concrete→charcoal
Natural/Earth Tone — gradient: terracotta→ochre→sand
Elegan Premium     — gradient: deep teal→gold→cream
Ceria Keluarga     — gradient: warm yellow→peach→light blue
Belum Tahu         — gradient: grey multi
```

Build gradient as `style={{ background: 'linear-gradient(135deg, #c8a882, #6a9b72, #f5ead5)' }}` inline on thumbnail div.
Include text label + alt text always.

---

### Step 9 — Occasion
**Question:** "Apakah ada momen khusus untuk pengecatan ini?"

Optional CheckboxCards (can skip):
```
🌙 Lebaran / Ramadan     🎄 Natal / Tahun Baru
🏮 Imlek                  🏠 Pindah Rumah Baru
💒 Pernikahan / Acara     🔨 Renovasi Biasa
   Tidak ada
```

Occasion → palette hint mapping applied in PaletteRecommendation screen.

---

### Step 10 — Lighting
**Question:** "Pencahayaan ruangan Anda seperti apa?"

RadioCards with CSS-illustrated light examples (div with gradient + Lucide icon):
```
☀️ Banyak cahaya matahari      — bright warm gradient
🌥 Sedikit cahaya matahari     — muted grey gradient
💡 Lampu putih / cool white    — blue-white gradient
🕯 Lampu warm / kuning         — amber gradient
🌑 Ruangan terasa gelap        — dark gradient
❓ Tidak yakin
```

Helper note: *"Warna cat yang sama bisa terlihat berbeda di ruangan terang versus remang. Kami sesuaikan rekomendasi berdasarkan ini."*

---

### Step 11 — Colour Family
**Question:** "Warna apa yang Anda pertimbangkan?"

ColourSwatch grid (3-col mobile, 5-col desktop):

```tsx
const colourFamilies = [
  { id: 'white',      name: 'Putih / Off-White', nameEn: 'White / Off-White', hex: '#F5F2EC', textHex: '#1a1e1f' },
  { id: 'cream',      name: 'Cream / Beige',     nameEn: 'Cream / Beige',     hex: '#E8D5B0', textHex: '#1a1e1f' },
  { id: 'grey',       name: 'Abu-abu',           nameEn: 'Grey',              hex: '#B8BCC0', textHex: '#1a1e1f' },
  { id: 'green',      name: 'Hijau',             nameEn: 'Green',             hex: '#7FA87A', textHex: '#1a1e1f' },
  { id: 'blue',       name: 'Biru',              nameEn: 'Blue',              hex: '#7B9FC4', textHex: '#1a1e1f' },
  { id: 'yellow',     name: 'Kuning',            nameEn: 'Yellow',            hex: '#E8C84A', textHex: '#1a1e1f' },
  { id: 'peach',      name: 'Peach / Pink',      nameEn: 'Peach / Pink',      hex: '#E8A090', textHex: '#1a1e1f' },
  { id: 'earth',      name: 'Cokelat / Earth',   nameEn: 'Brown / Earth',     hex: '#A0704A', textHex: '#fdf8f0' },
  { id: 'dark',       name: 'Gelap / Bold',      nameEn: 'Dark / Bold',       hex: '#3C3C4C', textHex: '#fdf8f0' },
  { id: 'recommend',  name: 'Rekomendasikan saya','nameEn': 'Recommend for me', hex: '#1a4a3a', textHex: '#fdf8f0' },
]
```

Each swatch: large circle (80×80px desktop, 64×64px mobile) + text label below.
Selected: checkmark overlay + ring `ring-2 ring-forest-700 ring-offset-2`.
ARIA: `aria-label="${name}, warna ${hex}, ${selected ? 'dipilih' : 'belum dipilih'}"`

---

## 11. Palette Recommendation Screen

Route: `/panduan/rekomendasi-warna`

**Title (DM Serif Display):** "Rekomendasi Warna untuk Anda"
**Dynamic subtitle:** "Berdasarkan {area_type}, gaya {style}, pencahayaan {lighting}{occasion ? `, momen ${occasion}` : ''}"

3–5 PaletteCards laid out in responsive grid.

### Mock palette data:
```ts
// src/data/palettes.ts
export const palettes: Palette[] = [
  {
    id: 'adem-lebaran',
    name: 'Adem Lebaran',
    nameEn: 'Calm Eid',
    description: 'Nuansa hangat dan bersih, sempurna untuk menyambut tamu Lebaran.',
    descriptionEn: 'Warm and clean tones, perfect for welcoming Eid guests.',
    mainShade:    { name: 'Warm Cream',  nameEn: 'Warm Cream',  hex: '#E8D5B0', code: 'WR-2301' },
    accentShade:  { name: 'Soft Sage',   nameEn: 'Soft Sage',   hex: '#8FAF88', code: 'WR-4105' },
    ceilingShade: { name: 'Clean White', nameEn: 'Clean White', hex: '#F5F2EC', code: 'WR-1001' },
    bestFor:   ['Ruang Tamu', 'Musholla', 'Ruang Keluarga'],
    styles:    ['Minimalis', 'Japandi'],
    occasions: ['Lebaran'],
    finish:    'Washable Matte',
    finishEn:  'Washable Matte',
    badge:     'popular',
    badgeLabel: 'Populer Lebaran',
    image:     'https://picsum.photos/seed/lebaran-room/600/400',
  },
  {
    id: 'modern-bersih',
    name: 'Modern Bersih',
    nameEn: 'Clean Modern',
    description: 'Putih bersih dengan aksen abu-abu modern untuk tampilan minimalis urban.',
    descriptionEn: 'Clean white with modern grey accents for an urban minimalist look.',
    mainShade:    { name: 'Soft White',  hex: '#F0EDE6', code: 'WR-1102' },
    accentShade:  { name: 'Cool Grey',   hex: '#A8AAB0', code: 'WR-3202' },
    ceilingShade: { name: 'Pure White',  hex: '#FAF9F7', code: 'WR-1001' },
    bestFor:   ['Ruang Keluarga', 'Kamar Tidur', 'Apartemen'],
    styles:    ['Minimalis', 'Scandinavian'],
    occasions: [],
    finish:    'Eggshell',
    badge:     'editor',
    badgeLabel: 'Pilihan Editor',
    image:     'https://picsum.photos/seed/modern-room/600/400',
  },
  {
    id: 'hangat-tropis',
    name: 'Hangat Tropis',
    nameEn: 'Warm Tropical',
    description: 'Nuansa clay dan hijau tropis yang membawa ketenangan alam ke dalam rumah.',
    descriptionEn: 'Clay and tropical green tones that bring nature\'s calm indoors.',
    mainShade:    { name: 'Clay Beige',      hex: '#C8A882', code: 'WR-2408' },
    accentShade:  { name: 'Tropical Green',  hex: '#6A9B72', code: 'WR-4203' },
    ceilingShade: { name: 'Off White',       hex: '#F5F0E8', code: 'WR-1003' },
    bestFor:   ['Ruang Keluarga', 'Teras', 'Dapur'],
    styles:    ['Modern Tropical', 'Natural/Earth Tone'],
    occasions: [],
    finish:    'Satin',
    badge:     null,
    image:     'https://picsum.photos/seed/tropical-room/600/400',
  },
  {
    id: 'japandi-tenang',
    name: 'Japandi Tenang',
    nameEn: 'Calm Japandi',
    description: 'Perpaduan estetika Jepang dan Skandinavia yang tenang dan elegan.',
    descriptionEn: 'A serene blend of Japanese and Scandinavian aesthetics.',
    mainShade:    { name: 'Warm Sand',    hex: '#D4C4A8', code: 'WR-2205' },
    accentShade:  { name: 'Charcoal',     hex: '#4A4A52', code: 'WR-5101' },
    ceilingShade: { name: 'Rice White',   hex: '#F7F4EE', code: 'WR-1005' },
    bestFor:   ['Kamar Tidur', 'Ruang Tamu', 'Musholla'],
    styles:    ['Japandi', 'Minimalis'],
    occasions: [],
    finish:    'Matte',
    badge:     'new',
    badgeLabel: 'Baru',
    image:     'https://picsum.photos/seed/japandi-room/600/400',
  },
  {
    id: 'bumi-nusantara',
    name: 'Bumi Nusantara',
    nameEn: 'Nusantara Earth',
    description: 'Inspirasi dari tanah dan budaya Indonesia — hangat, kaya, dan penuh karakter.',
    descriptionEn: 'Inspired by Indonesian earth and culture — warm, rich, and characterful.',
    mainShade:    { name: 'Terracotta Soft', hex: '#C08060', code: 'WR-2601' },
    accentShade:  { name: 'Deep Forest',     hex: '#2D5A3D', code: 'WR-4401' },
    ceilingShade: { name: 'Warm Ivory',      hex: '#F2EAD8', code: 'WR-1007' },
    bestFor:   ['Ruang Tamu', 'Ruang Keluarga', 'Eksterior Teras'],
    styles:    ['Natural/Earth Tone', 'Elegan Premium'],
    occasions: ['Imlek', 'Pernikahan'],
    finish:    'Satin',
    badge:     null,
    image:     'https://picsum.photos/seed/nusantara-room/600/400',
  }
]
```

Each PaletteCard:
- Top: room image (Picsum, 600×400) with badge overlay
- 3 colour swatches (main/accent/ceiling) with name + product code
- Description
- "Best for" tags + style tags
- Finish label
- Bottom CTAs: `[Pesan Sample]` `[Pilih Warna Ini →]`
- Expand "Detail Lengkap" → shows full description + where to apply

**Simple Visualizer Button:** "Lihat di Ruangan" → opens Modal with a CSS-drawn room silhouette:
```
┌─────────────────────────────────┐
│       [CEILING: off-white]      │   ← CSS background-color
│  [AC]                           │
│                                 │
│  [WALL: warm cream on 3 sides]  │   ← CSS background-color
│                                 │
│  [Window cutout]  [Door]        │
│                                 │
├────[FLOOR: warm grey]───────────┤
```
Toggle: "Cahaya Siang ↔ Cahaya Malam" — adjust `filter: brightness() sepia()`

Disclaimer always visible below visualizer.

---

## 12. Paint System + Quantity Screen

Route: `/panduan/sistem-cat`

### Quality Selector (if not yet captured)
3 cards side by side (Good/Better/Best):

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  💰 Hemat   │  │ ⭐ Tahan    │  │ 👑 Premium  │
│             │  │    Lama     │  │             │
│ Rp 45rb/L   │  │ Rp 75rb/L  │  │ Rp 110rb/L  │
│ Ekonomis    │  │ Mudah       │  │ Halus,      │
│ Untuk kamar │  │ dibersihkan │  │ tahan lama  │
│ atau kos    │  │ 5-7 tahun   │  │ 8-10 tahun  │
│ Odour: ⬥⬦⬦ │  │ Odour: ⬥⬦⬦ │  │ Odour: ⬥⬥⬥  │
└─────────────┘  └─────────────┘  └─────────────┘
```

### ApplicationTimeline

Show numbered timeline steps based on recommendation logic:

**For damp/mould walls:**
```
Step 1 ● Cari Sumber Bocor / Lembap
           Perbaiki kebocoran atap, talang, atau pipa sebelum lanjut.
           [Kenapa ini perlu? ▼] → accordion: "Cat apapun akan mengelupas jika..."
           
Step 2 ● WarnaSeal Waterproofing 1.5 L
           [ProductCard: WarnaSeal | Waterproofing | Rp 85.000/L | Rp 127.500]

Step 3 ● WarnaBase Primer 5 L
           [ProductCard]
           
Step 4 ● WarnaFresh Anti-Jamur Interior 10 L
           [ProductCard]
           Dua lapisan. Tunggu 4 jam antara lapisan.
```

**For normal repaint:**
```
Step 1 ● Persiapan Dinding
           Bersihkan, amplas ringan bila perlu.

Step 2 ● WarnaBase Primer (opsional) 5 L  ← if colour change dark-to-light
           [ProductCard]

Step 3 ● WarnaLux Interior Washable 10 L
           [ProductCard]
           Dua lapisan. Tunggu 2 jam antara lapisan.
```

### Quantity Result Card
```
┌────────────────────────────────────────────────────────┐
│ 📐 Estimasi Kebutuhan Cat                              │
├────────────────────────────────────────────────────────┤
│ Luas dinding        : 39.0 m²                          │
│ Cat utama (WR-2301) : 10 L  → 2 kaleng 5L             │
│ Primer              :  5 L  → 1 kaleng 5L              │
│ Estimasi lapisan    : 2 lapis                          │
│ Buffer 10%          : sudah termasuk ✓                 │
├────────────────────────────────────────────────────────┤
│ ⚠️ Estimasi ini berdasarkan ukuran yang Anda masukkan. │
│ Jumlah akhir dapat berubah setelah pengukuran lapangan.│
└────────────────────────────────────────────────────────┘
```

---

## 13. Final Paint Plan Screen

Route: `/panduan/rencana-cat`

This is the "payoff" screen — must feel complete and premium.

Desktop: sticky right panel with all CTAs + price summary.
Mobile: full-page sections stacked, sticky bottom CTA bar.

### Sections:

**A. Ringkasan Proyek** — table/card layout
```
Ruangan        : Ruang Tamu + Ruang Keluarga
Ukuran         : ± 39 m²
Kondisi dinding: Cat lama pudar
Gaya           : Minimalis, Japandi
Momen          : Lebaran
Cara aplikasi  : Tukang Bersertifikat (disarankan)
```

**B. Rekomendasi Warna** — palette preview with swatches
"Edit warna →" link

**C. Sistem Produk** — condensed product list with prices

**D. Estimasi Jumlah** — QuantityResultCard (compact version)

**E. Cara Aplikasi** — with reason for recommendation:
```
[HardHat icon] Tukang Bersertifikat Disarankan
"Berdasarkan kondisi dinding dan area yang dipilih, kami menyarankan 
menggunakan tukang bersertifikat untuk hasil terbaik dan garansi aplikasi."
[Cari Tukang Terdekat →]
```

**F. Estimasi Harga** — PriceSummaryCard:
```
Cat Utama (WR-2301 × 2 kaleng 5L)  : Rp  750.000
Primer (WR-P001 × 1 kaleng 5L)     : Rp  225.000
Peralatan (roller, kuas, tray, dll) : Rp   95.000
Jasa Tukang (estimasi)              : Rp  450.000
Pengiriman                          : Rp   25.000
Promo Lebaran (-10%)                : − Rp 154.500
─────────────────────────────────────────────────
Total Estimasi                      : Rp 1.390.500
```
Note: "Harga estimasi. Harga final dikonfirmasi saat checkout."

**G. Catatan Penting** — styled notes, not just plain text:
```
[Info icon] Warna di layar mungkin berbeda dari cat sebenarnya.
[Package icon] Kami sarankan pesan sample terlebih dahulu — Rp 25.000, dapat dikreditkan.
[AlertTriangle icon] Cat warna custom (tinting) tidak dapat dikembalikan setelah proses.
[Ruler icon] Estimasi jumlah dapat berubah setelah pengukuran lapangan.
```

**CTAs (sticky bottom on mobile, right panel on desktop):**
- `[Beli Paket Ini]` — Primary, forest-700
- `[Pesan Sample Warna]` — Secondary
- `[Konsultasi WhatsApp]` — WhatsApp green (#25D366)
- `[Book Tukang]` — Secondary
- `[Simpan Rencana]` + `[Bagikan ke Tukang ↗]` — Tertiary row

---

## 14. Checkout Screen

Route: `/checkout`

3-tab layout (Tabs component, accessible):

**Tab A: Beli Cat**
- Order summary (product + quantity + price)
- Delivery address fields
- Payment method placeholder (radio: Transfer Bank, COD, E-wallet)
- **Required tinting checkbox:**
  ```
  ☐ Saya memahami bahwa cat warna custom (tinting) tidak dapat 
     dikembalikan setelah proses pencampuran warna dilakukan.
  ```
  "Lanjut Bayar" button disabled until checkbox checked.
- Promo code input

**Tab B: Pesan Sample**
- Up to 3 colour samples
- Delivery address
- Note: "Rp 25.000/sample, dapat dikreditkan ke pembelian cat."

**Tab C: Book Tukang**
- Preferred date range (date inputs)
- Address (text fields)
- Area size confirmation
- Photo upload
- Notes
- "Konfirmasi lewat WhatsApp" CTA

---

## 15. Saved Paint Plan Screen

Route: `/rencana-tersimpan`

```
Plan ID: #WR-2025-001245
Dibuat: 14 Januari 2025

[Plan summary cards — collapsed by default, expandable]
[Tombol: Lanjut ke Checkout]
[Tombol: Bagikan via WhatsApp]
[Tombol: Download PDF ← show toast "Segera hadir"]
[Tombol: Copy link rencana]
```

Empty state (no saved plan):
```
[PaintBucket Lucide icon, large, forest-700/20]
Belum ada rencana cat tersimpan.
[Mulai Panduan Cat →]
```

---

## 16. Stub Pages

These pages must NOT be blank. Each must have:
- Full Navbar + Footer
- A styled hero section
- A "Segera Hadir" section with relevant placeholder content

### Inspirasi Warna (`/inspirasi-warna`)
Hero: "Temukan Inspirasi Warna untuk Setiap Sudut Rumah Anda"
Show: 3×3 placeholder room cards (Picsum) in a masonry-style grid
Show: Colour of the Month feature card
CTA: "Notifikasi saya saat tersedia"

### Anti Bocor & Jamur (`/anti-bocor`)
Hero: "Solusi Dinding Lembap & Bocor yang Tepat"
Show: 4 problem cards with Picsum images + solution headers
Show: Product highlight card (WarnaSeal Waterproofing)
CTA: "Konsultasi Gratis via WhatsApp"

### Jasa Tukang (`/jasa-tukang`)
Hero: "Tukang Cat Bersertifikat, Siap di Kota Anda"
Show: 3 service tier cards (Survey, Pengecatan, Full Service)
Show: City availability list (Jakarta, Bandung, Surabaya, Bali, Medan, Yogyakarta, Semarang...)
CTA: "Cek Ketersediaan di Kota Anda"

---

## 17. Design System Page

Route: `/design-system`

Document and showcase every component. This page should work as a reference for the customer demo — show it as "komponen yang dapat digunakan ulang".

Sections:
- Brand colours (all with hex + CSS variable + contrast ratio)
- Typography scale (all sizes in both fonts)
- Buttons (all variants + all states)
- Form inputs (all states)
- RadioCard + CheckboxCard + ColourSwatch
- Banners (Warning / Success / Error / Info)
- PaletteCard
- ProductCard
- QuantityResultCard
- ApplicationTimeline
- PriceSummaryCard
- Badges
- Progress Stepper
- Tabs + Accordion + Modal
- Toast

---

## 18. Accessibility — Non-Negotiable Requirements

### Every page must have:
```tsx
// First element in every page component
<a href="#main-content" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-forest-700 focus:text-cream-50 focus:px-4 focus:py-2 focus:rounded">
  Lewati ke konten utama
</a>
```

### Focus states — global CSS in `index.css`:
```css
:focus-visible {
  outline: 3px solid #1a4a3a;
  outline-offset: 2px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

### ARIA patterns:
- RadioCards: `role="radiogroup"` > `role="radio"` items
- CheckboxCards: `role="checkbox"` with `aria-checked`
- WarningBanner: `role="alert" aria-live="polite"`
- Modals: `role="dialog" aria-modal="true" aria-labelledby` + focus trap
- Progress: `role="progressbar" aria-valuenow aria-valuemax aria-label`
- ColourSwatches: `aria-label="${name}, ${hex}, ${selected ? 'dipilih' : 'belum dipilih'}"`
- Error fields: `aria-describedby` pointing to error message + `aria-invalid="true"`
- Image uploads: `aria-label` + text description path always available

### Touch targets:
- All buttons, cards, inputs: minimum `min-h-[44px] min-w-[44px]`
- Bottom sticky bar: `h-[72px]`
- ColourSwatches: minimum `w-16 h-16` (64px)

### Language:
```tsx
// LanguageContext — on language change:
document.documentElement.lang = language // 'id' or 'en'
```

---

## 19. WhatsApp Integration

Placeholder number everywhere: `+62 812-0000-0000`

```tsx
// components/paint/WhatsAppCTA.tsx
const waUrl = (message: string) =>
  `https://wa.me/6281200000000?text=${encodeURIComponent(message)}`

// Usage examples:
const generalMsg = "Halo WarnaRumah AI, saya ingin konsultasi pilihan cat."
const planMsg = `Halo, saya sudah punya rencana cat #WR-2025-001245. Bisa bantu proses selanjutnya?`
```

WhatsApp FAB (floating action button) on mobile:
- Fixed bottom-right, `bottom-20 right-4` (above sticky CTA bar)
- 56×56px, `bg-[#25D366]`, rounded-full
- Lucide `MessageCircle` icon, white
- `aria-label="Konsultasi via WhatsApp"`
- Hide on desktop (desktop has nav + inline CTAs)

---

## 20. i18n Structure

```ts
// src/i18n/id.ts (Bahasa Indonesia — default)
export const id = {
  nav: {
    guide: "Panduan Pilih Cat",
    inspiration: "Inspirasi Warna",
    calculator: "Kalkulator Cat",
    antibocor: "Anti Bocor & Jamur",
    tukang: "Jasa Tukang",
    help: "Bantuan",
    langSwitch: "EN",
  },
  hero: {
    badge: "Asisten Cat #1 di Indonesia",
    headline: "Bingung pilih warna dan jumlah cat?",
    subheadline: "Kami bantu pilih warna, hitung kebutuhan cat, rekomendasikan primer, dan tentukan cara pengecatan yang tepat — dalam 5 menit.",
    ctaPrimary: "Mulai Panduan Cat",
    ctaSecondary: "Hitung Kebutuhan Cat",
    trust1: "Gratis konsultasi",
    trust2: "500+ warna",
    trust3: "Tukang bersertifikat",
  },
  assistant: {
    welcomeTitle: "Mau mulai dari mana?",
    progressLabel: "Langkah {current} dari {total}",
    backLabel: "Kembali",
    nextLabel: "Lanjut",
    skipLabel: "Lewati",
  },
  steps: {
    projectType: {
      question: "Apa yang ingin Anda cat?",
      helper: "Pilihan ini membantu kami menentukan jenis cat, primer, dan sistem yang tepat.",
    },
    // ... all step keys
  },
  warnings: {
    dampWall: {
      heading: "Perhatian: Kondisi Dinding Bermasalah",
      body: "Dinding lembap sebaiknya tidak langsung dicat. Cat baru bisa cepat mengelupas jika sumber lembap belum diatasi.",
      ctaAntibocor: "Cek Solusi Anti-Bocor",
      ctaWhatsapp: "Konsultasi WhatsApp",
      ctaContinue: "Lanjutkan dengan catatan risiko",
    },
  },
  // ... continue for all UI strings
}

// src/i18n/en.ts (English alternate)
export const en = {
  nav: {
    guide: "Paint Guide",
    inspiration: "Colour Inspiration",
    calculator: "Paint Calculator",
    antibocor: "Anti-Damp & Mould",
    tukang: "Painting Service",
    help: "Help",
    langSwitch: "ID",
  },
  hero: {
    badge: "Indonesia's #1 Paint Assistant",
    headline: "Not sure what paint to buy?",
    subheadline: "We help you choose the right colour, calculate quantities, recommend primer, and find the right painting method — in 5 minutes.",
    ctaPrimary: "Start Paint Guide",
    ctaSecondary: "Calculate Paint Needed",
    trust1: "Free consultation",
    trust2: "500+ colours",
    trust3: "Certified painters",
  },
  // ... mirror all id.ts keys in English
}
```

---

## 21. Recommendation Logic

```ts
// hooks/useAssistant.ts
export function deriveRecommendations(state: AssistantState): Partial<AssistantState> {
  const rec: Partial<AssistantState> = {}

  // Rule 1: Dampness/mould/leakage always overrides — treatment first
  const hasDamp = ['lembap', 'jamur', 'rembes', 'bocor']
    .some(c => state.wall_condition.includes(c))
  if (hasDamp) {
    rec.requires_treatment = true
    rec.waterproofing_required = true
    rec.primer_required = true
    rec.next_best_action = 'whatsapp'
  }

  // Rule 2: New wall or dark-to-light → primer required
  if (state.wall_condition.includes('baru') || 
      state.colour_change_intensity === 'dark_to_light' ||
      state.colour_change_intensity === 'new_wall') {
    rec.primer_required = true
  }

  // Rule 3: Kitchen / bathroom → anti-jamur product flag
  // (handled in product selection, flagged here for routing)

  // Rule 4: Exterior → weather-resistant product tier
  if (state.project_type === 'exterior') {
    // flag in product data filter
  }

  // Rule 5: Many unsure answers → push WhatsApp
  const unsureCount = [state.project_type, state.surface_type, state.lighting]
    .filter(v => v === 'unsure' || v === 'tidak_yakin' || v === null).length
  if (unsureCount >= 2) {
    rec.next_best_action = 'whatsapp'
  }

  // Rule 6: Complex cases → discourage DIY
  if ((rec.requires_treatment || state.project_type === 'exterior') &&
      state.application_method === 'diy') {
    // show advisory note, don't block
  }

  return rec
}
```

---

## 22. Final Build Checklist

Before `git push` to Vercel, verify:

- [ ] `npm run build` completes with zero errors
- [ ] All routes navigate correctly (no 404s)
- [ ] Homepage loads fully with all sections rendered
- [ ] All 11 assistant steps are reachable and navigable (forward + back)
- [ ] Paint calculator tab A produces correct live estimate
- [ ] Palette recommendation screen shows all 5 palettes
- [ ] Final Paint Plan shows full summary + price
- [ ] Checkout tinting checkbox blocks "Lanjut Bayar" until checked
- [ ] Language switcher toggles all text ID ↔ EN
- [ ] `document.documentElement.lang` updates on language switch
- [ ] Logo is custom SVG — not a default icon or emoji
- [ ] All Picsum images load with deterministic seeds
- [ ] ColourSwatches have text labels visible + ARIA labels
- [ ] WarningBanner appears on damp/mould wall selection
- [ ] Focus rings visible on all interactive elements
- [ ] Skip-to-content link present and functional
- [ ] WhatsApp FAB visible on mobile, hidden on desktop
- [ ] Stub pages render fully (not blank)
- [ ] Design system page renders all components
- [ ] No hardcoded UI strings — all via i18n keys
- [ ] `prefers-reduced-motion` CSS rule in `index.css`
- [ ] `vercel.json` present with SPA rewrite rule
- [ ] Mobile layout tested at 360px width (no horizontal overflow)

---

## 23. Out of Scope for This POC

Document as future phase — do NOT attempt to build:

- Real paint tinting / colour matching engine
- Live inventory or stock API
- Real payment gateway
- Actual WhatsApp Business API
- PDF export (show toast: "Fitur ini segera hadir")
- User accounts / auth / cloud-saved plans
- Real tukang booking backend
- AI photo analysis of wall conditions
- Actual real-time colour rendering / AR visualizer
- Marketplace deep links (Tokopedia / Shopee)
- Offline / PWA support
- Push notifications
