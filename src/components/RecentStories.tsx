import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Article, CategorySlug } from '../types';
import { ArticleCard } from './ArticleCard';
import { motion, AnimatePresence } from 'motion/react';
import { IconArrowRight } from './Icons';

interface RecentStoriesProps {
  articles: Article[];
}

export const RecentStories: React.FC<RecentStoriesProps> = ({ articles }) => {
  const [selectedFilter, setSelectedFilter] = useState<CategorySlug | 'todas'>('todas');

  const filterTabs: { label: string; value: CategorySlug | 'todas' }[] = [
    { label: 'Todas las historias', value: 'todas' },
    { label: 'Personas', value: 'personas' },
    { label: 'Acontecimientos', value: 'acontecimientos' },
    { label: 'Descubrimientos', value: 'descubrimientos' },
    { label: 'Misterios', value: 'misterios' },
  ];

  const filtered = selectedFilter === 'todas'
    ? articles
    : articles.filter((a) => a.category === selectedFilter);

  return (
    <section id="ultimas-historias" className="w-full border-b border-stone-200 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Editorial Title & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-10 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-stone-900 rounded-full inline-block" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono font-semibold text-stone-500">
                REGISTRO RECIENTE
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-stone-950">
              Últimas historias
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 font-light mt-1 max-w-md">
              Catálogo cronológico de expedientes contrastados y desclasificados.
            </p>
          </div>

          {/* Interactive filter tabs with rounded pill design */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/ultimas-publicaciones"
              className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer border border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5 font-semibold shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Últimas publicaciones</span>
            </Link>
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedFilter(tab.value)}
                  className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-xs'
                      : 'border-stone-200 bg-white/70 text-stone-600 hover:text-stone-950 hover:border-stone-400 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stories Grid: 6 Demonstration Articles in Rounded Cards with fluid transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filtered.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all stories link with rounded pill button */}
        <div className="mt-14 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-stone-500">
          <p>
            Mostrando 6 expedientes seleccionados de la colección continua.
          </p>
          <Link
            to="/historias"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-900 text-stone-950 hover:bg-stone-900 hover:text-stone-50 transition-all uppercase tracking-widest text-xs font-mono font-medium shadow-xs hover:shadow-sm cursor-pointer"
          >
            <span>Ver catálogo completo</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
