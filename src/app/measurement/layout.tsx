import { StructuredData } from '@/components/StructuredData';
import { getEssayJsonLd, getPageMetadata } from '@/lib/site';

export const metadata = getPageMetadata('/measurement');

export default function MeasurementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData data={getEssayJsonLd('/measurement')} />
      {children}
    </>
  );
}
