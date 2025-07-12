/**
 * Root layout for IAMET application
 * Provides global layout and configuration
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import Inter font with Latin subset
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'IAMET - Soluciones Industriales y Tecnología',
    template: '%s | IAMET',
  },
  description: 'IAMET ofrece soluciones industriales avanzadas, distribuidor autorizado Zebra en Tijuana. Especializados en automatización, impresoras industriales, escáneres y tecnología RFID para maquiladoras.',
  keywords: [
    'IAMET',
    'Tijuana',
    'Maquiladora',
    'Zebra',
    'Impresoras industriales',
    'Escáneres',
    'RFID',
    'Automatización industrial',
    'Tecnología',
    'Distribuidores',
  ],
  authors: [{ name: 'IAMET' }],
  creator: 'IAMET',
  publisher: 'IAMET',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://iamet.mx'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://iamet.mx',
    title: 'IAMET - Soluciones Industriales y Tecnología',
    description: 'IAMET ofrece soluciones industriales avanzadas, distribuidor autorizado Zebra en Tijuana. Especializados en automatización para maquiladoras.',
    siteName: 'IAMET',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IAMET - Soluciones Industriales y Tecnología',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IAMET - Soluciones Industriales y Tecnología',
    description: 'Distribuidor autorizado Zebra en Tijuana. Soluciones de automatización industrial para maquiladoras.',
    images: ['/twitter-image.jpg'],
    creator: '@iamet_mx',
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
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0066CC' },
    { media: '(prefers-color-scheme: dark)', color: '#0066CC' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className="dark">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://iamet.mx" />
        <link rel="prefetch" href="/zebra" />
      </head>
      <body 
        className={`${inter.variable} font-sans antialiased min-h-screen bg-black text-white`}
        suppressHydrationWarning={true}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-zebra-blue-600 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-white"
        >
          Saltar al contenido principal
        </a>

        {/* Main application content */}
        <div id="main-content" role="main">
          {children}
        </div>

        {/* Analytics and tracking scripts */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            {process.env.NEXT_PUBLIC_GA_ID && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                        page_title: document.title,
                        page_location: window.location.href,
                      });
                    `,
                  }}
                />
              </>
            )}

            {/* Facebook Pixel */}
            {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                    fbq('track', 'PageView');
                  `,
                }}
              />
            )}
          </>
        )}

        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IAMET",
              "url": "https://iamet.mx",
              "logo": "https://iamet.mx/images/logo.png",
              "description": "Distribuidor autorizado Zebra en Tijuana, México. Soluciones de automatización industrial para maquiladoras.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tijuana",
                "addressRegion": "Baja California",
                "addressCountry": "MX"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+526647880797",
                "contactType": "customer service",
                "areaServed": "MX",
                "availableLanguage": ["es", "en"]
              },
              "sameAs": [
                "https://www.facebook.com/iamet",
                "https://www.linkedin.com/company/iamet"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}