import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: absoluteUrl('/'),
    display: 'standalone',
    background_color: '#f9fcff',
    theme_color: '#255f93',
    icons: [
      {
        src: absoluteUrl('/icon'),
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: absoluteUrl('/apple-icon'),
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
