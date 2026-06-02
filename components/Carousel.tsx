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

  const containerRef = useRef<HTMLDivElement>(null)
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

  if (n === 0) return null

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Current image fading out */}
      <div
        className="absolute inset-0"
        style={{
          opacity: next !== null ? 0 : 1,
          transition: next !== null ? 'opacity 0.4s ease' : 'none',
        }}
      >
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
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
          <img
            src={images[next].src}
            alt={images[next].alt}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
        </div>
      )}
    </div>
  )
}
