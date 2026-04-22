import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import { AmbientBackground } from '@/components/AmbientBackground';
import { StructuredData } from '@/components/StructuredData';
import { Sidebar } from '@/components/Sidebar';
import { socialImageAlt, socialImageSize } from '@/lib/social-image';
import { absoluteUrl, getWebSiteJsonLd, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.url}/`),
  applicationName: siteConfig.name,
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: [{ url: absoluteUrl('/icon'), type: 'image/png' }],
    apple: [{ url: absoluteUrl('/apple-icon'), type: 'image/png' }],
    shortcut: [{ url: absoluteUrl('/icon'), type: 'image/png' }],
  },
  openGraph: {
    siteName: siteConfig.name,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: socialImageSize.width,
        height: socialImageSize.height,
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/twitter-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={getWebSiteJsonLd()} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AmbientBackground />
        <Sidebar />
        <main id="main-content" className="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
