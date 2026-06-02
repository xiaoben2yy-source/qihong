import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'
import fs from 'fs'
import path from 'path'
import Carousel from '@/components/Carousel'

function getFirstImage(folder: string): string | null {
  const imagesDir = path.join(process.cwd(), 'public', 'images', folder)
  try {
    const entries = fs.readdirSync(imagesDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
        return `/images/${folder}/${entry.name}`
      } else if (entry.isDirectory()) {
        const subDir = path.join(imagesDir, entry.name)
        const subFiles = fs.readdirSync(subDir)
        for (const f of subFiles) {
          if (/\.(jpg|jpeg|png|gif|webp)$/i.test(f)) {
            return `/images/${folder}/${entry.name}/${f}`
          }
        }
      }
    }
  } catch {
    return null
  }
  return null
}

function getBannerImages() {
  const bannerDir = path.join(process.cwd(), 'banner')
  try {
    const entries = fs.readdirSync(bannerDir)
    return entries
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        src: `/banner/${file}`,
        alt: 'Banner'
      }))
  } catch {
    return []
  }
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const t = getTranslations(locale)
  const isZh = locale === 'zh'
  const bannerImages = getBannerImages()

  const folderMap = ['近期热卖', '弹性大边', '弹性小边', '睫毛蕾丝', '规格']

  const productCollection = [
    {
      name: 'French Lace',
      nameZh: '法式蕾丝',
      folder: '近期热卖',
    },
    {
      name: 'Luxury Stretch',
      nameZh: '奢华弹力',
      folder: '弹性大边',
    },
    {
      name: 'Eyelash Mesh',
      nameZh: '睫毛网布',
      folder: '睫毛蕾丝',
    },
  ]

  const stats = [
    { value: '20,000', unit: 'm²', label: 'Manufacturing Base', labelZh: '制造基地' },
    { value: '120', unit: '+', label: 'Advanced Machines', labelZh: '先进设备' },
    { value: '30', unit: '+', label: 'Export Countries', labelZh: '出口国家' },
    { value: '10', unit: '+', label: 'Years Experience', labelZh: '年行业经验' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen Brand Visual */}
      <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {bannerImages.length > 0 ? (
            <Carousel images={bannerImages} autoPlay={true} interval={6000} />
          ) : (
            <div className="absolute inset-0 bg-[#0f172a]" />
          )}
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/70 to-[#0f172a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-[#0f172a]/30" />

        {/* Hero Content - Left Aligned */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="max-w-xl">
              {/* Brand Tag */}
              <p className="text-[#c8a96b] text-xs tracking-[0.4em] uppercase mb-8">
                {isZh ? '高端蕾丝制造商' : 'Premium Lace Manufacturer'}
              </p>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.1] mb-10">
                {isZh ? '高端' : 'Premium'}<br />
                <span className="text-[#c8a96b]">{isZh ? '蕾丝' : 'Lace'}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12">
                {isZh ? '创新纺织解决方案' : 'Innovative Textile Solutions'}<br />
                {isZh ? '为全球时尚品牌提供' : 'for Global Fashion Brands'}
              </p>

              {/* Description */}
              <p className="text-sm text-white/40 font-light leading-loose mb-12 max-w-md">
                {isZh
                  ? '高端蕾丝开发、织造、染整与出口制造'
                  : 'High-end lace development, weaving, dyeing and export manufacturing'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-6">
                <Link
                  href={`/${locale}/products`}
                  className="group px-10 py-4 bg-[#c8a96b] text-[#0f172a] text-sm font-medium tracking-wider hover:bg-[#d4b87a] transition-all duration-500"
                >
                  {isZh ? '探索系列' : 'Explore Collection'}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="group px-10 py-4 border border-white/20 text-white text-sm font-medium tracking-wider hover:bg-white/5 hover:border-white/40 transition-all duration-500"
                >
                  {isZh ? '联系我们' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Large Whitespace */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block" />

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase mb-4">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Section 2 - About: Minimal & Spacious */}
      <section className="py-40 lg:py-56 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Left: Statement */}
            <div className="lg:col-span-5">
              <p className="text-[#c8a96b] text-xs tracking-[0.3em] uppercase mb-8">
                {isZh ? '关于齐鸿' : 'About Qihong'}
              </p>
              <h2 className="text-4xl lg:text-5xl font-extralight text-[#0f172a] leading-tight mb-8">
                {isZh ? '专注' : 'Dedicated'}<br />
                <span className="text-[#c8a96b]">{isZh ? '做蕾丝' : 'to Lace'}</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed">
                {isZh
                  ? '齐鸿纺织成立于2015年，位于福建省福州市长乐区。我们为全球时尚品牌提供高端蕾丝面料的一站式制造解决方案。'
                  : 'Founded in 2015, located in Changle District, Fuzhou. We provide one-stop manufacturing solutions for premium lace fabrics to global fashion brands.'}
              </p>
            </div>

            {/* Right: Stats Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-x-12 gap-y-16 pt-8">
              <div>
                <p className="text-5xl lg:text-6xl font-extralight text-[#0f172a]">10+</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-3">{isZh ? '年行业经验' : 'Years Experience'}</p>
              </div>
              <div>
                <p className="text-5xl lg:text-6xl font-extralight text-[#0f172a]">500+</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-3">{isZh ? '蕾丝花型' : 'Lace Designs'}</p>
              </div>
              <div>
                <p className="text-5xl lg:text-6xl font-extralight text-[#0f172a]">30+</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-3">{isZh ? '出口国家' : 'Export Countries'}</p>
              </div>
              <div>
                <p className="text-5xl lg:text-6xl font-extralight text-[#0f172a]">OEM</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-3">/ ODM {isZh ? '支持' : 'Support'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Factory Visual */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/工厂实拍图/夜景.png"
            alt="Factory"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#0f172a]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-2xl px-8">
            <p className="text-[#c8a96b] text-xs tracking-[0.3em] uppercase mb-6">
              {isZh ? '现代化生产基地' : 'Modern Manufacturing Base'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-extralight text-white leading-relaxed">
              {isZh
                ? '近万平方米标准化厂房'
                : 'Nearly 10,000 m² of Standardized Production Space'}
            </h2>
          </div>
        </div>
      </section>

      {/* Section 4 - Stats: Huge Numbers */}
      <section className="py-32 lg:py-40 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <p className="text-5xl lg:text-7xl font-extralight text-white">
                  {stat.value}<span className="text-[#c8a96b]">{stat.unit}</span>
                </p>
                <p className="text-xs text-white/40 tracking-widest uppercase mt-4">
                  {isZh ? stat.labelZh : stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 - Capabilities: Minimal Cards */}
      <section className="py-40 lg:py-56 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-20">
            <p className="text-[#c8a96b] text-xs tracking-[0.3em] uppercase mb-6">
              {isZh ? '制造实力' : 'Capabilities'}
            </p>
            <h2 className="text-3xl lg:text-4xl font-extralight text-[#0f172a]">
              {isZh ? '一站式制造' : 'One-Stop Manufacturing'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: isZh ? '智能织造' : 'Smart Weaving',
                desc: isZh ? '卡尔·迈耶先进经编设备' : 'Karl Mayer warp knitting',
              },
              {
                title: isZh ? '染整工艺' : 'Dyeing',
                desc: isZh ? '专业染色与色泽控制' : 'Professional color control',
              },
              {
                title: isZh ? '品质检测' : 'Quality',
                desc: isZh ? '多阶段严格质检' : 'Multi-stage inspection',
              },
              {
                title: isZh ? '全球出口' : 'Export',
                desc: isZh ? '高效物流配送' : 'Efficient logistics',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-10 lg:p-12 rounded-3xl">
                <h3 className="text-lg font-medium text-[#0f172a] mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 - Products: Lookbook Style */}
      <section className="py-40 lg:py-56 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-[#c8a96b] text-xs tracking-[0.3em] uppercase mb-6">
                {isZh ? '产品系列' : 'Collection'}
              </p>
              <h2 className="text-3xl lg:text-4xl font-extralight text-[#0f172a]">
                {isZh ? '精选蕾丝' : 'Curated Laces'}
              </h2>
            </div>
            <Link
              href={`/${locale}/products`}
              className="text-sm text-[#0f172a] tracking-wide border-b border-[#0f172a]/20 pb-1 hover:border-[#c8a96b] hover:text-[#c8a96b] transition-all duration-500"
            >
              {isZh ? '查看全部 →' : 'View All →'}
            </Link>
          </div>

          {/* Lookbook Grid - Large Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {productCollection.map((product, index) => {
              const image = getFirstImage(product.folder)
              return (
                <Link
                  key={index}
                  href={`/${locale}/products`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100">
                    {image ? (
                      <img
                        src={image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                    {/* Minimal Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-base font-medium text-[#0f172a]">
                      {isZh ? product.nameZh : product.name}
                    </h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 7 - CTA: Bold & Minimal */}
      <section className="py-40 lg:py-56 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-extralight text-white mb-6 leading-tight">
            {isZh ? '开启合作' : 'Start Your Project'}
          </h2>
          <p className="text-white/50 font-light mb-12 max-w-lg mx-auto">
            {isZh
              ? '联系我们的团队，获取免费咨询和样品支持。'
              : 'Get in touch with our team for consultation and sample support.'}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href={`/${locale}/contact`}
              className="px-12 py-5 bg-[#c8a96b] text-[#0f172a] text-sm font-medium tracking-wider hover:bg-[#d4b87a] transition-all duration-500"
            >
              {isZh ? '联系我们' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}