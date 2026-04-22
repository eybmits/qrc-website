export const siteConfig = {
  name: 'Quantum Reservoir Computing',
  shortName: 'Quantum Reservoir',
  description:
    'An explorable introduction to quantum reservoir computing, using spaced repetition to build deep understanding.',
  url: 'https://eybmits.github.io/qrc-website',
} as const;

export function absoluteUrl(path = '/') {
  const base = new URL(`${siteConfig.url}/`);
  const normalizedPath = path === '/' ? '' : path.replace(/^\/+/, '');
  return new URL(normalizedPath, base).toString();
}
