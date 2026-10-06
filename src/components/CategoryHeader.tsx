import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from './Icons';

interface CategoryHeaderProps {
  title: string;
  description: string;
  accessionPrefix?: string;
  count?: number;
  showBackHome?: boolean;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  description,
  accessionPrefix,
  count,
  showBackHome = true,
}) => {
  return (
    <header className="border-b border-stone-200 pb-8 sm:pb-12 mb-10 sm:mb-14">
      {/* Top breadcrumb & accession index */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-stone-500 uppercase tracking-[0.2em] mb-4 sm:mb-6">
        {showBackHome ? (
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200 bg-white/70 hover:bg-white text-stone-700 hover:text-stone-950 transition-all shadow-2xs cursor-pointer font-mono text-[11px]"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </Link>
        ) : (
          <span className="font-semibold text-stone-900">ARCHIVO INUSUAL</span>
        )}

        {accessionPrefix && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-stone-400">
              SECCIÓN: {accessionPrefix}
            </span>
            {typeof count === 'number' && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{count} {count === 1 ? 'expediente' : 'expedientes'}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Main Title & Curatorial Deck */}
      <div className="max-w-3xl">
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-950 leading-tight mb-4 text-balance">
          {title}
        </h1>
        <p className="font-sans text-base sm:text-lg text-stone-600 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </header>
  );
};
