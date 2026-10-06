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
}

const STORAGE_KEY = 'archivoinusual_user_lang';
const BANNER_SEEN_KEY = 'archivoinusual_lang_banner_seen';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to trigger automated DOM translation on the entire page
export function triggerAutomatedDomTranslation(targetLang: LanguageCode) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const cookieVal = targetLang === 'es' ? '' : `/es/${targetLang}`;
  const host = window.location.hostname;
  const rootDomain = host.includes('.') ? '.' + host.split('.').slice(-2).join('.') : host;

  // Set Google Translate cookie on all paths and domain levels
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=${host};`;
  if (rootDomain !== host) {
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${rootDomain};`;
  }

  // Find Google Translate combo element
  const applyCombo = () => {
    const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (selectEl) {
      selectEl.value = targetLang;
      selectEl.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  };

  if (!applyCombo()) {
    // Retry with gentle intervals as script mounts
    const timer1 = setTimeout(applyCombo, 300);
    const timer2 = setTimeout(applyCombo, 800);
    const timer3 = setTimeout(applyCombo, 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') return 'es';
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }

    // Auto-detect browser language if first visit
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    const matched = SUPPORTED_LANGUAGES.find((l) => l.code === browserLang);
    return matched ? matched.code : 'es';
  });

  const [showWelcomeBanner, setShowWelcomeBanner] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem(BANNER_SEEN_KEY);
  });

  // Sync with HTML lang attribute and automated DOM translation
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }

    // Apply full-site DOM translation
    triggerAutomatedDomTranslation(language);
  }, [language]);

  const setLanguage = (newLang: LanguageCode) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang);
      localStorage.setItem(BANNER_SEEN_KEY, 'true');
    }
    setShowWelcomeBanner(false);
    triggerAutomatedDomTranslation(newLang);
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
