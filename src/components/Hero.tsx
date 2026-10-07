import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { motion } from 'motion/react';
import { IconArrowRight } from './Icons';

interface HeroProps {
  article: Article;
}

export const Hero: React.FC<HeroProps> = ({ article }) => {
  // Provenance / location info for fast archival context
  const locationLabel = article.socialLocation || 'Islas Flannan, Escocia';
  const accessionCode = article.accessionNumber || 'ARC-001';

  return (
    <section className="relative w-full border-b border-stone-200 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Top Curatorial Ribbon: Clean Archival Metadata */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b border-stone-200 text-xs font-mono text-stone-500 uppercase tracking-wider"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-semibold text-stone-900 px-3 py-1 bg-stone-200/80 rounded-full text-[11px]">
              EXPEDIENTE CENTRAL
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-700 font-medium">REGISTRO {accessionCode}</span>
            <span aria-hidden="true" className="hidden sm:inline text-stone-300">·</span>
            <span className="hidden sm:inline text-emerald-800 font-sans text-[11px] font-normal lowercase tracking-normal">
              ✓ 100% fuentes contrastadas
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
            <span>{article.date}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-700 font-medium">
              {article.readingTime}
            </span>
          </div>
        </motion.div>

        {/* Main Balanced Hero Grid: 6 Columns Text / 6 Columns Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column (6 cols): Title, Subtitle, Dossier Micro-grid & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Category Tag Pill */}
            <div className="mb-4">
              <Link
                to={`/${article.category}`}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-mono font-semibold px-3.5 py-1 bg-stone-200/80 hover:bg-stone-300/80 text-stone-850 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs"
              >
                <span>{article.categoryLabel}</span>
              </Link>
            </div>

            {/* Dominant Headline with balanced line height */}
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.15rem] font-medium tracking-tight text-stone-950 leading-[1.12] mb-4 sm:mb-5 text-balance">
              <Link 
                to={`/historias/${article.slug}`} 
                className="hover:text-stone-750 transition-colors duration-200"
              >
                {article.title}
              </Link>
            </h1>

            {/* Subhead Deck with generous readability */}
            <p className="font-sans text-base sm:text-lg text-stone-600 font-light leading-relaxed mb-6 sm:mb-7 text-balance">
              {article.subtitle}
            </p>

            {/* Micro-Dossier Fact Strip: Organized 3-column metadata card with pure typography */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 bg-white border border-stone-200/90 rounded-2xl mb-7 shadow-xs">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-0.5">
                  Lugar
                </span>
                <span className="font-sans text-xs font-medium text-stone-800 line-clamp-1">
                  {locationLabel}
                </span>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-stone-100 pt-2 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-0.5">
                  Estructura
                </span>
                <span className="font-sans text-xs font-medium text-stone-800">
                  {article.content.length} {article.content.length === 1 ? 'Capítulo documentado' : 'Capítulos documentados'}
                </span>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-stone-100 pt-2 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-0.5">
                  Fondo
                </span>
                <span className="font-sans text-xs font-medium text-stone-800">
                  Actas oficiales
                </span>
              </div>
            </div>

            {/* CTA Group: Primary Pill Button & Secondary Link */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to={`/historias/${article.slug}`}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-stone-950 text-stone-50 hover:bg-stone-850 text-xs uppercase tracking-widest font-mono font-medium rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-900"
              >
                <span>Leer expediente completo</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                to="/cronologia"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 border border-stone-300 hover:border-stone-900 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950 text-xs uppercase tracking-wider font-mono rounded-full transition-all duration-200 shadow-2xs"
              >
                <span>Ver cronología</span>
                <span aria-hidden="true" className="text-stone-400">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column (6 cols): Large Visual with Documentary Seal & Provenance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col"
          >
            <div className="bg-white p-3 sm:p-4 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Link
                to={`/historias/${article.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-stone-200 cursor-pointer"
                aria-label={`Abrir expediente: ${article.title}`}
              >
                {/* Visual Ratio: 16/10 for ideal desktop presence */}
                <div className="aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center grayscale-[12%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                </div>

                {/* Top Seal Pill */}
                <div className="absolute top-3.5 left-3.5 bg-stone-950/85 backdrop-blur-xs text-stone-50 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-xs">
                  Expediente Central
                </div>

                {/* Bottom Photographic Provenance Strip */}
                <div className="p-3 sm:p-3.5 bg-stone-950/85 backdrop-blur-xs text-stone-200 flex items-center justify-between text-[11px] font-sans tracking-wide">
                  <span className="italic truncate pr-2 opacity-90">
                    {article.imageCaption || 'Fotografía y registro documental de archivo.'}
                  </span>
                  <span className="uppercase tracking-widest text-[10px] text-amber-300 font-mono shrink-0">
                    15 CAPÍTULOS
                  </span>
                </div>
              </Link>

              {/* Quote excerpt integrated peacefully beneath the photograph */}
              {article.quote && (
                <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-start gap-2.5 px-1 text-stone-600">
                  <span className="font-editorial text-2xl leading-none text-stone-400 select-none">«</span>
                  <div className="flex-1">
                    <p className="font-editorial italic text-xs sm:text-[13px] leading-snug text-stone-700">
                      {article.quote}
                    </p>
                    {article.quoteAuthor && (
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-stone-400 mt-1">
                        — {article.quoteAuthor}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
