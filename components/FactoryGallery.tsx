'use client'

import { useState, useEffect } from 'react'

const galleryImages = [
  { src: '/工厂实拍图/夜景.png', alt: 'Factory Night' },
  { src: '/工厂实拍图/办公室.png', alt: 'Office' },
  { src: '/工厂实拍图/车间.png', alt: 'Workshop' },
  { src: '/工厂实拍图/印染2.jpg', alt: 'Dyeing' },
  { src: '/工厂实拍图/库存.jpg', alt: 'Warehouse' },
  { src: '/工厂实拍图/坯布仓库.jpg', alt: 'Fabric Warehouse' },
  { src: '/工厂实拍图/成品仓库.png', alt: 'Product Warehouse' },
  { src: '/工厂实拍图/产品展示.png', alt: 'Product Display' },
]

export default function FactoryGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const closeModal = () => setSelectedIndex(null)

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length)
    }
  }

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  useEffect(() => {
    if (selectedIndex === null) return

    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      const diff = touchStartX - touchEndX
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goNext()
        } else {
          goPrev()
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [selectedIndex])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:opacity-80 transition-opacity"
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white text-3xl transition-colors duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); closeModal() }}
          >
            ×
          </button>

          {/* Left Arrow */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white text-2xl transition-colors duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
          >
            ‹
          </button>

          {/* Image */}
          <div className="relative max-w-5xl max-h-[85vh] mx-4 lg:mx-8" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[selectedIndex].src}
              alt={galleryImages[selectedIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white text-2xl transition-colors duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); goNext() }}
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
