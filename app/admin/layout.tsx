import type { Metadata } from 'next';
import AdminKeyGate from '../../components/AdminKeyGate';

export const runtime = 'edge';
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminKeyGate>{children}</AdminKeyGate>;
}
