import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { ArchiveStatsStrip } from './ArchiveStatsStrip';
import { RecentStories } from './RecentStories';
import { FeaturedStory } from './FeaturedStory';
import { SEOHead } from './SEOHead';
import { getPrimaryHeroArticle, getAllArticles, getFeaturedArticles } from '../data/articles';

export const HomePage: React.FC = () => {
  const heroArticle = getPrimaryHeroArticle();
  const allArticles = getAllArticles();
  const rawFeatured = getFeaturedArticles();
  
  // Ensure curatorial showcase in FeaturedStory features diverse stories separate from Hero
  const curatorialShowcase = rawFeatured.filter(a => a.slug !== heroArticle.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="flex flex-col">
      <SEOHead
        metadata={{
          title: 'Historias reales que parecen ficción',
          description: 'Un archivo digital de historias reales que parecen ficción. Publicación editorial y documental.',
        }}
      />

      {/* 1. Hero Principal Reestructurado */}
      <Hero article={heroArticle} />

      {/* 2. Franja de Rigor y Pilares Documentales */}
      <ArchiveStatsStrip />

      {/* 3. Catálogo de Historias Recientes */}
      <RecentStories articles={allArticles} />

      {/* 4. Selección Curatorial de Historias Inusuales */}
      <FeaturedStory featuredArticles={curatorialShowcase} />
    </div>
  );
};
