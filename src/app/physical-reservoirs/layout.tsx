import { StructuredData } from '@/components/StructuredData';
import { getEssayJsonLd, getPageMetadata } from '@/lib/site';

export const metadata = getPageMetadata('/physical-reservoirs');

export default function PhysicalReservoirsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData data={getEssayJsonLd('/physical-reservoirs')} />
      {children}
    </>
  );
}
