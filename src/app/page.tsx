import { Hero } from '@/components/Hero';
import { StructuredData } from '@/components/StructuredData';
import { getHomeJsonLd, getPageMetadata } from '@/lib/site';

export const metadata = getPageMetadata('/');

export default function Home() {
  return (
    <>
      <StructuredData data={getHomeJsonLd()} />
      <Hero />
    </>
  );
}
