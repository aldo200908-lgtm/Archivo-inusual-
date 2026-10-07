import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { IconSearch, IconClose, IconArrowUpRight } from './Icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? articles.slice(0, 4)
    : articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.categoryLabel.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(q))) ||
          (a.accessionNumber && a.accessionNumber.toLowerCase().includes(q))
        );
      });

  const handleSelect = (slug: string) => {
    onClose();
    navigate(`/historias/${slug}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-[#FAF8F5] border border-stone-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-stone-200 gap-3">
          <IconSearch className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, lugar, persona o categoría..."
            className="w-full bg-transparent font-sans text-base sm:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 cursor-pointer p-1 rounded-full hover:bg-stone-200/50"
            >
              <IconClose className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] uppercase tracking-wider font-mono text-stone-500 hover:text-stone-900 px-2.5 py-1 border border-stone-200 bg-white rounded-full cursor-pointer shadow-2xs"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-400 mb-3 px-2">
            {query.trim() === '' ? 'Expedientes sugeridos' : `${filtered.length} resultados encontrados`}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-sans text-sm">
              <p>No se encontraron expedientes para «{query}».</p>
              <p className="text-xs text-stone-400 mt-1">
                Prueba buscando términos como «pueblo», «inventor», «mapa» o «demostración».
              </p>
            </div>
          ) : (
            filtered.map((article) => (
              <div
                key={article.id}
                onClick={() => handleSelect(article.slug)}
                className="py-3 px-3 group cursor-pointer hover:bg-stone-200/60 rounded-xl transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 shrink-0 overflow-hidden bg-stone-200 rounded-lg shadow-2xs">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[20%]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                      <span className="text-stone-700 font-medium">{article.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <h4 className="font-editorial text-base sm:text-lg font-medium text-stone-950 group-hover:text-stone-700 transition-colors">
                      {article.title}
                    </h4>
                  </div>
                </div>

                <IconArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer info in search */}
        <div className="px-6 py-3 bg-[#F5F2EB] border-t border-stone-200 text-[11px] text-stone-500 font-sans flex items-center justify-between">
          <span>Archivo Inusual · Buscador de hemeroteca y expedientes</span>
          <span className="hidden sm:inline">Presiona ESC para salir</span>
        </div>
      </motion.div>
    </div>
  );
};
