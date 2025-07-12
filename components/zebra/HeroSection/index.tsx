/**
 * HeroSection component for IAMET Zebra landing page
 * Features glassmorphism background and mobile-first responsive design
 */

'use client';

import React from 'react';
import { ArrowRight, Shield, Wrench, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { HeroSectionProps } from '@/types/zebra';

const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'Soluciones de Automatización Zebra para la Industria de Tijuana',
  subtitle = 'Distribuidor Autorizado | Soporte Certificado | Implementación en Sitio',
  backgroundImage,
  ctaText = 'Descubre Nuestras Soluciones',
  ctaAction
}) => {
  
  const scrollToProductLines = () => {
    const element = document.getElementById('product-lines');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTAClick = () => {
    if (ctaAction) {
      ctaAction();
    } else {
      scrollToProductLines();
    }
  };

  return (
    <section 
      className={cn(
        // Base layout - full height hero
        'relative min-h-screen flex items-center justify-center',
        'px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden',
        
        // Enhanced animated background
        'bg-gradient-to-br from-zebra-gray-900 via-zebra-gray-800 to-black',
        'animate-gradient-xy',
        
        // Multiple layered background effects
        'before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_50%_50%,rgba(6,102,204,0.15),transparent_60%)]',
        'before:opacity-70 before:pointer-events-none before:animate-pulse-slow',
        
        // Animated conic gradient overlay
        'after:absolute after:inset-0 after:bg-[conic-gradient(from_45deg,transparent,rgba(6,102,204,0.08),transparent_50%,rgba(59,130,246,0.05),transparent)]',
        'after:opacity-60 after:pointer-events-none after:animate-spin-slow',
      )}
      role="banner"
    >
      {/* Enhanced Background decorations with particle animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main lighting effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-zebra-blue-600/25 to-zebra-blue-500/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-t from-zebra-blue-500/20 to-zebra-blue-400/10 rounded-full blur-3xl animate-float" />
        
        {/* Additional ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-zebra-blue-400/10 rounded-full blur-2xl animate-particle-float-1" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-zebra-blue-600/15 rounded-full blur-xl animate-particle-float-2" />
        
        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-zebra-blue-400/60 rounded-full animate-particle-float-3" />
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-zebra-blue-500/80 rounded-full animate-particle-float-1" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-zebra-blue-300/70 rounded-full animate-particle-float-2" style={{animationDelay: '4s'}} />
        <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-zebra-blue-400/50 rounded-full animate-particle-float-3" style={{animationDelay: '1s'}} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left column - Main content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            
            {/* Company badge */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4 lg:mb-6">
              <Card variant="glassmorphism" className="px-3 sm:px-4 py-2 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-zebra-blue-400 animate-pulse-glow" />
                  <span className="font-semibold">IAMET</span>
                  <span className="text-white/70 hidden sm:inline">Distribuidor Autorizado Zebra</span>
                  <span className="text-white/70 sm:hidden">Autorizado Zebra</span>
                </div>
              </Card>
            </div>

            {/* Main headline with enhanced mobile typography */}
            <h1 className={cn(
              'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold',
              'text-white leading-tight mb-4 lg:mb-6',
              'bg-gradient-to-r from-white via-white to-zebra-blue-400 bg-clip-text text-transparent',
              'animate-fade-in'
            )}>
              {title}
            </h1>

            {/* Subtitle with better mobile spacing */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* Feature highlights with improved mobile layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-white/90 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 bg-zebra-blue-600/20 rounded-full flex items-center justify-center animate-pulse-glow">
                  <Zap className="w-4 h-4 text-zebra-blue-400" />
                </div>
                <span className="text-sm md:text-base font-medium">Productividad +40%</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-white/90 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 bg-zebra-blue-600/20 rounded-full flex items-center justify-center animate-pulse-glow" style={{animationDelay: '0.5s'}}>
                  <Wrench className="w-4 h-4 text-zebra-blue-400" />
                </div>
                <span className="text-sm md:text-base font-medium">Soporte Local</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-white/90 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors sm:col-span-2 lg:col-span-1">
                <div className="w-8 h-8 bg-zebra-blue-600/20 rounded-full flex items-center justify-center animate-pulse-glow" style={{animationDelay: '1s'}}>
                  <Shield className="w-4 h-4 text-zebra-blue-400" />
                </div>
                <span className="text-sm md:text-base font-medium">Garantía Total</span>
              </div>
            </div>

            {/* Enhanced CTA buttons with better mobile layout */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCTAClick}
                className="group relative overflow-hidden animate-pulse-glow"
              >
                <span className="relative z-10">{ctaText}</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  const element = document.getElementById('final-cta');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group hover:scale-105 transition-transform duration-300"
              >
                Hablar con un Experto
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2" />
              </Button>
            </div>

            {/* Enhanced trust indicators */}
            <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-white/20">
              <p className="text-xs sm:text-sm text-white/60 mb-4 font-medium">
                Empresas que confían en nuestras soluciones:
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start text-white/50">
                <span className="text-xs sm:text-sm font-medium hover:text-white/70 transition-colors">Toyota</span>
                <span className="text-xs sm:text-sm">•</span>
                <span className="text-xs sm:text-sm font-medium hover:text-white/70 transition-colors">Foxconn</span>
                <span className="text-xs sm:text-sm">•</span>
                <span className="text-xs sm:text-sm font-medium hover:text-white/70 transition-colors">Honeywell</span>
                <span className="text-xs sm:text-sm">•</span>
                <span className="text-xs sm:text-sm font-medium hover:text-white/70 transition-colors">Plantronics</span>
                <span className="text-xs sm:text-sm">•</span>
                <span className="text-xs sm:text-sm font-medium text-zebra-blue-400">+200 más</span>
              </div>
            </div>
          </div>

          {/* Right column - Enhanced Visual element */}
          <div className="relative order-first lg:order-last">
            
            {/* Hero product showcase */}
            <div className="relative mb-6 lg:mb-0">
              <Card 
                variant="glassmorphism" 
                className="p-6 lg:p-8 relative overflow-hidden hover:scale-105 transition-transform duration-500"
                hover={true}
              >
                {/* Product hero image */}
                <div className="relative mb-6">
                  <div className="aspect-video bg-gradient-to-br from-zebra-blue-600/20 to-zebra-gray-800/40 rounded-xl overflow-hidden relative">
                    {/* Zebra printer product image */}
                    <img 
                      src="https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/web004/manufacturing-photography-website-electronics-sub-industry-16x9-3600x3600-1.jpg.imgw.3600.3600.jpg"
                      alt="Impresoras Industriales Zebra"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Overlay text */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-white text-sm font-medium">Impresoras Industriales Zebra</p>
                        <p className="text-white/70 text-xs">Serie ZT400 & ZT600</p>
                      </div>
                    </div>
                    {/* Floating product indicators */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse z-10" />
                  </div>
                </div>
                
                {/* Enhanced content */}
                <div className="relative z-10">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">
                    ¿Por qué elegir Zebra?
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 bg-zebra-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-zebra-blue-500/30 transition-colors">
                        <div className="w-2 h-2 bg-zebra-blue-400 rounded-full animate-pulse-glow" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 group-hover:text-zebra-blue-400 transition-colors">
                          Tecnología Probada
                        </h4>
                        <p className="text-sm text-white/70">
                          Líder mundial en identificación automática y captura de datos
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 bg-zebra-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-zebra-blue-500/30 transition-colors">
                        <div className="w-2 h-2 bg-zebra-blue-400 rounded-full animate-pulse-glow" style={{animationDelay: '0.5s'}} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 group-hover:text-zebra-blue-400 transition-colors">
                          ROI Inmediato
                        </h4>
                        <p className="text-sm text-white/70">
                          Retorno de inversión comprobado en menos de 6 meses
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 group">
                      <div className="w-6 h-6 bg-zebra-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-zebra-blue-500/30 transition-colors">
                        <div className="w-2 h-2 bg-zebra-blue-400 rounded-full animate-pulse-glow" style={{animationDelay: '1s'}} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 group-hover:text-zebra-blue-400 transition-colors">
                          Soporte Especializado
                        </h4>
                        <p className="text-sm text-white/70">
                          Equipo técnico certificado con presencia en Tijuana
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced background decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zebra-blue-500/20 to-transparent rounded-full blur-2xl animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-zebra-blue-400/10 to-transparent rounded-full blur-xl animate-float" />
                
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              </Card>
            </div>

            {/* Enhanced floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-zebra-blue-500/40 rounded-full blur-sm animate-particle-float-1" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-zebra-blue-400/30 rounded-full blur-md animate-particle-float-2" />
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-zebra-blue-300/50 rounded-full blur-sm animate-particle-float-3" />
            <div className="absolute bottom-1/4 -right-2 w-4 h-4 bg-zebra-blue-600/60 rounded-full blur-sm animate-float" style={{animationDelay: '2s'}} />
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

export default HeroSection;