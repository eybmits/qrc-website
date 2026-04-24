import katex from 'katex';

interface MathBlockProps {
  math: string;
  display?: boolean;
}

function renderMath(math: string, display: boolean): string {
  try {
    return katex.renderToString(math, {
      displayMode: display,
      throwOnError: false,
      trust: true,
    });
  } catch {
    return `<span style="color: var(--accent-error)">Error rendering: ${math}</span>`;
  }
}

export function MathBlock({ math, display = false }: MathBlockProps) {
  const html = renderMath(math, display);

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
