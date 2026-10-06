import React, { useEffect, useRef } from 'react';
import { IconExternal } from './Icons';

interface InArticleAdProps {
  slotId?: string;
  variant?: 'mid-article-1' | 'mid-article-2';
}

export const InArticleAd: React.FC<InArticleAdProps> = ({ slotId = 'ad-mid', variant = 'mid-article-1' }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only attempt in production if external ad script is available
    if (typeof window !== 'undefined' && window.location.hostname.includes('archivoinusual.vercel.app')) {
      // Production container check
    }
  }, []);

  return (
    <aside
      className="my-10 border border-stone-300/80 bg-[#FAF8F5] p-4 sm:p-5 text-center shadow-xs rounded-2xl"
      aria-label="Contenido Patrocinado"
    >
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-2 mb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500">
        <span className="flex items-center gap-1.5 font-semibold text-stone-700">
          <span className="font-serif italic font-bold">§</span>
          FONDO PATROCINADO DEL ARCHIVO
        </span>
        <span>ESPACIO CULTURAL & DOCUMENTAL</span>
      </div>

      <div
        ref={adContainerRef}
        id={`adsterra-native-${slotId}`}
        className="min-h-[90px] flex flex-col items-center justify-center p-3 bg-white border border-stone-200 rounded-xl"
      >
        <p className="font-editorial text-sm sm:text-base text-stone-800 font-medium max-w-md mx-auto leading-snug mb-1">
          {variant === 'mid-article-1'
            ? 'Acceso a Fondos Documentales, Hemerotecas y Archivos Históricos Digitalizados'
            : 'Preservación de Crónicas Contrastadas, Enigmas y Manuscritos Históricos'}
        </p>
        <p className="font-sans text-xs text-stone-500 font-light max-w-sm mx-auto mb-3">
          Este expediente forma parte del proyecto de catalogación de acceso abierto respaldado por la comunidad.
        </p>
        <a
          href="https://archivoinusual.vercel.app/historias"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-[11px] font-mono uppercase tracking-wider font-semibold rounded-full transition-colors cursor-pointer"
        >
          <span>Explorar Más Expedientes</span>
          <IconExternal className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
