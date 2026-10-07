import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getReadSlugs,
  getRankProgress,
  RESEARCH_TRAILS,
  RESEARCHER_RANKS,
} from '../services/retentionService';
import { IconClose } from './Icons';

interface ResearcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearcherModal: React.FC<ResearcherModalProps> = ({ isOpen, onClose }) => {
  const [readSlugs, setReadSlugs] = useState<string[]>([]);

  const loadData = () => {
    setReadSlugs(getReadSlugs());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener('read_articles_updated', handleUpdate);
    return () => window.removeEventListener('read_articles_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const readCount = readSlugs.length;
  const { currentRank, nextRank, percent } = getRankProgress(readCount);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF8F5] border border-stone-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="researcher-title"
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200/80 bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-stone-950 text-stone-100 flex items-center justify-center text-lg shadow-sm border border-stone-800">
              {currentRank.badge}
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block">
                CREDENCIAL PERICIAL DEL ARCHIVO
              </span>
              <h2 id="researcher-title" className="font-editorial text-xl sm:text-2xl font-medium text-stone-950">
                Ficha del Investigador
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-950 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Cerrar credencial"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Official Credential Badge (Physical Card Look) */}
          <div className={`p-5 sm:p-6 rounded-2xl border-2 ${currentRank.sealColor} relative overflow-hidden shadow-xs`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-70 block mb-1">
                  NIVEL PERICIAL {currentRank.level} DE {RESEARCHER_RANKS.length}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
                  {currentRank.badge} {currentRank.title}
                </h3>
              </div>

              {/* Stamp effect */}
              <div className="border border-current px-3 py-1.5 rounded-lg text-center font-mono text-[10px] uppercase tracking-widest shrink-0 opacity-80 rotate-1">
                REGISTRO OFICIAL · NO. ARC-INV-{String(readCount + 1042).padStart(6, '0')}
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm font-light opacity-90 leading-relaxed mb-5">
              {currentRank.description}
            </p>

            {/* Progress to next rank */}
            <div className="bg-black/5 p-3.5 rounded-xl border border-black/10">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="font-semibold">
                  Progreso: {readCount} {readCount === 1 ? 'expediente leído' : 'expedientes leídos'}
                </span>
                {nextRank ? (
                  <span className="opacity-80">
                    Siguiente rango: {nextRank.title} ({nextRank.minReads} lecturas)
                  </span>
                ) : (
                  <span className="text-amber-700 font-bold">¡Rango máximo alcanzado!</span>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-stone-900 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Rutas de Investigación Curadas (Themed Trails) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block">
                  ITINERARIOS DOCUMENTALES
                </span>
                <h4 className="font-editorial text-lg sm:text-xl font-medium text-stone-950">
                  Rutas de Investigación Recomendadas
                </h4>
              </div>
              <span className="text-xs font-mono text-stone-500 hidden sm:inline">
                4 itinerarios periciales
              </span>
            </div>

            <p className="font-sans text-xs text-stone-600 font-light mb-4">
              Sigue estas rutas temáticas seleccionadas para profundizar en los enigmas más emblemáticos del archivo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESEARCH_TRAILS.map((trail) => {
                const completedInTrail = trail.articleSlugs.filter((s) => readSlugs.includes(s)).length;
                const trailPercent = Math.round((completedInTrail / trail.articleSlugs.length) * 100);

                return (
                  <div
                    key={trail.id}
                    className="p-4 rounded-2xl border border-stone-200/90 bg-white/70 hover:bg-white hover:border-stone-400 transition-all shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold">
                          {trail.subtitle}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
                          {completedInTrail}/{trail.articleSlugs.length} ({trailPercent}%)
                        </span>
                      </div>

                      <h5 className="font-editorial text-base font-semibold text-stone-950 mb-1 flex items-center gap-1.5">
                        <span>{trail.badge}</span>
                        <span>{trail.title}</span>
                      </h5>

                      <p className="font-sans text-xs text-stone-600 font-light leading-relaxed mb-3">
                        {trail.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <Link
                        to={`/historias/${trail.articleSlugs[0]}`}
                        onClick={onClose}
                        className="text-xs font-mono text-stone-900 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Comenzar ruta</span>
                        <span>➔</span>
                      </Link>
                      <span className="text-[11px] font-sans text-stone-400">
                        {trail.articleSlugs.length} expedientes
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100/70 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500 font-sans">
          <span>El progreso de lectura se calcula automáticamente al examinar los expedientes.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 text-stone-50 rounded-full font-mono text-[11px] hover:bg-stone-800 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
