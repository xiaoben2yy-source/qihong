'use client'

import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'
import { useEffect, useState } from 'react'
import Carousel from '@/components/Carousel'

interface HomePageProps {
  params: { locale: string }
}

const WHATSAPP_URL = 'https://wa.me/8617720716631?text=Hi%2C%20I%20am%20interested%20in%20your%20lace%20products'
const QUOTE_URL_EN = 'https://wa.me/8617720716631?text=Hi%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20lace%20fabric'
const QUOTE_URL_ZH = 'https://wa.me/8617720716631?text=你好%EF%BC%8C我想咨询蕾丝面料报价'

// Product categories with actual images from the site
const productCategories = [
  {
    key: 'laceFabric',
    image: '/images/近期热卖/微信图片_20260402095851_49_37.jpg',
  },
  {
    key: 'elasticLace',
    image: '/images/弹性大边/H6001 11-23.5.jpg',
  },
  {
    key: 'embroideryLace',
    image: '/images/睫毛蕾丝/J1003 10.jpg',
  },
]

// Factory showcase images
const factoryImages = [
  { src: '/工厂实拍图/车间.png', altEn: 'Production workshop', altZh: '生产车间', altEs: 'Taller de producción', altPt: 'Oficina de produção', altRu: 'Производственный цех', altAr: 'ورشة الإنتاج' },
  { src: '/工厂实拍图/坯布仓库.jpg', altEn: 'Advanced equipment', altZh: '先进设备', altEs: 'Equipo avanzado', altPt: 'Equipamento avançado', altRu: 'Современное оборудование', altAr: 'معدات متقدمة' },
  { src: '/工厂实拍图/印染.jpg', altEn: 'Dyeing and finishing', altZh: '染整加工', altEs: 'Teñido y acabado', altPt: 'Tintura e acabamento', altRu: 'Окрашивание и отделка', altAr: 'الصباغة والتشطيب' },
]

// Helper function to get localized alt
const getLocalizedAlt = (img: typeof factoryImages[0], locale: string) => {
  switch (locale) {
    case 'zh': return img.altZh
    case 'es': return img.altEs
    case 'pt': return img.altPt
    case 'ru': return img.altRu
    case 'ar': return img.altAr
    default: return img.altEn
  }
}

// Why choose us items
const whyItems = [
  { key: 'stable' },
  { key: 'fast' },
  { key: 'strict' },
  { key: 'price' },
  { key: 'export' },
]

