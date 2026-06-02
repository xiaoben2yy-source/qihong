'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getTranslations, Locale, locales } from '@/i18n'

interface HeaderProps {
  locale: Locale
}

const localeNames: Record<Locale, string> = {
  en: 'EN',
  zh: '中文',
  es: 'ES',
  ru: 'RU',
  ar: 'AR',
  pt: 'PT',
}

export default function Header({ locale }: HeaderProps) {
  const t = getTranslations(locale)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/process', label: t.nav.process },
    { href: '/products', label: t.nav.products },
    { href: '/applications', label: t.nav.applications },
    { href: '/contact', label: t.nav.contact },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === `/${locale}`
    return pathname.startsWith(`/${locale}${href}`) || pathname.startsWith(href)
  }

  const switchLocale = (newLocale: Locale) => {
    const pathParts = pathname.split('/')
    pathParts[1] = newLocale
    return pathParts.join('/') || `/${newLocale}`
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <img
              src="/logo.png"
              alt="Qihong Textile"
              className={`h-28 lg:h-32 w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'brightness-100' : 'brightness-0 brightness-100'
              }`}
              style={{ filter: isScrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
          </Link>

          {/* Desktop Navigation - single line, max 80px */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                className={`text-lg font-medium tracking-wide transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-amber-500'
                    : isScrolled ? 'text-gray-700 hover:text-amber-500' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden lg:flex items-center relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`px-3 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 rounded flex items-center gap-1 ${
                isScrolled ? 'text-zinc-700 hover:text-amber-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {localeNames[locale]}
              <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 min-w-[100px]">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { window.location.href = switchLocale(loc); setIsLangOpen(false) }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 ${
                      loc === locale ? 'text-amber-600 font-medium' : 'text-zinc-700'
                    }`}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-zinc-700' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-zinc-100">
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className={`text-base font-medium py-3 transition-colors border-b border-zinc-100 last:border-0 ${
                    isActive(item.href) ? 'text-amber-600' : 'text-zinc-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-wrap gap-3 pt-3">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { window.location.href = switchLocale(loc); setIsMenuOpen(false) }}
                    className={`text-sm font-medium ${loc === locale ? 'text-amber-600' : 'text-zinc-400'}`}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}