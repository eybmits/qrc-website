import { StructuredData } from '@/components/StructuredData';
import { getEssayJsonLd, getPageMetadata } from '@/lib/site';

export const metadata = getPageMetadata('/quantum-primer');

export default function QuantumPrimerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData data={getEssayJsonLd('/quantum-primer')} />
      {children}
    </>
  );
}
