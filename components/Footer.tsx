import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'

interface FooterProps {
  locale: Locale
}

export default function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale)

  return (
    <footer className="bg-zinc-950">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="Qihong Textile" className="h-24 lg:h-28 w-auto object-contain mb-6 brightness-0 invert" />
            <p className="text-sm text-white/40 font-light leading-relaxed">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-base text-amber-500 tracking-widest uppercase mb-6">
              {t.footer.navigation}
            </h4>
            <div className="space-y-4">
              <Link href={`/${locale}`} className="block text-base text-white/50 hover:text-white transition-colors duration-500">
                {t.nav.home}
              </Link>
              <Link href={`/${locale}/about`} className="block text-base text-white/50 hover:text-white transition-colors duration-500">
                {t.nav.about}
              </Link>
              <Link href={`/${locale}/process`} className="block text-base text-white/50 hover:text-white transition-colors duration-500">
                {t.nav.process}
              </Link>
              <Link href={`/${locale}/products`} className="block text-base text-white/50 hover:text-white transition-colors duration-500">
                {t.nav.products}
              </Link>
              <Link href={`/${locale}/contact`} className="block text-base text-white/50 hover:text-white transition-colors duration-500">
                {t.nav.contact}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base text-amber-500 tracking-widest uppercase mb-6">
              {t.footer.contact}
            </h4>
            <div className="space-y-4 text-base">
              <div>
                <p className="text-white/30 text-sm mb-1">{t.contact.email}</p>
                <p className="text-white/50">sales@qihongtextile.com</p>
              </div>
              <div>
                <p className="text-white/30 text-sm mb-1">{t.contact.whatsapp}</p>
                <a href="https://wa.me/8617720716631" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#20BD5A]">+86 177 2071 6631</a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-base text-amber-500 tracking-widest uppercase mb-6">
              {t.footer.location}
            </h4>
            <p className="text-base text-white/50 font-light leading-relaxed">
              {t.footer.address}
            </p>
            <p className="text-sm text-white/30 mt-3">
              {t.footer.industry}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/30">
              {t.footer.copyright}
            </p>
            <p className="text-sm text-white/20">
              {t.footer.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}