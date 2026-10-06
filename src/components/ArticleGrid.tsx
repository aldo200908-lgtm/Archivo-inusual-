import React from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  emptyMessage?: string;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  emptyMessage = 'No se encontraron expedientes en esta sección.',
}) => {
  if (articles.length === 0) {
    return (
      <div className="py-16 text-center border-y border-stone-200 bg-[#F5F2EB]/50">
        <p className="font-editorial text-xl text-stone-700 italic mb-2">
          {emptyMessage}
        </p>
        <p className="text-xs uppercase tracking-widest font-sans text-stone-400">
          Archivo Inusual · Fondo en catalogación
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
