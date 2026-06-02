'use client'

import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'

interface HomePageProps {
  params: { locale: string }
}

const applicationCards = [
  {
    key: 'lingerie',
    image: '/Applications/LINGERIE  女性服装应用/lucid-origin_Luxury_women_s_fashion_apparel_made_with_delicate_floral_lace_fabric_elegant_bla-0.jpg',
  },
  {
    key: 'bridal',
    image: '/Applications/BRIDAL LACE（婚纱应用）/lucid-origin_Designer_bridal_gown_displayed_in_luxury_wedding_boutique_elegant_lace_train_and-0.jpg',
  },
  {
    key: 'fashion',
    image: '/Applications/FASHION APPAREL（时装应用）/lucid-origin_Elegant_woman_wearing_modern_lace_fashion_dress_premium_women_s_clothing_collect-0.jpg',
  },
  {
    key: 'nightwear',
    image: '/Applications/NIGHTWEAR（睡衣应用）/ChatGPT Image 2026年6月1日 16_42_38.png',
  },
  {
    key: 'trim',
    image: '/Applications/花边应用/lucid-origin_Various_lace_trims_applied_on_lingerie-inspired_fashion_garments_dresses_and_clo-0.jpg',
  },
  {
    key: 'oem',
    image: '/Applications/OEM  CUSTOM DEVELOPMENT（开发流程）/ChatGPT Image 2026年6月1日 16_57_29.png',
  },
]

const productCategories = [
  { key: 'stretchLace', name: 'Stretch Lace' },
  { key: 'nylonLace', name: 'Nylon Lace' },
  { key: 'embroideredLace', name: 'Embroidered Lace' },
  { key: 'jacquardLace', name: 'Jacquard Lace' },
  { key: 'bridalLace', name: 'Bridal Lace' },
  { key: 'laceTrim', name: 'Lace Trim' },
]

const trustFacts = [
  { value: '15+', label: 'Years Manufacturing' },
  { value: '5000+', label: 'Lace Designs' },
  { value: '30+', label: 'Export Countries' },
  { value: '3-7', label: 'Days Sampling' },
]

export default function HomePage({ params }: HomePageProps) {
  const locale = params.locale as Locale
  const t = getTranslations(locale) as any
  const isZh = locale === 'zh'

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================ */}
      {/* SECTION 1: HERO - Full Screen Editorial */}
      {/* ============================================ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Applications/BRIDAL LACE（婚纱应用）/lucid-origin_Designer_bridal_gown_displayed_in_luxury_wedding_boutique_elegant_lace_train_and-0.jpg"
            alt="Premium lace fabric"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/70 to-zinc-900/40" />

        {/* Hero Content */}
        <div className="relative z-10 w-full pt-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              {/* Tagline */}
              <p className="text-xs text-amber-500 tracking-[0.3em] uppercase mb-6">
                Premium Lace Manufacturer in China
              </p>

              {/* H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                {isZh ? '专业蕾丝面料制造商' : 'Premium Lace Manufacturer'}
              </h1>

              {/* Sub Categories */}
              <p className="text-lg md:text-xl text-zinc-300 mb-10 tracking-wide">
                Stretch Lace | Bridal Lace | Fashion Lace | OEM Manufacturing
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold tracking-wide rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  {isZh ? '获取免费样品' : 'Get Free Samples'}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold tracking-wide rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/30"
                >
                  {isZh ? '24小时内报价' : 'Request Quote in 24h'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: TRUST FACTS - No Story, Only Facts */}
      {/* ============================================ */}
      <section className="py-16 lg:py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustFacts.map((fact, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-500 mb-2">
                  {fact.value}
                </div>
                <p className="text-sm text-zinc-400 tracking-wide uppercase">
                  {locale === 'zh' ? (
                    { '15+': '年制造经验', '5000+': '蕾丝设计', '30+': '出口国家', '3-7': '天打样' }[fact.value] || fact.label
                  ) : fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: APPLICATIONS PREVIEW - 6 Cards */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-xs text-amber-500 tracking-[0.25em] uppercase mb-4">
              {isZh ? '应用领域' : 'APPLICATIONS'}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              {isZh ? '蕾丝面料应用' : 'Lace Fabric Applications'}
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              {isZh
                ? '从内衣到婚纱，从时尚服饰到定制开发，我们为全球品牌提供优质蕾丝解决方案'
                : 'From lingerie to bridal, from fashion apparel to custom development, we provide premium lace solutions for global brands'}
            </p>
          </div>

          {/* 6 Application Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {applicationCards.map((card, i) => {
              const cardData = t.applications?.[card.key] || {}
              return (
                <Link
                  key={card.key}
                  href={`/${locale}/applications`}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-200"
                >
                  <img
                    src={card.image}
                    alt={cardData.title || card.key}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-1">
                      {cardData.title || card.key}
                    </h3>
                    <p className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isZh ? '查看详情 →' : 'View Details →'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* View All Link */}
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/applications`}
              className="inline-flex items-center gap-2 text-zinc-700 hover:text-zinc-900 font-medium tracking-wide transition-colors"
            >
              {isZh ? '查看全部应用' : 'View All Applications'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: PRODUCTS SIMPLIFIED */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-xs text-amber-500 tracking-[0.25em] uppercase mb-4">
              {isZh ? '产品分类' : 'PRODUCTS'}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              {isZh ? '蕾丝面料分类' : 'Lace Fabric Categories'}
            </h2>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {productCategories.map((cat, i) => (
              <Link
                key={cat.key}
                href={`/${locale}/products`}
                className="group p-6 lg:p-8 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all duration-300 border border-zinc-200 hover:border-zinc-300"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                  {isZh ? (
                    { stretchLace: '弹力蕾丝', nylonLace: '尼龙蕾丝', embroideredLace: '刺绣蕾丝', jacquardLace: '提花蕾丝', bridalLace: '婚纱蕾丝', laceTrim: '花边' }[cat.key] || cat.name
                  ) : cat.name}
                </h3>
                <p className="text-sm text-zinc-500">
                  {isZh ? '探索更多 →' : 'Explore →'}
                </p>
              </Link>
            ))}
          </div>

          {/* View All Products */}
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold tracking-wide rounded-lg transition-all duration-300"
            >
              {isZh ? '查看全部产品' : 'View All Products'}
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: FINAL CTA - Closing Loop */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isZh ? '需要可靠的蕾丝供应商吗？' : 'Need a Reliable Lace Supplier?'}
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
            {isZh
              ? '我们为全球时尚品牌提供OEM蕾丝制造和快速打样服务'
              : 'We support global fashion brands with OEM lace manufacturing and fast sampling services'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold tracking-wide rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              {isZh ? '立即获取报价' : 'Get Quote Now'}
            </Link>
            <a
              href="https://wa.me/8617720716631"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold tracking-wide rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              WhatsApp: +86 177 2071 6631
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
