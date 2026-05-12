import { useLanguage } from '../context/LanguageContext'
import ButtonLink from '../components/ui/ButtonLink'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <main id="main-content" className="min-h-[60vh] bg-cream-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="font-serif text-8xl text-forest-700/20 mb-4">404</div>
        <h1 className="font-serif text-3xl text-ink-900 mb-3">{t.common.notFound}</h1>
        <p className="text-ink-500 mb-8">Halaman yang Anda cari tidak ditemukan.</p>
        <ButtonLink to="/">{t.common.backHome}</ButtonLink>
      </div>
    </main>
  )
}
