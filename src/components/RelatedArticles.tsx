import React from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface RelatedArticlesProps {
  articles: Article[];
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="w-full border-t border-stone-200 mt-16 sm:mt-24 pt-12 sm:pt-16 bg-[#F5F2EB]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-6 mb-8 border-b border-stone-200">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-stone-500 block mb-1">
              CONTINUIDAD DE LECTURA
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-stone-950">
              También podría interesarte
            </h2>
          </div>
          <span className="text-xs font-sans text-stone-500">
            3 expedientes relacionados del archivo
          </span>
        </div>

        {/* 3 Related Articles Grid with balanced gaps for rounded cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

      </div>
    </section>
  );
};
