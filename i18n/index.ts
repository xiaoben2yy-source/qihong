import { en } from './en'
import { zh } from './zh'
import { es } from './es'
import { ru } from './ru'
import { ar } from './ar'
import { pt } from './pt'

export const translations = { en, zh, es, ru, ar, pt }
export type Locale = 'en' | 'zh' | 'es' | 'ru' | 'ar' | 'pt'
export const locales: Locale[] = ['en', 'zh', 'es', 'ru', 'ar', 'pt']
export const defaultLocale: Locale = 'en'

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}