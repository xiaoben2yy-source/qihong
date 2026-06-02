import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'
import Counter from '@/components/Counter'
import FactoryGallery from '@/components/FactoryGallery'

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const t = getTranslations(locale)

  const stats = [
    { value: 10, suffix: '+' },
    { value: 120, suffix: '+' },
    { value: 10000, suffix: '+' },
    { value: 30, suffix: '+' },
    { value: 50000, suffix: '+' },
    { value: 200, suffix: '+' },
  ]

  const statKeys = ['yearsExp', 'machines', 'factoryArea', 'exportCountries', 'monthlyOutput', 'laceDesigns']

  const advantages = [
    { titleKey: 'isoCertifiedTitle', descKey: 'isoCertifiedDesc' },
    { titleKey: 'machinesTitle', descKey: 'machinesDesc' },
    { titleKey: 'oemOdmTitle', descKey: 'oemOdmDesc' },
    { titleKey: 'globalExportTitle', descKey: 'globalExportDesc' },
  ]

  const markets = ['Europe', 'NorthAmerica', 'SouthAmerica', 'SoutheastAsia', 'MiddleEast']

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/工厂实拍图/大楼.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-zinc-950/40" />

        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="max-w-xl">
                <p className="text-xs text-amber-500 tracking-widest uppercase mb-6">
                  {t.about.heroTagline}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {t.about.title}
                </h1>
                <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                  {t.about.heroSubtitle}
                </p>
                <p className="text-base text-zinc-400 mb-10 leading-relaxed max-w-lg">
                  {t.about.heroDesc}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/${locale}/products`}
                    className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {t.process.viewProducts}
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="px-8 py-4 border border-white/30 text-white text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    {t.contact.title}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
                {t.about.mfgTitle}
              </h2>
              <p className="text-zinc-600 mb-8 leading-relaxed max-w-xl">
                {t.about.mfgDesc}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {advantages.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-amber-500 flex-shrink-0 mt-1" />
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-zinc-900">{(t.about as any)[item.titleKey]}</p>
                      <p className="text-xs text-zinc-500">{(t.about as any)[item.descKey]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:pl-8 lg:border-l lg:border-zinc-200">
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6">
                {t.about.advantagesTitle}
              </h3>
              {advantages.slice(2, 4).map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-zinc-900">{(t.about as any)[item.titleKey]}</p>
                    <p className="text-sm text-zinc-500">{(t.about as any)[item.descKey]}</p>
                  </div>
                </div>
              ))}
              <p className="text-sm text-zinc-600 leading-relaxed pt-4">
                {t.about.commitment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats */}
      <section className="py-20 lg:py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t.about.strengthsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 border border-zinc-800 rounded-lg text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-zinc-500 tracking-wide">
                  {(t.about as any)[statKeys[index]]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Factory Gallery */}
      <section className="py-20 lg:py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900">
              {t.about.factoryTitle}
            </h2>
          </div>
          <FactoryGallery />
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900">
              {t.about.whyTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((item, index) => (
              <div key={index} className="p-8 border border-zinc-100 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-5">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  {(t.about as any)[item.titleKey]}
                </h3>
                <p className="text-sm text-zinc-500">
                  {(t.about as any)[item.descKey]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Global Market */}
      <section className="py-20 lg:py-28 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t.about.globalTitle}
              </h2>
              <p className="text-zinc-400 mb-8 leading-relaxed max-w-lg">
                {t.about.globalDesc}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {markets.map((market, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-3" />
                    <span className="text-sm text-zinc-300">
                      {(t.about as any)[market]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <img src="/工厂实拍图/全球客户.png" alt="Global Customers" className="w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-20 lg:py-28 bg-amber-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.about.ctaTitle}
          </h2>
          <p className="text-lg text-amber-100 mb-10">
            {t.about.ctaDesc}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-10 py-4 bg-white text-amber-600 text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-amber-50 transition-all duration-300"
          >
            {t.contact.title}
          </Link>
        </div>
      </section>
    </div>
  )
}