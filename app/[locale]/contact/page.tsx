'use client'

import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'
import { useEffect, useState } from 'react'

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const t = getTranslations(locale)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    whatsapp: '',
    requirement: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', company: '', whatsapp: '', requirement: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }
  }

  const contactInfo = [
    {
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: t.contact.email,
      value: 'sales@qihongtextile.com',
      href: 'mailto:sales@qihongtextile.com',
    },
    {
      icon: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-13.3-6.7 8.38 8.38 0 013.8-.9z',
      title: t.contact.whatsapp,
      value: '+86 177 2071 6631',
      href: 'https://wa.me/8617720716631',
    },
    {
      icon: 'M3 5a2 2 0 110-4 2 2 0 010 4zm7.5 4.5m5.5 13a2 2 0 11-4 0 012.05.95M12 20h.01M8 14s1.5 2 4 2 4-4M16 8s1.5 2 4 2 4-4M12 12V20M9 8a4 4 0 10008 4 4 0 1000-8 4 4 0 100-8zm-5 4a5 5 0 100011 5 5 0 100-11-5 5z',
      title: locale === 'zh' ? '电话' : 'Phone',
      value: '+86 177 2071 6631',
      href: 'tel:+8617720716631',
    },
    {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      title: locale === 'zh' ? '地址' : locale === 'es' ? 'Ubicacion' : locale === 'ru' ? 'Адрес' : locale === 'ar' ? 'العنوان' : locale === 'pt' ? 'Localizacao' : 'Location',
      value: locale === 'zh' ? '福建省福州市长乐区' : 'Fuzhou, Fujian, China',
      href: null,
    },
  ]

  const formLabels = {
    name: t.contact.nameLabel,
    email: t.contact.emailLabel,
    company: locale === 'zh' ? '公司' : locale === 'es' ? 'Empresa' : locale === 'ru' ? 'Компания' : locale === 'ar' ? 'الشركة' : locale === 'pt' ? 'Empresa' : 'Company',
    whatsapp: locale === 'zh' ? '微信/WhatsApp' : locale === 'es' ? 'WhatsApp' : locale === 'ru' ? 'WhatsApp' : locale === 'ar' ? 'واتساب' : locale === 'pt' ? 'WhatsApp' : 'WhatsApp',
    requirement: locale === 'zh' ? '产品需求' : locale === 'es' ? 'Requisito del Producto' : locale === 'ru' ? 'Требование к Продукту' : locale === 'ar' ? 'متطلبات المنتج' : locale === 'pt' ? 'Requisito do Produto' : 'Product Requirement',
    message: t.contact.messageLabel,
    placeholder: {
      name: locale === 'zh' ? '请输入您的姓名' : locale === 'es' ? 'Ingrese su nombre' : locale === 'ru' ? 'Введите ваше имя' : locale === 'ar' ? 'أدخل اسمك' : locale === 'pt' ? 'Digite seu nome' : 'Enter your name',
      email: locale === 'zh' ? '请输入您的邮箱' : locale === 'es' ? 'Ingrese su correo' : locale === 'ru' ? 'Введите ваш email' : locale === 'ar' ? 'أدخل بريدك الإلكتروني' : locale === 'pt' ? 'Digite seu email' : 'Enter your email',
      company: locale === 'zh' ? '请输入公司名称' : locale === 'es' ? 'Ingrese nombre de empresa' : locale === 'ru' ? 'Введите название компании' : locale === 'ar' ? 'أدخل اسم الشركة' : locale === 'pt' ? 'Digite o nome da empresa' : 'Enter company name',
      whatsapp: locale === 'zh' ? '请输入联系方式' : locale === 'es' ? 'Ingrese contacto' : locale === 'ru' ? 'Введите контакт' : locale === 'ar' ? 'أدخل معلومات الاتصال' : locale === 'pt' ? 'Digite o contato' : 'Enter contact number',
      message: locale === 'zh' ? '请描述您的项目需求' : locale === 'es' ? 'Describa los requisitos de su proyecto' : locale === 'ru' ? 'Опишите требования вашего проекта' : locale === 'ar' ? 'صف متطلبات مشروعك' : locale === 'pt' ? 'Descreva os requisitos do seu projeto' : 'Describe your project requirements',
    },
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* 1. Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/工厂实拍图/夜景.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-900/80 to-zinc-950/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-xs text-amber-500 tracking-widest uppercase mb-4">
              {t.contact.heroTagline || 'CONTACT QIHONG'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {t.contact.heroTitle}
            </h1>
            <p className="text-base text-zinc-400">
              {t.contact.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Info */}
      <section className="py-16 lg:py-20 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href || '#'}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-8 border border-zinc-800 rounded-lg hover:border-amber-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">{item.title}</p>
                <p className="text-lg text-white font-medium">{item.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Contact Form */}
      <section className="py-16 lg:py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t.contact.formTitle}
              </h2>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                {t.contact.formDesc}
              </p>
              <div className="space-y-3 mb-8">
                {(t.contact.bulletPoints as string[] || ['OEM/ODM Support', 'Fast Sampling', 'Stable Production', 'Global Export']).map((item, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-zinc-400">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-zinc-500">
                {t.contact.responseTime}
              </p>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      <span className="text-red-500 mr-1">*</span>
                      {formLabels.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                      placeholder={formLabels.placeholder.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      <span className="text-red-500 mr-1">*</span>
                      {formLabels.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                      placeholder={formLabels.placeholder.email}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">{formLabels.company}</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                      placeholder={formLabels.placeholder.company}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">{formLabels.whatsapp}</label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                      placeholder={formLabels.placeholder.whatsapp}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">{formLabels.requirement}</label>
                  <select
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  >
                    <option value="" className="bg-zinc-900">{(t.contact as any).selectProduct || 'Select product type'}</option>
                    <option value="lace" className="bg-zinc-900">{(t.products as any)?.laceFabric || 'Lace Fabric'}</option>
                    <option value="embroidery" className="bg-zinc-900">{(t.products as any)?.embroideryLace || 'Embroidery'}</option>
                    <option value="stretch" className="bg-zinc-900">{(t.products as any)?.elasticLace || 'Stretch Lace'}</option>
                    <option value="eyelash" className="bg-zinc-900">{(t.products as any)?.eyelashLace || 'Eyelash Lace'}</option>
                    <option value="other" className="bg-zinc-900">{(t.contact as any)?.other || 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                      <span className="text-red-500 mr-1">*</span>
                      {formLabels.message}
                    </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    placeholder={formLabels.placeholder.message}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300"
                >
                  {error ? ((t.contact as any).sendFailed || 'Send Failed') : submitted ? ((t.contact as any).sent || 'Sent') : (t.contact.submitButton || 'Send Inquiry')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/工厂实拍图/机器特写.png)' }} />
        <div className="absolute inset-0 bg-zinc-950/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.ctaTitle}
          </h2>
          <p className="text-lg text-zinc-400 mb-10">
            {t.contact.ctaDesc}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-12 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300"
          >
            {t.contact.submitButton}
          </Link>
        </div>
      </section>
    </div>
  )
}