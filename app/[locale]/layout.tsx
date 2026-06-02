import '@/app/globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { locales, Locale } from '@/i18n'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale
  const isZh = locale === 'zh'

  return {
    title: 'Premium Lace Manufacturer & Supplier in China | Qihong Textile',
    description: 'Qihong Textile is a professional lace manufacturer in China specializing in stretch lace, bridal lace, lingerie lace and custom lace fabric solutions for brands worldwide.',
    keywords: 'lace manufacturer, lace supplier, lace fabric manufacturer, stretch lace manufacturer, bridal lace supplier, wholesale lace fabric, China lace manufacturer, OEM lace factory, custom lace fabric',
    openGraph: {
      title: 'Premium Lace Manufacturer & Supplier in China | Qihong Textile',
      description: 'Professional lace manufacturer in China specializing in stretch lace, bridal lace, lingerie lace and custom lace fabric solutions.',
      type: 'website',
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params.locale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <WhatsAppFloat />
        <Footer locale={locale} />
      </body>
    </html>
  )
}