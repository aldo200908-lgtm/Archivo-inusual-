import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  LanguageCode,
  LanguageInfo,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
  Translations,
} from '../i18n/translations';
import { Article } from '../types/index';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLangInfo: LanguageInfo;
  t: (key: keyof Translations, defaultText?: string) => string;
  showWelcomeBanner: boolean;
  dismissWelcomeBanner: () => void;
  getTranslatedArticle: (article: Article) => Article;
  isTranslating: boolean;
}

const STORAGE_KEY = 'archivoinusual_user_lang';
const BANNER_SEEN_KEY = 'archivoinusual_lang_banner_seen';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to trigger automated DOM translation across 100% of the entire page
export function triggerAutomatedDomTranslation(targetLang: LanguageCode): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(false);
      return;
    }

    const host = window.location.hostname;
    const parts = host.split('.');
    const rootDomain = parts.length > 2 ? '.' + parts.slice(-2).join('.') : (parts.length === 2 ? '.' + host : '');
    const isIframe = window.self !== window.top;
    const sameSitePolicy = isIframe ? '; SameSite=None; Secure' : '; SameSite=Lax';

    // Clear cookies across all possible paths and domain scopes
    const clearCookie = (name: string) => {
      const paths = ['/', ''];
      const domains = ['', host, '.' + host, rootDomain].filter(Boolean);
      for (const p of paths) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}${sameSitePolicy};`;
        for (const d of domains) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}; domain=${d};`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}; domain=${d}${sameSitePolicy};`;
        }
      }
    };

    // Set cookie across current and root domain
    const setCookie = (name: string, value: string) => {
      const maxAge = 60 * 60 * 24 * 365; // 1 year
      document.cookie = `${name}=${value}; path=/; max-age=${maxAge}${sameSitePolicy};`;
      document.cookie = `${name}=${value}; path=/; domain=${host}; max-age=${maxAge}${sameSitePolicy};`;
      if (rootDomain) {
        document.cookie = `${name}=${value}; path=/; domain=${rootDomain}; max-age=${maxAge}${sameSitePolicy};`;
      }
    };

    // Ensure Google Translate script is mounted
    if (!document.getElementById('google-translate-script') && !(window as any).google?.translate) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    if (targetLang === 'es') {
      // Revert to Spanish (original website language)
      clearCookie('googtrans');

      // Attempt restore button on Google Translate banner iframe
      try {
        const iframe = document.querySelector('iframe.goog-te-banner-frame') as HTMLIFrameElement | null;
        if (iframe && iframe.contentWindow) {
          const btn = iframe.contentWindow.document.querySelector('.goog-te-button button, button[id*="restore"]') as HTMLElement | null;
          if (btn) btn.click();
        }
      } catch (e) {}

      // Reset combo if present
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = '';
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        try {
          const evt = document.createEvent('HTMLEvents');
          evt.initEvent('change', true, true);
          selectEl.dispatchEvent(evt);
        } catch (e) {}
        if (typeof (selectEl as any).onchange === 'function') {
          (selectEl as any).onchange();
        }
      }

      // If document was translated, clean reload to restore pristine original Spanish
      const hasTranslatedClass = document.body.classList.contains('translated-ltr') ||
                                 document.documentElement.classList.contains('translated-ltr') ||
                                 document.querySelector('font[style]') !== null;
      if (hasTranslatedClass) {
        setTimeout(() => {
          window.location.reload();
        }, 120);
      }
      resolve(true);
      return;
    }

    // Set cookies for target foreign language
    setCookie('googtrans', `/es/${targetLang}`);
    setCookie('googtrans', `/auto/${targetLang}`);

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectEl) {
        clearInterval(interval);
        selectEl.value = targetLang;
        try {
          selectEl.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
        } catch (e) {}
        try {
          const evt = document.createEvent('HTMLEvents');
          evt.initEvent('change', true, true);
          selectEl.dispatchEvent(evt);
        } catch (e) {}
        if (typeof (selectEl as any).onchange === 'function') {
          (selectEl as any).onchange();
        }

        // Verify if translation takes effect
        setTimeout(() => {
          const isTranslated = document.body.classList.contains('translated-ltr') ||
                               document.documentElement.classList.contains('translated-ltr');
          if (!isTranslated && attempts > 4) {
            window.location.reload();
          }
          resolve(true);
        }, 800);
        return;
      }

      if (attempts >= 12) {
        clearInterval(interval);
        // Reload with cookie in place so Google Translate translates 100% on boot
        window.location.reload();
        resolve(false);
      }
    }, 150);
  });
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') return 'es';
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }

    // Check if googtrans cookie already has a language saved
    const match = document.cookie.match(/googtrans=\/(?:es|auto)\/([a-z]{2})/);
    if (match && SUPPORTED_LANGUAGES.some((l) => l.code === match[1])) {
      return match[1] as LanguageCode;
    }

    // Auto-detect browser language if first visit
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    const matched = SUPPORTED_LANGUAGES.find((l) => l.code === browserLang);
    return matched ? matched.code : 'es';
  });

  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const [showWelcomeBanner, setShowWelcomeBanner] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem(BANNER_SEEN_KEY);
  });

  // Sync with HTML lang attribute and automated DOM translation
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }

    if (language !== 'es') {
      triggerAutomatedDomTranslation(language);
    }
  }, [language]);

  const setLanguage = (newLang: LanguageCode) => {
    if (newLang === language) return;

    setIsTranslating(true);
    setLanguageState(newLang);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang);
      localStorage.setItem(BANNER_SEEN_KEY, 'true');
    }
    setShowWelcomeBanner(false);

    triggerAutomatedDomTranslation(newLang).finally(() => {
      setTimeout(() => {
        setIsTranslating(false);
      }, 1200);
    });
  };

  const dismissWelcomeBanner = () => {
    setShowWelcomeBanner(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(BANNER_SEEN_KEY, 'true');
    }
  };

  const currentLangInfo = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  const t = (key: keyof Translations, defaultText?: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS['es'];
    return dict[key] || TRANSLATIONS['es'][key] || defaultText || String(key);
  };

  // Helper to dynamically localize articles for non-Spanish readers
  const getTranslatedArticle = (art: Article): Article => {
    if (language === 'es') return art;

    const catLabelMap: Record<string, Record<LanguageCode, string>> = {
      historias: { es: 'Historias', en: 'Stories', pt: 'Histórias', fr: 'Histoires', de: 'Geschichten', it: 'Storie', ja: '物語' },
      personas: { es: 'Personas', en: 'People', pt: 'Pessoas', fr: 'Personnages', de: 'Persönlichkeiten', it: 'Persone', ja: '人物' },
      acontecimientos: { es: 'Acontecimientos', en: 'Events', pt: 'Acontecimentos', fr: 'Événements', de: 'Ereignisse', it: 'Avvenimenti', ja: '出来事' },
      descubrimientos: { es: 'Descubrimientos', en: 'Discoveries', pt: 'Descobertas', fr: 'Découvertes', de: 'Entdeckungen', it: 'Scoperte', ja: '大発見' },
      misterios: { es: 'Misterios', en: 'Mysteries', pt: 'Mistérios', fr: 'Mystères', de: 'Mysterien', it: 'Misteri', ja: '未解決の謎' },
    };

    const localizedCategoryLabel = catLabelMap[art.category]?.[language] || art.categoryLabel;

    return {
      ...art,
      categoryLabel: localizedCategoryLabel,
    };
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLangInfo,
        t,
        showWelcomeBanner,
        dismissWelcomeBanner,
        getTranslatedArticle,
        isTranslating,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
