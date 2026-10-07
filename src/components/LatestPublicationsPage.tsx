import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../data/articles';
import { SEOHead } from './SEOHead';
import { Article } from '../types';
import { IconArrowUpRight, IconClock, IconCalendar } from './Icons';

// Format relative time helper in natural Spanish
function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recién publicado';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // If future or just now (within 60 seconds)
    if (diffMs < 60 * 1000 && diffMs >= 0) {
      return 'Publicado hace unos momentos';
    }

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60 && diffMinutes > 0) {
      return `Publicado hace ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
    }
    if (diffHours < 24 && diffHours > 0) {
      return `Publicado hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    }
    if (diffDays === 1) {
      return 'Publicado ayer';
    }
    if (diffDays < 30) {
      return `Publicado hace ${diffDays} días`;
    }

    // Fallback to formatted date
    return `Publicado el ${date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  } catch {
    return 'Publicado recientemente';
  }
}

function formatPublishTime(dateString: string): string | null {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return null;
  }
}

export const LatestPublicationsPage: React.FC = () => {
  const articles = useMemo(() => getAllArticles({ sort: 'recent' }), []);

  // Main featured latest story (the very latest real item)
  const latestStory: Article | undefined = articles[0];

  // Next 10 latest stories (from index 1 to 10)
  const recentList: Article[] = useMemo(() => articles.slice(1, 11), [articles]);

  return (
    <div className="w-full py-8 sm:py-12 lg:py-16 bg-[#FAF8F5]">
      <SEOHead
        metadata={{
          title: 'Últimas publicaciones · Archivo Inusual',
          description: 'Consulta las historias e investigaciones más recientes publicadas en el catálogo de Archivo Inusual.',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <header className="border-b border-stone-300 pb-8 sm:pb-10">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.25em] text-stone-500">
            <span className="font-semibold text-stone-900">ARCHIVO INUSUAL</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-700 font-semibold">ACTUALIZACIÓN EN VIVO</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-950 mb-3">
            Últimas publicaciones
          </h1>
          <p className="font-sans text-base sm:text-lg text-stone-600 font-light max-w-2xl leading-relaxed">
            Las historias más recientes publicadas en Archivo Inusual.
          </p>
        </header>

        {/* 1. ÚLTIMA PUBLICACIÓN (Tarjeta destacada) */}
        {latestStory && (
          <section aria-labelledby="latest-story-heading" className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 id="latest-story-heading" className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-stone-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true"></span>
                Última publicación realizada
              </h2>
              <span className="text-xs font-mono text-stone-500">Expediente #{latestStory.accessionNumber}</span>
            </div>

            <article className="border border-stone-300 bg-white shadow-sm hover:shadow-md transition-shadow rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Cover Image */}
              <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-stone-200">
                <img
                  src={latestStory.coverImage}
                  alt={latestStory.title}
                  className="w-full h-full object-cover grayscale-[15%] hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-xs backdrop-blur-xs">
                  {latestStory.categoryLabel}
                </div>
              </div>

              {/* Story Content */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Meta Bar: Rel Time, Date, Clock */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200/60">
                      <IconClock className="w-3.5 h-3.5" />
                      {formatRelativeTime(latestStory.publishedAt)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 text-stone-600">
                      <IconCalendar className="w-3.5 h-3.5 text-stone-400" />
                      {latestStory.date}
                    </span>
                    {formatPublishTime(latestStory.publishedAt) && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{formatPublishTime(latestStory.publishedAt)} hrs</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl lg:text-3xl font-medium text-stone-950 leading-tight">
                    <Link to={`/historias/${latestStory.slug}`} className="hover:text-stone-700 transition-colors">
                      {latestStory.title}
                    </Link>
                  </h3>

                  {latestStory.subtitle && (
                    <p className="font-sans text-xs sm:text-sm font-mono uppercase tracking-wider text-stone-500">
                      {latestStory.subtitle}
                    </p>
                  )}

                  <p className="font-sans text-sm sm:text-base text-stone-600 line-clamp-3 leading-relaxed">
                    {latestStory.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                  <span className="text-xs font-mono text-stone-400">
                    Lectura: {latestStory.readingTime}
                  </span>

                  <Link
                    to={`/historias/${latestStory.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                  >
                    <span>Leer historia</span>
                    <IconArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* 2. LISTA DE ÚLTIMAS HISTORIAS */}
        <section aria-labelledby="recent-list-heading" className="space-y-6 pt-4">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
            <h2 id="recent-list-heading" className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-stone-900">
              Historial de publicaciones recientes
            </h2>
            <span className="text-xs font-mono text-stone-500">Orden cronológico inverso</span>
          </div>

          {recentList.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-sans text-sm bg-white border border-stone-200 p-6">
              No hay historias adicionales en el historial reciente.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {recentList.map((story, index) => (
                <article
                  key={story.id}
                  className="bg-white border border-stone-300 rounded-sm overflow-hidden flex flex-col justify-between hover:border-stone-400 transition-all shadow-2xs group"
                >
                  <div className="grid grid-cols-12 gap-4 p-4 sm:p-5">
                    {/* Thumbnail */}
                    <div className="col-span-4 relative aspect-4/3 overflow-hidden bg-stone-200 rounded-xs">
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1 left-1 bg-stone-950/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-xs">
                        #{index + 2}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="col-span-8 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-stone-500">
                          <span className="text-stone-700 font-medium uppercase tracking-wider">{story.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">
                            {formatRelativeTime(story.publishedAt)}
                          </span>
                        </div>

                        <h3 className="font-editorial text-base sm:text-lg font-medium text-stone-950 leading-snug group-hover:text-stone-700 transition-colors line-clamp-2">
                          <Link to={`/historias/${story.slug}`}>
                            {story.title}
                          </Link>
                        </h3>

                        <p className="font-sans text-xs text-stone-600 line-clamp-2">
                          {story.excerpt}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
                        <span>{story.date}</span>
                        <Link
                          to={`/historias/${story.slug}`}
                          className="inline-flex items-center gap-1 text-stone-900 font-medium hover:underline decoration-stone-400"
                        >
                          <span>Leer</span>
                          <IconArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Footer Navigation Back to Main Archive */}
        <div className="pt-8 border-t border-stone-200 flex justify-center">
          <Link
            to="/historias"
            className="px-6 py-3 bg-stone-900 text-stone-50 text-xs font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors shadow-xs"
          >
            Explorar todo el archivo histórico
          </Link>
        </div>
      </div>
    </div>
  );
};
