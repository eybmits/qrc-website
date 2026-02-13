import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Quantum Reservoir Computing',
  description:
    'An explorable introduction to quantum reservoir computing, using spaced repetition to build deep understanding.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
