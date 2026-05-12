import { Link } from 'react-router-dom'
import { Instagram, Youtube, MessageCircle } from 'lucide-react'
import { LogoFull } from './Logo'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <footer className="bg-forest-800 text-cream-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <LogoFull className="[&_span]:!text-cream-50 [&_svg_path]:!fill-cream-100" />
            </div>
            <p className="text-sm text-cream-200 leading-relaxed mb-5">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram WarnaRumah AI"
                className="p-2 rounded-lg bg-forest-700 hover:bg-forest-500 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube WarnaRumah AI"
                className="p-2 rounded-lg bg-forest-700 hover:bg-forest-500 transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://wa.me/6281200000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp WarnaRumah AI"
                className="p-2 rounded-lg bg-forest-700 hover:bg-forest-500 transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Panduan */}
          <div>
            <h3 className="font-semibold text-cream-50 mb-4">{t.footer.panduan}</h3>
            <ul className="flex flex-col gap-2">
              {t.footer.links.panduan.map(link => (
                <li key={link}>
                  <Link
                    to="/panduan"
                    className="text-sm text-cream-200 hover:text-cream-50 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produk */}
          <div>
            <h3 className="font-semibold text-cream-50 mb-4">{t.footer.produk}</h3>
            <ul className="flex flex-col gap-2">
              {t.footer.links.produk.map(link => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-sm text-cream-200 hover:text-cream-50 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 className="font-semibold text-cream-50 mb-4">{t.footer.bantuan}</h3>
            <ul className="flex flex-col gap-2">
              {t.footer.links.bantuan.map(link => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-sm text-cream-200 hover:text-cream-50 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream-200">{t.footer.copyright}</p>
          <button
            type="button"
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className="text-sm font-semibold text-cream-200 hover:text-cream-50 transition-colors"
          >
            {language === 'id' ? '🇮🇩 Bahasa Indonesia' : '🇬🇧 English'}
          </button>
        </div>
      </div>
    </footer>
  )
}
