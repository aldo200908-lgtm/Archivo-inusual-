import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IconSearch, IconArrowRight } from './Icons';
import { getAllArticles } from '../data/articles';
import { STORY_LOCATIONS, StoryLocation } from '../data/storyLocations';
import { SEOHead } from './SEOHead';
import { CategorySlug } from '../types/index';

export const ArchiveMapPage: React.FC = () => {
  const [selectedSlug, setSelectedSlug] = useState<string>('el-lugar-que-quedo-vacio-islas-flannan');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const articles = getAllArticles();

  // Combine article data with location data
  const mappedStories = useMemo(() => {
    return articles
      .map((art) => {
        const loc = STORY_LOCATIONS[art.slug];
        if (!loc) return null;
        return {
          ...art,
          location: loc
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [articles]);

  // Filter based on category and search query
  const filteredStories = useMemo(() => {
    return mappedStories.filter((item) => {
      const matchesCat = selectedCategory === 'todas' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.location.placeName.toLowerCase().includes(q) ||
        item.location.country.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [mappedStories, selectedCategory, searchQuery]);

  const activeStory = mappedStories.find((s) => s.slug === selectedSlug) || filteredStories[0] || mappedStories[0];

  // Convert lat/lng to SVG percentage coordinates (Equirectangular projection)
  const getCoordinates = (lat: number, lng: number) => {
    // Clamp coordinates
    const clampedLat = Math.max(-75, Math.min(85, lat));
    const clampedLng = Math.max(-180, Math.min(180, lng));
    
    // Normalization to 0-100%
    const x = ((clampedLng + 180) / 360) * 100;
    const y = ((85 - clampedLat) / 160) * 100;
    return { x, y };
  };

  const categories = [
    { id: 'todas', label: 'Todos los Enclaves' },
    { id: 'misterios', label: 'Misterios' },
    { id: 'descubrimientos', label: 'Descubrimientos' },
    { id: 'acontecimientos', label: 'Acontecimientos' },
    { id: 'personas', label: 'Personas' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20">
      <SEOHead
        metadata={{
          title: 'Mapa Mundial de Expedientes | Archivo Inusual',
          description: 'Explora geográficamente los 61 expedientes, misterios documentados y hallazgos históricos catalogados en Archivo Inusual.',
          canonicalUrl: 'https://archivoinusual.vercel.app/mapa'
        }}
      />

      {/* Top Header Banner */}
      <div className="border-b border-stone-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-stone-500 mb-2">
            <span className="font-mono text-xs font-bold text-stone-900">§</span>
            <span>CARTOGRAFÍA DEL ARCHIVO · 61 ENCLAVES</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl font-medium text-stone-950 mb-3 tracking-tight">
            Mapa Mundial de Expedientes
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-600 max-w-2xl font-light leading-relaxed">
            Navega por las coordenadas planetarias donde tuvieron lugar los acontecimientos más insólitos de la historia registrada: desde fortalezas submarinas hasta búnkeres árticos y faros desiertos.
          </p>

          {/* Category Tabs & Search */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 border border-stone-200 p-1 bg-stone-50 self-start">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-stone-900 text-stone-50 font-medium'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por país, lugar o tema..."
                className="w-full pl-9 pr-4 py-2 border border-stone-300 bg-white text-xs font-sans placeholder:text-stone-400 focus:outline-hidden focus:border-stone-900"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="border-2 border-stone-900 bg-[#14181B] p-4 sm:p-6 shadow-md relative overflow-hidden">
          
          <div className="flex items-center justify-between text-stone-400 font-mono text-[11px] uppercase tracking-widest pb-3 border-b border-stone-800 mb-3">
            <span className="flex items-center gap-2 text-stone-200">
              <span className="text-emerald-400 font-bold">✦</span>
              PROYECCIÓN CARTOGRÁFICA INTERACTIVA
            </span>
            <span className="text-stone-400">
              Mostrando {filteredStories.length} enclaves activos
            </span>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[2/1] bg-[#161B22] border border-stone-800 overflow-hidden">
            
            {/* World Map Background Outlines (Stylized grid lines & continents) */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
            >
              {/* Latitude lines */}
              <line x1="0" y1="125" x2="1000" y2="125" stroke="#484F58" strokeDasharray="4 4" strokeWidth="0.5" />
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#8B949E" strokeWidth="0.8" />
              <line x1="0" y1="375" x2="1000" y2="375" stroke="#484F58" strokeDasharray="4 4" strokeWidth="0.5" />

              {/* Longitude lines */}
              <line x1="250" y1="0" x2="250" y2="500" stroke="#484F58" strokeDasharray="4 4" strokeWidth="0.5" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="#8B949E" strokeWidth="0.8" />
              <line x1="750" y1="0" x2="750" y2="500" stroke="#484F58" strokeDasharray="4 4" strokeWidth="0.5" />
            </svg>

            {/* Pins on the Map */}
            {filteredStories.map((story) => {
              const { x, y } = getCoordinates(story.location.lat, story.location.lng);
              const isSelected = activeStory?.slug === story.slug;

              return (
                <div
                  key={story.slug}
                  onClick={() => setSelectedSlug(story.slug)}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group z-20"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={`${story.title} (${story.location.placeName})`}
                >
                  {/* Pulse ring for selected */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-amber-400/40 animate-ping" />
                  )}

                  {/* Marker Pin */}
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-400 scale-125 ring-4 ring-amber-400/30'
                      : 'bg-emerald-400/90 group-hover:bg-amber-300 group-hover:scale-125'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30 whitespace-nowrap">
                    <div className="bg-stone-900 border border-stone-700 text-stone-50 px-2 py-1 text-[10px] font-mono shadow-lg rounded-xs">
                      {story.location.placeName}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="mt-3 flex items-center justify-between text-stone-500 font-mono text-[10px]">
            <span>Haz clic en un marcador para inspeccionar el expediente</span>
            <span>Coordenadas contrastadas en registros de navegación</span>
          </div>

        </div>

      </div>

      {/* Selected Dossier Preview Card */}
      {activeStory && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="border border-stone-300 bg-white p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Thumbnail */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-stone-200 border border-stone-200">
                <img
                  src={activeStory.coverImage}
                  alt={activeStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[10%]"
                />
              </div>

              {/* Story Details */}
              <div className="md:col-span-2">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  <span className="font-semibold text-stone-900 px-2 py-0.5 bg-stone-100 border border-stone-200">
                    {activeStory.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 text-stone-700">
                    <span className="text-xs">📍</span>
                    <strong>{activeStory.location.placeName}</strong> ({activeStory.location.country})
                  </span>
                  <span>·</span>
                  <span className="text-stone-500">
                    {activeStory.location.eraLabel}
                  </span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl text-stone-950 font-medium mb-3 leading-snug">
                  {activeStory.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-stone-600 font-light leading-relaxed mb-6">
                  {activeStory.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to={`/historias/${activeStory.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-950 text-stone-50 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                  >
                    <span>Leer Expediente Completo (15 Capítulos)</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <span className="text-xs font-mono text-stone-400">
                    Signatura: {activeStory.accessionNumber || 'DOC. OFICIAL'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Directory of all 61 Enclaves */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-stone-200">
        <h3 className="font-editorial text-2xl text-stone-950 font-medium mb-6">
          Catálogo Geográfico de los 61 Enclaves
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStories.map((story) => (
            <div
              key={story.slug}
              onClick={() => {
                setSelectedSlug(story.slug);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                activeStory?.slug === story.slug
                  ? 'border-stone-900 bg-white ring-1 ring-stone-900'
                  : 'border-stone-200 bg-white/70 hover:border-stone-400 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 uppercase tracking-wider mb-1.5">
                  <span>{story.location.country}</span>
                  <span className="font-semibold text-stone-900">{story.location.eraLabel}</span>
                </div>
                <h4 className="font-editorial text-base text-stone-950 font-medium line-clamp-1 mb-1">
                  {story.title}
                </h4>
                <p className="font-sans text-xs text-stone-600 line-clamp-1 font-light">
                  {story.location.placeName}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Lat: {story.location.lat.toFixed(2)}° | Lng: {story.location.lng.toFixed(2)}°</span>
                <span className="text-stone-900 font-medium">
                  Ver →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
