import React from 'react';
import { Link } from 'react-router-dom';
import { getDailyArticle, toggleSaveArticle, isArticleSaved } from '../services/retentionService';

export const DailyDossierCard: React.FC = () => {
  const { article, dateFormatted } = getDailyArticle();
  const [saved, setSaved] = React.useState(() => isArticleSaved(article.slug));

  React.useEffect(() => {
    const handleUpdate = () => {
      setSaved(isArticleSaved(article.slug));
    };
    window.addEventListener('saved_articles_updated', handleUpdate);
    return () => window.removeEventListener('saved_articles_updated', handleUpdate);
  }, [article.slug]);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggleSaveArticle(article.slug);
    setSaved(nowSaved);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 sm:my-14">
      <div className="relative rounded-3xl bg-[#1C1A17] text-stone-100 overflow-hidden border border-stone-800 shadow-xl">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-6 sm:p-10 relative z-10">
          
          {/* Left Column: Story Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Daily Badge & Seal */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-mono text-[11px] font-bold uppercase tracking-widest shadow-xs">
                  <span>✦</span>
                  <span>EXPEDIENTE DEL DÍA</span>
                </span>
                <span className="font-mono text-xs text-stone-400 uppercase tracking-wider">
                  {dateFormatted}
                </span>
                <span className="hidden sm:inline text-stone-600">·</span>
                <span className="font-mono text-xs text-stone-400 uppercase tracking-wider">
                  {article.categoryLabel}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-medium text-stone-50 leading-tight mb-3">
                <Link
                  to={`/historias/${article.slug}`}
                  className="hover:text-amber-300 transition-colors"
                >
                  {article.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="font-sans text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={`/historias/${article.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-mono uppercase tracking-widest font-bold rounded-full transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>Investigar Expediente</span>
                <span>➔</span>
              </Link>

              <button
                type="button"
                onClick={handleSaveToggle}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-full border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  saved
                    ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                    : 'border-stone-700 bg-stone-900/80 text-stone-300 hover:border-stone-500 hover:text-stone-100'
                }`}
                title={saved ? 'Guardado en Mi Expediente' : 'Guardar en Mi Expediente'}
              >
                <span>{saved ? '✓ Guardado' : '🔖 Guardar'}</span>
              </button>

              <span className="text-xs font-mono text-stone-500 pl-2">
                {article.readingTime} de lectura
              </span>
            </div>
          </div>

          {/* Right Column: Visual Cover */}
          <div className="lg:col-span-5">
            <Link
              to={`/historias/${article.slug}`}
              className="block group overflow-hidden rounded-2xl border border-stone-800 shadow-2xl relative aspect-4/3"
            >
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-stone-300">
                <span>DOC. {article.accessionNumber || 'ARC-DAILY'}</span>
                <span className="text-amber-300 font-semibold group-hover:underline">Abrir lectura ➔</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
