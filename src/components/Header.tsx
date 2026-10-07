import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { IconSearch, IconMenu, IconClose } from './Icons';
import { MobileMenu } from './MobileMenu';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import {
  getRandomArticle,
  getSavedSlugs,
  getReadSlugs,
  getResearcherRank,
} from '../services/retentionService';
import { SavedDossierModal } from './SavedDossierModal';
import { ResearcherModal } from './ResearcherModal';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAbout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerQuery, setHeaderQuery] = useState('');
  const [isInputExpanded, setIsInputExpanded] = useState(false);

  // Retention states
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [researcherModalOpen, setResearcherModalOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(() => getSavedSlugs().length);
  const [readCount, setReadCount] = useState(() => getReadSlugs().length);

  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSavedChange = () => setSavedCount(getSavedSlugs().length);
    const handleReadChange = () => setReadCount(getReadSlugs().length);
    window.addEventListener('saved_articles_updated', handleSavedChange);
    window.addEventListener('read_articles_updated', handleReadChange);
    return () => {
      window.removeEventListener('saved_articles_updated', handleSavedChange);
      window.removeEventListener('read_articles_updated', handleReadChange);
    };
  }, []);

  const handleRandomStory = () => {
    const currentSlug = location.pathname.startsWith('/historias/')
      ? location.pathname.replace('/historias/', '')
      : undefined;
    const random = getRandomArticle(currentSlug);
    navigate(`/historias/${random.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rank = getResearcherRank(readCount);

  const navLinks = [
    { to: '/', label: t('nav_home'), exact: true },
    { to: '/ultimas-publicaciones', label: 'Últimas publicaciones' },
    { to: '/historias', label: t('nav_stories') },
    { to: '/cronologia', label: t('nav_timeline') },
    { to: '/mapa', label: t('nav_map') },
    { to: '/personas', label: t('nav_people') },
    { to: '/acontecimientos', label: t('nav_events') },
    { to: '/descubrimientos', label: t('nav_discoveries') },
    { to: '/misterios', label: t('nav_mysteries') },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(headerQuery.trim())}`);
      setIsInputExpanded(false);
    } else {
      navigate('/buscar');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b border-stone-200/80 ${
          scrolled ? 'bg-[#FAF8F5]/95 backdrop-blur-md py-3 shadow-xs' : 'bg-[#FAF8F5] py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Zone 1: Wordmark Logo */}
            <Link
              to="/"
              className="text-left group cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-stone-900 rounded-xs select-none shrink-0"
              aria-label="Archivo Inusual — Ir al inicio"
            >
              <div className="flex flex-col">
                <span className="font-editorial text-sm sm:text-base font-semibold tracking-[0.22em] text-stone-950 uppercase leading-none group-hover:text-stone-700 transition-colors">
                  ARCHIVO
                </span>
                <span className="font-editorial text-xs sm:text-sm font-normal tracking-[0.32em] text-stone-600 uppercase leading-none mt-1 group-hover:text-stone-900 transition-colors">
                  INUSUAL
                </span>
              </div>
            </Link>

            {/* Zone 2: Navigation Links with real routes & active indicator */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs uppercase tracking-widest font-sans font-medium text-stone-600">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `relative py-1 transition-colors whitespace-nowrap hover:text-stone-950 ${
                      isActive ? 'text-stone-950 font-semibold' : 'text-stone-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-950" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Zone 3: Search Action, Language Switcher & Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Language Selector Dropdown */}
              <LanguageSelector variant="header" />

              {/* Desktop quick search bar with rounded-full */}
              <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
                <label htmlFor="header-search-input" className="sr-only">
                  {t('nav_search')}
                </label>
                <div className="relative flex items-center">
                  <input
                    id="header-search-input"
                    type="text"
                    value={headerQuery}
                    onChange={(e) => setHeaderQuery(e.target.value)}
                    onFocus={() => setIsInputExpanded(true)}
                    onBlur={() => setTimeout(() => setIsInputExpanded(false), 200)}
                    placeholder={t('search_placeholder').slice(0, 24) + '...'}
                    className={`text-xs font-sans py-2 pl-9 pr-4 border rounded-full bg-white/90 placeholder:text-stone-400 focus:outline-hidden transition-all duration-200 ${
                      isInputExpanded
                        ? 'w-44 lg:w-56 border-stone-900 bg-white ring-2 ring-stone-900/10'
                        : 'w-28 lg:w-36 border-stone-200 hover:border-stone-400'
                    }`}
                  />
                  <IconSearch className="absolute left-3 w-3.5 h-3.5 text-stone-400 pointer-events-none" aria-hidden="true" />
                  {headerQuery && (
                    <button
                      type="button"
                      onClick={() => setHeaderQuery('')}
                      className="absolute right-2.5 text-stone-400 hover:text-stone-700 cursor-pointer p-0.5 rounded-full"
                      aria-label="Limpiar campo"
                    >
                      <IconClose className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </form>

              {/* Direct Link to /buscar for mobile and quick navigation */}
              <Link
                to="/buscar"
                className="flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider text-stone-700 hover:text-stone-950 transition-colors rounded-full border border-stone-200 hover:border-stone-900 bg-white/60 hover:bg-white cursor-pointer min-h-[38px] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-stone-900 shadow-2xs"
                aria-label="Ir a la página de búsqueda"
              >
                <IconSearch className="w-3.5 h-3.5" />
                <span className="font-sans text-xs uppercase tracking-wider hidden xl:inline">{t('nav_search').split(' ')[0]}</span>
              </Link>

              {/* Retention Tool 1: Random Story Button ("Expediente Aleatorio") */}
              <button
                type="button"
                onClick={handleRandomStory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border border-stone-200 hover:border-stone-900 bg-white/70 hover:bg-white text-stone-800 transition-all shadow-2xs hover:scale-[1.02] active:scale-95 cursor-pointer min-h-[38px]"
                title="Abrir un expediente al azar de los 253 disponibles"
                aria-label="Abrir expediente al azar"
              >
                <span className="text-sm">🎲</span>
                <span className="hidden xl:inline uppercase tracking-wider text-[11px] font-semibold">Azar</span>
              </button>

              {/* Retention Tool 2: "Mi Expediente" Bookmarked Stories */}
              <button
                type="button"
                onClick={() => setSavedModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border border-stone-200 hover:border-amber-700/80 bg-white/70 hover:bg-amber-50/70 text-stone-800 transition-all shadow-2xs hover:scale-[1.02] cursor-pointer min-h-[38px]"
                title="Mi Expediente (artículos guardados para leer)"
                aria-label="Ver historias guardadas"
              >
                <span className="text-xs">📑</span>
                <span className="hidden lg:inline uppercase tracking-wider text-[11px]">Guardados</span>
                {savedCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold flex items-center justify-center font-mono">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Retention Tool 3: "Credencial de Investigador" Rank Badge */}
              <button
                type="button"
                onClick={() => setResearcherModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border border-stone-200 hover:border-stone-900 bg-white/70 hover:bg-white text-stone-800 transition-all shadow-2xs hover:scale-[1.02] cursor-pointer min-h-[38px]"
                title={`Credencial Oficial: ${rank.title} (Nivel ${rank.level}) · Ver progreso y rutas`}
                aria-label="Ver credencial de investigador"
              >
                <span>{rank.badge}</span>
                <span className="hidden 2xl:inline uppercase tracking-wider text-[11px]">{rank.title}</span>
                <span className="2xl:hidden uppercase tracking-wider text-[11px]">Niv. {rank.level}</span>
              </button>

              {/* Ko-fi Patron Support Button with clean editorial typography */}
              <a
                href="https://ko-fi.com/aldopaz"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-950 hover:bg-stone-800 text-stone-50 text-xs font-mono tracking-wider rounded-full transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.02]"
                title="Apoyar la investigación en Ko-fi (desde $1)"
              >
                <span className="text-amber-300 font-bold text-[13px] leading-none">☕</span>
                <span className="hidden xl:inline">Apoyar</span>
                <span className="text-amber-300 font-semibold">$1</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-stone-800 hover:text-stone-950 transition-colors rounded-full border border-stone-200 bg-white/70 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-stone-900"
                aria-label="Abrir menú de navegación"
                aria-expanded={mobileMenuOpen}
              >
                <IconMenu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => {
          setMobileMenuOpen(false);
          navigate('/buscar');
        }}
        onOpenAbout={onOpenAbout}
        onRandomStory={() => {
          setMobileMenuOpen(false);
          handleRandomStory();
        }}
        onOpenSaved={() => {
          setMobileMenuOpen(false);
          setSavedModalOpen(true);
        }}
        onOpenResearcher={() => {
          setMobileMenuOpen(false);
          setResearcherModalOpen(true);
        }}
        savedCount={savedCount}
        rankBadge={rank.badge}
        rankTitle={rank.title}
      />

      {/* Retention Modals */}
      <SavedDossierModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
      />

      <ResearcherModal
        isOpen={researcherModalOpen}
        onClose={() => setResearcherModalOpen(false)}
      />
    </>
  );
};