export default function HomePage({ params }: HomePageProps) {
  const locale = params.locale as Locale
  const t = getTranslations(locale)
  const isZh = locale === 'zh'

  const [bannerImages, setBannerImages] = useState<{ src: string; alt: string }[]>([])

  useEffect(() => {
    fetch('/api/banner')
      .then(res => res.json())
      .then(data => setBannerImages(data))
      .catch(() => {})
  }, [])

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const whatsappUrl = isZh
    ? 'https://wa.me/8617720716631?text=你好%EF%BC%8C我想咨询蕾丝产品'
    : WHATSAPP_URL
  const quoteUrl = isZh ? QUOTE_URL_ZH : QUOTE_URL_EN

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================ */}
      {/* SECTION 1: MOBILE-FIRST HERO */}
      {/* ============================================ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {bannerImages.length > 0 ? (
            <Carousel images={bannerImages} autoPlay={true} interval={5000} />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/工厂实拍图/车间.png)' }}
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/80 to-zinc-900/40" />

        {/* Hero Content */}
        <div className="relative z-10 w-full pt-20 pb-12 px-5 md:px-8">
          {/* Company Name */}
          <p className="text-xs text-amber-500 tracking-[0.25em] uppercase mb-4">
            {t.home.companyName}
          </p>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-4">
            {locale === 'zh' ? (
              <>
                <span className="text-amber-500">Premium Lace Manufacturer</span>
                <br />
                <span>& Supplier in China</span>
              </>
            ) : locale === 'es' ? (
              <>
                <span className="text-amber-500">Fabricante de Encaje Premium</span>
                <br />
                <span>& Proveedor en China</span>
              </>
            ) : locale === 'pt' ? (
              <>
                <span className="text-amber-500">Fabricante de Renda Premium</span>
                <br />
                <span>& Fornecedor na China</span>
              </>
            ) : locale === 'ru' ? (
              <>
                <span className="text-amber-500">Премиальный Производитель Кружева</span>
                <br />
                <span>& Поставщик в Китае</span>
              </>
            ) : locale === 'ar' ? (
              <>
                <span className="text-amber-500">مصنع الدانتيل الفاخر</span>
                <br />
                <span>& المورد في الصين</span>
              </>
            ) : (
              <>
                <span className="text-amber-500">Premium Lace Manufacturer</span>
                <br />
                <span>& Supplier in China</span>
              </>
            )}
          </h1>

          {/* Tagline */}
          <p className="text-base md:text-lg text-zinc-300 mb-6 max-w-md">
            {t.home.heroTagline}
          </p>

          {/* 3 Core Selling Points */}
          <div className="space-y-2 mb-8">
            {[
              { text: t.home.heroPoint1, icon: '🏭' },
              { text: t.home.heroPoint2, icon: '🧵' },
              { text: t.home.heroPoint3, icon: '✅' },
            ].map((point, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-amber-500 text-sm">✓</span>
                <span className="text-sm md:text-base text-white/90">{point.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-lg transition-all duration-300 active:scale-[0.98] min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.home.whatsappCta}
            </a>
            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg transition-all duration-300 active:scale-[0.98] min-h-[44px]"
            >
              {t.home.quoteCta}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-[10px] text-white/30 tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: TRUST SECTION - 2x2 Grid */}
      {/* ============================================ */}
      <section className="py-12 md:py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="text-lg text-amber-600 font-medium mb-6 text-center">
            {t.home.trustTitle}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { value: t.home.trustYearsValue, label: t.home.trustYears, icon: '🏭' },
              { value: t.home.trustCountriesValue, label: t.home.trustCountries, icon: '🌍' },
              { value: t.home.trustMoqValue, label: t.home.trustMoq, icon: '🤝' },
              { value: t.home.trustQualityValue, label: t.home.trustQuality, icon: '✓' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xl md:text-2xl font-bold text-zinc-900">{item.value}</div>
                <div className="text-xs md:text-sm text-zinc-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: PRODUCT CATEGORIES */}
      {/* ============================================ */}
      <section className="py-12 md:py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          {/* Section Header */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
              {t.home.productsTitle}
            </h2>
            <p className="text-sm text-zinc-500">
              {t.home.productsSubtitle}
            </p>
          </div>

          {/* Product Grid - Mobile 1 col, Tablet 2 col, Desktop 3 col */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {/* Lace Fabric */}
            <div className="group relative overflow-hidden rounded-xl bg-zinc-100 aspect-[4/5]">
              <img
                src="/images/近期热卖/微信图片_20260402095851_49_37.jpg"
                alt="Lace Fabric - Premium quality lace fabric for fashion apparel"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-white mb-1">
                  {t.home.categoryLaceFabric}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t.home.categoryLaceFabricDesc}
                </p>
                <Link
                  href={`/${locale}/products`}
                  className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors min-h-[36px] flex items-center"
                >
                  {t.home.viewProducts}
                </Link>
              </div>
            </div>

            {/* Elastic Lace */}
            <div className="group relative overflow-hidden rounded-xl bg-zinc-100 aspect-[4/5]">
              <img
                src="/images/弹性大边/H6001 11-23.5.jpg"
                alt="Elastic Lace - Stretch lace for comfortable apparel fit"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-white mb-1">
                  {t.home.categoryElasticLace}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t.home.categoryElasticLaceDesc}
                </p>
                <Link
                  href={`/${locale}/products`}
                  className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors min-h-[36px] flex items-center"
                >
                  {t.home.viewProducts}
                </Link>
              </div>
            </div>

            {/* Embroidery Lace */}
            <div className="group relative overflow-hidden rounded-xl bg-zinc-100 aspect-[4/5]">
              <img
                src="/images/睫毛蕾丝/J1003 10.jpg"
                alt="Embroidery Lace - Intricate embroidery fabric details"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-white mb-1">
                  {t.home.categoryEmbroideryLace}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t.home.categoryEmbroideryLaceDesc}
                </p>
                <Link
                  href={`/${locale}/products`}
                  className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors min-h-[36px] flex items-center"
                >
                  {t.home.viewProducts}
                </Link>
              </div>
            </div>
          </div>

          {/* View All Products Link */}
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              {t.home.viewAllProducts}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: FACTORY SHOWCASE */}
      {/* ============================================ */}
      <section className="py-12 md:py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          {/* Section Header */}
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t.home.factoryTitle}
            </h2>
            <p className="text-sm text-zinc-400">
              {t.home.factorySubtitle}
            </p>
          </div>

          {/* Factory Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {factoryImages.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src={img.src}
                  alt={getLocalizedAlt(img, locale)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Factory Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-zinc-800/50 rounded-xl">
              <div className="text-xl md:text-2xl font-bold text-amber-500">10+</div>
              <div className="text-xs text-zinc-400 mt-1">{t.home.factoryStatsYear}</div>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-xl">
              <div className="text-xl md:text-2xl font-bold text-amber-500">10,000m²</div>
              <div className="text-xs text-zinc-400 mt-1">{t.home.factoryStatsArea}</div>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-xl">
              <div className="text-xl md:text-2xl font-bold text-amber-500">30+</div>
              <div className="text-xs text-zinc-400 mt-1">{t.home.factoryStatsCountries}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: WHY CHOOSE US */}
      {/* ============================================ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2 text-center">
            {t.home.whyTitle}
          </h2>
          <p className="text-sm text-zinc-500 text-center mb-8">
            {t.home.whySubtitle}
          </p>

          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { key: 'stable', icon: '🏭' },
              { key: 'fast', icon: '⚡' },
              { key: 'strict', icon: '✓' },
              { key: 'price', icon: '💰' },
              { key: 'export', icon: '🌍' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-zinc-50 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-zinc-900">
                    {t.home[`why${item.key.charAt(0).toUpperCase() + item.key.slice(1)}` as keyof typeof t.home]}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    {t.home[`why${item.key.charAt(0).toUpperCase() + item.key.slice(1)}Desc` as keyof typeof t.home]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: FAQ SECTION - SEO */}
      {/* ============================================ */}
      <section className="py-16 md:py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 text-center">
            {t.home.faqTitle}
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: t.home.faq1q, a: t.home.faq1a },
              { q: t.home.faq2q, a: t.home.faq2a },
              { q: t.home.faq3q, a: t.home.faq3a },
              { q: t.home.faq4q, a: t.home.faq4a },
              { q: t.home.faq5q, a: t.home.faq5a },
              { q: t.home.faq6q, a: t.home.faq6a },
              { q: t.home.faq7q, a: t.home.faq7a },
              { q: t.home.faq8q, a: t.home.faq8a },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-zinc-900 mb-2 flex items-start gap-2">
                  <span className="text-amber-500">Q{i + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-sm text-zinc-600 pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 7: INQUIRY CTA */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            {t.home.inquiryTitle}
          </h2>
          <p className="text-sm md:text-base text-zinc-400 mb-8 max-w-xl mx-auto">
            {t.home.inquirySubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 active:scale-[0.98] min-h-[48px]"
            >
              {t.home.contactNow}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold rounded-lg transition-all duration-300 active:scale-[0.98] min-h-[48px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.home.whatsappDirect}
            </a>
          </div>
        </div>
      </section>

      </div>
  )
}