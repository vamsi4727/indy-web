import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, MessageCircle, Menu, X } from 'lucide-react'
import { LogoFull } from './Logo'
import { useLanguage } from '../../context/LanguageContext'
import ButtonLink from '../ui/ButtonLink'

const navItems = [
  { key: 'panduan' as const, href: '/panduan' },
  { key: 'inspirasi' as const, href: '/inspirasi-warna' },
  { key: 'antiBocor' as const, href: '/anti-bocor' },
  { key: 'jasaTukang' as const, href: '/jasa-tukang' },
]

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const waUrl = `https://wa.me/6281200000000?text=${encodeURIComponent('Halo WarnaRumah AI, saya ingin konsultasi pilihan cat.')}`

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-ink-500/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" aria-label="WarnaRumah AI — Beranda">
              <LogoFull />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Navigasi utama">
              {navItems.map(item => {
                const isActive = location.pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={[
                      'text-sm font-medium transition-colors duration-200 py-1',
                      isActive
                        ? 'text-forest-700 font-semibold border-b-2 border-terra-400'
                        : 'text-ink-700 hover:text-forest-700',
                    ].join(' ')}
                  >
                    {t.nav[item.key]}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                aria-label={t.nav.search}
                className="p-2 rounded-lg text-ink-500 hover:text-forest-700 hover:bg-cream-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Search size={18} />
              </button>

              <button
                type="button"
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                className="text-sm font-semibold text-ink-500 hover:text-forest-700 transition-colors px-2 py-1 rounded"
                aria-label="Ganti bahasa"
              >
                {language === 'id' ? 'ID | EN' : 'EN | ID'}
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Konsultasi via WhatsApp"
                className="p-2 rounded-lg text-[#25D366] hover:bg-green-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <MessageCircle size={18} />
              </a>

              <ButtonLink to="/panduan" size="sm">{t.nav.mulai}</ButtonLink>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                className="text-xs font-semibold text-ink-500 px-2 py-1 rounded"
              >
                {language.toUpperCase()}
              </button>
              <button
                type="button"
                aria-label={mobileOpen ? t.nav.close : t.nav.menu}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(v => !v)}
                className="p-2 rounded-lg text-ink-700 hover:bg-cream-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="absolute right-0 top-0 h-full w-80 bg-cream-50 shadow-2xl flex flex-col"
            aria-label="Navigasi mobile"
          >
            <div className="flex items-center justify-between p-4 border-b border-ink-500/10">
              <LogoFull />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t.nav.close}
                className="p-2 rounded-lg text-ink-500 hover:bg-cream-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
              {navItems.map(item => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'px-4 py-3 rounded-xl text-base font-medium transition-colors min-h-[44px] flex items-center',
                    location.pathname.startsWith(item.href)
                      ? 'bg-forest-700 text-cream-50'
                      : 'text-ink-700 hover:bg-cream-100',
                  ].join(' ')}
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-ink-500/10 flex flex-col gap-3">
              <ButtonLink to="/panduan" fullWidth onClick={() => setMobileOpen(false)}>{t.nav.mulai}</ButtonLink>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20b858] transition-colors min-h-[44px]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
