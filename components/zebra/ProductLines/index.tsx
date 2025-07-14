/**
 * ProductLines component for IAMET Zebra landing page
 * Displays product categories in a grid with glassmorphism cards
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Zap } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { zebraCategories } from '@/lib/zebra-data';
import { ProductLinesProps, ZebraCategory, ZebraSubcategory } from '@/types/zebra';

const ProductLines: React.FC<ProductLinesProps> = ({
  categories = zebraCategories,
  onCategoryClick
}) => {
  
  const handleCategoryClick = (category: ZebraCategory) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <section 
      id="product-lines"
      className={cn(
        // Base layout
        'py-20 px-4 relative overflow-hidden',
        
        // Background with dark theme
        'bg-gradient-to-b from-black via-zebra-gray-900 to-zebra-gray-800',
        
        // Background patterns
        'before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,rgba(6,102,204,0.1),transparent_50%)]',
        'before:opacity-60 before:pointer-events-none'
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-zebra-blue-600/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-zebra-blue-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-zebra-blue-600/20 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-zebra-blue-400" />
            </div>
            <span className="text-zebra-blue-400 font-medium">Nuestras Soluciones</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Tecnología Zebra para{' '}
            <span className="bg-gradient-to-r from-zebra-blue-400 to-zebra-blue-600 bg-clip-text text-transparent">
              Cada Proceso
            </span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo nuestras soluciones especializadas pueden transformar 
            la eficiencia de tu operación maquiladora
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <ProductCard 
              key={category.id}
              category={category}
              index={index}
              onCategoryClick={handleCategoryClick}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card variant="glassmorphism" className="inline-block p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿No encuentras lo que necesitas?
            </h3>
            <p className="text-white/70 mb-6">
              Nuestros expertos pueden ayudarte a encontrar la solución perfecta 
              para tu operación específica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary"
                onClick={() => {
                  const element = document.getElementById('final-cta');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Hablar con un Experto
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                variant="secondary"
                onClick={() => {
                  const element = document.getElementById('chat-assistant');
                  if (element) {
                    // Trigger chat assistant
                    const chatButton = element.querySelector('button');
                    if (chatButton) {
                      chatButton.click();
                    }
                  }
                }}
              >
                Chatear con Zara
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

/**
 * Individual product category card component
 */
interface ProductCardProps {
  category: ZebraCategory;
  index: number;
  onCategoryClick: (category: ZebraCategory) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  category, 
  index, 
  onCategoryClick 
}) => {
  const handleClick = () => {
    onCategoryClick(category);
  };

  // Get category-specific hero image
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
    <Link href={`/zebra/${category.slug}`} className="group">
      <Card 
        variant="glassmorphism" 
        hover={true}
        className={cn(
          'h-full cursor-pointer overflow-hidden',
          'transform transition-all duration-300 group-hover:scale-105',
          'animate-fade-in',
          // Stagger animation
          index % 2 === 0 ? 'animate-slide-up' : 'animate-slide-up'
        )}
        style={{
          animationDelay: `${index * 150}ms`
        }}
      >
        <CardHeader className="pb-4">
          {/* Category hero image */}
          <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
            <img
              src={getCategoryImage(category.id)}
              alt={`${category.name} - Zebra Products`}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Category icon overlay */}
            <div className="absolute bottom-3 right-3 w-12 h-12 bg-zebra-blue-600/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-zebra-blue-600/90 transition-colors">
              <span className="text-2xl" role="img" aria-label={category.name}>
                {category.icon}
              </span>
            </div>
            {/* Product count badge */}
            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
              <span className="text-xs text-white font-medium">
                {category.subcategories 
                  ? `${category.subcategories.length} categorías`
                  : `${category.products?.length || 0} productos`
                }
              </span>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </div>
          
          <CardTitle className="text-xl mb-2 group-hover:text-zebra-blue-400 transition-colors">
            {category.name}
          </CardTitle>
          
          <CardDescription className="text-sm line-clamp-2">
            {category.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Key benefits with enhanced styling */}
          <div className="space-y-3 mb-6">
            {category.benefits.slice(0, 3).map((benefit, benefitIndex) => (
              <div key={benefitIndex} className="flex items-start gap-3 group/benefit">
                <div className="w-2 h-2 bg-zebra-blue-400 rounded-full mt-2 flex-shrink-0 group-hover/benefit:animate-pulse-glow" />
                <span className="text-sm text-white/70 group-hover/benefit:text-white/90 transition-colors">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Enhanced navigation indicator */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm text-white/60 font-medium">
              Explorar categoría
            </span>
            <div className="flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-zebra-blue-400 group-hover:translate-x-1 transition-transform" />
              <div className="w-2 h-2 bg-zebra-blue-400 rounded-full animate-pulse" />
            </div>
          </div>
        </CardContent>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zebra-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Card>
    </Link>
  );
};

export default ProductLines;