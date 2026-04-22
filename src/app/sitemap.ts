import type { MetadataRoute } from 'next';
import { essays } from '@/data/toc';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ['/', '/review', ...essays.map((essay) => essay.slug)];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/review' ? 0.85 : 0.8,
  }));
}
