import React from 'react';

interface ArticleMetaProps {
  category: string;
  categorySlug?: string;
  date: string;
  readingTime: string;
  accessionNumber?: string;
  className?: string;
  showIcons?: boolean;
}

export const ArticleMeta: React.FC<ArticleMetaProps> = ({
  category,
  date,
  readingTime,
  accessionNumber,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-sans text-stone-500 ${className}`}>
      <span className="uppercase tracking-[0.2em] font-mono font-semibold text-stone-850 px-2 py-0.5 bg-stone-200/70 rounded-full text-[11px]">
        {category}
      </span>
      <span aria-hidden="true" className="text-stone-300">·</span>
      <span className="font-mono text-[11px] text-stone-600">{date}</span>
      <span aria-hidden="true" className="text-stone-300">·</span>
      <span className="text-stone-600">Lectura: {readingTime}</span>
      {accessionNumber && (
        <>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="font-mono text-[11px] text-stone-400">
            REG. {accessionNumber}
          </span>
        </>
      )}
    </div>
  );
};
