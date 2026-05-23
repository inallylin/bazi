export type Locale = 'zh' | 'en'

let currentLocale: Locale = 'zh'

export const getLocale = (): Locale => currentLocale

export const setLocale = (locale: Locale): void => {
  currentLocale = locale
}

export const isLocale = (value: unknown): value is Locale => {
  return value === 'zh' || value === 'en'
}
