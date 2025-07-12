/**
 * Dynamic category page for Zebra product micro-landings
 * Creates individual landing pages for each product category
 */

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MicroLanding from '@/components/zebra/MicroLanding';
import { getCategoryBySlug, getCategorySlugs } from '@/lib/zebra-data';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: {
    categoria: string;
  };
}

/**
 * Generate metadata for each category page
 */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.categoria);
  
  if (!category) {
    return {
      title: 'Categoría no encontrada | IAMET',
      description: 'La categoría solicitada no está disponible.'
    };
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: [
      category.name,
      'Zebra',
      'IAMET',
      'Tijuana',
      'Maquiladora',
      'Automatización',
      'Distribuidor autorizado',
      ...category.benefits.slice(0, 3)
    ],
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      type: 'website',
      locale: 'es_MX',
      siteName: 'IAMET',
      images: [
        {
          url: `/images/zebra-${category.id}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${category.name} - IAMET Tijuana`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.metaTitle,
      description: category.metaDescription,
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
      canonical: `https://iamet.mx/zebra/${category.slug}`,
    },
  };
}

/**
 * Generate static paths for all categories
 */
export async function generateStaticParams() {
  const categorySlugs = getCategorySlugs();
  
  return categorySlugs.map((categoria) => ({
    categoria,
  }));
}

/**
 * Category page component
 */
export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.categoria);
  
  if (!category) {
    notFound();
  }

  return (
    <>
      <MicroLanding category={category} />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": category.name,
            "description": category.description,
            "brand": {
              "@type": "Brand",
              "name": "Zebra"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Zebra Technologies"
            },
            "distributor": {
              "@type": "Organization",
              "name": "IAMET",
              "url": "https://iamet.mx",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tijuana",
                "addressRegion": "Baja California",
                "addressCountry": "MX"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+526647880797",
                "contactType": "sales"
              }
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              "seller": {
                "@type": "Organization",
                "name": "IAMET"
              }
            },
            "category": "Industrial Equipment",
            "audience": {
              "@type": "Audience",
              "audienceType": "Manufacturing Industry"
            }
          })
        }}
      />
      
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `¿Qué incluye la solución de ${category.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Nuestras soluciones de ${category.name} incluyen productos Zebra de última generación, implementación profesional, capacitación y soporte técnico 24/7.`
                }
              },
              {
                "@type": "Question",
                "name": "¿Ofrecen soporte técnico en Tijuana?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, IAMET cuenta con técnicos certificados Zebra en Tijuana para brindar soporte local completo, desde la instalación hasta el mantenimiento preventivo."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuánto tiempo toma la implementación?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El tiempo de implementación varía según el proyecto, pero generalmente oscila entre 1-4 semanas para proyectos estándar, incluyendo configuración, pruebas y capacitación."
                }
              }
            ]
          })
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://iamet.mx"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Soluciones Zebra",
                "item": "https://iamet.mx/zebra"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": category.name,
                "item": `https://iamet.mx/zebra/${category.slug}`
              }
            ]
          })
        }}
      />
    </>
  );
}