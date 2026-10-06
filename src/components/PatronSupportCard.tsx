import React from 'react';

interface PatronSupportCardProps {
  variant?: 'article-footer' | 'compact' | 'sidebar';
}

export const PatronSupportCard: React.FC<PatronSupportCardProps> = ({ variant = 'article-footer' }) => {
  const kofiUrl = 'https://ko-fi.com/aldopaz';

  if (variant === 'compact') {
    return (
      <a
        href={kofiUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-mono tracking-wider rounded-full transition-all shadow-xs hover:shadow-md"
      >
        <span className="text-amber-300 font-bold text-sm">☕</span>
        <span>Apoyar el Archivo (desde $1)</span>
      </a>
    );
  }

  return (
    <aside
      className="my-12 border-2 border-stone-900/90 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
      aria-label="Fondo de Mecenazgo del Archivo"
    >
      {/* Decorative Stamp Watermark */}
      <div className="absolute right-4 -bottom-6 pointer-events-none opacity-[0.04] select-none text-stone-900 font-editorial text-9xl font-bold">
        1900
      </div>

      {/* Header Tagline */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-200 text-[11px] font-mono uppercase tracking-[0.25em] text-stone-500">
        <span className="flex items-center gap-2 font-semibold text-stone-900">
          <span className="text-rose-600 font-bold text-sm">♥</span>
          FONDO EDITORIAL DE ARCHIVO INUSUAL
        </span>
        <span className="text-stone-400">INVESTIGACIÓN INDEPENDIENTE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Message */}
        <div className="md:col-span-8">
          <h3 className="font-editorial text-xl sm:text-2xl font-medium text-stone-950 mb-2 leading-snug">
            Ayuda a preservar este archivo libre de muros de pago
          </h3>
          <p className="font-sans text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-3">
            Localizar actas oficiales, traducir cuadernos de bitácora y catalogar cada expediente en 15 capítulos detallados requiere cientos de horas de documentación sin grandes corporaciones detrás.
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-stone-500">
            <span className="flex items-center gap-1 text-emerald-800">
              <span className="font-bold">✓</span>
              Acceso 100% abierto
            </span>
            <span>·</span>
            <span>Contribución directa sin intermediarios</span>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center gap-2">
          <a
            href={kofiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-stone-950 hover:bg-stone-800 text-stone-50 text-xs font-mono uppercase tracking-widest font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer group"
          >
            <span className="text-amber-300 font-bold text-sm">☕</span>
            <span>Invitar un café (desde $1)</span>
            <span className="opacity-60 text-xs">→</span>
          </a>

          <span className="text-[10px] font-mono text-stone-400 text-center md:text-right">
            Vía Ko-fi seguro (PayPal o Tarjeta)
          </span>
        </div>

      </div>
    </aside>
  );
};
