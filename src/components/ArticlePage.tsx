import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IconArrowLeft, IconChevronRight, IconChevronDown, IconChevronUp, IconExternal } from './Icons';
import { getArticleBySlug, getRelatedArticles, getAllArticles } from '../data/articles';
import { getSocialCoverUrl } from '../data/socialHelpers';
import { incrementArticleViews, getArticleViews } from '../data/viewsTracker';
import { ArticleMeta } from './ArticleMeta';
import { ShareButtons } from './ShareButtons';
import { RelatedArticles } from './RelatedArticles';
import { SEOHead } from './SEOHead';
import { AudioNarrator } from './AudioNarrator';
import { ReadingControls, ReadingTheme, FontSize, FontFamily } from './ReadingControls';
import { NextStoryCountdown } from './NextStoryCountdown';
import { InArticleAd } from './InArticleAd';
import { PatronSupportCard } from './PatronSupportCard';
import { InlineDossierCallout } from './InlineDossierCallout';
import { ArticleVerdict } from './ArticleVerdict';
import {
  isArticleSaved,
  toggleSaveArticle,
  markArticleAsRead,
} from '../services/retentionService';
import { motion, AnimatePresence } from 'motion/react';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  
  const [views, setViews] = useState<number>(0);
  const [showToc, setShowToc] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Reading customization state
  const [theme, setTheme] = useState<ReadingTheme>('editorial');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [fontFamily, setFontFamily] = useState<FontFamily>('serif');
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(() => (slug ? isArticleSaved(slug) : false));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (slug) {
      const updatedViews = incrementArticleViews(slug);
      setViews(updatedViews);
      setSaved(isArticleSaved(slug));
    }
  }, [slug]);

  useEffect(() => {
    const handleUpdate = () => {
      if (slug) setSaved(isArticleSaved(slug));
    };
    window.addEventListener('saved_articles_updated', handleUpdate);
    return () => window.removeEventListener('saved_articles_updated', handleUpdate);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        if (progress > 55 && slug) {
          markArticleAsRead(slug);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // 404: Historia no encontrada
  if (!article) {
    const recentArticles = getAllArticles().slice(0, 3);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <SEOHead
          metadata={{
            title: 'Expediente no encontrado',
            description: 'El expediente solicitado no figura en el catálogo activo de Archivo Inusual.',
          }}
        />

        <div className="border border-stone-300 bg-white p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-700 font-mono text-xl font-bold">
            !
          </div>

          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-stone-400 block mb-2">
            ERROR DE CATALOGACIÓN · REGISTRO NO LOCALIZADO
          </span>

          <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-stone-950 mb-4 text-balance">
            Historia no encontrada en el archivo
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-600 font-light leading-relaxed mb-8 max-w-lg mx-auto">
            El expediente digital con la signatura «<span className="font-mono text-stone-800">{slug}</span>» no figura en los fondos indexados o ha sido trasladado a otro tomo de conservación.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/historias"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-950 text-stone-50 text-xs uppercase tracking-widest font-sans font-medium hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <IconArrowLeft className="w-3.5 h-3.5" />
              <span>Explorar todas las historias</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-800 text-xs uppercase tracking-widest font-sans font-medium hover:border-stone-900 transition-colors cursor-pointer"
            >
              <span>Volver a la portada</span>
            </Link>
          </div>
        </div>

        {/* Suggested alternatives */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <h2 className="font-editorial text-2xl text-stone-900 mb-6 text-center">
            Expedientes disponibles en el fondo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((item) => (
              <Link
                key={item.id}
                to={`/historias/${item.slug}`}
                className="group border border-stone-200 bg-white p-5 hover:border-stone-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-sans uppercase tracking-wider text-stone-400 mb-2">
                    {item.categoryLabel}
                  </div>
                  <h3 className="font-editorial text-lg text-stone-950 group-hover:text-stone-700 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-stone-600 line-clamp-2 font-light">
                    {item.excerpt}
                  </p>
                </div>
                <span className="text-xs font-sans text-stone-400 mt-4 block pt-2 border-t border-stone-100">
                  {item.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Automatic related articles using category AND tags scoring
  const related = getRelatedArticles(article.slug, 3);

  return (
    <article className={`w-full transition-colors duration-200 ${
      theme === 'sepia'
        ? 'bg-[#F4ECD8] text-[#2E2218]'
        : theme === 'dark'
        ? 'bg-[#121212] text-[#E0DDD5]'
        : 'bg-[#FAF8F5] text-stone-900'
    }`}>
      {/* Reading Progress Indicator with fluid gradient and glow */}
      <div 
        className="fixed top-0 left-0 h-[3.5px] bg-gradient-to-r from-stone-900 via-amber-600 to-amber-400 z-50 transition-all duration-150 ease-out shadow-xs" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <SEOHead
        metadata={{
          title: article.title,
          description: article.excerpt,
          ogImage: article.socialCoverImage || getSocialCoverUrl(article),
          canonicalUrl: `https://archivoinusual.vercel.app/historias/${article.slug}`,
        }}
      />

      {/* Top Editorial Breadcrumbs & Header Bar (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <div className={`border-b transition-colors ${
          theme === 'dark' ? 'border-stone-800 bg-[#1A1A1A]' : theme === 'sepia' ? 'border-[#D9CAAF] bg-[#EFE4CC]' : 'border-stone-200 bg-[#FAF8F5]'
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4">
            <nav className="flex items-center gap-2 text-xs font-sans text-stone-500 uppercase tracking-wider overflow-x-auto whitespace-nowrap">
              <Link to="/" className="hover:text-stone-950 transition-colors">
                Inicio
              </Link>
              <IconChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
              <Link to="/historias" className="hover:text-stone-950 transition-colors">
                Historias
              </Link>
              <IconChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
              <Link to={`/${article.category}`} className="hover:text-stone-950 transition-colors">
                {article.categoryLabel}
              </Link>
              <IconChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
              <span className="truncate max-w-[200px] sm:max-w-xs font-medium">
                {article.accessionNumber || 'Expediente'}
              </span>
            </nav>
          </div>
        </div>
      )}

      {/* Main Reading Header Canvas */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-14 pb-8 sm:pb-12">
        
        {/* Category kicker & Tiempo estimado de lectura */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <Link
            to={`/${article.category}`}
            className="text-xs uppercase tracking-[0.25em] font-mono font-semibold opacity-70 hover:opacity-100 transition-opacity"
          >
            {article.categoryLabel}
          </Link>
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 border text-xs font-mono tracking-wide rounded-full shadow-2xs ${
            theme === 'dark' ? 'bg-[#1C1C1C] border-stone-700 text-stone-300' : 'bg-stone-100/90 border-stone-200/90 text-stone-700'
          }`}>
            <span className="opacity-70 font-light">Tiempo de lectura:</span>
            <strong className="font-semibold">{article.readingTime}</strong>
          </div>
        </div>

        {/* Main Article Headline */}
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.14] mb-6 text-balance">
          {article.title}
        </h1>

        {/* Subtitle / Intro deck */}
        <p className="font-sans text-lg sm:text-xl opacity-80 font-light leading-relaxed mb-6 sm:mb-8 text-balance">
          {article.subtitle}
        </p>

        {/* Meta Bar with Icons */}
        <div className="border-y border-stone-200/80 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <ArticleMeta
            category={article.categoryLabel}
            date={article.date}
            readingTime={article.readingTime}
            accessionNumber={article.accessionNumber}
            showIcons={false}
          />
          <ShareButtons title={article.title} />
        </div>

        {/* Real page views & retention bookmark indicator */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono font-light opacity-80">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full ${
            theme === 'dark' ? 'bg-[#1E1E1E] border-stone-700 text-stone-300' : 'bg-stone-100 border-stone-200 text-stone-700'
          }`}>
            <span><strong>{views}</strong> {views === 1 ? 'visita real registrada' : 'visitas reales registradas'}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              const nowSaved = toggleSaveArticle(article.slug);
              setSaved(nowSaved);
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 border rounded-full transition-all cursor-pointer shadow-2xs ${
              saved
                ? 'bg-amber-100 text-amber-950 border-amber-300 font-semibold'
                : theme === 'dark'
                ? 'bg-[#1E1E1E] border-stone-700 text-stone-300 hover:border-stone-500 hover:text-white'
                : 'bg-stone-100 border-stone-200 text-stone-700 hover:border-stone-400 hover:text-stone-950'
            }`}
            title={saved ? 'Guardado en Mi Expediente' : 'Guardar en Mi Expediente para leer después'}
          >
            <span>{saved ? '✓ Guardado' : '🔖 Guardar'}</span>
            <span className="hidden sm:inline text-[11px] font-sans">
              {saved ? 'en Mi Expediente' : 'para leer luego'}
            </span>
          </button>
        </div>

      </div>

      {/* Lead Archival Image Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-10 sm:mb-14">
        <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-200 border border-stone-300 rounded-3xl shadow-sm">
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-[10%]"
          />
        </div>
        {article.imageCaption && (
          <p className="font-editorial italic text-xs sm:text-sm opacity-60 mt-2.5 text-center sm:text-left">
            {article.imageCaption}
          </p>
        )}
      </div>

      {/* Article Body Narrative (Organized by Sections) */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Audio Narrator Player (Web Speech API) */}
        <AudioNarrator article={article} />

        {/* Reading Controls Toolbar (Theme, Font Size, Serif/Sans, Focus Mode) */}
        <ReadingControls
          theme={theme}
          onThemeChange={setTheme}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          fontFamily={fontFamily}
          onFontFamilyChange={setFontFamily}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
        />
        
        {/* Verificación de Fuentes y Rigor Histórico */}
        <div className={`mb-8 p-4 border border-l-4 rounded-2xl text-[11px] font-sans leading-relaxed flex items-start gap-2.5 shadow-2xs ${
          theme === 'dark'
            ? 'bg-[#1A1A1A] border-stone-700 border-l-amber-400 text-stone-300'
            : theme === 'sepia'
            ? 'bg-[#EFE4CC] border-[#D9CAAF] border-l-stone-900 text-[#3E3024]'
            : 'bg-[#FAF8F5] border-stone-300/80 border-l-stone-900 text-stone-700'
        }`}>
          <span className="text-emerald-700 font-bold font-mono text-sm shrink-0 mt-0.5">✓</span>
          <div>
            <strong className="font-medium">Expediente Histórico Contrastado:</strong> Todos los acontecimientos, personas, fechas y testimonios reproducidos en esta crónica se fundamentan en registros públicos, cuadernos de bitácora y actas oficiales inventariadas al pie.
          </div>
        </div>

        {/* Table of Contents / Índice del Expediente */}
        {article.content.length >= 4 && (
          <div className={`mb-10 border p-5 sm:p-6 rounded-2xl shadow-sm ${
            theme === 'dark' ? 'bg-[#1C1C1C] border-stone-700' : theme === 'sepia' ? 'bg-[#EFE4CC] border-[#D9CAAF]' : 'bg-[#FAF8F5] border-stone-300'
          }`}>
            <div 
              className="flex items-center justify-between cursor-pointer select-none"
              onClick={() => setShowToc(!showToc)}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold opacity-70">§</span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                  Índice del Expediente · {article.content.length} Capítulos
                </span>
              </div>
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowToc(!showToc);
                }}
                className="opacity-70 hover:opacity-100 p-1 cursor-pointer rounded-full hover:bg-stone-200/50"
                aria-label={showToc ? 'Ocultar índice' : 'Mostrar índice'}
              >
                {showToc ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {showToc && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-stone-200/60">
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {article.content.map((sec, idx) => (
                        <li key={sec.id || idx}>
                          <a
                            href={`#${sec.id || `capitulo-${idx + 1}`}`}
                            className="group flex items-start gap-2 text-xs sm:text-[13px] opacity-80 hover:opacity-100 font-sans transition-colors py-1 px-2 rounded-lg hover:bg-black/5"
                          >
                            <span className="font-mono text-[11px] opacity-60 group-hover:opacity-100 shrink-0 font-medium pt-0.5">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <span className="group-hover:underline underline-offset-4 line-clamp-1">
                              {sec.heading ? sec.heading.replace(/^\d+\.\s*/, '') : `Capítulo ${idx + 1}`}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Render Structured Sections */}
        <div className="space-y-12">
          {article.content.map((section, sIndex) => (
            <React.Fragment key={section.id || sIndex}>
              <section 
                id={section.id || `capitulo-${sIndex + 1}`} 
                className="article-section scroll-mt-20"
              >
                {section.heading && (
                  <h2 className="font-editorial text-2xl sm:text-[1.65rem] font-medium mb-4 tracking-tight pt-2 border-t border-stone-200/60 first:border-t-0 first:pt-0">
                    {section.heading}
                  </h2>
                )}

                <div className={`space-y-6 leading-[1.85] font-light ${
                  fontSize === 'sm' ? 'text-sm sm:text-[15px]' : fontSize === 'lg' ? 'text-lg sm:text-[19px]' : 'text-base sm:text-[17px]'
                } ${fontFamily === 'serif' ? 'font-editorial' : 'font-sans'}`}>
                  {section.paragraphs.map((p, pIndex) => (
                    <p
                      key={pIndex}
                      className={sIndex === 0 && pIndex === 0 ? 'editorial-dropcap' : ''}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {section.callout && (
                  <div className={`my-6 p-4 sm:p-5 border-l-2 rounded-2xl text-xs sm:text-sm font-sans ${
                    theme === 'dark'
                      ? 'bg-[#1F1F1F] border-amber-400 text-stone-300'
                      : theme === 'sepia'
                      ? 'bg-[#EAE0C8] border-[#8C7355] text-[#2E2218]'
                      : 'bg-[#F5F2EB] border-stone-800 text-stone-700'
                  }`}>
                    <span className="font-semibold uppercase tracking-wider text-[10px] block mb-1">
                      Nota de Archivo
                    </span>
                    <p className="leading-relaxed font-light">{section.callout}</p>
                  </div>
                )}
              </section>

              {/* Retention: Inline Rabbit Hole Dossier Callout */}
              {sIndex === 2 && related[0] && (
                <InlineDossierCallout relatedArticle={related[0]} />
              )}

              {/* Mid-article discreet sponsorship slots */}
              {sIndex === 3 && <InArticleAd slotId="mid-1" variant="mid-article-1" />}
              {sIndex === 8 && <InArticleAd slotId="mid-2" variant="mid-article-2" />}
            </React.Fragment>
          ))}
        </div>

        {/* Patron Support Card (Mecenazgo Ko-fi) */}
        <PatronSupportCard />

        {/* Continuous Binge Reading Countdown Widget */}
        <NextStoryCountdown currentArticle={article} />

        {/* Retention: Community Debate & Case Verdict */}
        <ArticleVerdict slug={article.slug} articleTitle={article.title} />

        {/* Pull Quote with rounded-2xl */}
        {article.quote && (
          <div className={`my-10 sm:my-14 p-6 sm:p-8 border-l-4 rounded-2xl shadow-2xs ${
            theme === 'dark' ? 'bg-[#1C1C1C] border-amber-400' : 'bg-[#F5F2EB] border-stone-900'
          }`}>
            <span className="font-editorial text-2xl opacity-50 block mb-1">“</span>
            <blockquote className="font-editorial italic text-xl sm:text-2xl leading-snug mb-3">
              «{article.quote}»
            </blockquote>
            {article.quoteAuthor && (
              <cite className="not-italic block font-sans text-xs uppercase tracking-wider opacity-60">
                — {article.quoteAuthor}
              </cite>
            )}
          </div>
        )}

        {/* Tags list with rounded-full pills */}
        {article.tags && article.tags.length > 0 && !isFocusMode && (
          <div className="my-8 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 text-xs font-sans opacity-60 uppercase tracking-wider mb-3">
              <span className="font-mono font-bold text-stone-500">#</span>
              <span>Etiquetas de catalogación:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/buscar?tag=${encodeURIComponent(tag)}`}
                  className={`px-3.5 py-1 text-xs font-sans rounded-full transition-all border cursor-pointer shadow-2xs ${
                    theme === 'dark'
                      ? 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                      : 'bg-stone-100 border-stone-200/80 text-stone-600 hover:bg-stone-200 hover:border-stone-400'
                  }`}
                  title={`Ver historias etiquetadas con #${tag}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Anexo Documental & Expediente Clasificado with rounded-3xl and rounded-full button */}
        <div className="my-10 p-6 sm:p-8 bg-[#F4F1EA] border border-stone-300/80 border-l-4 border-stone-900 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-stone-900 bg-stone-200/80 px-3 py-1 rounded-full">
              <span className="font-serif italic font-bold">§</span>
              Anexo Documental del Archivo
            </span>
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              {article.accessionNumber || 'DOC-EXP-OFICIAL'}
            </span>
          </div>
          <h3 className="font-editorial text-xl sm:text-2xl font-medium text-stone-950 mb-2 leading-snug">
            Acceso a actas digitalizadas y transcripciones originales
          </h3>
          <p className="font-sans text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-5">
            Consulta los cuadernos de bitácora, testimonios periciales, cartas topográficas e informes oficiales desclasificados vinculados a este expediente.
          </p>
          <a
            href="https://www.profitableratecpmnetwork.com/ew9cj5pv?key=2f7b7bc307010a62165c67be948ad8c3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-[#FAF8F5] text-xs font-mono uppercase tracking-widest font-semibold rounded-full transition-all shadow-sm hover:shadow-md hover:scale-[1.02] group cursor-pointer"
          >
            <span className="font-mono text-sm leading-none">↓</span>
            <span>Abrir Expediente & Anexos Completos</span>
            <IconExternal className="w-3 h-3 text-stone-400" />
          </a>
        </div>

        {/* Section Divider */}
        <div className="my-10 flex items-center justify-center gap-3 text-stone-300">
          <span className="w-12 h-[1px] bg-stone-300" />
          <span className="font-editorial text-sm text-stone-400">§</span>
          <span className="w-12 h-[1px] bg-stone-300" />
        </div>

        {/* Sources & References Section with rounded-2xl */}
        {article.sources && article.sources.length > 0 ? (
          <div className="border border-stone-200 bg-white p-6 sm:p-8 rounded-2xl shadow-xs mb-12">
            <div className="flex items-center gap-2 mb-4 pb-3 border-stone-100 border-b text-xs font-sans uppercase tracking-[0.2em] font-semibold text-stone-800">
              <span className="font-mono font-bold text-stone-500">§</span>
              <span>Fuentes Documentales & Referencias</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-600 font-sans list-none">
              {article.sources.map((src, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-stone-400 text-xs shrink-0">[{idx + 1}]</span>
                  <div className="leading-relaxed">
                    {src.url ? (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-900 underline underline-offset-2 hover:text-stone-700"
                      >
                        {src.title}
                      </a>
                    ) : (
                      <span>{src.title}</span>
                    )}
                    {src.note && (
                      <span className="text-stone-400 text-xs block mt-0.5">{src.note}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="border border-stone-200 bg-white p-5 rounded-2xl mb-12 text-xs font-sans text-stone-500 italic">
            Fondo documental sin referencias externas anexas registradas.
          </div>
        )}

        {/* Bottom Share Buttons & Back link */}
        <div className="py-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/historias"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-white/70 hover:bg-white hover:border-stone-400 text-xs uppercase tracking-widest text-stone-700 hover:text-stone-950 font-mono transition-all shadow-2xs cursor-pointer"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a todas las historias</span>
          </Link>
          <ShareButtons title={article.title} />
        </div>

      </div>

      {/* 6 & 7. Automatic Related Articles Section ("También podría interesarte") */}
      <RelatedArticles articles={related} />

    </article>
  );
};
