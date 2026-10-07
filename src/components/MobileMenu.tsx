import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { IconClose, IconSearch, IconArrowUpRight } from './Icons';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenAbout: () => void;
  onRandomStory?: () => void;
  onOpenSaved?: () => void;
  onOpenResearcher?: () => void;
  savedCount?: number;
  rankBadge?: string;
  rankTitle?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenAbout,
  onRandomStory,
  onOpenSaved,
  onOpenResearcher,
  savedCount = 0,
  rankBadge = '📜',
  rankTitle = 'Lector Curioso',
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { to: '/', label: t('nav_home'), exact: true },
    { to: '/ultimas-publicaciones', label: 'Últimas publicaciones', isFeatured: true },
    { to: '/historias', label: t('nav_stories') },
    { to: '/cronologia', label: t('nav_timeline') },
    { to: '/mapa', label: t('nav_map') },
    { to: '/personas', label: t('nav_people') },
    { to: '/acontecimientos', label: t('nav_events') },
    { to: '/descubrimientos', label: t('nav_discoveries') },
    { to: '/misterios', label: t('nav_mysteries') },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs md:hidden animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#FAF8F5] border-l border-stone-200 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto rounded-l-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header in Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-200">
            <div>
              <span className="font-editorial text-sm font-semibold tracking-[0.2em] text-stone-950 uppercase block">
                ARCHIVO
              </span>
              <span className="font-editorial text-xs font-normal tracking-[0.3em] text-stone-600 uppercase block mt-0.5">
                INUSUAL
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-600 hover:text-stone-950 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-stone-200 bg-white"
              aria-label="Cerrar menú móvil"
            >
              <IconClose className="w-5 h-5" />
            </button>
          </div>

          {/* Language Selection inside Mobile Drawer */}
          <div className="py-4 border-b border-stone-200/80">
            <LanguageSelector variant="mobile" />
          </div>

          {/* Navigation Items with Real Routes */}
          <nav className="mt-4 flex flex-col gap-1.5 text-sm uppercase tracking-widest font-sans">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={onClose}
                className={({ isActive }) =>
                  `min-h-[42px] flex items-center justify-between px-3.5 py-2.5 transition-all text-left rounded-xl ${
                    item.isFeatured
                      ? isActive
                        ? 'text-emerald-950 font-bold bg-emerald-100/90 border border-emerald-300 shadow-2xs'
                        : 'text-emerald-900 font-semibold bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 shadow-2xs'
                      : isActive
                        ? 'text-stone-950 font-semibold bg-stone-200/80 shadow-2xs'
                        : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                  }`
                }
              >
                <div className="flex items-center gap-2">
                  {item.isFeatured && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
                  )}
                  <span>{item.label}</span>
                </div>
                {item.isFeatured ? (
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-emerald-700 text-white rounded-full font-bold">
                    NUEVO
                  </span>
                ) : (
                  <IconArrowUpRight className="w-4 h-4 text-stone-400" />
                )}
              </NavLink>
            ))}

            {/* Retention Quick Tools */}
            <div className="pt-3 mt-3 border-t border-stone-200/80 flex flex-col gap-2">
              {onRandomStory && (
                <button
                  type="button"
                  onClick={onRandomStory}
                  className="min-h-[42px] flex items-center justify-between px-4 py-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-900 border border-stone-200 rounded-full cursor-pointer text-xs font-mono uppercase tracking-wider shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎲</span>
                    <span className="font-semibold">Expediente Aleatorio</span>
                  </div>
                  <span className="text-[10px] text-stone-500">253 casos</span>
                </button>
              )}

              {onOpenSaved && (
                <button
                  type="button"
                  onClick={onOpenSaved}
                  className="min-h-[42px] flex items-center justify-between px-4 py-2.5 bg-amber-50/70 hover:bg-amber-100/70 text-stone-900 border border-amber-200 rounded-full cursor-pointer text-xs font-mono uppercase tracking-wider shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">📑</span>
                    <span>Mi Expediente</span>
                  </div>
                  {savedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-bold text-[10px]">
                      {savedCount}
                    </span>
                  )}
                </button>
              )}

              {onOpenResearcher && (
                <button
                  type="button"
                  onClick={onOpenResearcher}
                  className="min-h-[42px] flex items-center justify-between px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-900 border border-stone-200 rounded-full cursor-pointer text-xs font-mono uppercase tracking-wider shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{rankBadge}</span>
                    <span>{rankTitle}</span>
                  </div>
                  <span className="text-[10px] text-stone-500">Credencial ➔</span>
                </button>
              )}
            </div>

            {/* Quick Search Action inside Menu */}
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="min-h-[44px] flex items-center gap-2.5 px-4 py-3 mt-4 text-stone-800 hover:text-stone-950 border border-stone-200 bg-white rounded-full cursor-pointer text-left uppercase tracking-wider text-xs font-sans shadow-2xs"
            >
              <IconSearch className="w-4 h-4 text-stone-500" />
              <span>{t('nav_search')}</span>
            </button>

            {/* Ko-fi Patron Link in Mobile Menu */}
            <a
              href="https://ko-fi.com/aldopaz"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-between px-4 py-2.5 mt-2 bg-stone-900 text-stone-50 text-xs font-mono uppercase tracking-wider rounded-full shadow-xs hover:bg-stone-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-300 font-bold text-sm">☕</span>
                <span>Apoyar la investigación ($1)</span>
              </div>
              <IconArrowUpRight className="w-4 h-4 text-stone-400" />
            </a>
          </nav>
        </div>

        {/* Footer in Drawer */}
        <div className="pt-6 border-t border-stone-200 text-xs text-stone-500 font-sans">
          <p className="font-editorial italic text-stone-800 text-sm mb-2">
            «{t('brand_tagline')}»
          </p>
          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="text-stone-700 underline underline-offset-2 hover:text-stone-950 cursor-pointer block mt-1"
          >
            Sobre nosotros
          </button>
          <p className="mt-3 text-[11px] text-stone-400">
            Edición Digital Continua · {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
