import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Show Me Your Prime Another Time', description: 'Personal nutrition and progress dashboard' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="it"><body>{children}</body></html>;
}
