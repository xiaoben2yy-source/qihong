'use client'

import { useState } from 'react'

interface ImageItem {
  name: string
  src: string
}

interface SubCategory {
  name: string
  images: ImageItem[]
}

interface ProductTabsProps {
  categories: {
    key: string
    name: string
    subCategories: SubCategory[]
  }[]
  translations: {
    products: {
      category1: string
      category2: string
      category3: string
      category4: string
    }
  }
  locale: string
}

const IMAGES_PER_PAGE = 20

export default function ProductTabs({ categories, translations, locale }: ProductTabsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.key || '')
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  const currentCat = categories.find(c => c.key === activeCategory) || categories[0]
  const subCategories = currentCat?.subCategories || []

  const effectiveSubCategories = subCategories.length > 1 ? subCategories : [{ name: 'all', images: subCategories[0]?.images || [] }]
  const currentSubCatName = activeSubCategory || effectiveSubCategories[0]?.name || 'all'
  const currentSubCat = effectiveSubCategories.find(sc => sc.name === currentSubCatName) || effectiveSubCategories[0]
  const images = currentSubCat?.images || []
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE)
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE
  const endIndex = startIndex + IMAGES_PER_PAGE
  const currentImages = images.slice(startIndex, endIndex)

  const handleCategoryChange = (catKey: string) => {
    setActiveCategory(catKey)
    setActiveSubCategory(null)
    setCurrentPage(1)
  }

  const handleSubCategoryChange = (subCatName: string) => {
    setActiveSubCategory(subCatName)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getCategoryName = (key: string, fallbackName: string) => {
    const keyMap: { [key: string]: string } = {
      category1: translations.products.category1,
      category2: translations.products.category2,
      category3: translations.products.category3,
      category4: translations.products.category4,
    }
    return keyMap[key] || fallbackName
  }

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeCategory === cat.key
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {getCategoryName(cat.key, cat.name)}
          </button>
        ))}
      </div>

      {/* Sub-category Tabs (only for 规格) */}
      {subCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {subCategories.map((subCat) => (
            <button
              key={subCat.name}
              onClick={() => handleSubCategoryChange(subCat.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSubCatName === subCat.name
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {subCat.name === 'all' ? '全部' : subCat.name}
              {subCat.images.length > 0 && ` (${subCat.images.length})`}
            </button>
          ))}
        </div>
      )}

      {/* Images Grid */}
      {currentImages.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                style={{ aspectRatio: '1/1' }}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                上一页
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showPage = page === 1 || page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)

                  if (!showPage && page === 2) {
                    return <span key="ellipsis1" className="px-2">...</span>
                  }
                  if (!showPage && page === totalPages - 1) {
                    return <span key="ellipsis2" className="px-2">...</span>
                  }
                  if (!showPage) return null

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                下一页
              </button>
            </div>
          )}

          <p className="text-center text-gray-500 mt-4">
            显示 {startIndex + 1}-{Math.min(endIndex, images.length)} / 共 {images.length} 张图片
          </p>
        </>
      ) : (
        <p className="text-gray-400 text-center py-8">暂无图片</p>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-2xl hover:bg-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4">{selectedImage.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}