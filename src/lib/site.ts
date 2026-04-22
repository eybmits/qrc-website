import type { Metadata } from 'next';
import { essays } from '@/data/toc';

export const siteConfig = {
  name: 'Quantum Reservoir Computing',
  shortName: 'Quantum Reservoir',
  description:
    'An explorable introduction to quantum reservoir computing, with a five-part reading path and spaced-repetition review.',
  url: 'https://eybmits.github.io/qrc-website',
} as const;

type PageKind = 'home' | 'essay' | 'review';
type OpenGraphKind = 'website' | 'article';

interface PageConfig {
  route: string;
  title: string;
  description: string;
  kind: PageKind;
  openGraphType: OpenGraphKind;
}

const essayMetadataOverrides: Partial<Record<string, Partial<Pick<PageConfig, 'title' | 'description'>>>> = {
  '/qrc': {
    title: 'Quantum Reservoir Computing Essay',
  },
  '/echo-state': {
    title: 'Why Go Quantum?',
  },
};

const essayPageConfigs = Object.fromEntries(
  essays.map((essay) => [
    essay.slug,
    {
      route: essay.slug,
      title: essayMetadataOverrides[essay.slug]?.title ?? essay.title,
      description: essayMetadataOverrides[essay.slug]?.description ?? essay.description,
      kind: 'essay',
      openGraphType: 'article',
    } satisfies PageConfig,
  ])
) as Record<string, PageConfig>;

const pageConfigs: Record<string, PageConfig> = {
  '/': {
    route: '/',
    title: siteConfig.name,
    description: siteConfig.description,
    kind: 'home',
    openGraphType: 'website',
  },
  '/review': {
    route: '/review',
    title: 'Review Cards',
    description:
      'Spaced-repetition review hub for the full QRC reading path, with due cards, progress tracking, and browser-stored mastery state.',
    kind: 'review',
    openGraphType: 'website',
  },
  ...essayPageConfigs,
};

function getPageTitle(route: string): string {
  const page = getPageConfig(route);
  return route === '/' ? page.title : `${page.title} | ${siteConfig.name}`;
}

function getWebSiteReference() {
  return {
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

function getTopicReference() {
  return {
    '@type': 'Thing',
    name: 'Quantum reservoir computing',
  };
}

export function absoluteUrl(path = '/') {
  const base = new URL(`${siteConfig.url}/`);
  const normalizedPath = path === '/' ? '' : path.replace(/^\/+/, '');
  return new URL(normalizedPath, base).toString();
}

export function getPageConfig(route: string): PageConfig {
  const page = pageConfigs[route];
  if (!page) {
    throw new Error(`Unknown route metadata for ${route}`);
  }

  return page;
}

export function getPageMetadata(route: string): Metadata {
  const page = getPageConfig(route);
  const canonical = absoluteUrl(route);

  return {
    title: getPageTitle(route),
    description: page.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: page.openGraphType,
      url: canonical,
      title: page.title,
      description: page.description,
      images: ['/opengraph-image'],
    },
    twitter: {
      title: page.title,
      description: page.description,
      images: ['/twitter-image'],
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...getWebSiteReference(),
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    inLanguage: 'en',
    about: getTopicReference(),
  };
}

export function getHomeJsonLd() {
  const page = getPageConfig('/');

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl('/'),
    inLanguage: 'en',
    isPartOf: getWebSiteReference(),
    about: getTopicReference(),
    hasPart: essays.map((essay) => ({
      '@type': 'Article',
      headline: essay.title,
      description: essay.description,
      url: absoluteUrl(essay.slug),
    })),
  };
}

export function getEssayJsonLd(route: string) {
  const page = getPageConfig(route);
  const essay = essays.find((entry) => entry.slug === route);

  if (!essay) {
    throw new Error(`Unknown essay JSON-LD route ${route}`);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    name: essay.title,
    description: page.description,
    url: absoluteUrl(route),
    inLanguage: 'en',
    isPartOf: getWebSiteReference(),
    about: getTopicReference(),
    articleSection: essay.sections.map((section) => section.title),
  };
}

export function getReviewJsonLd() {
  const page = getPageConfig('/review');

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl('/review'),
    inLanguage: 'en',
    isPartOf: getWebSiteReference(),
    about: getTopicReference(),
  };
}
