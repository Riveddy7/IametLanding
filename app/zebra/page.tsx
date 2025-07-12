/**
 * Main Zebra landing page for IAMET
 * Combines all components into a complete landing page experience
 */

import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/zebra/HeroSection';
import ProductLines from '@/components/zebra/ProductLines';
import FinalCTA from '@/components/zebra/FinalCTA';
import { zebraCategories } from '@/lib/zebra-data';

// Force dynamic rendering to avoid build timeout issues with Genkit
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Soluciones Zebra para Industria Maquiladora | IAMET Tijuana',
  description: 'Distribuidor autorizado Zebra en Tijuana. Impresoras industriales, escáneres, RFID y tecnología de automatización para maquiladoras. Soporte técnico certificado.',
  keywords: [
    'Zebra Tijuana',
    'IAMET',
    'Maquiladora',
    'Impresoras industriales',
    'Escáneres códigos barras',
    'RFID industrial',
    'Automatización',
    'Trazabilidad',
    'Distribuidor autorizado',
    'Soporte técnico'
  ],
  openGraph: {
    title: 'Soluciones Zebra para Industria Maquiladora | IAMET Tijuana',
    description: 'Distribuidor autorizado Zebra en Tijuana. Impresoras industriales, escáneres, RFID y tecnología de automatización para maquiladoras. Soporte técnico certificado.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'IAMET',
    images: [
      {
        url: '/images/zebra-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Soluciones Zebra IAMET Tijuana',
      },
    ],
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

export default function ZebraPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Soluciones de Automatización Zebra para la Industria de Tijuana"
        subtitle="Distribuidor Autorizado | Soporte Certificado | Implementación en Sitio"
        ctaText="Descubre Nuestras Soluciones"
      />

      {/* Product Lines Section */}
      <ProductLines categories={zebraCategories} />

      {/* Final CTA Section */}
      <FinalCTA />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "IAMET",
            "description": "Distribuidor autorizado Zebra en Tijuana, México",
            "url": "https://iamet.mx",
            "logo": "https://iamet.mx/images/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+526647880797",
              "contactType": "customer service",
              "areaServed": "MX",
              "availableLanguage": ["es", "en"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Tijuana",
              "addressRegion": "Baja California",
              "addressCountry": "MX"
            },
            "sameAs": [
              "https://www.facebook.com/iamet",
              "https://www.linkedin.com/company/iamet"
            ]
          })
        }}
      />
    </>
  );
}