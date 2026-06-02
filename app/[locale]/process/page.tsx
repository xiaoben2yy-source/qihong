import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'
import Counter from '@/components/Counter'

export default function ProcessPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const t = getTranslations(locale)

  const steps = [
    { id: 'inquiry', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { id: 'design', icon: 'M11 4a2 2 0 114 0v1a2 2 0 11-4 0v-1zm8 8a2 2 0 110-4 2 2 0 010 4zM3 16a2 2 0 110-4 2 2 0 010 4zm0-8a2 2 0 100 4 2 2 0 000-4zm0 0v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v1z' },
    { id: 'sampling', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'production', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'qc', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'shipping', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  ]

  const whyChooseUs = [
    { titleKey: 'oemOdmTitle', descKey: 'oemOdmDesc' },
    { titleKey: 'samplingTitle', descKey: 'samplingDesc' },
    { titleKey: 'qualityTitle', descKey: 'qualityDesc' },
    { titleKey: 'exportTitle', descKey: 'exportDesc' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/工厂实拍图/设计交付.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-zinc-950/40" />

        <div className="relative z-10 w-full pt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-xl">
              <p className="text-xs text-amber-500 tracking-widest uppercase mb-6">
                {t.process.heroTagline || 'MANUFACTURING PROCESS'}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {t.process.heroTitle}
              </h1>
              <p className="text-lg text-zinc-400 mb-8">
                {t.process.heroSubtitle}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300"
              >
                {t.contact.title}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats */}
      <section className="py-16 lg:py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { value: 10, suffix: '+' },
              { value: 120, suffix: '+' },
              { value: 30, suffix: '+' },
              { value: 50000, suffix: '+' },
            ].map((stat, index) => (
              <div key={index} className="p-6 border border-zinc-800 rounded-lg text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-zinc-500 tracking-wide">
                  {(t.process as any)[['yearsExp', 'machines', 'exportCountries', 'monthlyOutput'][index]]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Timeline Steps */}
      <section className="py-16 lg:py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 text-center">
            {t.process.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                  </svg>
                </div>
                <p className="text-sm font-medium text-zinc-900">{(t.process as any)[step.id + 'Title'] || step.id}</p>
                <p className="text-xs text-zinc-500 mt-1">{(t.process as any)[step.id + 'Desc'] || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process Details */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
          {/* Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden">
              <img src="/工厂实拍图/办公室.png" alt="Design" className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <p className="text-xs text-amber-500 tracking-widest uppercase mb-3">01</p>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                {t.process.step1Title}
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-6">
                {t.process.step1Desc}
              </p>
              <ul className="space-y-2">
                {(['step1List1', 'step1List2', 'step1List3', 'step1List4', 'step1List5'] as const).map((key, i) => (
                  <li key={i} className="flex items-center text-sm text-zinc-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3" />
                    {(t.process as any)[key]}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Production */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-xs text-amber-500 tracking-widest uppercase mb-3">02</p>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                {t.process.step2Title}
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-6">
                {t.process.step2Desc}
              </p>
              <ul className="space-y-2">
                {(['step2List1', 'step2List2', 'step2List3', 'step2List4'] as const).map((key, i) => (
                  <li key={i} className="flex items-center text-sm text-zinc-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3" />
                    {(t.process as any)[key]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative rounded-lg overflow-hidden">
              <img src="/工厂实拍图/车间.png" alt="Production" className="w-full h-[400px] object-cover" />
            </div>
          </div>

          {/* QC */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden">
              <img src="/工厂实拍图/印染.jpg" alt="Quality" className="w-full h-[400px] object-cover" />
            </div>
            <div>
              <p className="text-xs text-amber-500 tracking-widest uppercase mb-3">03</p>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                {t.process.step3Title}
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-6">
                {t.process.step3Desc}
              </p>
              <ul className="space-y-2">
                {(['step3List1', 'step3List2', 'step3List3', 'step3List4'] as const).map((key, i) => (
                  <li key={i} className="flex items-center text-sm text-zinc-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3" />
                    {(t.process as any)[key]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-16 lg:py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            {t.process.whyChooseUs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="p-8 border border-zinc-800 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {(t.process as any)[item.titleKey]}
                </h3>
                <p className="text-sm text-zinc-400">
                  {(t.process as any)[item.descKey]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-16 lg:py-20 bg-amber-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.process.ctaTitle}
          </h2>
          <p className="text-lg text-amber-100 mb-8">
            {t.process.ctaSubtitle}
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