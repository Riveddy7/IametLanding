/**
 * Zebra section layout for IAMET landing page
 * Provides shared layout for all zebra-related pages
 */

import { Metadata } from 'next';
import N8nDirectChat from '@/components/zebra/ChatAssistant/N8nDirectChat';

export const metadata: Metadata = {
  title: 'Soluciones Zebra para Industria Maquiladora | IAMET Tijuana',
  description: 'Distribuidor autorizado Zebra en Tijuana. Impresoras industriales, escáneres, RFID y tecnología de automatización para maquiladoras.',
  keywords: [
    'Zebra',
    'IAMET',
    'Tijuana',
    'Maquiladora',
    'Impresoras industriales',
    'Escáneres',
    'RFID',
    'Automatización',
    'Códigos de barras',
    'Trazabilidad'
  ],
  openGraph: {
    title: 'Soluciones Zebra para Industria Maquiladora | IAMET Tijuana',
    description: 'Distribuidor autorizado Zebra en Tijuana. Impresoras industriales, escáneres, RFID y tecnología de automatización para maquiladoras.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'IAMET',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluciones Zebra para Industria Maquiladora | IAMET Tijuana',
    description: 'Distribuidor autorizado Zebra en Tijuana. Impresoras industriales, escáneres, RFID y tecnología de automatización para maquiladoras.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://iamet.mx/zebra',
  },
};

interface ZebraLayoutProps {
  children: React.ReactNode;
}

export default function ZebraLayout({ children }: ZebraLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main content */}
      <main className="relative">
        {children}
      </main>

      {/* N8n Direct Chat - Available on all zebra pages */}
      <N8nDirectChat />
    </div>
  );
}