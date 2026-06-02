import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'
import Counter from '@/components/Counter'
import ProcessTimeline from '@/components/ProcessTimeline'

export default function ProcessPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const t = getTranslations(locale)

  const isZh = locale === 'zh'

  const processSteps = [
    {
      id: 'inquiry',
      labelEn: 'Inquiry',
      labelZh: '咨询',
      icon: 'M8 12h12M12 8l4 4-4 4',
    },
    {
      id: 'design',
      labelEn: 'Design',
      labelZh: '设计',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      id: 'sampling',
      labelEn: 'Sampling',
      labelZh: '打样',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    },
    {
      id: 'production',
      labelEn: 'Production',
      labelZh: '生产',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    },
    {
      id: 'qc',
      labelEn: 'Quality Control',
      labelZh: '质检',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      id: 'packaging',
      labelEn: 'Packaging',
      labelZh: '包装',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    },
    {
      id: 'shipping',
      labelEn: 'Global Shipping',
      labelZh: '全球发货',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ]

  const whyChooseUs = [
    {
      titleEn: 'OEM / ODM Support',
      titleZh: 'OEM / ODM 支持',
      descEn: 'Full customization from design to packaging',
      descZh: '从设计到包装的全面定制服务',
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
    },
    {
      titleEn: 'Fast Sampling',
      titleZh: '快速打样',
      descEn: '7-15 days sample production lead time',
      descZh: '7-15天打样交期',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      titleEn: 'Stable Quality',
      titleZh: '品质稳定',
      descEn: 'ISO certified quality management system',
      descZh: 'ISO认证质量管理体系',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      titleEn: 'Professional Team',
      titleZh: '专业团队',
      descEn: '15+ years experienced engineering team',
      descZh: '15年以上经验工程团队',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      titleEn: 'Global Export',
      titleZh: '全球出口',
      descEn: '30+ countries served worldwide',
      descZh: '出口30+国家和地区',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      titleEn: 'Competitive Pricing',
      titleZh: '价格优势',
      descEn: 'Direct factory pricing, no middleman',
      descZh: '工厂直供价格，无中间商',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ]

  const stats = [
    { value: 15, suffix: '+', labelEn: 'Years Experience', labelZh: '年行业经验' },
    { value: 120, suffix: '+', labelEn: 'Machines', labelZh: '台机器' },
    { value: 30, suffix: '+', labelEn: 'Export Countries', labelZh: '出口国家' },
    { value: 50000, suffix: '+', labelEn: 'Yards Monthly Output', labelZh: '月产量(码)' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Banner */}
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/工厂实拍图/车间.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {isZh ? '从设计到全球交付' : 'From Design to '}
                <span className="text-amber-400">
                  {isZh ? '' : 'Global Delivery'}
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {isZh
                  ? '为全球品牌提供一站式蕾丝和刺绣制造解决方案'
                  : 'One-stop lace and embroidery manufacturing solutions for brands worldwide'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  {isZh ? '联系我们' : 'Contact Us'}
                </Link>
                <Link
                  href={`/${locale}/products`}
                  className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold rounded-lg transition-all duration-300"
                >
                  {isZh ? '查看产品' : 'View Products'}
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-amber-500/20 rounded-lg transform rotate-3" />
              <img
                src="/工厂实拍图/车间.png"
                alt="Manufacturing Facility"
                className="relative rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Data Statistics */}
      <section className="relative py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-amber-500/50 transition-all duration-300 group"
              >
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base text-gray-300">
                  {isZh ? stat.labelZh : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Horizontal Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {isZh ? '我们的制造流程' : 'Our Manufacturing Process'}
            </h2>
            <p className="text-gray-600">
              {isZh ? '从概念到交付的无缝衔接' : 'Seamless integration from concept to delivery'}
            </p>
          </div>
          <ProcessTimeline steps={processSteps} isZh={isZh} />
        </div>
      </section>

      {/* 4. Detailed Process Modules */}
      {/* Section 1 - Design Development */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
                {isZh ? '步骤 01' : 'Step 01'}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {isZh ? '设计与开发' : 'Design & Development'}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isZh
                  ? '经验丰富的设计团队将您的愿景变为现实。运用先进的CAD软件和多年的蕾丝专业知识，我们创建符合您精确规格的花型。'
                  : 'Our experienced design team transforms your vision into reality. Using advanced CAD software and years of lace expertise, we create patterns that meet your exact specifications.'}
              </p>
              <ul className="space-y-4">
                {(isZh
                  ? ['客户需求分析', '花型图案开发', 'CAD设计与3D建模', '颜色确认', '样品制作']
                  : ['Customer requirement analysis', 'Lace pattern development', 'CAD design & 3D modeling', 'Color confirmation', 'Sample creation']
                ).map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg transform rotate-3 opacity-20" />
              <img
                src="/工厂实拍图/办公室.png"
                alt="Design & Development"
                className="relative rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Knitting & Embroidery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg transform -rotate-3 opacity-20" />
              <img
                src="/工厂实拍图/车间.png"
                alt="Knitting & Embroidery"
                className="relative rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-6">
                {isZh ? '步骤 02' : 'Step 02'}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {isZh ? '织造与刺绣' : 'Knitting & Embroidery'}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isZh
                  ? '最先进的刺绣机结合精密织造技术，确保大批量生产的质量稳定性和一致性。'
                  : 'State-of-the-art embroidery machines combined with precision knitting techniques ensure consistent quality across high-volume production runs.'}
              </p>
              <ul className="space-y-4">
                {(isZh
                  ? ['先进刺绣设备', '精密织造技术', '稳定大批量生产', '高效生产线', '实时质量监控']
                  : ['Advanced embroidery machines', 'Precision knitting technology', 'Stable mass production', 'High efficiency production lines', 'Real-time quality monitoring']
                ).map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-slate-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Dyeing & Quality Control */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                {isZh ? '步骤 03' : 'Step 03'}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {isZh ? '染色与质检' : 'Dyeing & Quality Control'}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isZh
                  ? '每一米的面料都经过严格检验。我们的ISO认证质量管理体系确保一致性和符合国际标准。'
                  : 'Every meter of fabric undergoes rigorous inspection. Our ISO-certified quality management system ensures consistency and compliance with international standards.'}
              </p>
              <ul className="space-y-4">
                {(isZh
                  ? ['面料检验与分级', '色牢度测试', '缩水率测试', '缺陷控制与标记', '质量认证']
                  : ['Fabric inspection & grading', 'Color fastness testing', 'Shrinkage testing', 'Defect control & marking', 'Quality certification']
                ).map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg transform rotate-3 opacity-20" />
              <img
                src="/工厂实拍图/染色.png"
                alt="Quality Control"
                className="relative rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Packaging & Shipping */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg transform -rotate-3 opacity-20" />
              <img
                src="/工厂实拍图/仓库.png"
                alt="Packaging & Shipping"
                className="relative rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
                {isZh ? '步骤 04' : 'Step 04'}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {isZh ? '包装与全球发货' : 'Packaging & Global Shipping'}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isZh
                  ? '专业包装解决方案确保安全运输。全面的物流支持确保及时交付到世界各地。'
                  : 'Professional packaging solutions designed for safe transportation. Comprehensive logistics support ensures timely delivery to destinations worldwide.'}
              </p>
              <ul className="space-y-4">
                {(isZh
                  ? ['卷装包装与真空密封', '纸箱保护', '海运和空运选项', '定制单据', '全球出口协调']
                  : ['Roll packaging & vacuum sealing', 'Carton protection', 'Sea & air freight options', 'Custom documentation', 'Global export coordination']
                ).map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isZh ? '为什么选择齐鸿纺织' : 'Why Choose Qihong Textile'}
            </h2>
            <p className="text-gray-400">
              {isZh ? '与在每个阶段都能提供优质服务的制造商合作' : 'Partner with a manufacturer that delivers excellence at every stage'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="group p-8 bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-300">
                  <svg className="w-7 h-7 text-amber-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {isZh ? item.titleZh : item.titleEn}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {isZh ? item.descZh : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isZh ? '寻找可靠的蕾丝制造商？' : 'Looking for a Reliable Lace Manufacturer?'}
          </h2>
          <p className="text-xl text-amber-100 mb-10">
            {isZh
              ? '联系我们的团队获取免费咨询和样品'
              : 'Get in touch with our team for a free consultation and sample request'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="px-10 py-4 bg-white text-amber-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              {isZh ? '联系我们' : 'Contact Us'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold rounded-lg transition-all duration-300"
            >
              {isZh ? '获取免费样品' : 'Get Free Samples'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}