import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CategorySlug } from '../types';
import { CATEGORIES, getArticlesByCategory } from '../data/articles';
import { CategoryHeader } from './CategoryHeader';
import { ArticleGrid } from './ArticleGrid';
import { SEOHead } from './SEOHead';

interface CategoryPageProps {
  categorySlug: CategorySlug;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug }) => {
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>('recent');

  const info = CATEGORIES[categorySlug] || CATEGORIES.historias;
  const articles = getArticlesByCategory(categorySlug, { sort: sortOrder });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const navCategories: { slug: CategorySlug; label: string }[] = [
    { slug: 'historias', label: 'Todas las historias' },
    { slug: 'personas', label: 'Personas' },
    { slug: 'acontecimientos', label: 'Acontecimientos' },
    { slug: 'descubrimientos', label: 'Descubrimientos' },
    { slug: 'misterios', label: 'Misterios documentados' },
  ];

  return (
    <div className="w-full py-8 sm:py-12 lg:py-16">
      <SEOHead
        metadata={{
          title: info.name,
          description: info.description,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header */}
        <CategoryHeader
          title={info.name}
          description={info.description}
          accessionPrefix={info.accessionPrefix}
          count={articles.length}
          showBackHome={true}
        />

        {/* Category Switcher Tabs & Date Sorting Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-stone-200">
          
          {/* Categories bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider overflow-x-auto pb-1">
            <span className="text-stone-400 text-[11px] mr-1 hidden sm:inline">Sección:</span>
            {navCategories.map((cat) => {
              const isActive =
                (cat.slug === 'historias' && categorySlug === 'historias') ||
                cat.slug === categorySlug;
              return (
                <Link
                  key={cat.slug}
                  to={cat.slug === 'historias' ? '/historias' : `/${cat.slug}`}
                  className={`px-4 py-1.5 transition-all duration-200 cursor-pointer border rounded-full whitespace-nowrap shadow-2xs ${
                    isActive
                      ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-xs'
                      : 'border-stone-200 bg-white/70 text-stone-600 hover:text-stone-950 hover:border-stone-400 hover:bg-white'
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {/* Date sort toggle control (Recientes vs Antiguos) */}
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-stone-500">
            <span className="font-mono text-xs text-stone-400">⇅</span>
            <span className="text-[11px] uppercase tracking-wider text-stone-400 hidden sm:inline">Orden:</span>
            <div className="inline-flex border border-stone-200 bg-white/80 rounded-full p-0.5 shadow-2xs">
              <button
                onClick={() => setSortOrder('recent')}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                  sortOrder === 'recent'
                    ? 'bg-stone-900 text-stone-50 font-medium shadow-2xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Más recientes
              </button>
              <button
                onClick={() => setSortOrder('oldest')}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                  sortOrder === 'oldest'
                    ? 'bg-stone-900 text-stone-50 font-medium shadow-2xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Más antiguos
              </button>
            </div>
          </div>

        </div>

        {/* Articles Grid */}
        <ArticleGrid
          articles={articles}
          emptyMessage={`No hay expedientes catalogados actualmente en ${info.name}.`}
        />

        {/* Archive Disclaimer Notice */}
        <div className="mt-16 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-stone-500">
          <p>
            Mostrando {articles.length} {articles.length === 1 ? 'expediente' : 'expedientes'} en la sección {info.name}.
          </p>
          <p className="text-stone-400">
            Expedientes verificados mediante cotejo de fuentes primarias y bibliografía de archivo.
          </p>
        </div>

      </div>
    </div>
  );
};
