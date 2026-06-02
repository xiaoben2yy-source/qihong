'use client'

import Link from 'next/link'
import { getTranslations, Locale } from '@/i18n'
import { useEffect, useState } from 'react'

interface Product {
  code: string
  src: string
}

interface Subcategory {
  key: string
  labelEn: string
  labelZh: string
}

interface Category {
  labelEn: string
  labelZh: string
  subcategories?: Subcategory[]
  products: Product[]
}

interface ProductsData {
  [key: string]: Category
}

const ITEMS_PER_PAGE = 12

export default function ProductsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale
  const t = getTranslations(locale)

  const [productsData, setProductsData] = useState<ProductsData>({})
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setProductsData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Get all products for display
  const getDisplayProducts = (): Product[] => {
    if (!activeCategory || !productsData[activeCategory]) {
      return Object.entries(productsData).flatMap(([catKey, cat]) =>
        cat.products.map(p => ({ ...p, code: `${catKey}-${p.code}` }))
      )
    }

    const category = productsData[activeCategory]

    if (category.subcategories && category.subcategories.length > 0) {
      if (activeSubcategory) {
        return category.products.filter(p => p.src.includes(`/${encodeURIComponent(activeSubcategory)}/`))
      }
      return category.products
    }

    return category.products
  }

  const displayProducts = getDisplayProducts()
  const totalPages = Math.ceil(displayProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleProducts = displayProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const getCurrentCategoryInfo = () => {
    if (!activeCategory || !productsData[activeCategory]) {
      return { labelEn: 'ALL PRODUCTS', labelZh: '全部产品', subcategories: [] }
    }
    return productsData[activeCategory]
  }

  const currentInfo = getCurrentCategoryInfo()
  const hasSubcategories = currentInfo.subcategories && currentInfo.subcategories.length > 0

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, activeSubcategory])

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white/50">{t.products.loading || 'Loading...'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* SECTION 1: Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/工厂实拍图/机器特写.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <div className="max-w-2xl">
            <p className="text-sm text-amber-400 tracking-[0.5em] uppercase mb-4">
              {t.products.heroTagline || 'PRODUCT COLLECTION'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {t.products.title}
            </h1>
            <p className="text-lg text-white/50">
              {t.products.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Category Tabs */}
      <section className="py-6 bg-slate-900/80 backdrop-blur-sm border-t border-b border-white/5 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                setActiveCategory(null)
                setActiveSubcategory(null)
              }}
              className={`px-6 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded-lg border ${
                activeCategory === null
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-800/50 border-white/10 text-white/60 hover:border-white/30 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {t.products.all || 'ALL'}
            </button>
            {['bestsellers', 'stretch', 'eyelash', 'embroidery', 'trims'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setActiveSubcategory(null)
                }}
                className={`px-6 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded-lg border ${
                  activeCategory === cat
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-800/50 border-white/10 text-white/60 hover:border-white/30 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {(t.products as any)[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2.5: Subcategory Filter */}
      {hasSubcategories && currentInfo.subcategories && currentInfo.subcategories.length > 0 && (
        <section className="py-4 bg-slate-900/60 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveSubcategory(null)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md border transition-all duration-300 ${
                  activeSubcategory === null
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-slate-800/50 border-white/10 text-white/50 hover:border-white/30 hover:text-white/70'
                }`}
              >
                ALL
              </button>
              {currentInfo.subcategories.map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => setActiveSubcategory(sub.key)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md border transition-all duration-300 ${
                    activeSubcategory === sub.key
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                      : 'bg-slate-800/50 border-white/10 text-white/50 hover:border-white/30 hover:text-white/70'
                  }`}
                >
                  {sub.labelEn}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: Product Grid */}
      <section className="py-16 lg:py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-semibold text-white/80">
              {activeCategory
                ? (t.products as any)[activeCategory]
                : t.products.all}
            </h2>
            <p className="text-sm text-white/40">
              {displayProducts.length} {t.products.count || 'products'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {visibleProducts.map((product, index) => (
              <div
                key={product.code}
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(product.src)}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-900/60 backdrop-blur-sm border border-white/5 transition-all duration-500 group-hover:border-amber-500/40">
                  <img
                    src={product.src}
                    alt={product.code}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-8 h-0.5 bg-amber-500 mb-3 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="text-sm text-white/80 tracking-wide">
                      {t.products.clickToZoom}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayProducts.length === 0 && (
            <div className="text-center py-20 text-white/40">
              {t.products.noProducts}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-white/5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, idx, arr) => {
                  const showPage = page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)
                  const showEllipsis = (page === 2 && currentPage > 4) || (page === arr.length - 1 && currentPage < totalPages - 3)

                  if (showEllipsis && idx > 0 && !showPage) {
                    return <span key={`ellipsis-${page}`} className="px-2 text-white/30">...</span>
                  }
                  if (!showPage) return null

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 text-sm rounded-lg border transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10'
                          : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.products.ctaTitle}
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            {t.products.ctaDesc}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20"
          >
            {t.contact.title}
          </Link>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white text-3xl transition-colors duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null) }}
          >
            ×
          </button>
          <div className="relative max-w-5xl max-h-[85vh] mx-4 lg:mx-8 cursor-default" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm">
            {t.products.clickToClose}
          </div>
        </div>
      )}
    </div>
  )
}