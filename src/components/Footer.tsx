import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowUp, IconCheck } from './Icons';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenContact,
  onOpenPrivacy,
}) => {
  const [email, setEmail] = useState('');
  const { t } = useLanguage();
  const [subscribed, setSubscribed] = useState(() => {
    return localStorage.getItem('archivo_inusual_subscribed') === 'true';
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      localStorage.setItem('archivo_inusual_subscribed', 'true');
    }
  };

  return (
    <footer className="w-full bg-[#181614] text-stone-300 font-sans border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 sm:pb-16 border-b border-stone-800">
          
          {/* Brand & Manifesto Column (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block mb-4 group select-none">
                <span className="font-editorial text-lg sm:text-xl font-semibold tracking-[0.25em] text-stone-100 uppercase block leading-none group-hover:text-stone-300 transition-colors">
                  ARCHIVO
                </span>
                <span className="font-editorial text-sm sm:text-base font-light tracking-[0.35em] text-stone-400 uppercase block leading-none mt-1 group-hover:text-stone-200 transition-colors">
                  INUSUAL
                </span>
              </Link>
              <p className="font-editorial italic text-base sm:text-lg text-stone-300 mb-4 max-w-sm">
                «{t('brand_tagline')}»
              </p>
              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-md">
                {t('footer_editorial_manifesto')}
              </p>
            </div>

            {/* Language Selection in Footer */}
            <div className="mt-6 pt-4 border-t border-stone-800/80">
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-mono block mb-2">
                Idioma / Language:
              </span>
              <LanguageSelector variant="footer" />
            </div>

            {/* Social media icons (subdued visual elements) */}
            <div className="mt-6 flex items-center gap-4 text-stone-400 text-xs font-sans">
              <span className="uppercase tracking-widest text-[10px] text-stone-500">PRESENCIA DIGITAL</span>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 flex items-center justify-center border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-colors cursor-pointer text-xs font-mono">
                  X
                </span>
                <span className="w-7 h-7 flex items-center justify-center border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-colors cursor-pointer text-xs font-mono">
                  IG
                </span>
                <span className="w-7 h-7 flex items-center justify-center border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-colors cursor-pointer text-xs font-mono">
                  YT
                </span>
                <span className="w-7 h-7 flex items-center justify-center border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-colors cursor-pointer text-xs font-mono">
                  RSS
                </span>
              </div>
            </div>
          </div>

          {/* Links: Editorial Sections (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold mb-5">
              {t('section_categories')}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-stone-300">
              <li>
                <Link to="/historias" className="hover:text-stone-100 transition-colors">
                  {t('cat_stories')}
                </Link>
              </li>
              <li>
                <Link to="/cronologia" className="hover:text-stone-100 transition-colors text-amber-200/90 font-medium">
                  {t('nav_timeline')}
                </Link>
              </li>
              <li>
                <Link to="/mapa" className="hover:text-stone-100 transition-colors text-amber-200/90 font-medium">
                  {t('nav_map')}
                </Link>
              </li>
              <li>
                <Link to="/personas" className="hover:text-stone-100 transition-colors">
                  {t('cat_people')}
                </Link>
              </li>
              <li>
                <Link to="/acontecimientos" className="hover:text-stone-100 transition-colors">
                  {t('cat_events')}
                </Link>
              </li>
              <li>
                <Link to="/descubrimientos" className="hover:text-stone-100 transition-colors">
                  {t('cat_discoveries')}
                </Link>
              </li>
              <li>
                <Link to="/misterios" className="hover:text-stone-100 transition-colors">
                  {t('cat_mysteries')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Links (2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold mb-5">
              INFORMACIÓN
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-stone-300">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Sobre nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Contacto & Fuentes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Privacidad & Condiciones
                </button>
              </li>
              <li>
                <a
                  href="https://ko-fi.com/aldopaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors text-amber-300/90 font-medium flex items-center gap-1.5"
                >
                  <span>☕ Fondo de Apoyo (Ko-fi)</span>
                </a>
              </li>
              <li>
                <Link to="/buscar" className="hover:text-stone-100 transition-colors">
                  Buscador general
                </Link>
              </li>
              <li>
                <Link to="/admin/social" className="text-amber-400/80 hover:text-amber-300 font-mono text-xs transition-colors flex items-center gap-1">
                  <span>§</span>
                  <span>Estudio Social (Lotes)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription Box (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold mb-3">
                SUSCRIPCIÓN DOCUMENTAL
              </h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed mb-4">
                Reciba cada nuevo expediente investigado en su correo electrónico. Sin publicidad ni spam.
              </p>

              {subscribed ? (
                <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl text-stone-300 text-xs flex items-center gap-2.5 shadow-2xs">
                  <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Suscripción activa. Recibirá los próximos avisos de publicación.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="su-correo@ejemplo.com"
                      required
                      className="w-full py-2.5 px-4 text-xs bg-stone-900 border border-stone-700 text-stone-100 placeholder:text-stone-500 rounded-full focus:outline-hidden focus:border-stone-400 focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-stone-100 text-stone-950 text-xs uppercase tracking-widest font-mono font-medium rounded-full hover:bg-stone-200 transition-all shadow-xs hover:shadow-md cursor-pointer"
                  >
                    Suscribirme al archivo
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-mono">Volver arriba</span>
              <button
                onClick={scrollToTop}
                className="p-2.5 border border-stone-700 text-stone-400 hover:text-stone-100 hover:border-stone-400 rounded-full transition-all cursor-pointer shadow-2xs"
                aria-label="Volver al principio de la página"
              >
                <IconArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Legal & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-3">
            <p 
              onClick={() => {
                const count = parseInt(sessionStorage.getItem('secret_clicks') || '0', 10) + 1;
                sessionStorage.setItem('secret_clicks', count.toString());
                if (count >= 3) {
                  sessionStorage.removeItem('secret_clicks');
                  window.location.href = '/despacho-secreto';
                }
              }}
              className="cursor-default select-none"
              title=""
            >
              © {new Date().getFullYear()} Archivo Inusual. Publicación editorial digital independiente.
            </p>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <a href="/rss.xml" target="_blank" className="hover:text-amber-400 transition-colors">RSS Feed</a>
          </div>
          <p className="text-stone-500 font-light">
            Archivo digital documental — Crónicas e investigaciones de rigor histórico.
          </p>
        </div>

      </div>
    </footer>
  );
};
