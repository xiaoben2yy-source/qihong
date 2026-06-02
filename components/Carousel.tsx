'use client'

import { useState, useRef, useEffect } from 'react'

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoPlay?: boolean
  interval?: number
}

export default function Carousel({ images, autoPlay = true, interval = 4000 }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const isAnimRef = useRef(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const currentRef = useRef(0)

  const n = images.length

  useEffect(() => { currentRef.current = current }, [current])

  useEffect(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    if (!autoPlay || n <= 1) return
    const tick = () => {
      if (isAnimRef.current) return
      isAnimRef.current = true
      setNext((currentRef.current + 1) % n)
    }
    autoRef.current = setInterval(tick, interval)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [autoPlay, interval, n])

  // After transition, update current and clear next
  useEffect(() => {
    if (next === null) return
    const t = setTimeout(() => {
      setCurrent(next)
      setNext(null)
      isAnimRef.current = false
    }, 400)
    return () => clearTimeout(t)
  }, [next])

  const w = () => {
    if (typeof window === 'undefined') return 800
    return containerRef.current?.offsetWidth || window.innerWidth
  }

  const onStart = (clientX: number) => {
    if (isAnimRef.current || n <= 1) return
    setDragging(true)
    startXRef.current = clientX
    setOffset(0)
  }

  const onMove = (clientX: number) => {
    if (!dragging) return
    setOffset(clientX - startXRef.current)
  }

  const onEnd = () => {
    if (!dragging) return
    setDragging(false)
    const delta = offset
    const threshold = w() * 0.05

    if (Math.abs(delta) > threshold) {
      isAnimRef.current = true
      setNext(delta < 0 ? (currentRef.current + 1) % n : (currentRef.current - 1 + n) % n)
    }
    setOffset(0)
  }

  if (n === 0) return null

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ touchAction: 'pan-y' }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => { e.preventDefault(); onStart(e.clientX) }}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); onMove(e.touches[0].clientX) }}
        onTouchEnd={(e) => { e.preventDefault(); onEnd() }}
      >
        {/* Current image fading out */}
        <div
          className="absolute inset-0"
          style={{
            opacity: next !== null ? 0 : 1,
            transition: next !== null ? 'opacity 0.4s ease' : 'none',
          }}
        >
          <img src={images[current].src} alt={images[current].alt} className="w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Next image fading in */}
        {next !== null && (
          <div
            className="absolute inset-0"
            style={{
              opacity: 1,
              transition: 'opacity 0.4s ease',
            }}
          >
            <img src={images[next].src} alt={images[next].alt} className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}
      </div>
    </div>
  )
}