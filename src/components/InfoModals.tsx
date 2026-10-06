import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { IconClose } from './Icons';

export type InfoModalType = 'about' | 'contact' | 'privacy' | null;

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-4 sm:p-6 pt-12 sm:pt-20 animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-stone-200/90 rounded-3xl shadow-2xl p-6 sm:p-10 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-stone-700">§</span>
            <span className="text-xs uppercase tracking-[0.25em] font-mono font-semibold text-stone-700">
              {type === 'about' && 'SOBRE NOSOTROS'}
              {type === 'contact' && 'CONTACTO & ENVÍO DE EXPEDIENTES'}
              {type === 'privacy' && 'POLÍTICA DE PRIVACIDAD & CONDICIONES'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-950 cursor-pointer rounded-full border border-stone-200 bg-white hover:bg-stone-100"
            aria-label="Cerrar ventana"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {type === 'about' && (
          <div className="space-y-4 text-stone-700 font-sans text-sm sm:text-base leading-relaxed font-light">
            <h3 className="font-editorial text-2xl font-medium text-stone-950 mb-2">
              El Manifiesto de Archivo Inusual
            </h3>
            <p>
              <strong>Archivo Inusual</strong> nace como una publicación editorial independiente dedicada a rescatar del olvido sucesos verídicos, anomalías históricas, diarios de expediciones y biografías singulares que superan cualquier ficción novelesca.
            </p>
            <p>
              Nuestro método curatorial prioriza el contraste documental: cada pieza se fundamenta en actas notariales, correspondencia de la época, hemerotecas desclasificadas y testimonios orales debidamente cotejados.
            </p>
            <p className="font-editorial italic text-stone-900 border-l-2 border-stone-800 bg-[#F5F2EB] p-3 rounded-r-xl">
              «La realidad no necesita ser verosímil; le basta simplemente con haber ocurrido.»
            </p>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4 text-stone-700 font-sans text-sm sm:text-base leading-relaxed font-light">
            <h3 className="font-editorial text-2xl font-medium text-stone-950 mb-2">
              Mesa de Redacción y Enlace de Archivo
            </h3>
            <p>
              Si custodia documentos familiares, cartas inéditas, fotografías de expediciones o testimonios contrastables que ameriten ser investigados por nuestro consejo editorial, puede remitirlos a nuestra secretaría documental.
            </p>
            <div className="bg-[#F5F2EB] p-5 border border-stone-200 rounded-2xl text-xs sm:text-sm font-mono text-stone-800 space-y-1 shadow-2xs">
              <p>Correspondencia: redaccion@archivoinusual.org</p>
              <p>Depósito Documental Central: Archivo Inusual, Sala B-14</p>
              <p>Tiempo estimado de respuesta editorial: 5 a 10 días laborables</p>
            </div>
            <p className="text-xs text-stone-500">
              * Nota: Para envíos de gran volumen o material digitalizado de alta resolución, se ruega incluir un resumen previo y la procedencia de la fuente documental.
            </p>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4 text-stone-700 font-sans text-sm sm:text-base leading-relaxed font-light">
            <h3 className="font-editorial text-2xl font-medium text-stone-950 mb-2">
              Privacidad y Custodia Documental
            </h3>
            <p>
              En <em>Archivo Inusual</em> nos regimos por el principio de minimización de datos: esta publicación no emplea cookies de rastreo publicitario intrusivo ni comercializa información personal con terceros.
            </p>
            <p>
              Los documentos digitalizados y testimonios reproducidos respetan la legislación vigente sobre protección del patrimonio histórico y el derecho a la memoria.
            </p>
            <p className="text-xs text-stone-500 pt-2 border-t border-stone-200">
              Última actualización de la directiva de custodia: Septiembre 2026.
            </p>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-stone-900 text-stone-50 text-xs uppercase tracking-widest font-mono font-medium rounded-full hover:bg-stone-800 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </motion.div>
    </div>
  );
};
