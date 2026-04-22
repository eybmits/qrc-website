import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import { AmbientBackground } from '@/components/AmbientBackground';
import { Sidebar } from '@/components/Sidebar';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
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
        <AmbientBackground />
        <Sidebar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
