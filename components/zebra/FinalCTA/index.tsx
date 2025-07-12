/**
 * FinalCTA component for IAMET Zebra landing page
 * Dual CTA section with glassmorphism styling
 */

'use client';

import React from 'react';
import { ArrowRight, MessageSquare, Calendar, Phone, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { cn, generateWhatsAppURL, generateCalendlyURL } from '@/lib/utils';
import { FinalCTAProps } from '@/types/zebra';

const FinalCTA: React.FC<FinalCTAProps> = ({
  primaryCTA,
  secondaryCTA
}) => {
  
  const handlePrimaryCTA = () => {
    if (primaryCTA?.action) {
      primaryCTA.action();
    } else {
      // Default to Calendly
      window.open(generateCalendlyURL(), '_blank');
    }
  };

  const handleSecondaryCTA = () => {
    if (secondaryCTA?.action) {
      secondaryCTA.action();
    } else {
      // Default to WhatsApp
      window.open(generateWhatsAppURL(), '_blank');
    }
  };

  return (
    <section 
      id="final-cta"
      className={cn(
        // Base layout
        'py-20 px-4 relative overflow-hidden',
        
        // Background with dark theme
        'bg-gradient-to-b from-zebra-gray-800 via-zebra-gray-900 to-black',
        
        // Background patterns
        'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(6,102,204,0.15),transparent_60%)]',
        'before:opacity-80 before:pointer-events-none'
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-zebra-blue-600/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-zebra-blue-500/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Main content card */}
        <Card variant="glassmorphism" className="p-8 md:p-12 text-center">
          
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Listo para{' '}
              <span className="bg-gradient-to-r from-zebra-blue-400 to-zebra-blue-600 bg-clip-text text-transparent">
                Transformar
              </span>{' '}
              tu Operación?
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Únete a más de 200 empresas maquiladoras en Tijuana que han optimizado 
              sus procesos con tecnología Zebra
            </p>
          </div>

          {/* CTA Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Primary CTA - Consultation */}
            <Card variant="glassmorphism" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-zebra-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-zebra-blue-600/30 transition-colors">
                <Calendar className="w-8 h-8 text-zebra-blue-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Consulta Gratuita
              </h3>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                Agenda una consulta personalizada con nuestros expertos. 
                Analizaremos tu operación y diseñaremos la solución perfecta.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-zebra-blue-400 flex-shrink-0" />
                  <span className="text-sm">Análisis completo de procesos</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-zebra-blue-400 flex-shrink-0" />
                  <span className="text-sm">Propuesta técnica personalizada</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-zebra-blue-400 flex-shrink-0" />
                  <span className="text-sm">ROI estimado y timeline</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handlePrimaryCTA}
                className="w-full group-hover:shadow-xl transition-all duration-300"
              >
                {primaryCTA?.text || 'Agendar Consulta Gratuita'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-xs text-white/50 mt-4">
                ⏱️ Disponibilidad inmediata • 100% confidencial
              </p>
            </Card>

            {/* Secondary CTA - WhatsApp */}
            <Card variant="glassmorphism" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600/30 transition-colors">
                <MessageSquare className="w-8 h-8 text-green-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Cotización Rápida
              </h3>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                ¿Tienes un producto específico en mente? Obtén una cotización 
                personalizada por WhatsApp en minutos.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">Respuesta en menos de 1 hora</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">Precios competitivos</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm">Términos de financiamiento</span>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={handleSecondaryCTA}
                className="w-full group-hover:shadow-xl transition-all duration-300 bg-green-600/20 hover:bg-green-600/30 border-green-500/50 hover:border-green-400/70"
              >
                {secondaryCTA?.text || 'Cotizar por WhatsApp'}
                <Phone className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
              
              <p className="text-xs text-white/50 mt-4">
                📱 Atención directa • Lunes a Viernes 8AM-6PM
              </p>
            </Card>
          </div>

          {/* Trust indicators */}
          <div className="border-t border-white/10 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-zebra-blue-400 mb-2">200+</div>
                <div className="text-sm text-white/70">Empresas Atendidas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-zebra-blue-400 mb-2">15+</div>
                <div className="text-sm text-white/70">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-zebra-blue-400 mb-2">98%</div>
                <div className="text-sm text-white/70">Satisfacción Cliente</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-zebra-blue-400 mb-2">24/7</div>
                <div className="text-sm text-white/70">Soporte Técnico</div>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-white/60 leading-relaxed">
              🏆 <strong>Distribuidor Autorizado Zebra</strong> | 
              Certificaciones técnicas actualizadas | 
              Garantía extendida disponible | 
              Financiamiento empresarial
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FinalCTA;