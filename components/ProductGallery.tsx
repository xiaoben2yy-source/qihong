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

interface ProductGalleryProps {
  categoryName: string
  subCategories: SubCategory[]
}

const IMAGES_PER_PAGE = 20

export default function ProductGallery({ categoryName, subCategories }: ProductGalleryProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategories[0]?.name || '')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  const currentSubCat = subCategories.find(sc => sc.name === selectedSubCategory) || subCategories[0]
  const images = currentSubCat?.images || []
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE)
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE
  const endIndex = startIndex + IMAGES_PER_PAGE
  const currentImages = images.slice(startIndex, endIndex)

  const handleSubCategoryChange = (subCatName: string) => {
    setSelectedSubCategory(subCatName)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
                selectedSubCategory === subCat.name
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
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Previous
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
                Next
              </button>
            </div>
          )}

          <p className="text-center text-gray-500 mt-4">
            Showing {startIndex + 1}-{Math.min(endIndex, images.length)} of {images.length} images
          </p>
        </>
      ) : (
        <p className="text-gray-400 text-center py-8">No images available</p>
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
    </section>
  )
}