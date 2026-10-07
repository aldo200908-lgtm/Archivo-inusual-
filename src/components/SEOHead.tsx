import React, { useEffect } from 'react';
import { SEOMetadata } from '../types/index';

interface SEOHeadProps {
  metadata: SEOMetadata;
  articleJsonLd?: Record<string, unknown>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ metadata, articleJsonLd }) => {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = metadata.title.includes('Archivo Inusual')
      ? metadata.title
      : `${metadata.title} · Archivo Inusual`;
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (selector: string, attr: 'name' | 'property', attrValue: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('meta[name="description"]', 'name', 'description', metadata.description);

    // OpenGraph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metadata.description);
    if (metadata.ogImage) {
      setMetaTag('meta[property="og:image"]', 'property', 'og:image', metadata.ogImage);
    }
    if (metadata.canonicalUrl) {
      setMetaTag('meta[property="og:url"]', 'property', 'og:url', metadata.canonicalUrl);
    }

    // Twitter Cards
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description);
    if (metadata.ogImage) {
      setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', metadata.ogImage);
    }

    // Canonical link
    if (metadata.canonicalUrl) {
      let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', metadata.canonicalUrl);
    }

    // JSON-LD Structured Data
    const scriptId = 'json-ld-article-data';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (articleJsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(articleJsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [metadata, articleJsonLd]);

  return null;
};
