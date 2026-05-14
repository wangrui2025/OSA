import en from '../content/homepage/en.json';
import zh from '../content/homepage/zh.json';

const messages = { en, zh } as const;

export type Locale = 'en' | 'zh';

export function t(lang: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = messages[lang];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Fallback to English
      let fallback: unknown = messages.en;
      for (const fk of keys) {
        if (fallback && typeof fallback === 'object' && fk in fallback) {
          fallback = (fallback as Record<string, unknown>)[fk];
        } else {
          return key;
        }
      }
      return typeof fallback === 'string' ? fallback : key;
    }
  }

  return typeof value === 'string' ? value : key;
}
