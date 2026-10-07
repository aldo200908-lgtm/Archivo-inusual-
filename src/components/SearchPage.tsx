import React, { useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { IconSearch, IconClose } from './Icons';
import { CategorySlug } from '../types';
import { searchAndFilterArticles, CATEGORIES } from '../data/articles';
import { ArticleGrid } from './ArticleGrid';
import { SEOHead } from './SEOHead';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read URL params
  const query = searchParams.get('q') || '';
  const categoryParam = (searchParams.get('cat') as CategorySlug | 'todas') || 'todas';
  const sortParam = (searchParams.get('sort') as 'recent' | 'oldest' | 'featured') || 'recent';

  // Filtered results (zero hashtags/tags used)
  const results = useMemo(() => {
    return searchAndFilterArticles({
      query,
      category: categoryParam,
      sort: sortParam,
    });
  }, [query, categoryParam, sortParam]);

  // Update URL search parameters cleanly
  const updateParams = (updates: Record<string, string | undefined>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === undefined || val === '' || val === 'todas') {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    setSearchParams(next, { replace: true });
  };

  const handleQueryChange = (val: string) => {
    updateParams({ q: val ? val : undefined });
  };

  const handleClearQuery = () => {
    updateParams({ q: undefined });
  };

  const handleCategoryChange = (cat: CategorySlug | 'todas') => {
    updateParams({ cat: cat === 'todas' ? undefined : cat });
  };

  const handleSortChange = (sort: 'recent' | 'oldest' | 'featured') => {
    updateParams({ sort: sort === 'recent' ? undefined : sort });
  };

  const handleClearAll = () => {
    setSearchParams({}, { replace: true });
  };

  const categoryOptions: { label: string; value: CategorySlug | 'todas' }[] = [
    { label: 'Todas', value: 'todas' },
    { label: 'Historias', value: 'historias' },
    { label: 'Personas', value: 'personas' },
    { label: 'Acontecimientos', value: 'acontecimientos' },
    { label: 'Descubrimientos', value: 'descubrimientos' },
    { label: 'Misterios documentados', value: 'misterios' },
  ];

  const hasActiveFilters = Boolean(query || (categoryParam && categoryParam !== 'todas') || sortParam !== 'recent');

  // Suggested keywords for quick search
  const quickSuggestions = ['twa', 'titanic', 'san juan', 'flannan', 'anticitera', 'tambora', 'bermeja', 'norton'];

  return (
    <div className="w-full py-8 sm:py-12 lg:py-16">
      <SEOHead
        metadata={{
          title: query ? `Búsqueda: "${query}"` : 'Búsqueda y catálogo',
          description: 'Localice expedientes, investigaciones y anomalías documentadas en el catálogo de Archivo Inusual.',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header */}
        <div className="border-b border-stone-200 pb-8 sm:pb-10 mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2 text-xs font-sans uppercase tracking-[0.25em] text-stone-500">
            <span className="font-semibold text-stone-900">ARCHIVO INUSUAL</span>
            <span aria-hidden="true">·</span>
            <span>CATÁLOGO Y BÚSQUEDA</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-950 mb-4">
            Buscador del archivo
          </h1>
          <p className="font-sans text-base sm:text-lg text-stone-600 font-light max-w-2xl leading-relaxed">
            Consulte expedientes por título, personas, lugares o acontecimientos documentados.
          </p>

          {/* Primary Search Input Field with rounded-full */}
          <div className="mt-8 max-w-3xl">
            <div className="relative flex items-center border border-stone-300 bg-white focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10 rounded-full transition-all shadow-xs p-1">
              <label htmlFor="archive-search-input" className="sr-only">
                Buscar en Archivo Inusual
              </label>
              <div className="pl-4 pr-2 text-stone-400">
                <IconSearch className="w-5 h-5" aria-hidden="true" />
              </div>
              <input
                id="archive-search-input"
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Escriba un título, lugar, persona o término (ej. avión, submarino, fuego)..."
                className="w-full py-3 sm:py-3.5 px-2 font-sans text-base sm:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClearQuery}
                  className="p-2 mr-1 text-stone-400 hover:text-stone-900 cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full hover:bg-stone-100"
                  aria-label="Borrar texto de búsqueda"
                >
                  <IconClose className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-stone-500">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 mr-1">Sugerencias:</span>
              {quickSuggestions.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQueryChange(term)}
                  className="px-3 py-1 text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors border border-stone-200/80 rounded-full cursor-pointer text-xs shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Controls Bar (Category & Sorting) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-stone-200">
          
          {/* Categories Segmented Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] font-mono font-semibold text-stone-500 shrink-0">
              Categoría:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono uppercase tracking-wider">
              {/* Direct link to Últimas Publicaciones */}
              <button
                type="button"
                onClick={() => navigate('/ultimas-publicaciones')}
                className="px-3.5 py-1.5 transition-all cursor-pointer border border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-full min-h-[36px] shadow-2xs font-semibold flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Últimas publicaciones</span>
              </button>

              {categoryOptions.map((cat) => {
                const isActive =
                  (cat.value === 'todas' && (categoryParam === 'todas' || !categoryParam)) ||
                  categoryParam === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`px-3.5 py-1.5 transition-all cursor-pointer border rounded-full min-h-[36px] shadow-2xs ${
                      isActive
                        ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-xs'
                        : 'border-stone-200 bg-white/70 text-stone-600 hover:text-stone-950 hover:border-stone-400 hover:bg-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-start lg:self-auto text-xs font-mono text-stone-600">
            <span className="font-mono text-xs text-stone-400">⇅</span>
            <span className="uppercase tracking-wider text-[11px] text-stone-400">Orden:</span>
            <div className="inline-flex border border-stone-200 bg-white/80 rounded-full p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => handleSortChange('recent')}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                  sortParam === 'recent'
                    ? 'bg-stone-900 text-stone-50 font-medium shadow-2xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Más recientes
              </button>
              <button
                type="button"
                onClick={() => handleSortChange('oldest')}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                  sortParam === 'oldest'
                    ? 'bg-stone-900 text-stone-50 font-medium shadow-2xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Más antiguos
              </button>
              <button
                type="button"
                onClick={() => handleSortChange('featured')}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                  sortParam === 'featured'
                    ? 'bg-stone-900 text-stone-50 font-medium shadow-2xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                Destacados
              </button>
            </div>
          </div>

        </div>

        {/* Current State Summary Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-10 border-b border-stone-200">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-stone-950">
              {query ? (
                <>
                  Resultados para: <span className="italic font-normal">«{query}»</span>
                </>
              ) : (
                'Catálogo general de expedientes'
              )}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-500 mt-1">
              {results.length} {results.length === 1 ? 'historia encontrada' : 'historias encontradas'}
              {categoryParam !== 'todas' && CATEGORIES[categoryParam] && (
                <span> en la sección {CATEGORIES[categoryParam].name}</span>
              )}
            </p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider text-stone-600 hover:text-stone-950 border border-stone-200 hover:border-stone-400 bg-white transition-colors cursor-pointer self-start sm:self-auto min-h-[36px]"
            >
              <span className="font-mono text-sm leading-none">↺</span>
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Results Grid or Empty State */}
        {results.length > 0 ? (
          <ArticleGrid articles={results} />
        ) : (
          <div className="border border-stone-300 bg-white p-8 sm:p-14 text-center max-w-2xl mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-600">
              <IconSearch className="w-6 h-6" />
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-stone-950 mb-3">
              No encontramos historias relacionadas con tu búsqueda.
            </h3>

            <p className="font-sans text-sm sm:text-base text-stone-600 font-light leading-relaxed mb-6 max-w-lg mx-auto">
              No se han localizado registros que coincidan con «<strong className="text-stone-900">{query}</strong>». Compruebe la ortografía o intente con términos más amplios.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClearAll}
                className="px-5 py-2.5 bg-stone-950 text-stone-50 text-xs uppercase tracking-widest font-sans font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Restablecer todos los filtros
              </button>
              <Link
                to="/historias"
                className="px-5 py-2.5 border border-stone-300 text-stone-800 text-xs uppercase tracking-widest font-sans font-medium hover:border-stone-900 transition-colors"
              >
                Ver todas las historias
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
