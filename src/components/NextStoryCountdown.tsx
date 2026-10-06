import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types/index';
import { getRelatedArticles, getAllArticles } from '../data/articles';
import { IconArrowRight } from './Icons';

interface NextStoryCountdownProps {
  currentArticle: Article;
}

export const NextStoryCountdown: React.FC<NextStoryCountdownProps> = ({ currentArticle }) => {
  // Memoize next candidate calculation
  const nextCandidate = useMemo(() => {
    const all = getAllArticles();
    const related = getRelatedArticles(currentArticle.slug, 1);
    const currentIndex = all.findIndex((a) => a.slug === currentArticle.slug);
    return related[0] || (currentIndex >= 0 && all[(currentIndex + 1) % all.length]) || all[0];
  }, [currentArticle.slug]);

  if (!nextCandidate || nextCandidate.slug === currentArticle.slug) {
    return null;
  }

  return (
    <aside
      className="my-14 border-2 border-stone-900/90 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
      aria-label="Siguiente expediente en cola"
    >
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] font-semibold text-stone-900">
              EXPEDIENTE FINALIZADO (CAPÍTULO 15)
            </span>
            <span className="bg-stone-900 text-stone-50 text-[10px] font-mono px-3 py-1 uppercase tracking-wider font-semibold rounded-full">
              Recomendación de Archivo
            </span>
          </div>
          <h3 className="font-editorial text-lg sm:text-xl font-medium text-stone-950">
            Siguiente investigación desclasificada en cola
          </h3>
        </div>

        <div className="text-xs font-mono text-stone-500">
          Archivo Inusual · Catálogo Continuo
        </div>
      </div>

      {/* Preview Card of Next Story */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        
        {/* Cover image with rounded corners */}
        <Link
          to={`/historias/${nextCandidate.slug}`}
          className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-stone-200 rounded-2xl border border-stone-300 block group shadow-2xs"
        >
          <img
            src={nextCandidate.coverImage}
            alt={nextCandidate.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Story details */}
        <div className="sm:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
              <span className="font-semibold text-stone-900 px-2.5 py-0.5 bg-stone-200/70 rounded-full">{nextCandidate.categoryLabel}</span>
              <span>·</span>
              <span>{nextCandidate.readingTime}</span>
              <span>·</span>
              <span>15 Capítulos</span>
            </div>

            <h4 className="font-editorial text-xl sm:text-2xl text-stone-950 hover:text-stone-700 transition-colors font-medium mb-2 leading-snug">
              <Link to={`/historias/${nextCandidate.slug}`}>
                {nextCandidate.title}
              </Link>
            </h4>

            <p className="font-sans text-sm text-stone-600 line-clamp-2 font-light leading-relaxed mb-4">
              {nextCandidate.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={`/historias/${nextCandidate.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3 bg-stone-950 text-stone-50 text-xs font-mono uppercase tracking-widest font-semibold rounded-full hover:bg-stone-800 transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>Abrir expediente ahora</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/historias"
              className="inline-flex items-center gap-1.5 px-5 py-3 border border-stone-300 bg-white text-stone-700 hover:text-stone-950 hover:border-stone-500 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
            >
              <span>Ver catálogo completo →</span>
            </Link>
          </div>
        </div>

      </div>

    </aside>
  );
};
