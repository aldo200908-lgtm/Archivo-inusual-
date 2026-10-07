import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface InlineDossierCalloutProps {
  relatedArticle: Article;
}

export const InlineDossierCallout: React.FC<InlineDossierCalloutProps> = ({ relatedArticle }) => {
  if (!relatedArticle) return null;

  return (
    <aside className="my-10 sm:my-12 p-5 sm:p-6 bg-[#F6F3EB] border border-stone-300/80 rounded-2xl shadow-xs transition-all hover:border-stone-500/70 group">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] font-semibold text-amber-900">
          EXPEDIENTE VINCULADO · CONEXIÓN PERICIAL
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
        <Link
          to={`/historias/${relatedArticle.slug}`}
          className="shrink-0 overflow-hidden rounded-xl border border-stone-200/90 shadow-2xs w-full sm:w-28 sm:h-28 aspect-16/9 sm:aspect-square"
        >
          <img
            src={relatedArticle.coverImage}
            alt={relatedArticle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-1">
            {relatedArticle.categoryLabel} · {relatedArticle.readingTime}
          </span>
          <Link
            to={`/historias/${relatedArticle.slug}`}
            className="block font-editorial text-lg sm:text-xl font-medium text-stone-950 group-hover:text-stone-700 transition-colors leading-snug mb-1.5"
          >
            {relatedArticle.title}
          </Link>
          <p className="font-sans text-xs sm:text-sm text-stone-600 font-light line-clamp-2 leading-relaxed">
            {relatedArticle.excerpt}
          </p>
        </div>

        <Link
          to={`/historias/${relatedArticle.slug}`}
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-stone-950 text-stone-50 text-xs font-mono uppercase tracking-wider rounded-full hover:bg-stone-800 transition-all shadow-2xs group-hover:shadow-md cursor-pointer whitespace-nowrap self-end sm:self-center"
        >
          <span>Examinar</span>
          <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
        </Link>
      </div>
    </aside>
  );
};
