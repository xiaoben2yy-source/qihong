'use client'

import { useState } from 'react'
import { getTranslations, Locale } from '@/i18n'

interface ImageItem {
  name: string
  src: string
}

interface SubCategory {
  name: string
  images: ImageItem[]
}

interface CategoryWithPaginationProps {
  categoryKey: string
  categoryName: string
  subCategories: SubCategory[]
}

const IMAGES_PER_PAGE = 20

export default function CategoryWithPagination({ categoryKey, categoryName, subCategories }: CategoryWithPaginationProps) {
  const t = getTranslations('en' as Locale)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)

  const currentSubCategory = selectedSubCategory
    ? subCategories.find(sc => sc.name === selectedSubCategory)
    : subCategories[0]

  const images = currentSubCategory?.images || []
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE)
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE
  const endIndex = startIndex + IMAGES_PER_PAGE
  const currentImages = images.slice(startIndex, endIndex)

  const handleSubCategoryChange = (subCatName: string) => {
    setSelectedSubCategory(subCatName)
    setCurrentPage(1)
  }

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-primary mb-6">{categoryName}</h2>

      {subCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {subCategories.map((subCat) => (
            <button
              key={subCat.name}
              onClick={() => handleSubCategoryChange(subCat.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                (selectedSubCategory || subCategories[0].name) === subCat.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {subCat.name} ({subCat.images.length})
            </button>
          ))}
        </div>
      )}

      {currentImages.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                style={{ aspectRatio: '1/1' }}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
            </div>
          )}

          <p className="text-center text-gray-500 mt-4">
            Showing {startIndex + 1}-{Math.min(endIndex, images.length)} of {images.length}
          </p>
        </>
      ) : (
        <p className="text-gray-400 text-center py-8">No images available</p>
      )}
    </section>
  )
}