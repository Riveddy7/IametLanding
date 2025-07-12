/**
 * MicroLanding component for individual product category pages
 * Creates a dedicated landing page experience for each Zebra product category
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, Download, MessageCircle, Phone, Zap, Star, CheckCircle, Building2, TrendingUp } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ZebraCategory } from '@/types/zebra';

interface MicroLandingProps {
  category: ZebraCategory;
}

/**
 * Hero section for the micro-landing page
 */
const CategoryHero: React.FC<{ category: ZebraCategory }> = ({ category }) => {
  const getCategoryImage = (categoryId: string) => {
    const imageMap: { [key: string]: string } = {
      'impresoras': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/warehouse-photography-application-packing-zt610.png.renditions/card/asset.rendition',
      'scanners': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/ds9908-photography-application-website-department-store-handsfree-mobile-barcode-website.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
      'rfid': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/manufacturing-photography-application-fxr90-rfid-antenna-food-chicken-an520.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
      'computadoras-moviles': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/retail-photography-application-store-clothing-close-up-rfid-et40-rfd40.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
      'vision-artificial': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/electronics-photography-application-fs80-code-reading.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
      'consumibles': 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/zcom-products-page/printing-supplies-products-photography-website-4x3-3600.jpg'
    };
    return imageMap[categoryId] || imageMap['impresoras'];
  };

  return (
    <section className={cn(
      'relative min-h-screen flex items-center justify-center overflow-hidden',
      'bg-gradient-to-br from-black via-zebra-gray-900 to-zebra-gray-800'
    )}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={getCategoryImage(category.id)}
          alt={`${category.name} - Zebra Solutions`}
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-zebra-blue-600/20 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-zebra-blue-500/15 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-zebra-blue-600/10 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      {/* Navigation breadcrumb */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/zebra" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver a Soluciones Zebra</span>
        </Link>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Category icon and badge */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-zebra-blue-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-4xl" role="img" aria-label={category.name}>
                {category.icon}
              </span>
            </div>
            <div className="text-left">
              <span className="text-zebra-blue-400 font-medium text-sm">Zebra Solutions</span>
              <div className="text-white/60 text-xs">
                {category.subcategories 
                  ? `${category.subcategories.length} categorías disponibles`
                  : `${category.products?.length || 0} productos disponibles`
                }
              </div>
            </div>
          </div>

          {/* Main title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-zebra-blue-400 to-zebra-blue-600 bg-clip-text text-transparent">
              {category.name}
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-white/90">
              para Maquiladoras
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            {category.description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="primary" className="text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5" />
              Consulta Gratuita
            </Button>
            <Button variant="secondary" className="text-lg px-8 py-4">
              <Download className="w-5 h-5" />
              Catálogo de Productos
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-zebra-blue-400">15+</div>
              <div className="text-sm text-white/60">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-zebra-blue-400">500+</div>
              <div className="text-sm text-white/60">Proyectos Implementados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-zebra-blue-400">24/7</div>
              <div className="text-sm text-white/60">Soporte Técnico</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

/**
 * Benefits section with enhanced visuals
 */
const BenefitsSection: React.FC<{ category: ZebraCategory }> = ({ category }) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-zebra-gray-800 to-black relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-zebra-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-zebra-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-zebra-blue-400" />
            <span className="text-zebra-blue-400 font-medium">Beneficios Clave</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Por qué elegir nuestras soluciones de{' '}
            <span className="bg-gradient-to-r from-zebra-blue-400 to-zebra-blue-600 bg-clip-text text-transparent">
              {category.name}?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.benefits.map((benefit, index) => (
            <Card 
              key={index} 
              variant="glassmorphism" 
              className={cn(
                'h-full text-center p-6 animate-fade-in',
                'hover:scale-105 transition-all duration-300'
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 bg-zebra-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-zebra-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit}</h3>
              <p className="text-white/70 text-sm">
                Optimizado para las necesidades específicas de la industria maquiladora
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Products/Subcategories showcase section
 */
const ProductsShowcase: React.FC<{ category: ZebraCategory }> = ({ category }) => {
  // Determine whether to show products or subcategories
  const items = category.subcategories || category.products || [];
  const isSubcategories = !!category.subcategories;
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-zebra-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 className="w-6 h-6 text-zebra-blue-400" />
            <span className="text-zebra-blue-400 font-medium">
              {isSubcategories ? 'Categorías de Productos' : 'Productos Destacados'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {isSubcategories ? 'Tipos de ' : 'Soluciones de '}
            <span className="bg-gradient-to-r from-zebra-blue-400 to-zebra-blue-600 bg-clip-text text-transparent">
              {category.name}
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {isSubcategories 
              ? 'Explora nuestras categorías especializadas de impresoras Zebra para cada necesidad'
              : 'Descubre nuestra selección de productos Zebra especializados para tu industria'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card 
              key={item.id} 
              variant="glassmorphism" 
              hover={true}
              className={cn(
                'h-full cursor-pointer overflow-hidden animate-slide-up',
                'group transform transition-all duration-300 hover:scale-105'
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-zebra-blue-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-zebra-blue-600/30 transition-colors">
                  <span className="text-2xl" role="img">
                    {item.icon}
                  </span>
                </div>
                
                <CardTitle className="text-xl mb-2 group-hover:text-zebra-blue-400 transition-colors">
                  {item.name}
                </CardTitle>
                
                <CardDescription className="text-sm mb-4">
                  {item.description}
                </CardDescription>

                {/* Model count for subcategories */}
                {isSubcategories && 'modelCount' in item && (
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="px-2 py-1 bg-zebra-blue-600/20 rounded-full">
                      <span className="text-xs text-zebra-blue-300 font-medium">
                        {item.modelCount} modelos disponibles
                      </span>
                    </div>
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                {item.features && (
                  <div className="space-y-2 mb-6">
                    {item.features.slice(0, 4).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-zebra-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Use Cases for subcategories */}
                {isSubcategories && 'useCases' in item && item.useCases && (
                  <div className="mb-4">
                    <div className="text-xs text-white/50 mb-2">Casos de Uso:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.useCases.slice(0, 2).map((useCase, useCaseIndex) => (
                        <span 
                          key={useCaseIndex}
                          className="text-xs px-2 py-1 bg-green-600/20 text-green-300 rounded-full"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Industries */}
                {item.industries && (
                  <div className="mb-4">
                    <div className="text-xs text-white/50 mb-2">Industrias:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.industries.slice(0, 3).map((industry, industryIndex) => (
                        <span 
                          key={industryIndex}
                          className="text-xs px-2 py-1 bg-zebra-blue-600/20 text-zebra-blue-300 rounded-full"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-white/60">Más información</span>
                  <ChevronRight className="w-5 h-5 text-zebra-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Industries section
 */
const IndustriesSection: React.FC<{ category: ZebraCategory }> = ({ category }) => {
  // Get industries from either products or subcategories
  const items = category.subcategories || category.products || [];
  const uniqueIndustries = Array.from(new Set(
    items.flatMap(item => item.industries || [])
  ));

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-zebra-gray-900 to-zebra-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-zebra-blue-400" />
            <span className="text-zebra-blue-400 font-medium">Industrias Atendidas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Soluciones para{' '}
            <span className="bg-gradient-to-r from-zebra-blue-400 to-zebra-blue-600 bg-clip-text text-transparent">
              Múltiples Sectores
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {uniqueIndustries.map((industry, index) => (
            <Card 
              key={index} 
              variant="glassmorphism" 
              className={cn(
                'text-center p-6 animate-fade-in',
                'hover:scale-105 transition-all duration-300'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 bg-zebra-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-4 h-4 text-zebra-blue-400" />
              </div>
              <h3 className="font-semibold text-white text-sm">{industry}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Final CTA section for the micro-landing
 */
const MicroLandingCTA: React.FC<{ category: ZebraCategory }> = ({ category }) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-zebra-gray-800 to-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <Card variant="glassmorphism" className="p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para implementar{' '}
            <span className="bg-gradient-to-r from-zebra-blue-400 to-zebra-blue-600 bg-clip-text text-transparent">
              {category.name}?
            </span>
          </h2>
          
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Nuestros expertos te ayudarán a encontrar la solución perfecta para tu operación maquiladora
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="primary" className="text-lg px-8 py-4">
              <Phone className="w-5 h-5" />
              Llamar Ahora: (664) 788-0797
            </Button>
            <Button variant="secondary" className="text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-white/60">
            <div>
              <Zap className="w-5 h-5 text-zebra-blue-400 mx-auto mb-2" />
              <div>Consulta Gratuita</div>
            </div>
            <div>
              <CheckCircle className="w-5 h-5 text-zebra-blue-400 mx-auto mb-2" />
              <div>Implementación Garantizada</div>
            </div>
            <div>
              <Phone className="w-5 h-5 text-zebra-blue-400 mx-auto mb-2" />
              <div>Soporte 24/7</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

/**
 * Main MicroLanding component
 */
const MicroLanding: React.FC<MicroLandingProps> = ({ category }) => {
  return (
    <main className="min-h-screen">
      <CategoryHero category={category} />
      <BenefitsSection category={category} />
      <ProductsShowcase category={category} />
      <IndustriesSection category={category} />
      <MicroLandingCTA category={category} />
    </main>
  );
};

export default MicroLanding;