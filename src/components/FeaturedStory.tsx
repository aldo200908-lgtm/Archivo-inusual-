import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { getArticleViews } from '../data/viewsTracker';
import { IconArrowRight } from './Icons';

interface FeaturedStoryProps {
  featuredArticles: Article[];
}

export const FeaturedStory: React.FC<FeaturedStoryProps> = ({ featuredArticles }) => {
  const primaryFeatured = featuredArticles[0];
  const secondaryStories = featuredArticles.slice(1, 3);

  if (!primaryFeatured) return null;

  return (
    <section id="historias-destacadas" className="w-full border-b border-stone-200 py-12 sm:py-16 lg:py-24 bg-[#F5F2EB]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono font-semibold text-stone-500 block mb-2">
            SELECCIÓN CURATORIAL · ARCHIVO INUSUAL
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-950 mb-4">
            Historias que parecen ficción
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            Una recopilación de sucesos verificados en actas notariales, diarios de expedición y archivos de prensa que desafían el sentido común contemporáneo.
          </p>
        </div>

        {/* Lead Curatorial Showcase with rounded corners */}
        <div className="border border-stone-300/80 bg-[#FAF8F5] mb-12 lg:mb-16 overflow-hidden rounded-3xl shadow-xs hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Column (7 cols) */}
            <Link
              to={`/historias/${primaryFeatured.slug}`}
              className="lg:col-span-7 relative group block overflow-hidden bg-stone-300 min-h-[280px] sm:min-h-[380px] lg:min-h-full cursor-pointer"
            >
              <img
                src={primaryFeatured.coverImage}
                alt={primaryFeatured.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-stone-950/85 backdrop-blur-xs text-stone-50 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-xs">
                Selección Curatorial
              </div>
            </Link>

            {/* Narrative & Dossier Metadata Column (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-3">
                  <Link
                    to={`/${primaryFeatured.category}`}
                    className="uppercase tracking-[0.2em] font-semibold text-stone-800 hover:text-stone-950 px-2.5 py-0.5 bg-stone-200/60 rounded-full"
                  >
                    {primaryFeatured.categoryLabel}
                  </Link>
                  <span aria-hidden="true">·</span>
                  <span>{primaryFeatured.readingTime}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-stone-950 leading-tight mb-4 hover:text-stone-700 transition-colors text-balance">
                  <Link to={`/historias/${primaryFeatured.slug}`}>
                    {primaryFeatured.title}
                  </Link>
                </h3>

                <p className="font-sans text-sm sm:text-base text-stone-700 font-light leading-relaxed mb-6">
                  {primaryFeatured.excerpt}
                </p>

                {primaryFeatured.quote && (
                  <div className="bg-[#F5F2EB] p-4 sm:p-5 border-l-2 border-stone-800 rounded-r-2xl mb-6">
                    <span className="font-editorial text-2xl leading-none text-stone-400 select-none block mb-1">«</span>
                    <p className="font-editorial italic text-sm text-stone-800 leading-snug">
                      {primaryFeatured.quote}
                    </p>
                    {primaryFeatured.quoteAuthor && (
                      <span className="block font-sans text-[11px] text-stone-500 uppercase tracking-wider mt-2">
                        — {primaryFeatured.quoteAuthor}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-500 font-mono">{primaryFeatured.date}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-xs text-stone-500 font-mono">
                    {getArticleViews(primaryFeatured.slug).toLocaleString()} lecturas
                  </span>
                </div>
                <Link
                  to={`/historias/${primaryFeatured.slug}`}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-stone-950 text-stone-50 hover:bg-stone-800 rounded-full text-xs uppercase tracking-widest font-mono font-medium transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>Abrir expediente</span>
                  <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Secondary Curatorial Dossiers in Rounded Cards */}
        {secondaryStories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {secondaryStories.map((story, index) => (
              <div
                key={story.id}
                className="group border border-stone-200/90 bg-white/80 hover:bg-white p-6 sm:p-7 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-4 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-stone-900 font-medium">0{index + 2}.</span>
                      <Link
                        to={`/${story.category}`}
                        className="uppercase tracking-[0.2em] font-semibold text-stone-700 hover:text-stone-950 px-2 py-0.5 bg-stone-100 rounded-full"
                      >
                        {story.categoryLabel}
                      </Link>
                    </div>
                    <span>{story.readingTime}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 mb-5 items-start">
                    <Link
                      to={`/historias/${story.slug}`}
                      className="sm:col-span-5 aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-200 block"
                    >
                      <img
                        src={story.coverImage}
                        alt={story.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    </Link>
                    <div className="sm:col-span-7">
                      <h4 className="font-editorial text-xl font-medium text-stone-950 leading-snug group-hover:text-stone-700 transition-colors mb-2 text-balance">
                        <Link to={`/historias/${story.slug}`}>
                          {story.title}
                        </Link>
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-stone-600 font-light line-clamp-3 leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-500">
                  <div className="flex items-center gap-2">
                    <span>{story.date}</span>
                    <span aria-hidden="true" className="text-stone-200">·</span>
                    <span className="text-stone-500">
                      {getArticleViews(story.slug).toLocaleString()} lecturas
                    </span>
                  </div>
                  <Link
                    to={`/historias/${story.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 group-hover:bg-stone-950 text-stone-800 group-hover:text-stone-50 transition-all font-mono text-[11px]"
                  >
                    <span className="uppercase tracking-wider">Examinar</span>
                    <IconArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
