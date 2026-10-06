import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

export type ReadingTheme = 'editorial' | 'sepia' | 'dark';
export type FontSize = 'sm' | 'base' | 'lg';
export type FontFamily = 'serif' | 'sans';

interface ReadingControlsProps {
  theme: ReadingTheme;
  onThemeChange: (theme: ReadingTheme) => void;
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
  fontFamily: FontFamily;
  onFontFamilyChange: (family: FontFamily) => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

export const ReadingControls: React.FC<ReadingControlsProps> = ({
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  fontFamily,
  onFontFamilyChange,
  isFocusMode,
  onToggleFocusMode,
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 bg-stone-100/90 border border-stone-200/90 rounded-2xl shadow-2xs text-xs font-sans mb-8">
      {/* Label */}
      <div className="flex items-center gap-1.5 text-stone-600 font-mono text-[11px] uppercase tracking-wider pl-1">
        <span className="font-bold text-stone-800">Aa</span>
        <span className="hidden sm:inline">Lectura</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        
        {/* Language Selector */}
        <LanguageSelector variant="compact" />

        {/* Font Size Selector */}
        <div className="flex items-center gap-0.5 border border-stone-300 bg-white/80 rounded-full p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => onFontSizeChange('sm')}
            className={`px-2.5 py-0.5 text-xs font-mono rounded-full transition-colors cursor-pointer ${
              fontSize === 'sm' ? 'bg-stone-900 text-stone-50 font-bold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Texto compacto"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => onFontSizeChange('base')}
            className={`px-2.5 py-0.5 text-xs font-mono rounded-full transition-colors cursor-pointer ${
              fontSize === 'base' ? 'bg-stone-900 text-stone-50 font-bold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Texto estándar"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => onFontSizeChange('lg')}
            className={`px-2.5 py-0.5 text-xs font-mono rounded-full transition-colors cursor-pointer ${
              fontSize === 'lg' ? 'bg-stone-900 text-stone-50 font-bold shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Texto grande"
          >
            A+
          </button>
        </div>

        {/* Font Family Selector */}
        <div className="flex items-center gap-0.5 border border-stone-300 bg-white/80 rounded-full p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => onFontFamilyChange('serif')}
            className={`px-3 py-0.5 text-xs font-editorial rounded-full transition-colors cursor-pointer ${
              fontFamily === 'serif' ? 'bg-stone-900 text-stone-50 font-medium shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Tipografía de libro clásico"
          >
            Serif
          </button>
          <button
            type="button"
            onClick={() => onFontFamilyChange('sans')}
            className={`px-3 py-0.5 text-xs font-sans rounded-full transition-colors cursor-pointer ${
              fontFamily === 'sans' ? 'bg-stone-900 text-stone-50 font-medium shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="Tipografía limpia moderna"
          >
            Sans
          </button>
        </div>

        {/* Theme Palette Selector */}
        <div className="flex items-center gap-0.5 border border-stone-300 bg-white/80 rounded-full p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => onThemeChange('editorial')}
            className={`px-2.5 py-0.5 text-[11px] font-mono rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
              theme === 'editorial' ? 'bg-[#FAF8F5] text-stone-950 font-bold shadow-2xs border border-stone-300' : 'text-stone-500'
            }`}
            title="Modo Papel Blanco"
          >
            <span>Papel</span>
          </button>
          <button
            type="button"
            onClick={() => onThemeChange('sepia')}
            className={`px-2.5 py-0.5 text-[11px] font-mono rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
              theme === 'sepia' ? 'bg-[#F4ECD8] text-[#2E2218] font-bold shadow-2xs border border-[#D9CAAF]' : 'text-stone-500'
            }`}
            title="Modo Sepia / Papiro"
          >
            <span>Sepia</span>
          </button>
          <button
            type="button"
            onClick={() => onThemeChange('dark')}
            className={`px-2.5 py-0.5 text-[11px] font-mono rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
              theme === 'dark' ? 'bg-stone-950 text-stone-100 font-bold shadow-2xs border border-stone-700' : 'text-stone-500'
            }`}
            title="Modo Noche / Oscuro"
          >
            <span>Noche</span>
          </button>
        </div>

        {/* Focus Mode button */}
        <button
          type="button"
          onClick={onToggleFocusMode}
          className={`flex items-center gap-1.5 px-3 py-1 border rounded-full transition-all cursor-pointer shadow-2xs font-mono text-[11px] ${
            isFocusMode
              ? 'bg-stone-900 text-stone-50 border-stone-900 font-medium'
              : 'border-stone-300 bg-white text-stone-600 hover:text-stone-950 hover:border-stone-400'
          }`}
          title={isFocusMode ? 'Salir del modo concentración' : 'Modo concentración (sin distracciones)'}
        >
          <span>{isFocusMode ? '⊙ Normal' : '⤢ Enfoque'}</span>
        </button>

      </div>
    </div>
  );
};
