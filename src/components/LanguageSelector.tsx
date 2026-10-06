import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES, LanguageCode } from '../i18n/translations';
import { IconCheck } from './Icons';

interface LanguageSelectorProps {
  variant?: 'header' | 'mobile' | 'footer' | 'compact';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { language, setLanguage, currentLangInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // Mobile drawer variant: full list of clean pills
  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-stone-400 font-semibold mb-1">
          Idioma / Language:
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`py-2 px-3 rounded-xs text-xs font-mono flex items-center justify-between transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-stone-900 text-amber-300 border-stone-800 shadow-xs'
                    : 'bg-stone-100/80 hover:bg-stone-200 text-stone-700 border-stone-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{lang.flag}</span>
                  <span className="font-medium">{lang.nativeLabel}</span>
                </span>
                {isSelected && <IconCheck className="w-3.5 h-3.5 text-amber-300" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Footer variant: inline compact flags / pills
  if (variant === 'footer') {
    return (
      <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = lang.code === language;
          return (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`px-2 py-1 text-[11px] font-mono rounded-xs transition-colors flex items-center gap-1 cursor-pointer ${
                isSelected
                  ? 'bg-stone-800 text-amber-300 font-bold'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              }`}
              title={lang.label}
            >
              <span>{lang.flag}</span>
              <span>{lang.code.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Header and compact variant: elegant dropdown
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-full border border-stone-300/80 hover:border-stone-800 text-stone-800 hover:text-stone-950 font-mono text-xs transition-all cursor-pointer bg-white/70 hover:bg-white shadow-2xs backdrop-blur-xs select-none"
        aria-label="Seleccionar idioma / Select language"
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none">{currentLangInfo.flag}</span>
        <span className="font-semibold uppercase tracking-wider text-[11px]">
          {currentLangInfo.code}
        </span>
        <svg
          className={`w-3 h-3 text-stone-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-xs bg-[#FAF8F5] border border-stone-300 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="px-3 py-1 border-b border-stone-200/80 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 font-semibold">
              Idioma / Language
            </span>
          </div>

          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                role="menuitem"
                onClick={() => handleSelect(lang.code)}
                className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-amber-300 font-bold'
                    : 'text-stone-700 hover:bg-stone-200/70 hover:text-stone-950'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.nativeLabel}</span>
                  <span className="text-[10px] text-stone-400 font-normal">
                    ({lang.code.toUpperCase()})
                  </span>
                </span>
                {isSelected && <IconCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// First-time Welcome / Language Choice Banner
export const LanguageWelcomeBanner: React.FC = () => {
  const { showWelcomeBanner, dismissWelcomeBanner, setLanguage, language, t } = useLanguage();

  if (!showWelcomeBanner) return null;

  return (
    <div className="w-full bg-stone-950 text-stone-200 border-b border-amber-900/40 py-2.5 px-4 sm:px-6 relative z-30 animate-in slide-in-from-top duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="text-base">🌍</span>
          <div>
            <span className="font-semibold text-amber-300 font-mono tracking-wide">
              {t('lang_select_title')}:
            </span>{' '}
            <span className="text-stone-300 font-sans hidden sm:inline">
              {t('lang_select_desc')}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`py-1 px-2.5 rounded-xs font-mono text-[11px] flex items-center gap-1 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-xs'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.nativeLabel}</span>
              </button>
            );
          })}

          <button
            onClick={dismissWelcomeBanner}
            className="ml-2 py-1 px-2 text-stone-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            title="Cerrar aviso"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
