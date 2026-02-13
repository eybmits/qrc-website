'use client';

import katex from 'katex';
import { useMemo } from 'react';

interface MathBlockProps {
  math: string;
  display?: boolean;
}

export function MathBlock({ math, display = false }: MathBlockProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return `<span style="color: var(--accent-error)">Error rendering: ${math}</span>`;
    }
  }, [math, display]);

  if (display) {
    return (
      <div
        className="katex-display"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
