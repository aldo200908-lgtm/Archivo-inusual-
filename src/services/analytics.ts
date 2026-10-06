/**
 * Google Analytics 4 (GA4) Service for Archivo Inusual
 * Tracks pageviews, story reading metrics, user engagement, and support interactions.
 */

// Replace with your GA4 Measurement ID (e.g., G-XXXXXXXXXX) or configure VITE_GA_MEASUREMENT_ID in your environment
export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || 'G-XXXXXXXXXX';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Initializes GA4 by injecting the official Google gtag.js script and setting up dataLayer.
 */
export function initGA(measurementId: string = GA_MEASUREMENT_ID): void {
  if (typeof window === 'undefined') return;

  // Don't re-initialize if already loaded
  if (document.getElementById('ga-gtag-script')) return;

  // Setup dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());

  // Configure GA4 (disable automatic SPA page_view to avoid double counting)
  window.gtag('config', measurementId, {
    send_page_view: false,
    cookie_flags: 'SameSite=None;Secure',
  });

  // Inject script tag
  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/**
 * Sends a page_view event to GA4 on route change in SPA.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: title || document.title,
  });
}

/**
 * Sends a custom event to GA4 (e.g. story_view, audio_play, support_click).
 */
export function trackGAEvent(eventName: string, eventParams: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, eventParams);
}

/**
 * Tracks when a specific story is read to report the most popular chronicles in GA4.
 */
export function trackStoryView(params: {
  slug: string;
  title: string;
  category: string;
  readingTime?: string;
}): void {
  trackGAEvent('story_view', {
    story_slug: params.slug,
    story_title: params.title,
    story_category: params.category,
    story_reading_time: params.readingTime,
    content_type: 'expediente_historico',
  });
}

/**
 * Tracks support & patron button clicks (Ko-fi).
 */
export function trackSupportClick(placement: string, amount: string = '$1'): void {
  trackGAEvent('support_patron_click', {
    placement,
    amount,
    destination: 'ko-fi',
  });
}
