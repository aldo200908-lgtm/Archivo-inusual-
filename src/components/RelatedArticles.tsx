import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';
import { getRandomArticle } from '../services/retentionService';

interface RelatedArticlesProps {
  articles: Article[];
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
  const navigate = useNavigate();
  if (!articles || articles.length === 0) return null;

  const handleRandom = () => {
    const random = getRandomArticle();
    navigate(`/historias/${random.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full border-t border-stone-200 mt-16 sm:mt-24 pt-12 sm:pt-16 bg-[#F5F2EB]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-amber-800 block mb-1">
              CONTINUIDAD DE INVESTIGACIÓN · MADRIGUERA DE CONEJO
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-stone-950 mb-1">
              Si este caso te atrapó, continúa aquí:
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 font-light">
              Tres expedientes complementarios seleccionados por coincidencia cronológica y análisis pericial.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRandom}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 text-stone-800 text-xs font-mono uppercase tracking-wider transition-all shadow-2xs hover:shadow-xs cursor-pointer shrink-0"
          >
            <span>🎲 Expediente Inesperado</span>
            <span>➔</span>
          </button>
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
