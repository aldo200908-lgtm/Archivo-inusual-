import React, { useState, useEffect } from 'react';
import { getArticleVerdict, getUserVote, castUserVote } from '../services/retentionService';

interface ArticleVerdictProps {
  slug: string;
  articleTitle: string;
}

export const ArticleVerdict: React.FC<ArticleVerdictProps> = ({ slug, articleTitle }) => {
  const [userVote, setUserVote] = useState<'A' | 'B' | null>(null);
  const [verdict, setVerdict] = useState(() => getArticleVerdict(slug, articleTitle));
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const existing = getUserVote(slug);
    setUserVote(existing);
    setHasVoted(Boolean(existing));
    setVerdict(getArticleVerdict(slug, articleTitle));
  }, [slug, articleTitle]);

  const handleVote = (option: 'A' | 'B') => {
    if (hasVoted) return;
    castUserVote(slug, option);
    setUserVote(option);
    setHasVoted(true);
  };

  const totalVotes = verdict.optionA.votes + verdict.optionB.votes + (hasVoted ? 1 : 0);
  const votesA = verdict.optionA.votes + (userVote === 'A' ? 1 : 0);
  const votesB = verdict.optionB.votes + (userVote === 'B' ? 1 : 0);
  const percentA = Math.round((votesA / totalVotes) * 100);
  const percentB = 100 - percentA;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://archivoinusual.vercel.app/historias/${slug}`;
  const shareText = `🔥 Acabo de votar sobre el expediente "${articleTitle}" en Archivo Inusual: ${verdict.question} ¿Tú qué opinas?`;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`;

  return (
    <section className="my-12 sm:my-16 p-6 sm:p-8 bg-[#FAF7F0] border border-stone-300 rounded-3xl shadow-sm text-stone-900">
      <div className="flex items-center justify-between gap-3 mb-3 border-b border-stone-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] font-semibold text-stone-700">
            DEBATE DOCUMENTAL · VEREDICTO DE LA COMUNIDAD
          </span>
        </div>
        <span className="text-xs font-mono text-stone-500">
          {totalVotes.toLocaleString()} dictámenes
        </span>
      </div>

      <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-stone-950 mb-2 leading-tight">
        {verdict.question}
      </h3>
      <p className="font-sans text-xs sm:text-sm text-stone-600 font-light mb-6">
        Tras analizar los testimonios y fuentes de este expediente, emite tu dictamen pericial anónimo:
      </p>

      {/* Options & Votes */}
      <div className="space-y-4 mb-6">
        {/* Option A */}
        <button
          type="button"
          onClick={() => handleVote('A')}
          disabled={hasVoted}
          className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            userVote === 'A'
              ? 'border-stone-900 bg-white ring-2 ring-stone-900/10 shadow-xs'
              : hasVoted
              ? 'border-stone-200 bg-white/70'
              : 'border-stone-300 bg-white hover:border-stone-900 hover:shadow-xs'
          }`}
        >
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                userVote === 'A' ? 'bg-stone-900 text-stone-50' : 'bg-stone-100 text-stone-700'
              }`}>
                A
              </span>
              <span className="font-sans text-xs sm:text-sm font-medium text-stone-900">
                {verdict.optionA.label}
              </span>
            </div>
            {hasVoted && (
              <span className="font-mono text-xs sm:text-sm font-bold text-stone-900 shrink-0">
                {percentA}%
              </span>
            )}
          </div>

          {/* Progress fill */}
          {hasVoted && (
            <div
              className="absolute left-0 top-0 bottom-0 bg-stone-200/60 z-0 transition-all duration-700 rounded-2xl"
              style={{ width: `${percentA}%` }}
            />
          )}
        </button>

        {/* Option B */}
        <button
          type="button"
          onClick={() => handleVote('B')}
          disabled={hasVoted}
          className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
            userVote === 'B'
              ? 'border-stone-900 bg-white ring-2 ring-stone-900/10 shadow-xs'
              : hasVoted
              ? 'border-stone-200 bg-white/70'
              : 'border-stone-300 bg-white hover:border-stone-900 hover:shadow-xs'
          }`}
        >
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                userVote === 'B' ? 'bg-stone-900 text-stone-50' : 'bg-stone-100 text-stone-700'
              }`}>
                B
              </span>
              <span className="font-sans text-xs sm:text-sm font-medium text-stone-900">
                {verdict.optionB.label}
              </span>
            </div>
            {hasVoted && (
              <span className="font-mono text-xs sm:text-sm font-bold text-stone-900 shrink-0">
                {percentB}%
              </span>
            )}
          </div>

          {/* Progress fill */}
          {hasVoted && (
            <div
              className="absolute left-0 top-0 bottom-0 bg-amber-100/70 z-0 transition-all duration-700 rounded-2xl"
              style={{ width: `${percentB}%` }}
            />
          )}
        </button>
      </div>

      {/* Post-vote action: Share in Facebook / Social */}
      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-xs font-sans text-stone-500 font-light">
          {hasVoted
            ? '✓ Tu dictamen ha sido registrado en las actas del archivo.'
            : 'Selecciona una postura para contrastarla con el resto de investigadores.'}
        </span>

        <div className="flex items-center gap-2">
          <a
            href={fbShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1877F2] text-white text-xs font-sans font-medium rounded-full hover:bg-[#166fe5] transition-all shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <span>Llevar debate a Facebook</span>
            <span>➔</span>
          </a>
          <a
            href={waShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#25D366] text-white text-xs font-sans font-medium rounded-full hover:bg-[#20ba5a] transition-all shadow-2xs hover:shadow-xs cursor-pointer"
            title="Compartir por WhatsApp"
          >
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
