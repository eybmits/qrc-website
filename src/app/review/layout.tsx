import { StructuredData } from '@/components/StructuredData';
import { getPageMetadata, getReviewJsonLd } from '@/lib/site';

export const metadata = getPageMetadata('/review');

export default function ReviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData data={getReviewJsonLd()} />
      {children}
    </>
  );
}
