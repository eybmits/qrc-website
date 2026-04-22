import { StructuredData } from '@/components/StructuredData';
import { getEssayJsonLd, getPageMetadata } from '@/lib/site';

export const metadata = getPageMetadata('/qrc');

export default function QrcLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData data={getEssayJsonLd('/qrc')} />
      {children}
    </>
  );
}
