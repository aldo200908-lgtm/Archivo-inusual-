import React from 'react';
import { Link } from 'react-router-dom';

export const ArchiveStatsStrip: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Capítulos Íntegros',
      desc: 'Narrativas documentales completas con estructura capitular y análisis pericial contrastado.',
    },
    {
      num: '02',
      title: 'Fuentes Contrastadas',
      desc: 'Actas oficiales, diarios de navegación y hemerotecas históricas desclasificadas.',
    },
    {
      num: '03',
      title: 'Cartografía & Tiempo',
      desc: 'Exploración interactiva mediante mapa geográfico y cronología lineal integrada.',
      linkTo: '/cronologia',
      linkText: 'Ver cronología',
    },
    {
      num: '04',
      title: 'Acceso 100% Libre',
      desc: 'Publicación independiente sin muros de pago sostenida por micro-mecenas.',
      linkHref: 'https://ko-fi.com/aldopaz',
      linkText: 'Apoyar en Ko-fi ($1)',
    },
  ];

  return (
    <section className="w-full border-b border-stone-200/90 bg-[#F5F2EB]/60 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/80 border border-stone-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs hover:bg-white transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 text-stone-900 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <h3 className="font-editorial text-sm sm:text-base font-medium text-stone-950">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-stone-600 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {(item.linkTo || item.linkHref) && (
                <div className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] font-mono">
                  {item.linkTo ? (
                    <Link
                      to={item.linkTo}
                      className="text-stone-850 hover:text-stone-950 font-semibold underline underline-offset-4"
                    >
                      {item.linkText} →
                    </Link>
                  ) : (
                    <a
                      href={item.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-4"
                    >
                      {item.linkText} →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
