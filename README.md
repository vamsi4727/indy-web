# WarnaRumah AI — Project Status

Indonesian paint store + AI-guided paint assistant. Production-quality React POC deployable on Vercel.

**GitHub:** https://github.com/vamsi4727/indy-web
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS v3 + React Router v6
**Build:** `npm run build` — passes clean (319 kB JS / 34 kB CSS)

---

## What's Built

### Full Application (all routes wired and functional)

| Route | Screen | Status |
|-------|--------|--------|
| `/` | Home | Done |
| `/panduan` | AssistantWelcome | Done |
| `/panduan/mulai/step/1–11` | 11-step AI assistant flow | Done |
| `/panduan/rekomendasi-warna` | PaletteRecommendation | Done |
| `/panduan/sistem-cat` | PaintSystemResult | Done |
| `/panduan/rencana-cat` | FinalPaintPlan | Done |
| `/panduan/checkout` | Checkout | Done |
| `/panduan/rencana-tersimpan` | SavedPlan | Done |
| `/inspirasi-warna` | InsirasiWarna | Done |
| `/anti-bocor` | AntiBocor | Done |
| `/jasa-tukang` | JasaTukang | Done |
| `/design-system` | DesignSystem (dev only) | Done |
| `*` | NotFound (404) | Done |

### 11-Step Assistant Flow

| Step | Topic |
|------|-------|
| 1 | Project type |
| 2 | Room selection |
| 3 | Paint finish / goals |
| 4 | Wall condition (with gradient thumbnails) |
| 5 | Surface type |
| 6 | Measurement & calculator |
| 7 | Colour change extent |
| 8 | Style preference |
| 9 | Moment / occasion |
| 10 | Lighting |
| 11 | Colour selection |

---

## Architecture

### Key Files

```
src/
├── main.tsx                     # Entry point
├── App.tsx                      # HashRouter + all routes
├── index.css                    # Google Fonts + base styles
├── context/
│   ├── AssistantContext.tsx      # useReducer state for 11-step flow (persisted to sessionStorage)
│   └── LanguageContext.tsx       # id/en i18n switcher
├── i18n/
│   ├── id.ts                    # Indonesian strings (default)
│   └── en.ts                    # English strings
├── data/
│   ├── rooms.ts                 # 8 room cards (Unsplash interior photos)
│   ├── palettes.ts              # 5 colour palettes with Unsplash room photos
│   ├── products.ts              # 4 products (WarnaSeal, WarnaBase, WarnaFresh, WarnaLux)
│   └── testimonials.ts          # 3 testimonials (ui-avatars.com)
├── utils/
│   └── calculator.ts            # calcWallArea() + calcPaintLitres()
├── components/
│   ├── ui/                      # Button, ButtonLink, InputField, NumberInput, RadioCard,
│   │                            #   CheckboxCard, ColourSwatch, Tabs, Accordion, Modal,
│   │                            #   Toast, WarningBanner, Badge
│   ├── layout/                  # Navbar, Footer, Logo, SkipToContent, StepProgress
│   └── paint/                   # PaletteCard, ProductCard, QuantityResultCard,
│                                #   ApplicationTimeline, PriceSummaryCard, RoomCard, WhatsAppCTA
├── screens/
│   ├── Home.tsx
│   ├── AssistantWelcome.tsx
│   ├── AssistantFlow.tsx        # Wraps all steps, SummaryPanel, DERIVE_RECOMMENDATIONS
│   ├── steps/
│   │   ├── Step1_ProjectType.tsx
│   │   ├── Step2_Room.tsx
│   │   ├── Step3_Goals.tsx
│   │   ├── Step4_WallCondition.tsx  # gradient prop (no external images)
│   │   ├── Step5_Surface.tsx
│   │   ├── Step6_Measurement.tsx    # 3-tab calculator
│   │   ├── Step7_ColourChange.tsx
│   │   ├── Step8_Style.tsx
│   │   ├── Step9_Moment.tsx
│   │   ├── Step10_Lighting.tsx
│   │   └── Step11_ColourPick.tsx
│   ├── PaletteRecommendation.tsx
│   ├── PaintSystemResult.tsx
│   ├── FinalPaintPlan.tsx
│   ├── Checkout.tsx
│   ├── SavedPlan.tsx
│   ├── InsirasiWarna.tsx
│   ├── AntiBocor.tsx
│   ├── JasaTukang.tsx
│   ├── DesignSystem.tsx
│   └── NotFound.tsx
```

