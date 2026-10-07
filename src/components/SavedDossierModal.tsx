import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { getSavedArticles, toggleSaveArticle } from '../services/retentionService';
import { IconClose, IconArrowLeft } from './Icons';

interface SavedDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedDossierModal: React.FC<SavedDossierModalProps> = ({ isOpen, onClose }) => {
  const [savedList, setSavedList] = useState<Article[]>([]);

  const loadSaved = () => {
    setSavedList(getSavedArticles());
  };

  useEffect(() => {
    if (isOpen) {
      loadSaved();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      loadSaved();
    };
    window.addEventListener('saved_articles_updated', handleUpdate);
    return () => window.removeEventListener('saved_articles_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-stone-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-dossier-title"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200/80 bg-white/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-sm shadow-2xs font-mono font-bold">
              📑
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-500 block">
                CARPETA PERSONAL DE INVESTIGACIÓN
              </span>
              <h2 id="saved-dossier-title" className="font-editorial text-xl sm:text-2xl font-medium text-stone-950">
                Mi Expediente ({savedList.length})
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-950 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3 divide-y divide-stone-200/60">
          {savedList.length === 0 ? (
            <div className="py-12 text-center max-w-md mx-auto">
              <span className="text-3xl block mb-3">🗂️</span>
              <h3 className="font-editorial text-lg text-stone-900 mb-2">
                Aún no tienes historias guardadas
              </h3>
              <p className="font-sans text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-6">
                Haz clic en el icono de marcador (🔖) en cualquier artículo o ficha para archivarlo aquí y continuar tu lectura cuando quieras, sin necesidad de registro.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-stone-50 text-xs font-mono uppercase tracking-wider rounded-full hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
              >
                <span>Explorar el Archivo</span>
              </button>
            </div>
          ) : (
            savedList.map((article) => (
              <div key={article.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4 group">
                <Link
                  to={`/historias/${article.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-stone-200 shrink-0 group-hover:scale-102 transition-transform"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold block mb-0.5">
                      {article.categoryLabel} · {article.readingTime}
                    </span>
                    <h4 className="font-editorial text-sm sm:text-base font-medium text-stone-950 group-hover:text-stone-700 transition-colors truncate">
                      {article.title}
                    </h4>
                    <p className="font-sans text-xs text-stone-500 font-light line-clamp-1 mt-0.5">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => toggleSaveArticle(article.slug)}
                  className="p-2 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors cursor-pointer shrink-0"
                  title="Eliminar de mi expediente"
                  aria-label="Eliminar de mi expediente"
                >
                  <span className="text-xs font-mono font-bold">✕</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedList.length > 0 && (
          <div className="p-4 bg-stone-100/70 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500 font-sans">
            <span>Tus historias guardadas se conservan en este dispositivo.</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-900 text-stone-50 rounded-full font-mono text-[11px] hover:bg-stone-800 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
