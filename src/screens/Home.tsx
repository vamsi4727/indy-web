import { Link } from 'react-router-dom'
import { MessageCircle, Package, Droplets, HardHat, ArrowRight, Star, Moon, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import ButtonLink from '../components/ui/ButtonLink'
import RoomCard from '../components/paint/RoomCard'
import WhatsAppCTA from '../components/paint/WhatsAppCTA'
import { rooms } from '../data/rooms'
import { testimonials } from '../data/testimonials'
import { palettes } from '../data/palettes'
import Badge from '../components/ui/Badge'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-gold-400 fill-gold-400' : 'text-ink-500/30'}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const { t } = useLanguage()

  const trustItems = [
    { icon: <MessageCircle size={24} className="text-forest-700" />, ...t.trustBar.t1 },
    { icon: <Package size={24} className="text-forest-700" />, ...t.trustBar.t2 },
    { icon: <Droplets size={24} className="text-forest-700" />, ...t.trustBar.t3 },
    { icon: <HardHat size={24} className="text-forest-700" />, ...t.trustBar.t4 },
  ]

  const problemItems = [
    { seed: 'mold-wall', label: t.problem.mold },
    { seed: 'peeling-paint', label: t.problem.peeling },
    { seed: 'crack-wall', label: t.problem.crack },
    { seed: 'water-stain', label: t.problem.water },
  ]

  return (
    <main id="main-content">
      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] lg:min-h-[85vh] flex items-center overflow-hidden bg-cream-50">
        {/* Watermark SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
          viewBox="0 0 800 600"
          fill="none"
          aria-hidden="true"
        >
          <path d="M100 500 Q400 100 700 500" stroke="#1a4a3a" strokeWidth="80" strokeLinecap="round" fill="none" />
          <path d="M50 400 Q400 50 750 400" stroke="#c4622d" strokeWidth="60" strokeLinecap="round" fill="none" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid lg:grid-cols-[60%_40%] gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-forest-700/10 text-forest-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <CheckCircle size={16} />
                {t.hero.badge}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-900 mb-6 leading-tight">
                {t.hero.headline.split('\n').map((line, i) => (
                  <span key={i} className={i === 1 ? 'text-forest-700 block' : 'block'}>
                    {line}
                  </span>
                ))}
              </h1>

              <p className="text-lg text-ink-700 mb-8 max-w-lg leading-relaxed">
                {t.hero.sub}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <ButtonLink to="/panduan" size="lg">{t.hero.cta1}</ButtonLink>
                <ButtonLink to="/inspirasi-warna" size="lg" variant="outline">{t.hero.cta2}</ButtonLink>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-ink-500">
                    <CheckCircle size={14} className="text-forest-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image + floating card */}
            <div className="relative hidden lg:block">
              <div className="relative -rotate-1 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://picsum.photos/seed/livingroom/800/600"
                  alt="Ruang tamu dengan warna WarnaRumah AI"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Floating swatch card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-ink-500/10 w-56">
                <div className="text-xs font-semibold text-ink-500 mb-2 uppercase tracking-wide">Rekomendasi AI</div>
                <div className="flex gap-2 mb-2">
                  {['#F5EAD5', '#8db09b', '#FAFAF8'].map(hex => (
                    <div key={hex} className="w-8 h-8 rounded-full border border-ink-500/10" style={{ backgroundColor: hex }} />
                  ))}
                </div>
                <div className="font-serif font-semibold text-ink-900">Adem Lebaran</div>
                <div className="text-xs text-ink-500">Cocok untuk ruang tamu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-y border-ink-500/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
            {trustItems.map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-cream-50 transition-colors">
                {item.icon}
                <div className="font-semibold text-ink-900 mt-2">{item.title}</div>
                <div className="text-sm text-ink-500">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASONAL MODULE ── */}
      <section className="py-16 bg-gradient-to-br from-gold-300/20 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-2 bg-gold-400/20 text-gold-500 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Moon size={16} />
              {t.seasonal.badge}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-3">{t.seasonal.title}</h2>
            <p className="text-ink-500 max-w-xl">{t.seasonal.sub}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {palettes.slice(0, 3).map(palette => (
              <Link
                key={palette.id}
                to="/panduan/rekomendasi-warna"
                className="group bg-white rounded-2xl overflow-hidden border border-ink-500/10 hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={palette.image}
                  alt={palette.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="flex">
                  {palette.colours.map(c => (
                    <div key={c.code} className="flex-1 h-2" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
                <div className="p-4">
                  {palette.badge && <Badge variant={palette.badge} />}
                  <h3 className="font-serif font-semibold text-ink-900 mt-1">{palette.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/inspirasi-warna"
              className="inline-flex items-center gap-2 text-forest-700 font-semibold hover:underline"
            >
              {t.seasonal.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROBLEM MODULE ── */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-4">
                {t.problem.title.split('\n').map((line, i) => (
                  <span key={i} className={i > 0 ? 'text-terra-400 block' : 'block'}>{line}</span>
                ))}
              </h2>
              <p className="text-ink-500 mb-8 leading-relaxed">{t.problem.sub}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <ButtonLink to="/panduan">{t.problem.cta1}</ButtonLink>
                <WhatsAppCTA label={t.problem.cta2} variant="button" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {problemItems.map(item => (
                <div key={item.seed} className="relative rounded-xl overflow-hidden aspect-square bg-ink-900/10">
                  <img
                    src={`https://picsum.photos/seed/${item.seed}/300/300`}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white font-semibold text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOMS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-3">{t.rooms.title}</h2>
            <p className="text-ink-500 max-w-xl mx-auto">{t.rooms.sub}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-3">{t.howItWorks.title}</h2>
            <p className="text-ink-500">{t.howItWorks.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step) => (
              <div key={step.num} className="flex flex-col items-start">
                <div className="font-serif text-5xl text-forest-700/20 font-normal mb-3">{step.num}</div>
                <h3 className="font-semibold text-ink-900 mb-2">{step.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <ButtonLink to="/panduan" size="lg">
              Mulai Panduan Sekarang <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-900 mb-3">{t.testimonials.title}</h2>
            <p className="text-ink-500">{t.testimonials.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-cream-50 rounded-2xl p-6 border border-ink-500/10">
                <StarRating rating={testimonial.rating} />
                <p className="text-ink-700 text-sm leading-relaxed my-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-ink-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-ink-500">{testimonial.location}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-forest-700 font-medium">{testimonial.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 bg-forest-700 text-cream-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">Siap Memulai Proyek Cat Anda?</h2>
          <p className="text-cream-200 mb-8">
            Dapatkan rekomendasi warna, kalkulator cat, dan panduan aplikasi — gratis, tanpa akun.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <ButtonLink to="/panduan" size="lg" variant="secondary">Mulai Panduan Gratis</ButtonLink>
            <WhatsAppCTA label="Konsultasi via WhatsApp" />
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <WhatsAppCTA variant="fab" />
    </main>
  )
}
