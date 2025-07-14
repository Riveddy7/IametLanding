/**
 * MicroLanding component for individual product category pages
 * Creates a dedicated landing page experience for each Zebra product category
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, Download, MessageCircle, Phone, Zap, Star, CheckCircle, Building2 } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn, generateCalendlyURL, generateWhatsAppURL } from '@/lib/utils';
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
      'consumibles': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/product/0021/ready-to-use-environmental-sensors-supplies-photography-website-16x9.jpg.renditions/card/asset.rendition'
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
            <Button 
              variant="primary" 
              className="text-lg px-8 py-4"
              onClick={() => window.open(generateCalendlyURL(category.name), '_blank')}
            >
              <MessageCircle className="w-5 h-5" />
              Consulta Gratuita
            </Button>
            <Button 
              variant="secondary" 
              className="text-lg px-8 py-4"
              onClick={() => window.open(generateWhatsAppURL(category.name, `Hola, me interesa obtener el catálogo de productos de ${category.name}. ¿Podrían enviarme más información?`), '_blank')}
            >
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
 * Benefits section with enhanced visuals and mobile carousel
 */
const BenefitsSection: React.FC<{ category: ZebraCategory }> = ({ category }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const benefitsPerSlide = 1; // Mobile: 1 benefit per slide
  const totalSlides = Math.ceil(category.benefits.length / benefitsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-advance carousel on mobile
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

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

        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {category.benefits.map((benefit, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card 
                      variant="glassmorphism" 
                      className="text-center p-8 animate-fade-in hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-zebra-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-zebra-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{benefit}</h3>
                      <p className="text-white/70 text-base leading-relaxed">
                        Optimizado para las necesidades específicas de la industria maquiladora
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-zebra-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-zebra-blue-600/30 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-zebra-blue-400" />
              </button>
              
              {/* Dots indicator */}
              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      'w-3 h-3 rounded-full transition-all duration-300',
                      currentSlide === index 
                        ? 'bg-zebra-blue-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    )}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-zebra-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-zebra-blue-600/30 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-zebra-blue-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid (unchanged) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

  // Get specific product/subcategory images from Zebra official site
  const getItemImage = (item: any, categoryId: string) => {
    // Specific images for subcategories based on category
    if (categoryId === 'impresoras') {
      const printerImageMap: { [key: string]: string } = {
        'desktop': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0001/retail-photography-application-lowes-zd421-3.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'industrial': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/warehouse-photography-application-packing-zt610.png/_jcr_content/renditions/cq5dam.web.1280.1280.png',
        'mobile': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/zq630-photography-application-cold-storage-print-label.png/_jcr_content/renditions/cq5dam.web.1280.1280.png',
        'card': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/zc300-retail-loyalty-card-closeup-we0455-png.png/_jcr_content/renditions/cq5dam.web.1280.1280.png',
        'print-engines': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0001/warehouse-photography-application-lowes-ze500-5.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'healthcare': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0006/healthcare-photography-application-zd611d-hc-patient-bedside-blood-label-printing.png/_jcr_content/renditions/cq5dam.web.1280.1280.png'
      };
      return printerImageMap[item.id] || printerImageMap['desktop'];
    }
    
    if (categoryId === 'scanners') {
      const scannerImageMap: { [key: string]: string } = {
        'handheld-general': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0003/ds8100hc-healthcare-patient-bedside-id-scanning-a29q1994.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'hands-free-general': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/ds9908-photography-application-website-department-store-handsfree-mobile-barcode-website.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'ultra-rugged': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/ds3600-xr-warehouse-photography-application-order-scanning-close-up.png/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'retail-scale': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/retail-photography-application-mp72-grocery-self-checkout-closeup-oil.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'fixed-mount': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/healthcare-lab-photography-application-ds55-specimen-scanning-closeup-handsfree.png/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg'
      };
      return scannerImageMap[item.id] || scannerImageMap['handheld-general'];
    }

    if (categoryId === 'rfid') {
      const rfidImageMap: { [key: string]: string } = {
        'handheld-rfid': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0001/rfd90-photography-application-standard-range-tc26-manufacturing-plant-floor-rfid.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'fixed-rfid': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/manufacturing-photography-application-fxr90-rfid-antenna-food-chicken-an520.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'rfid-antennas': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0003/001_FX9500%20Warehouse_D3X2961_tiff-cmyk.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'rfid-printers': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0006/zt231-warehouse-photography-application-rfid-label-pealing-supplies.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'rfid-labels': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/warehouse-photography-application-zbr2000-rfid-inlay.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg'
      };
      return rfidImageMap[item.id] || rfidImageMap['handheld-rfid'];
    }

    if (categoryId === 'computadoras-moviles') {
      const mobileImageMap: { [key: string]: string } = {
        'handheld-computers': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/manufacturing-photography-application-mc9300-tc52-fx9600-ds3600-mc3390xr-mc3300r.png/_jcr_content/renditions/cq5dam.web.1280.1280.png',
        'vehicle-mounted': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0002/vc8300-10in-photography-application-new-put-away-screen-in-focus.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'wearable-computers': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0001/delivery-photography-application-ws50-convergence.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg'
      };
      return mobileImageMap[item.id] || mobileImageMap['handheld-computers'];
    }

    if (categoryId === 'vision-artificial') {
      const visionImageMap: { [key: string]: string } = {
        'fixed-scanners': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/electronics-photography-application-fs80-code-reading.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'vision-controllers': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/warehouse-photography-application-fs40-scanning-conveyor-bottles.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'machine-vision-cameras': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/manufacturing-photography-application-cv60-semiconductor-inspection.png/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'smart-sensors': 'https://medialibrary.zebra.com/content/dam/zebra_dam/en/video/product-solutions-portfolio/0001/mv-fis-video-persona-based-marketing-campaign-01-05-22-en-us.mp4/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
        'digitizers-io': 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/web001/photography-web-thought-hero-warehouse-turnover-4x3-3600.jpg.imgw.1200.1200.jpg',
        '3d-sensors': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0008/manufacturing-photography-application-altiz-assembly-inspection.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg'
      };
      return visionImageMap[item.id] || visionImageMap['fixed-scanners'];
    }

    if (categoryId === 'consumibles') {
      const consumiblesImageMap: { [key: string]: string } = {
        'barcode-labels': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/zq630-photography-application-cold-storage-print-label.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'hospital-wristbands': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0002/laserband-photography-application-doctor-checking-pulse-small.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'event-wristbands': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0002/laser-wristband-environmental-1280.jpg.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'rfid-supplies': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/product/0017/rfidinlay-zt411r-supplies3-photography-product.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'thermal-ribbons': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0006/zt231-warehouse-photography-application-ribbon-load-supplies.tif/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'receipt-paper': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0002/receipt-paper-1280.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
        'card-supplies': 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0004/zc300-retail-loyalty-card-closeup-we0455-png.png/_jcr_content/renditions/cq5dam.web.1280.1280.png'
      };
      return consumiblesImageMap[item.id] || consumiblesImageMap['barcode-labels'];
    }

    // Final fallback for any unmapped categories
    return 'https://medialibrary.zebra.com/content/dam/zebra_dam/global/photography/application/0001/warehouse-photography-application-packing-zt610.png/_jcr_content/renditions/cq5dam.web.1280.1280.png';
  };
  
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
            <div
              key={item.id}
              className={cn(
                'relative h-full min-h-[450px] cursor-pointer overflow-hidden rounded-2xl',
                'group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl',
                'animate-slide-up border border-white/10'
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={getItemImage(item, category.id)}
                  alt={`${item.name} - Zebra Product`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/85 transition-all duration-500" />
              </div>

              {/* Glassmorphism Content Container */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                
                {/* Top Section - Badges */}
                <div className="flex justify-between items-start">
                  {/* Model count badge for subcategories */}
                  {isSubcategories && 'modelCount' in item && (
                    <div className="px-3 py-2 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg">
                      <span className="text-xs text-white font-semibold">
                        {item.modelCount} modelos
                      </span>
                    </div>
                  )}
                  
                  {/* Quality indicator */}
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg" />
                </div>

                {/* Middle Section - Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 shadow-lg group-hover:bg-white/15 transition-all duration-300">
                    <span className="text-3xl animate-pulse-glow" role="img">
                      {item.icon}
                    </span>
                  </div>
                </div>

                {/* Bottom Section - Content with Glassmorphism */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg group-hover:bg-white/15 transition-all duration-300">
                  
                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-zebra-blue-300 transition-colors">
                    {item.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Features */}
                  {item.features && (
                    <div className="space-y-2 mb-4">
                      {item.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-zebra-blue-400 rounded-full mt-1.5 flex-shrink-0 group-hover:animate-pulse-glow" />
                          <span className="text-xs text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Use Cases for subcategories */}
                  {isSubcategories && 'useCases' in item && item.useCases && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {item.useCases.slice(0, 2).map((useCase, useCaseIndex) => (
                          <span 
                            key={useCaseIndex}
                            className="text-xs px-2 py-1 bg-green-600/30 backdrop-blur-sm text-green-200 rounded-full border border-green-400/20"
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
                      <div className="flex flex-wrap gap-1">
                        {item.industries.slice(0, 2).map((industry, industryIndex) => (
                          <span 
                            key={industryIndex}
                            className="text-xs px-2 py-1 bg-zebra-blue-600/30 backdrop-blur-sm text-zebra-blue-200 rounded-full border border-zebra-blue-400/20"
                          >
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/30">
                    <span className="text-white/80 font-semibold text-sm">
                      Más información
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-zebra-blue-400 rounded-full animate-pulse" />
                      <ChevronRight className="w-5 h-5 text-zebra-blue-400 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-zebra-blue-600/0 to-zebra-blue-600/0 group-hover:from-zebra-blue-600/10 group-hover:to-zebra-blue-600/5 transition-all duration-500 pointer-events-none rounded-2xl" />
            </div>
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
            <Button 
              variant="primary" 
              className="text-lg px-8 py-4"
              onClick={() => window.open(generateCalendlyURL(category.name), '_blank')}
            >
              <MessageCircle className="w-5 h-5" />
              Agendar Reunión
            </Button>
            <Button 
              variant="secondary" 
              className="text-lg px-8 py-4"
              onClick={() => window.open('tel:+526647880797')}
            >
              <Phone className="w-5 h-5" />
              Llamar Ahora: (664) 788-0797
            </Button>
            <Button 
              variant="secondary" 
              className="text-lg px-8 py-4"
              onClick={() => window.open(generateWhatsAppURL(category.name, `Hola, me interesa agendar una reunión para discutir soluciones de ${category.name} para mi empresa.`), '_blank')}
            >
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
      <MicroLandingCTA category={category} />
    </main>
  );
};

export default MicroLanding;