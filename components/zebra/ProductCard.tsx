/**
 * Client-side ProductCard component with interactive elements
 */
'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { generateWhatsAppURL } from '@/lib/utils';
import { ZebraProduct } from '@/types/zebra';

interface ProductCardProps {
  product: ZebraProduct;
}

/**
 * Interactive product card component
 * @param product - Zebra product data
 * @returns Product card with CTA button
 */
export default function ProductCard({ product }: ProductCardProps) {
  const handleQuoteClick = () => {
    window.open(generateWhatsAppURL(product.name), '_blank');
  };

  // Get category-specific product image
  const getProductImage = (category: string) => {
    const imageMap: { [key: string]: string } = {
      'impresoras': 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/zcom-products-page/printer-products-photography-website-4x3-3600.jpg',
      'scanners': 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/zcom-products-page/scanner-products-photography-website-4x3-3600.jpg',
      'rfid': 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/zcom-products-page/scanner-products-photography-website-4x3-3600.jpg',
      'computadoras-moviles': 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/zcom-products-page/mobile-computer-products-photography-website-4x3-3600.jpg',
      'vision-artificial': 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/zcom-products-page/scanner-products-photography-website-4x3-3600.jpg',
      'localizacion': 'https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/zcom-products-page/mobile-computer-products-photography-website-4x3-3600.jpg'
    };
    return imageMap[category] || imageMap['impresoras'];
  };

  return (
    <Card variant="glassmorphism" className="h-full hover:scale-105 transition-all duration-300 group">
      <CardHeader>
        {/* Product category image */}
        <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
          <img
            src={getProductImage(product.category)}
            alt={`${product.name} - Zebra`}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Product icon overlay */}
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-zebra-blue-600/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <span className="text-lg" role="img" aria-label={product.name}>
              {product.icon}
            </span>
          </div>
          {/* Hover shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        </div>
        
        <CardTitle className="text-xl group-hover:text-zebra-blue-400 transition-colors">{product.name}</CardTitle>
        <CardDescription className="text-sm">{product.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Features */}
        <div className="space-y-2 mb-6">
          {product.features?.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-zebra-blue-400 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-white/80">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Industries */}
        {product.industries && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-2">Industrias:</h4>
            <div className="flex flex-wrap gap-2">
              {product.industries.map((industry, industryIndex) => (
                <span
                  key={industryIndex}
                  className="px-2 py-1 bg-zebra-blue-600/20 text-zebra-blue-400 text-xs rounded-full"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Enhanced CTA Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full group-hover:bg-zebra-blue-600/20 group-hover:border-zebra-blue-400/50 transition-all duration-300 relative overflow-hidden"
          onClick={handleQuoteClick}
        >
          <span className="relative z-10">Cotizar {product.name}</span>
          <ExternalLink className="w-4 h-4 ml-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          {/* Button shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zebra-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
        </Button>
      </CardContent>
    </Card>
  );
}