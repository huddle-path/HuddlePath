export const LOCALES = [
  'en',
  'ru',
  'ar',
  'es',
  'zh-CN',
  'zh-TW',
  'fr',
  'de',
  'pt',
  'ja',
  'ko',
] as const;

export const LOCALE_PROPS = [
  { locale: 'en', dir: 'ltr', translate: 'ENGLISH' },
  { locale: 'ru', dir: 'ltr', translate: 'RUSSIAN' },
  { locale: 'ar', dir: 'rtl', translate: 'ARABIC' },
  { locale: 'es', dir: 'ltr', translate: 'SPANISH' },
  { locale: 'zh-CN', dir: 'ltr', translate: 'CHINESE (SIMPLIFIED)' },
  { locale: 'zh-TW', dir: 'ltr', translate: 'CHINESE (TRADITIONAL)' },
  { locale: 'fr', dir: 'ltr', translate: 'FRENCH' },
  { locale: 'de', dir: 'ltr', translate: 'GERMAN' },
  { locale: 'pt', dir: 'ltr', translate: 'PORTUGUESE' },
  { locale: 'ja', dir: 'ltr', translate: 'JAPANESE' },
  { locale: 'ko', dir: 'ltr', translate: 'KOREAN' },
];
