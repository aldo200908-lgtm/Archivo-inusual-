import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types/index';
import { IconPlay, IconPause, IconSquare } from './Icons';
import { useLanguage } from '../context/LanguageContext';

interface AudioNarratorProps {
  article: Article;
}

export const AudioNarrator: React.FC<AudioNarratorProps> = ({ article }) => {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [rate, setRate] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const { language, currentLangInfo, t } = useLanguage();

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Web Speech API & load voices for active language
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const langPrefix = language;
      const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
      setAvailableVoices(langVoices.length > 0 ? langVoices : voices);
      
      const preferred = langVoices.find(v => v.lang === currentLangInfo.speechLang) ||
                        langVoices[0] ||
                        voices.find(v => v.lang.startsWith(langPrefix)) ||
                        voices[0] || null;
      setSelectedVoice(preferred);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language, currentLangInfo]);

  // Stop speech synthesis and reset state when switching articles
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChapter(0);
  }, [article.slug]);

  // When chapter or playback changes, construct speech text
  const speakChapter = (chapterIndex: number) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const section = article.content[chapterIndex];
    if (!section) return;

    const headingText = section.heading || `Capítulo ${chapterIndex + 1}`;
    const bodyText = section.paragraphs.join('. ');
    const fullText = `${headingText}. ${bodyText}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = rate;
    utterance.lang = selectedVoice?.lang || 'es-ES';
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentChapter(chapterIndex);
    };

    utterance.onend = () => {
      // Auto advance to next chapter if available
      if (chapterIndex + 1 < article.content.length) {
        speakChapter(chapterIndex + 1);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentChapter(0);
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayToggle = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speakChapter(currentChapter);
    }
  };

  const handleStop = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleNextChapter = () => {
    if (currentChapter + 1 < article.content.length) {
      speakChapter(currentChapter + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      speakChapter(currentChapter - 1);
    }
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying && !isPaused) {
      // Restart current chapter with new rate
      speakChapter(currentChapter);
    }
  };

  if (!isSupported) {
    return null;
  }

  const currentSection = article.content[currentChapter];
  const progressPercent = Math.round(((currentChapter + 1) / article.content.length) * 100);

  return (
    <div className="my-8 border border-stone-300/90 bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-200">
        
        {/* Header Title with Sound Wave Indicator */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            isPlaying && !isPaused ? 'bg-stone-900 text-stone-50' : 'bg-stone-200 text-stone-700'
          }`}>
            <span className="font-mono text-xs font-bold leading-none animate-pulse">●</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-900">
                AUDIOTECA DEL ARCHIVO
              </span>
              <span className="bg-stone-200 text-stone-700 text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider rounded-full">
                Voz Documental
              </span>
            </div>
            <h3 className="font-editorial text-sm sm:text-base font-medium text-stone-900 line-clamp-1">
              Escuchar expediente narrado · {article.content.length} capítulos
            </h3>
          </div>
        </div>

        {/* Audio rate & status */}
        <div className="flex items-center gap-1.5">
          {[1.0, 1.25, 1.5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRateChange(r)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-full transition-colors cursor-pointer border ${
                rate === r
                  ? 'bg-stone-900 text-stone-50 border-stone-900 font-semibold shadow-2xs'
                  : 'bg-white text-stone-600 border-stone-300 hover:border-stone-500'
              }`}
            >
              {r}x
            </button>
          ))}
        </div>
      </div>

      {/* Main playback control bar */}
      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Play / Pause / Skip buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevChapter}
            disabled={currentChapter === 0}
            className="w-8 h-8 flex items-center justify-center border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white text-stone-700 cursor-pointer rounded-full font-mono text-xs font-bold"
            title="Capítulo anterior"
            aria-label="Capítulo anterior"
          >
            «
          </button>

          <button
            type="button"
            onClick={handlePlayToggle}
            className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md rounded-full transition-all"
            aria-label={isPlaying && !isPaused ? 'Pausar audio' : 'Reproducir audio'}
          >
            {isPlaying && !isPaused ? (
              <>
                <IconPause className="w-3.5 h-3.5" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <IconPlay className="w-3.5 h-3.5" />
                <span>{isPaused ? 'Reanudar' : 'Escuchar Expediente'}</span>
              </>
            )}
          </button>

          {(isPlaying || isPaused) && (
            <button
              type="button"
              onClick={handleStop}
              className="p-2 border border-stone-300 bg-white hover:bg-red-50 hover:text-red-700 text-stone-700 cursor-pointer transition-colors rounded-full"
              title="Detener reproducción"
              aria-label="Detener"
            >
              <IconSquare className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleNextChapter}
            disabled={currentChapter >= article.content.length - 1}
            className="w-8 h-8 flex items-center justify-center border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white text-stone-700 cursor-pointer rounded-full font-mono text-xs font-bold"
            title="Siguiente capítulo"
            aria-label="Siguiente capítulo"
          >
            »
          </button>
        </div>

        {/* Current Chapter Tracker */}
        <div className="flex-1 sm:text-right">
          <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
            Capítulo {currentChapter + 1} de {article.content.length} ({progressPercent}%)
          </div>
          <div className="text-xs font-sans text-stone-800 font-medium line-clamp-1">
            {currentSection?.heading ? currentSection.heading.replace(/^\d+\.\s*/, '') : `Capítulo ${currentChapter + 1}`}
          </div>
        </div>
      </div>

      {/* Audio Wave Visualizer animation when playing */}
      {isPlaying && !isPaused && (
        <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mr-2">Narrando:</span>
          <div className="flex items-end gap-1 h-3.5">
            {[40, 90, 60, 100, 75, 45, 85, 55, 95, 70, 30, 80].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-stone-900 rounded-full animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDuration: `${0.6 + (i % 5) * 0.15}s`,
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
