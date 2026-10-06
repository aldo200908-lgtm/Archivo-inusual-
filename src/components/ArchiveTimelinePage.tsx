import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from './Icons';
import { getAllArticles } from '../data/articles';
import { STORY_LOCATIONS } from '../data/storyLocations';
import { SEOHead } from './SEOHead';

export const ArchiveTimelinePage: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<string>('todas');
  const articles = getAllArticles();

  // Combine with year and sort chronologically from oldest to newest
  const timelineStories = useMemo(() => {
    return articles
      .map((art) => {
        const loc = STORY_LOCATIONS[art.slug];
        const year = loc?.year ?? 1950;
        return {
          ...art,
          year,
          eraLabel: loc?.eraLabel ?? 'Histórico',
          placeName: loc?.placeName ?? 'Ubicación documentada'
        };
      })
      .sort((a, b) => a.year - b.year);
  }, [articles]);

  const eras = [
    { id: 'todas', label: 'Toda la Cronología' },
    { id: 'antiguedad', label: 'Antigüedad y Medievo (9600 a.C. - 1500)' },
    { id: 'moderna', label: 'Siglos XVI al XIX (1501 - 1900)' },
    { id: 'siglo20', label: 'Siglo XX (1901 - 1999)' },
    { id: 'siglo21', label: 'Siglo XXI y 2026' }
  ];

  const filteredStories = useMemo(() => {
    if (selectedEra === 'todas') return timelineStories;
    if (selectedEra === 'antiguedad') return timelineStories.filter((s) => s.year <= 1500);
    if (selectedEra === 'moderna') return timelineStories.filter((s) => s.year > 1500 && s.year <= 1900);
    if (selectedEra === 'siglo20') return timelineStories.filter((s) => s.year > 1900 && s.year < 2000);
    if (selectedEra === 'siglo21') return timelineStories.filter((s) => s.year >= 2000);
    return timelineStories;
  }, [timelineStories, selectedEra]);

  const formatYear = (year: number) => {
    if (year < 0) return `${Math.abs(year)} a.C.`;
    return `${year} d.C.`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <SEOHead
        metadata={{
          title: 'Cronología Histórica de Expedientes | Archivo Inusual',
          description: 'Recorrido cronológico desde el 9600 a.C. hasta el 2026 a través de 61 expedientes contrastados y misterios documentados.',
          canonicalUrl: 'https://archivoinusual.vercel.app/cronologia'
        }}
      />

      {/* Header Banner */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-stone-500 mb-2">
            <span className="font-mono text-xs font-bold text-stone-900">§</span>
            <span>LÍNEA TEMPORAL DEL ARCHIVO · 9600 a.C. — 2026</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-medium text-stone-950 mb-4 tracking-tight">
            Cronología de las Crónicas
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-light leading-relaxed">
            Una travesía cronológica por los hitos, desapariciones e invenciones que desafiaron a su propio tiempo, ordenados según su punto exacto en la historia humana.
          </p>

          {/* Era Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {eras.map((era) => (
              <button
                key={era.id}
                type="button"
                onClick={() => setSelectedEra(era.id)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all cursor-pointer border shadow-2xs ${
                  selectedEra === era.id
                    ? 'bg-stone-900 text-stone-50 border-stone-900 font-semibold shadow-xs'
                    : 'bg-white/80 text-stone-600 border-stone-200 hover:border-stone-400 hover:bg-white'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>

          <div className="mt-3 text-[11px] font-mono text-stone-400">
            Mostrando {filteredStories.length} de {timelineStories.length} expedientes registrados
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative border-l-2 border-stone-300 ml-4 sm:ml-32 space-y-12 pb-8">
          
          {filteredStories.map((story, index) => (
            <div key={story.slug} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-stone-900 bg-white group-hover:bg-stone-900 transition-colors shadow-xs" />

              {/* Year Badge (Desktop left aligned, mobile inline) */}
              <div className="sm:absolute sm:-left-32 sm:top-1 text-left sm:text-right sm:w-24">
                <span className="inline-block sm:block font-mono text-sm sm:text-base font-bold text-stone-900 bg-stone-200/80 sm:bg-transparent px-2.5 py-0.5 rounded-full sm:rounded-none">
                  {formatYear(story.year)}
                </span>
                <span className="hidden sm:block text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  {story.eraLabel}
                </span>
              </div>

              {/* Story Timeline Box with rounded-2xl */}
              <div className="border border-stone-200/90 bg-white/90 p-5 sm:p-6 rounded-2xl hover:border-stone-400 transition-all shadow-xs group-hover:shadow-md">
                
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  
                  {/* Real Photo */}
                  <div className="aspect-[4/3] w-full sm:w-44 shrink-0 overflow-hidden bg-stone-200 rounded-xl border border-stone-200 shadow-2xs">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                  </div>

                  {/* Content details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider mb-1.5">
                        <span className="font-semibold text-stone-900 px-2 py-0.5 bg-stone-100 rounded-full">{story.categoryLabel}</span>
                        <span>·</span>
                        <span>{story.placeName}</span>
                      </div>

                      <h3 className="font-editorial text-xl sm:text-2xl text-stone-950 font-medium mb-2 group-hover:text-stone-700 transition-colors leading-snug">
                        <Link to={`/historias/${story.slug}`}>
                          {story.title}
                        </Link>
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-stone-600 line-clamp-3 font-light leading-relaxed mb-4">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-mono text-stone-400">
                        {story.readingTime} · 15 Capítulos
                      </span>

                      <Link
                        to={`/historias/${story.slug}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-100 group-hover:bg-stone-900 text-stone-800 group-hover:text-stone-50 text-xs font-mono font-medium transition-all shadow-2xs"
                      >
                        <span>Abrir expediente</span>
                        <IconArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};
