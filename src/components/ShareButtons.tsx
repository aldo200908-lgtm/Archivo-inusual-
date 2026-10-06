import React, { useState } from 'react';
import { IconShare, IconCheck } from './Icons';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const [fbNotice, setFbNotice] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`«${title}» — Archivo Inusual\n`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`«${title}» en Archivo Inusual: ${shareUrl}`);
    const waUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = async () => {
    const shareText = `🔥 «${title}»\n\nDescubre el expediente documental completo en:\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      // clipboard fallback
    }
    setFbNotice(true);
    setTimeout(() => setFbNotice(false), 4000);

    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer,width=626,height=436');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-stone-600">
      <span className="uppercase tracking-[0.2em] font-semibold text-stone-400 text-[11px] flex items-center gap-1.5">
        <IconShare className="w-3.5 h-3.5" />
        Compartir:
      </span>

      {/* Facebook Feed Button */}
      <button
        onClick={handleFacebookShare}
        className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#1877F2]/40 hover:border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-full transition-all cursor-pointer bg-white/80 shadow-2xs font-mono text-[11px]"
        title="Compartir en el Feed de Facebook con foto y resumen"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span>Facebook</span>
      </button>

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-stone-200 hover:border-stone-900 text-stone-700 hover:text-stone-950 rounded-full transition-all cursor-pointer bg-white/80 hover:bg-white shadow-2xs font-mono text-[11px]"
        title="Copiar enlace directo"
      >
        {copied ? (
          <>
            <IconCheck className="w-3.5 h-3.5 text-stone-900" />
            <span className="font-medium text-stone-950">Copiado</span>
          </>
        ) : (
          <span>Copiar enlace</span>
        )}
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleWhatsAppShare}
        className="px-3 py-1.5 border border-stone-200 hover:border-stone-900 text-stone-700 hover:text-stone-950 rounded-full transition-all cursor-pointer bg-white/80 hover:bg-white shadow-2xs font-mono text-[11px]"
        title="Compartir en WhatsApp"
      >
        WhatsApp
      </button>

      {/* X / Twitter */}
      <button
        onClick={handleTwitterShare}
        className="px-3 py-1.5 border border-stone-200 hover:border-stone-900 text-stone-700 hover:text-stone-950 rounded-full transition-all cursor-pointer bg-white/80 hover:bg-white shadow-2xs font-mono text-[11px]"
        title="Compartir en X / Twitter"
      >
        X (Twitter)
      </button>

      {/* Facebook Copy & Preview Toast */}
      {fbNotice && (
        <div className="w-full mt-2 p-2.5 bg-blue-900 text-white text-xs font-mono rounded-xs shadow-md animate-fade-in flex items-start gap-2">
          <span className="text-sm">📋</span>
          <div>
            <p className="font-semibold text-blue-200">¡Texto de la historia copiado al portapapeles!</p>
            <p className="text-[11px] text-blue-100 mt-0.5">
              En Facebook solo mantén presionado y pulsa <strong>Pegar</strong>. La imagen y titular se adjuntan automáticamente al publicar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
