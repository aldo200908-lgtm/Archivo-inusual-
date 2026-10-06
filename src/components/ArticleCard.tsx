import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { getArticleViews } from '../data/viewsTracker';
import { IconArrowUpRight } from './Icons';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const views = getArticleViews(article.slug);

  return (
    <article className="group flex flex-col justify-between bg-white/80 hover:bg-white border border-stone-200/90 hover:border-stone-400 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
      <div>
        {/* Rounded Cover Visual with Fluid Zoom */}
        <Link
          to={`/historias/${article.slug}`}
          className="block relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-200 mb-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-stone-900"
          aria-label={`Leer: ${article.title}`}
        >
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-[12%] group-hover:grayscale-0 group-hover:scale-108 transition-all duration-700 ease-out"
          />
          {/* Subtle Category Pill Badge on Image */}
          <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-stone-50 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs transition-transform duration-300 group-hover:scale-105">
            {article.categoryLabel}
          </div>
        </Link>

        {/* Read time & Accession info */}
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-2">
          <span>{article.readingTime}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>15 Capítulos</span>
        </div>

        {/* Article Title */}
        <h3 className="font-editorial text-xl lg:text-[1.35rem] font-medium text-stone-950 leading-snug group-hover:text-stone-750 transition-colors duration-200 mb-2.5 text-balance">
          <Link to={`/historias/${article.slug}`} className="focus-visible:outline-hidden focus-visible:underline">
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-light line-clamp-3 mb-4">
          {article.excerpt}
        </p>
      </div>

      {/* Card Footer: Date, Views & Rounded Action Button */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-sans text-stone-400">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span>{article.date}</span>
          <span aria-hidden="true" className="text-stone-200">·</span>
          <span className="text-stone-500">
            {views.toLocaleString()} lecturas
          </span>
        </div>

        <Link
          to={`/historias/${article.slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-100 group-hover:bg-stone-950 text-stone-700 group-hover:text-stone-50 font-mono text-[11px] font-medium transition-all duration-250 cursor-pointer shadow-2xs group-hover:shadow-xs group-hover:scale-105 active:scale-95"
        >
          <span className="uppercase tracking-wider">Leer</span>
          <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
};
