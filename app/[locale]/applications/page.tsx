'use client'

import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'

interface ApplicationsPageProps {
  params: { locale: string }
}

const applicationData = [
  {
    key: 'lingerie',
    folder: 'LINGERIE  女性服装应用',
    images: [
      'lucid-origin_Luxury_women_s_fashion_apparel_made_with_delicate_floral_lace_fabric_elegant_bla-0.jpg',
      'lucid-origin_Close-up_detail_of_premium_floral_lace_fabric_applied_on_women_s_fashion_garment-0.jpg',
      'lucid-origin_Modern_women_s_fashion_collection_featuring_lace_fabric_garments_elegant_showroo-0.jpg',
    ],
  },
  {
    key: 'bridal',
    folder: 'BRIDAL LACE（婚纱应用）',
    images: [
      'lucid-origin_Designer_bridal_gown_displayed_in_luxury_wedding_boutique_elegant_lace_train_and-0.jpg',
      'lucid-origin_Elegant_bride_wearing_luxury_lace_wedding_gown_intricate_floral_lace_details_rom-0.jpg',
      'lucid-origin_Close-up_of_bridal_lace_fabric_on_wedding_dress_sleeves_and_neckline_delicate_em-0.jpg',
    ],
  },
  {
    key: 'fashion',
    folder: 'FASHION APPAREL（时装应用）',
    images: [
      'lucid-origin_Elegant_woman_wearing_modern_lace_fashion_dress_premium_women_s_clothing_collect-0.jpg',
      'lucid-origin_Fashion_collection_featuring_lace_skirts_dresses_and_tops_modern_apparel_manufac-0.jpg',
      'lucid-origin_Luxury_women_s_blouse_with_lace_sleeves_and_lace_details_premium_garment_manufac-0.jpg',
    ],
  },
  {
    key: 'nightwear',
    folder: 'NIGHTWEAR（睡衣应用）',
    images: [
      'ChatGPT Image 2026年6月1日 16_42_38.png',
      'ChatGPT Image 2026年6月1日 16_43_48.png',
      'ChatGPT Image 2026年6月1日 16_44_41.png',
    ],
  },
  {
    key: 'trim',
    folder: '花边应用',
    images: [
      'lucid-origin_Various_lace_trims_applied_on_lingerie-inspired_fashion_garments_dresses_and_clo-0.jpg',
      'lucid-origin_Close-up_of_lace_trim_applied_on_garment_neckline_premium_decorative_lace_edging-0.jpg',
      'lucid-origin_Luxury_fashion_dress_featuring_decorative_lace_trim_on_sleeves_and_hemline_premi-0.jpg',
    ],
  },
  {
    key: 'oem',
    folder: 'OEM  CUSTOM DEVELOPMENT（开发流程）',
    images: [
      'ChatGPT Image 2026年6月1日 16_57_29.png',
      'ChatGPT Image 2026年6月1日 16_57_25.png',
      'ChatGPT Image 2026年6月1日 16_50_57.png',
    ],
  },
]

interface AppSection {
  title?: string
  desc?: string
  seo?: string
  cta?: string
}

export default function ApplicationsPage({ params }: ApplicationsPageProps) {
  const locale = params.locale as Locale
  const t = getTranslations(locale) as any
  const isZh = locale === 'zh'

  const appSection = (key: string): AppSection => t.applications?.[key] || {}

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Applications/BRIDAL LACE（婚纱应用）/lucid-origin_Designer_bridal_gown_displayed_in_luxury_wedding_boutique_elegant_lace_train_and-0.jpg"
            alt="Lace fabric applications"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs text-amber-500 tracking-widest uppercase mb-4">
              {t.applications?.heroTagline || 'LACE APPLICATIONS'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.applications?.title || 'Applications of Lace Fabrics'}
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl">
              {t.applications?.heroDesc || 'Discover how premium lace fabrics are used across lingerie, bridal fashion, intimate apparel, and garment manufacturing worldwide.'}
            </p>
          </div>
        </div>
      </section>

      {/* Application Sections - Stacked Layout */}
      {applicationData.map((section, index) => {
        const sectionData = appSection(section.key)
        const heroImage = section.images[0]
        const supportImages = section.images.slice(1, 3)

        return (
          <section
            key={section.key}
            className="py-16 lg:py-24 bg-white"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* 1. HERO IMAGE - Full Width */}
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-10">
                <img
                  src={`/Applications/${section.folder}/${heroImage}`}
                  alt={sectionData.title || section.key}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent" />
              </div>

              {/* 2. TITLE + SHORT TEXT */}
              <div className="max-w-3xl mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                  {sectionData.title || section.key}
                </h2>
                <p className="text-lg text-zinc-600 leading-relaxed mb-4">
                  {sectionData.desc || ''}
                </p>
              </div>

              {/* 3. CTA BUTTON */}
              <div className="mb-10">
                {sectionData.cta && (
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold tracking-wide rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {sectionData.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>

              {/* 4. TWO SUPPORT IMAGES */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {supportImages.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-100"
                  >
                    <img
                      src={`/Applications/${section.folder}/${img}`}
                      alt={`${sectionData.title || section.key} detail ${imgIndex + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Final CTA Section */}
      <section className="py-20 lg:py-28 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.applications?.ctaTitle || 'Need Lace Fabric for Your Brand?'}
          </h2>
          <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
            {t.applications?.ctaDesc || 'Qihong Textile is a professional lace manufacturer in China offering OEM & wholesale lace fabrics for global fashion brands.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              {t.applications?.contactBtn || 'Contact Us / Get Quote'}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300"
            >
              {t.applications?.viewProducts || 'View Products'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
