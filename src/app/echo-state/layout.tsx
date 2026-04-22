import { StructuredData } from '@/components/StructuredData';
import { getEssayJsonLd, getPageMetadata } from '@/lib/site';

export const metadata = getPageMetadata('/echo-state');

export default function EchoStateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData data={getEssayJsonLd('/echo-state')} />
      {children}
    </>
  );
}
