import { useState, useEffect } from 'react'
import { translations, languages } from '../lib/translations'
import { getDashboardTranslation } from '../lib/dashboardTranslations'
import type { Language } from '../types'

export function useTranslation() {
  const [language, setLanguage] = useState<Language['code']>('en')
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('paynow-language') as Language['code']
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    const currentLang = languages.find(lang => lang.code === language)
    const rtl = currentLang?.rtl || false
    setIsRTL(rtl)
    
    // Update document direction
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    
    // Save to localStorage
    localStorage.setItem('paynow-language', language)
  }, [language])

  const t = (key: string): string => {
    try {
      // First try the main translations
      const translation = translations[key]
      if (translation && translation[language]) {
        return translation[language]
      }
      
      // Fallback to dashboard translations
      const dashboardTranslation = getDashboardTranslation(key)
      if (dashboardTranslation !== key) {
        return dashboardTranslation
      }
      
      // Final fallback - return the key itself
      return key
    } catch (error) {
      console.warn('Translation error for key:', key, error)
      return key
    }
  }

  return {
    t,
    language,
    setLanguage,
    isRTL,
    languages
  }
}