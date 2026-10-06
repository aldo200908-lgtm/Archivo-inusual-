/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CategoryPage } from './components/CategoryPage';
import { ArticlePage } from './components/ArticlePage';
import { SearchPage } from './components/SearchPage';
import { SearchModal } from './components/SearchModal';
import { InfoModal, InfoModalType } from './components/InfoModals';
import { AdminSocialStudio } from './components/AdminSocialStudio';
import { ArchiveMapPage } from './components/ArchiveMapPage';
import { ArchiveTimelinePage } from './components/ArchiveTimelinePage';
import { getAllArticles } from './data/articles';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageWelcomeBanner, TranslationStatusToast } from './components/LanguageSelector';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { initGA, trackPageView, trackStoryView, GA_MEASUREMENT_ID } from './services/analytics';
import { motion, AnimatePresence } from 'motion/react';

// Export measurement ID for easy reference or direct configuration
export { GA_MEASUREMENT_ID };

// Google Analytics 4 Tracker for SPA route changes and story reads
function AnalyticsTracker() {
  const location = useLocation();

  // Initialize GA4 once on client mount
  useEffect(() => {
    initGA(GA_MEASUREMENT_ID);
  }, []);

  // Track page views and individual story metrics on route change
  useEffect(() => {
    const fullPath = location.pathname + location.search;
    trackPageView(fullPath, document.title);

    // Track detailed story view event if reading an investigation
    if (location.pathname.startsWith('/historias/')) {
      const slug = location.pathname.replace('/historias/', '').replace(/\/$/, '');
      if (slug) {
        const article = getAllArticles().find((a) => a.slug === slug);
        if (article) {
          trackStoryView({
            slug: article.slug,
            title: article.title,
            category: article.category,
            readingTime: article.readingTime,
          });
        }
      }
    }
  }, [location.pathname, location.search]);

  return null;
}

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Ensure Google Translate observer catches dynamically rendered routes
function RouteTranslationSync() {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (language !== 'es') {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectEl && selectEl.value === language) {
        try {
          selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        } catch (e) {}
      }
    }
  }, [location.pathname, language]);

  return null;
}

function MainLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<InfoModalType>(null);
  const location = useLocation();
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans-clean overflow-x-hidden selection:bg-stone-900 selection:text-[#FAF8F5]">
      <ScrollToTop />
      <RouteTranslationSync />
      <AnalyticsTracker />
      <LanguageWelcomeBanner />
      <TranslationStatusToast />

      {/* 1. Header with real routes & clean mobile drawer */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAbout={() => setInfoModalType('about')}
      />

      {/* Main Dynamic View with Fluid Page Transitions */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/historias" element={<CategoryPage categorySlug="historias" />} />
              <Route path="/cronologia" element={<ArchiveTimelinePage />} />
              <Route path="/mapa" element={<ArchiveMapPage />} />
              <Route path="/personas" element={<CategoryPage categorySlug="personas" />} />
              <Route path="/acontecimientos" element={<CategoryPage categorySlug="acontecimientos" />} />
              <Route path="/descubrimientos" element={<CategoryPage categorySlug="descubrimientos" />} />
              <Route path="/misterios" element={<CategoryPage categorySlug="misterios" />} />
              <Route path="/buscar" element={<SearchPage />} />
              <Route path="/historias/:slug" element={<ArticlePage />} />
              <Route path="/despacho-secreto" element={<AdminSocialStudio />} />
              <Route path="/editor-privado" element={<AdminSocialStudio />} />
              {/* Catch-all fallback */}
              <Route path="*" element={<CategoryPage categorySlug="historias" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 2. Editorial Footer */}
      <Footer
        onOpenAbout={() => setInfoModalType('about')}
        onOpenContact={() => setInfoModalType('contact')}
        onOpenPrivacy={() => setInfoModalType('privacy')}
      />

      {/* 3. Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={articles}
      />

      {/* 4. Global Informative Modals */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white border border-stone-300 p-8 rounded-sm shadow-sm space-y-4">
            <h1 className="font-editorial text-2xl font-serif text-stone-900">Ha ocurrido un error inesperado</h1>
            <p className="text-xs text-stone-600 font-sans">
              No se pudo cargar la vista solicitada. Por favor recarga la página o vuelve al inicio.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/';
              }}
              className="px-4 py-2 bg-stone-900 text-stone-100 text-xs font-mono uppercase tracking-wider rounded-xs hover:bg-stone-800 transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <MainLayout />
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