### Design Tokens (tailwind.config.js)

```
forest: #1a4a3a family  (primary brand green)
cream:  #F5EAD5 family  (background / neutral)
terra:  #C4622D family  (accent / warm)
gold:   #D4A017 family  (seasonal highlights)
ink:    #1a1a1a family  (text)
```

### Fonts
- DM Serif Display — headings (`font-serif`)
- DM Sans — body (`font-sans`)

---

## Image Strategy (resolved)

All `picsum.photos` references have been removed and replaced:

| Location | Replacement |
|----------|-------------|
| `data/rooms.ts` | Unsplash interior photos (8 specific IDs) |
| `data/palettes.ts` | Unsplash interior rooms (5 themed to each palette) |
| `data/testimonials.ts` | `ui-avatars.com` letter avatars (brand colors) |
| `data/products.ts` | SVG data-URI gradient circles (product-colored) |
| `screens/Home.tsx` — hero | Unsplash `photo-1586105251261-72a756497a11` |
| `screens/Home.tsx` — problem grid | CSS gradient divs + Lucide icons (no images) |
| `screens/AntiBocor.tsx` | CSS gradient divs + Lucide icons |
| `screens/InsirasiWarna.tsx` | Static array of 9 Unsplash interior URLs |
| `screens/steps/Step4_WallCondition.tsx` | `gradient` prop (CSS linear-gradient per condition) |

---

## State Management

`AssistantContext` (useReducer + sessionStorage):

Key action types:
- `SET_PROJECT_TYPE` — interior / exterior / both
- `SET_ROOM` — room selection
- `SET_WALL_CONDITION` — auto-sets `requires_treatment` / `waterproofing_needed`
- `SET_MEASUREMENT` — room dimensions / direct area / house preset
- `DERIVE_RECOMMENDATIONS` — computes palette + product recommendations at end of flow

Full state shape defined in `src/context/AssistantContext.tsx`.

---

## Deployment

- **Vercel:** `vercel.json` has SPA rewrite rule `"source": "/(.*)" → "/index.html"`
- **Router:** `HashRouter` (avoids 404s on static hosting)
- **WhatsApp CTA:** placeholder number `+62 812-0000-0000` — update before going live

---

## Known Placeholders / TODO for Next Phase

- [ ] Replace placeholder WhatsApp number (`+62 812-0000-0000`) with real number
- [ ] The "Segera Hadir" (Coming Soon) badge on InsirasiWarna — fill in real palette gallery
- [ ] The "Segera Hadir" badge on AntiBocor — build the full diagnosis flow
- [ ] JasaTukang page — currently a simple placeholder
- [ ] Real product catalog — replace fictional WarnaSeal/WarnaBase/WarnaFresh/WarnaLux brands
- [ ] Checkout flow — currently UI only, no backend/payment
- [ ] SavedPlan — currently saves to sessionStorage only, no persistence
- [ ] Analytics / tracking integration
- [ ] Actual AI/LLM integration for colour recommendations (currently rule-based)

---

## Commits History (summary)

1. **Initial build** — full project scaffolded from spec (`warnarumah-ai-claude-code-prompt-v2.md`)
2. **Build fixes** — resolved TypeScript errors (`ButtonLink` abstraction, unused imports, Step6 type)
3. **Image fixes** — replaced all picsum.photos with relevant paint/interior images

---

## Dev Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview production build
```
