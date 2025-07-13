/**
 * Zebra product categories and data for IAMET landing page
 * Based on research from Zebra website and maquiladora industry needs
 */

import { ZebraCategory, ZebraProduct, ZebraSubcategory } from '@/types/zebra';

// Product categories for maquiladora industry
export const zebraCategories: ZebraCategory[] = [
  {
    id: 'impresoras',
    name: 'Impresoras Zebra',
    slug: 'impresoras',
    description: 'Soluciones de impresión térmica confiables con 50 años de innovación. Desde compactas desktop hasta industriales robustas, diseñadas para cada necesidad',
    icon: '🖨️',
    metaTitle: 'Impresoras Zebra - Desktop, Industriales, Portátiles y Especializadas | IAMET Tijuana',
    metaDescription: 'Impresoras Zebra con Zebra DNA™. Desktop, Industriales, Portátiles, Tarjetas ID, Motores de Impresión y Healthcare. 50+ años de innovación. Distribuidor autorizado Tijuana.',
    benefits: [
      'Desempeño fiable con 50 años de innovación',
      'Seguridad e inteligencia integradas con Zebra DNA™',
      'Fácil integración y administración remota',
      'Soluciones para cada volumen y aplicación',
      'Diseñadas para entornos hostiles y demandantes',
      'Incremento de productividad comprobado'
    ],
    subcategories: [
      {
        id: 'desktop',
        name: 'Impresoras Desktop',
        description: 'Compactas y fáciles de operar, con resistencia para impresión de volumen bajo a medio',
        icon: '🖥️',
        features: [
          'Diseño compacto y espacio-eficiente',
          'Fáciles de operar y mantener',
          'Ideales para volumen bajo a medio',
          'Múltiples opciones de conectividad',
          'Carga frontal de medios'
        ],
        industries: ['Retail', 'Oficinas', 'Pequeños Negocios', 'Healthcare'],
        modelCount: 12,
        useCases: ['Etiquetas de códigos de barras', 'Recibos', 'Brazaletes', 'Etiquetas RFID básicas']
      },
      {
        id: 'industrial',
        name: 'Impresoras Industriales',
        description: 'Diseñadas para entornos hostiles y demandantes con construcción robusta y adaptabilidad futura',
        icon: '🏭',
        features: [
          'Construcción robusta y duradera',
          'Diseñadas para entornos hostiles',
          'Adaptabilidad futura integrada',
          'Fáciles de usar y mantener',
          'Alto volumen de impresión'
        ],
        industries: ['Manufactura', 'Logística', 'Almacenes', 'Automotriz'],
        modelCount: 13,
        useCases: ['Etiquetas RFID de alto volumen', 'Códigos de barras industriales', 'Trazabilidad de productos', 'Envío y distribución']
      },
      {
        id: 'mobile',
        name: 'Impresoras Portátiles',
        description: 'Incrementan la productividad y precisión al permitir impresión portátil en el punto de actividad',
        icon: '📱',
        features: [
          'Impresión portátil en cualquier lugar',
          'Incrementa productividad del empleado',
          'Disponibles en diferentes rangos de precio',
          'Batería de larga duración',
          'Conectividad inalámbrica'
        ],
        industries: ['Operaciones de Campo', 'Retail Móvil', 'Logística', 'Servicios'],
        modelCount: 15,
        useCases: ['Etiquetas de códigos de barras en sitio', 'Recibos móviles', 'Etiquetas RFID portátiles', 'Facturación móvil']
      },
      {
        id: 'card',
        name: 'Impresoras de Tarjetas ID',
        description: 'Facilitan la conexión, creación e impresión de tarjetas resistentes y seguras',
        icon: '🆔',
        features: [
          'Impresión de tarjetas de alta calidad',
          'Características de seguridad avanzadas',
          'Fácil conexión y operación',
          'Soporte para múltiples tipos de tarjetas',
          'Codificación de tarjetas inteligentes'
        ],
        industries: ['Hospitalidad', 'Finanzas', 'Healthcare', 'Educación'],
        modelCount: 10,
        useCases: ['Tarjetas de identificación', 'Tarjetas de hospitalidad', 'Tarjetas financieras', 'Tarjetas RFID inteligentes']
      },
      {
        id: 'print-engines',
        name: 'Motores de Impresión',
        description: 'Impulsan impresión para soluciones de envío o empaque de alta velocidad integradas',
        icon: '⚙️',
        features: [
          'Impresión de alta velocidad',
          'Rendimiento estable y confiable',
          'Diseñados para integración OEM',
          'Construcción robusta industrial',
          'API y SDKs completos'
        ],
        industries: ['Manufactura', 'Logística', 'Automatización', 'OEM'],
        modelCount: 4,
        useCases: ['Soluciones de envío', 'Sistemas de empaque', 'Integración en líneas de producción', 'Aplicaciones OEM']
      },
      {
        id: 'healthcare',
        name: 'Impresoras Healthcare',
        description: 'Ayudan a fortalecer la atención al paciente con impresión segura y confiable para entornos médicos',
        icon: '🏥',
        features: [
          'Cumplimiento con regulaciones sanitarias',
          'Impresión antimicrobiana',
          'Fácil desinfección y limpieza',
          'Integración con sistemas hospitalarios',
          'Impresión de brazaletes para pacientes'
        ],
        industries: ['Hospitales', 'Clínicas', 'Laboratorios', 'Farmacias'],
        modelCount: 8,
        useCases: ['Brazaletes de identificación de pacientes', 'Etiquetas de muestras', 'Etiquetas de medicamentos', 'Códigos de barras médicos']
      }
    ]
  },
  {
    id: 'scanners',
    name: 'Escáneres de Códigos de Barras',
    slug: 'scanners',
    description: 'Tecnología DataCapture DNA™ para escanear sin interrupciones. Más de 50 años de innovación en captura de datos para todas las necesidades',
    icon: '📱',
    metaTitle: 'Escáneres Zebra - DataCapture DNA™ y Todas las Categorías | IAMET Tijuana',
    metaDescription: 'Escáneres Zebra con DataCapture DNA™. De mano, manos libres, ultrarresistentes, retail y montaje fijo. Soluciones para cada industria en Tijuana.',
    benefits: [
      'Escanee sin interrupciones con DataCapture DNA™',
      'Escanee más códigos dañados y de difícil lectura',
      'Escanee con confianza - 50+ años de innovación',
      'Resistentes a entornos de trabajo hostiles',
      'Optimización de administración de escáneres',
      'Adaptables a diferentes necesidades industriales'
    ],
    subcategories: [
      {
        id: 'handheld-general',
        name: 'Escáneres de Mano para Uso General',
        description: 'Diseñados para cumplir con una amplia gama de necesidades de escaneo, aplicaciones y presupuestos diversos',
        icon: '🤏',
        features: [
          'Versatilidad para múltiples aplicaciones',
          'Opciones para diferentes presupuestos',
          'Diseño ergonómico optimizado',
          'DataCapture DNA™ integrado',
          'Fácil integración y configuración'
        ],
        industries: ['Retail', 'Oficinas', 'Inventario', 'Pequeños Negocios'],
        modelCount: 5,
        useCases: ['Punto de venta', 'Control de inventario', 'Recepción de mercancía', 'Etiquetado básico']
      },
      {
        id: 'hands-free-general',
        name: 'Escáneres Manos Libres para Uso General',
        description: 'Soluciones manos libres para una amplia gama de necesidades de escaneo y máxima productividad',
        icon: '🙌',
        features: [
          'Operación completamente manos libres',
          'Escaneo omnidireccional avanzado',
          'Modo presentación automático',
          'Detección inteligente de objetos',
          'DataCapture DNA™ optimizado'
        ],
        industries: ['Retail', 'Manufactura', 'Logística', 'Punto de Venta'],
        modelCount: 9,
        useCases: ['Checkout retail', 'Líneas de producción', 'Estaciones de trabajo', 'Control de calidad']
      },
      {
        id: 'ultra-rugged',
        name: 'Escáneres Ultrarresistentes',
        description: 'Establecen nuevos estándares de diseño resistente, rendimiento de escaneo y capacidad de administración',
        icon: '🛡️',
        features: [
          'Diseño ultra-resistente certificado',
          'Rendimiento superior en condiciones extremas',
          'Administración avanzada y remota',
          'Resistencia a caídas, agua y polvo',
          'Batería de larga duración'
        ],
        industries: ['Manufactura Pesada', 'Minería', 'Construcción', 'Logística Industrial'],
        modelCount: 9,
        useCases: ['Ambientes hostiles', 'Manufactura extrema', 'Operaciones al aire libre', 'Trabajo pesado']
      },
      {
        id: 'retail-scale',
        name: 'Escáneres de Plano Único y con Balanza',
        description: 'Satisfacen las demandas de alto volumen de tráfico minorista mejorando la eficiencia del empleado',
        icon: '⚖️',
        features: [
          'Optimizados para alto volumen retail',
          'Mejora eficiencia del empleado',
          'Agiliza procesos de pago',
          'Escaneo de plano único avanzado',
          'Integración perfecta con POS'
        ],
        industries: ['Retail', 'Supermercados', 'Tiendas Departamentales', 'Farmacias'],
        modelCount: 2,
        useCases: ['Checkout rápido', 'Alto volumen de ventas', 'Pesaje integrado', 'Punto de venta avanzado']
      },
      {
        id: 'fixed-mount',
        name: 'Escáneres de Montaje Fijo',
        description: 'Escaneo manos libres de alto rendimiento en aplicaciones con espacio limitado y integración OEM',
        icon: '🔧',
        features: [
          'Montaje fijo de alto rendimiento',
          'Diseño compacto para espacios limitados',
          'Integración OEM optimizada',
          'Uso independiente o integrado',
          'Configuración flexible de instalación'
        ],
        industries: ['Automatización', 'OEM', 'Líneas de Producción', 'Integración de Sistemas'],
        modelCount: 2,
        useCases: ['Integración en equipos', 'Líneas automatizadas', 'Soluciones OEM', 'Espacios reducidos']
      }
    ]
  },
  {
    id: 'rfid',
    name: 'Tecnología RFID',
    slug: 'rfid',
    description: 'Máximos beneficios, mínimos inconvenientes. Tecnología RAIN RFID con precisión e interoperabilidad sin igual para máxima visibilidad de activos',
    icon: '📡',
    metaTitle: 'Tecnología RFID Zebra - Ecosistema Completo RAIN RFID | IAMET Tijuana',
    metaDescription: 'Ecosistema RFID Zebra completo. Lectores portátiles, fijos, antenas, impresoras y etiquetas RFID. Máxima visibilidad de activos para maquiladoras en Tijuana.',
    benefits: [
      'Máximos beneficios, mínimos inconvenientes',
      'Máxima visibilidad de activos empresariales',
      'Precisión e interoperabilidad sin igual',
      'Minimiza riesgos de implementación',
      'Seguimiento rápido y preciso de inventario',
      'Transformación digital comprobada'
    ],
    subcategories: [
      {
        id: 'handheld-rfid',
        name: 'Lectores de RFID de Mano',
        description: 'Desde almacenes y muelles de carga hasta entornos alfombrados y de atención a clientes para máxima visibilidad',
        icon: '📱',
        features: [
          'Máxima visibilidad de activos empresariales',
          'Versatilidad para múltiples entornos',
          'Desde almacenes hasta atención al cliente',
          'Lectura de largo alcance y precisión',
          'Integración con sistemas empresariales'
        ],
        industries: ['Logística', 'Almacenes', 'Retail', 'Atención al Cliente'],
        modelCount: 6,
        useCases: ['Inventario de almacén', 'Muelles de carga', 'Atención al cliente', 'Seguimiento de activos']
      },
      {
        id: 'fixed-rfid',
        name: 'Infraestructura y Lectores Fijos de RFID',
        description: 'Lectores fijos que logran máxima visibilidad de activos con ubicación exacta mediante lectores de matrices',
        icon: '🏗️',
        features: [
          'Máxima visibilidad de activos empresariales',
          'Visibilidad de ubicación exacta de activos',
          'Lectores de matrices avanzados',
          'Instalación fija permanente',
          'Integración con infraestructura existente'
        ],
        industries: ['Manufactura', 'Logística', 'Centros de Distribución', 'Portales'],
        modelCount: 4,
        useCases: ['Portales de entrada/salida', 'Seguimiento en línea de producción', 'Control de acceso', 'Localización exacta']
      },
      {
        id: 'rfid-antennas',
        name: 'Antenas de RFID',
        description: 'Antenas robustas para seguimiento rápido y preciso de inventario con rendimiento para tráfico intenso',
        icon: '📶',
        features: [
          'Seguimiento rápido y preciso de inventario',
          'Rendimiento para tráfico intenso',
          'Alcance optimizado para alta precisión',
          'Construcción robusta industrial',
          'Configuración flexible de instalación'
        ],
        industries: ['Logística', 'Manufactura', 'Retail', 'Distribución'],
        modelCount: 8,
        useCases: ['Portales RFID', 'Estaciones de lectura', 'Seguimiento de inventario', 'Control de flujo']
      },
      {
        id: 'rfid-printers',
        name: 'Impresoras RFID',
        description: 'Gama completa para imprimir y codificar tarjetas, tags y etiquetas RFID RAIN con precisión máxima',
        icon: '🖨️',
        features: [
          'Impresión y codificación RFID precisas',
          'Codificación instalable de fábrica o campo',
          'Soporte para tarjetas, tags y etiquetas RAIN',
          'Integración perfecta con sistemas',
          'Calidad de codificación garantizada'
        ],
        industries: ['Manufactura', 'Logística', 'Retail', 'Identificación'],
        modelCount: 9,
        useCases: ['Etiquetas de productos', 'Tags de activos', 'Tarjetas de identificación', 'Codificación en línea']
      },
      {
        id: 'rfid-labels',
        name: 'Etiquetas RFID y Suministros',
        description: 'Selección completa de etiquetas y tags RFID que cumple requisitos de la mayoría de aplicaciones y presupuestos',
        icon: '🏷️',
        features: [
          'Amplia selección para todas las aplicaciones',
          'Opciones para diferentes presupuestos',
          'Tecnología RAIN RFID certificada',
          'Resistencia a condiciones industriales',
          'Múltiples factores de forma disponibles'
        ],
        industries: ['Manufactura', 'Retail', 'Logística', 'Inventario'],
        modelCount: 25,
        useCases: ['Etiquetado de productos', 'Seguimiento de activos', 'Control de inventario', 'Identificación de pallets']
      }
    ]
  },
  {
    id: 'computadoras-moviles',
    name: 'Computadoras Móviles',
    slug: 'computadoras-moviles',
    description: 'Líder mundial en movilidad rugosa con más de 50 años de experiencia. Mobility DNA™ para maximizar productividad y minimizar complejidades de TI',
    icon: '💻',
    metaTitle: 'Computadoras Móviles Zebra - Mobility DNA™ Completo | IAMET Tijuana',
    metaDescription: 'Computadoras móviles Zebra con Mobility DNA™. De mano, montadas en vehículos y vestibles. Máxima productividad para maquiladoras en Tijuana.',
    benefits: [
      'Líder mundial en movilidad rugosa - 50+ años',
      'Mobility DNA™ maximiza productividad de usuarios',
      'Minimiza complejidades de TI empresarial',
      'Diseñados para entornos desafiantes',
      'Soporte Windows y Android empresarial',
      'Tecnología moderna de captura de datos'
    ],
    subcategories: [
      {
        id: 'handheld-computers',
        name: 'Computadoras de Mano',
        description: 'Aumentan la eficiencia, productividad y niveles de servicio al cliente en trabajo interior y exterior',
        icon: '📱',
        features: [
          'Aumento de eficiencia y productividad',
          'Mejores niveles de servicio al cliente',
          'Trabajo interior y exterior optimizado',
          'Mobility DNA™ completo integrado',
          'Durabilidad para uso empresarial intensivo'
        ],
        industries: ['Retail', 'Logística', 'Manufactura', 'Campo'],
        modelCount: 3,
        useCases: ['Inventario móvil', 'Atención al cliente', 'Operaciones de campo', 'Control de calidad']
      },
      {
        id: 'vehicle-mounted',
        name: 'Terminales Montadas en Vehículos',
        description: 'Maximizan la productividad y obtienen cumplimiento impecable en entornos de almacén',
        icon: '🚛',
        features: [
          'Maximización de productividad en almacén',
          'Cumplimiento impecable de operaciones',
          'Integración perfecta con vehículos',
          'Resistencia a vibraciones extremas',
          'Pantallas de gran formato legibles'
        ],
        industries: ['Almacenes', 'Logística', 'Transporte', 'Distribución'],
        modelCount: 3,
        useCases: ['Montacargas', 'Vehículos industriales', 'Operaciones de almacén', 'Gestión de flota']
      },
      {
        id: 'wearable-computers',
        name: 'Computadoras Vestibles',
        description: 'Cómodas y duraderas con tecnología moderna de captura de datos y voz, mantienen manos y ojos enfocados',
        icon: '⌚',
        features: [
          'Cómodas y duraderas para uso prolongado',
          'Tecnología moderna de captura de datos',
          'Tecnología de voz integrada',
          'Mantiene manos y ojos libres para tareas',
          'Diseño ergonómico optimizado'
        ],
        industries: ['Almacenes', 'Operaciones de Campo', 'Manufactura', 'Logística'],
        modelCount: 7,
        useCases: ['Picking dirigido por voz', 'Operaciones manos libres', 'Líneas de producción', 'Gestión de inventario']
      }
    ]
  },
  {
    id: 'vision-artificial',
    name: 'Visión Artificial Industrial',
    slug: 'vision-artificial',
    description: 'Ecosistema escalable de productos de visión inteligente para seguimiento, rastreo y inspección con datos operacionales en tiempo real',
    icon: '👁️',
    metaTitle: 'Visión Artificial Zebra - Ecosistema Completo Industrial | IAMET Tijuana',
    metaDescription: 'Ecosistema visión artificial Zebra completo. Escáneres fijos, controladores, cámaras, sensores 3D y digitalizadores. Soporte 24/7 para maquiladoras Tijuana.',
    benefits: [
      'Ecosistema escalable de visión inteligente',
      'Siga y rastree con confianza total',
      'Mejore desempeño de aplicaciones inteligentes',
      'Datos operacionales e insights en tiempo real',
      'Reduce tiempo inactivo y costos de sistema',
      'Soporte experto 24/7 con Zebra OneCare'
    ],
    subcategories: [
      {
        id: 'fixed-scanners',
        name: 'Escáneres Fijos Industriales',
        description: 'Siga y rastree con confianza para seguimiento de producción, almacenamiento y operaciones omnicanal',
        icon: '🔍',
        features: [
          'Seguimiento y rastreo confiable',
          'Alto volumen de escaneo industrial',
          'Operaciones de producción y almacenamiento',
          'Seguimiento omnicanal integrado',
          'Diseño robusto para uso continuo'
        ],
        industries: ['Manufactura', 'Logística', 'Producción', 'Almacenamiento'],
        modelCount: 6,
        useCases: ['Líneas de producción', 'Control de almacén', 'Operaciones omnicanal', 'Seguimiento automático']
      },
      {
        id: 'vision-controllers',
        name: 'Controladores de Visión',
        description: 'Mejoran el desempeño de aplicaciones de visión inteligente, expandibles para reducir tiempo inactivo',
        icon: '🎛️',
        features: [
          'Mejora desempeño de visión inteligente',
          'Sistemas expandibles y modulares',
          'Reduce tiempo inactivo del sistema',
          'Minimiza costos operativos',
          'Optimizado para empresas y fábricas'
        ],
        industries: ['Empresas', 'Fábricas', 'Automatización', 'Control de Calidad'],
        modelCount: 3,
        useCases: ['Control de sistemas de visión', 'Automatización industrial', 'Gestión de calidad', 'Supervisión de procesos']
      },
      {
        id: 'machine-vision-cameras',
        name: 'Cámaras de Visión Artificial',
        description: 'Serie CV60 con sensores CMOS de 2.3-12.3 megapíxeles, múltiples configuraciones mono y color',
        icon: '📷',
        features: [
          'Sensores CMOS 2.3-12.3 megapíxeles',
          'Múltiples modelos mono y color',
          'Interfaz GigE Vision estándar',
          'Configuraciones multi-cámara',
          'Alta calidad de captura de imagen'
        ],
        industries: ['Manufactura', 'Control de Calidad', 'Inspección', 'Automatización'],
        modelCount: 1,
        useCases: ['Inspección de calidad', 'Control dimensional', 'Análisis de superficies', 'Sistemas multi-cámara']
      },
      {
        id: 'smart-sensors',
        name: 'Sensores y Cámaras Inteligentes',
        description: 'Desde seguimiento simple hasta inspección compleja de calidad con datos e insights operacionales en tiempo real',
        icon: '🤖',
        features: [
          'Desde seguimiento simple a inspección compleja',
          'Datos operacionales en tiempo real',
          'Insights operacionales avanzados',
          'Capacidades de visión adaptables',
          'Procesamiento inteligente integrado'
        ],
        industries: ['Manufactura', 'Logística', 'Control de Calidad', 'Automatización'],
        modelCount: 4,
        useCases: ['Seguimiento básico', 'Inspección de calidad', 'Análisis en tiempo real', 'Detección de defectos']
      },
      {
        id: 'digitizers-io',
        name: 'Digitalizadores de Video y Tarjetas I/O',
        description: 'Liberan el potencial del sistema de visión inteligente con estándares de interfaz principales',
        icon: '💾',
        features: [
          'Libera potencial de visión inteligente',
          'Soporte para estándares de interfaz principales',
          'Convierte PC en controlador de visión',
          'Capacidades de comunicación industrial',
          'Adquisición de imagen de alta calidad'
        ],
        industries: ['Integración de Sistemas', 'Automatización', 'OEM', 'Desarrollo'],
        modelCount: 7,
        useCases: ['Integración de sistemas', 'Desarrollo de aplicaciones', 'Comunicación industrial', 'Adquisición de datos']
      },
      {
        id: '3d-sensors',
        name: 'Sensores 3D',
        description: 'Precisión para inspección compleja, detectan defectos sutiles y capturan datos detallados de objetos',
        icon: '📐',
        features: [
          'Precisión para inspección compleja',
          'Detección de defectos sutiles',
          'Captura datos detallados de objetos',
          'Medición dimensional avanzada',
          'Análisis tridimensional completo'
        ],
        industries: ['Manufactura', 'Logística', 'Control de Calidad', 'Robótica'],
        modelCount: 2,
        useCases: ['Inspección compleja', 'Medición 3D', 'Detección de defectos', 'Análisis dimensional']
      }
    ]
  },
  {
    id: 'consumibles',
    name: 'Consumibles para Impresión',
    slug: 'consumibles',
    description: 'Rendimiento fiable y calidad uniforme. Más de 300 combinaciones de materiales con certificación ISO 9001 para reducir etiquetas ilegibles',
    icon: '🎯',
    metaTitle: 'Consumibles Zebra Originales - Ecosistema Completo | IAMET Tijuana',
    metaDescription: 'Ecosistema completo consumibles Zebra. Etiquetas, ribbons, brazaletes hospitalarios, tarjetas ID, papel recibos y suministros limpieza. Certificación ISO 9001.',
    benefits: [
      'Rendimiento fiable certificado ISO 9001',
      'Reduce etiquetas ilegibles o faltantes',
      'Más de 300 combinaciones de materiales',
      'Implementación rápida de soluciones',
      'Extiende vida útil de impresoras',
      'Optimización de costos operativos'
    ],
    subcategories: [
      {
        id: 'barcode-labels',
        name: 'Códigos de Barras y Etiquetas',
        description: 'Materiales de papel y sintéticos para impresión térmica que reducen instancias de etiquetas ilegibles',
        icon: '🏷️',
        features: [
          'Materiales papel y sintéticos diversos',
          'Reduce etiquetas ilegibles o faltantes',
          'Múltiples materiales para aplicaciones',
          'Impresión térmica optimizada',
          'Variedad de tamaños y adhesivos'
        ],
        industries: ['Manufactura', 'Logística', 'Retail', 'Inventario'],
        modelCount: 150,
        useCases: ['Etiquetado de productos', 'Códigos de barras', 'Identificación de activos', 'Control de inventario']
      },
      {
        id: 'hospital-wristbands',
        name: 'Brazaletes Hospitalarios',
        description: 'Brazaletes láser y térmicos directos, duraderos y fáciles de usar para instituciones de salud',
        icon: '🏥',
        features: [
          'Tipos láser y térmico directo',
          'Duraderos y fáciles de usar',
          'Específicamente para instituciones salud',
          'Resistentes a líquidos y desinfectantes',
          'Cómodos para uso prolongado'
        ],
        industries: ['Hospitales', 'Clínicas', 'Centros de Salud', 'Laboratorios'],
        modelCount: 25,
        useCases: ['Identificación de pacientes', 'Control de acceso hospitalario', 'Seguimiento médico', 'Emergencias']
      },
      {
        id: 'event-wristbands',
        name: 'Pulseras para Eventos',
        description: 'Impermeables y desechables, ideales para conciertos, parques temáticos, parques acuáticos y cruceros',
        icon: '🎫',
        features: [
          'Impermeables y resistentes al agua',
          'Desechables para uso único',
          'Ideales para entretenimiento',
          'Resistentes a manipulación',
          'Colores vibrantes disponibles'
        ],
        industries: ['Entretenimiento', 'Turismo', 'Eventos', 'Recreación'],
        modelCount: 15,
        useCases: ['Conciertos', 'Parques temáticos', 'Parques acuáticos', 'Cruceros y resorts']
      },
      {
        id: 'rfid-supplies',
        name: 'Etiquetas RFID',
        description: 'Implementación rápida de soluciones RFID con 30 elementos de inventario e inlays Zebra de alto rendimiento',
        icon: '📡',
        features: [
          'Implementación rápida de soluciones RFID',
          '30 elementos de inventario disponibles',
          'Inlays Zebra de alto rendimiento',
          'Tecnología RAIN RFID certificada',
          'Múltiples factores de forma'
        ],
        industries: ['Logística', 'Retail', 'Manufactura', 'Inventario'],
        modelCount: 30,
        useCases: ['Seguimiento de inventario', 'Control de activos', 'Trazabilidad', 'Automatización']
      },
      {
        id: 'thermal-ribbons',
        name: 'Ribbons de Transferencia Térmica',
        description: 'Formulaciones de cera, resina y cera/resina diseñadas específicamente para impresoras térmicas',
        icon: '🎨',
        features: [
          'Formulaciones cera, resina y mixtas',
          'Diseñados para impresoras térmicas',
          'Calidad de impresión superior',
          'Durabilidad según aplicación',
          'Compatibilidad garantizada'
        ],
        industries: ['Manufactura', 'Logística', 'Automotriz', 'Retail'],
        modelCount: 45,
        useCases: ['Etiquetas duraderas', 'Códigos de barras', 'Identificación industrial', 'Aplicaciones exteriores']
      },
      {
        id: 'receipt-paper',
        name: 'Papel de Recibos',
        description: 'Impresión de alta calidad con diferentes espesores, recubrimientos y tamaños para recibos profesionales',
        icon: '🧾',
        features: [
          'Impresión de alta calidad',
          'Diferentes espesores disponibles',
          'Variedad de recubrimientos',
          'Múltiples tamaños estándar',
          'Resistencia a decoloración'
        ],
        industries: ['Retail', 'Restaurantes', 'Servicios', 'Hospitalidad'],
        modelCount: 20,
        useCases: ['Recibos de venta', 'Tickets', 'Comprobantes', 'Facturación móvil']
      },
      {
        id: 'card-supplies',
        name: 'Suministros para Tarjetas ID',
        description: 'Tarjetas PVC, laminados True Secure, ribbons True Colors y suministros de limpieza para identificación',
        icon: '🆔',
        features: [
          'Tarjetas PVC compuesto ISO',
          'Laminados True Secure para seguridad',
          'Ribbons True Colors alta calidad',
          'Suministros limpieza completos',
          'Imágenes nítidas y códigos precisos'
        ],
        industries: ['Corporativo', 'Educación', 'Gobierno', 'Seguridad'],
        modelCount: 35,
        useCases: ['Tarjetas de empleados', 'Identificación estudiantil', 'Credenciales de acceso', 'Tarjetas de membresía']
      }
    ]
  }
];

// Featured products for homepage - safely extract from categories that have products
export const featuredProducts: ZebraProduct[] = zebraCategories
  .filter(category => category.products && category.products.length > 0)
  .slice(0, 4)
  .map(category => category.products![0])
  .filter(Boolean);

// Industries served
export const industriesServed = [
  'Automotriz',
  'Electrónica',
  'Textil',
  'Logística',
  'Manufactura',
  'Farmacéutica',
  'Retail',
  'Almacén'
];

// Key benefits for maquiladora industry
export const keyBenefits = [
  {
    icon: '⚡',
    title: 'Productividad Maximizada',
    description: '50+ años de innovación para optimizar procesos y reducir tiempos operativos'
  },
  {
    icon: '🔍',
    title: 'Trazabilidad Inteligente',
    description: 'Visibilidad en tiempo real con tecnologías DNA™ integradas'
  },
  {
    icon: '📊',
    title: 'Datos Operacionales',
    description: 'Información instantánea e inteligencia empresarial para decisiones estratégicas'
  },
  {
    icon: '🛡️',
    title: 'Calidad Certificada',
    description: 'Certificación ISO 9001 y reducción comprobada de errores industriales'
  },
  {
    icon: '💰',
    title: 'ROI Comprobado',
    description: 'Retorno de inversión medible con tecnología líder mundial'
  },
  {
    icon: '🔧',
    title: 'Soporte 24/7',
    description: 'Zebra OneCare y servicio técnico certificado en Tijuana'
  }
];

// Utility functions
export const getCategoryBySlug = (slug: string): ZebraCategory | undefined => {
  return zebraCategories.find(category => category.slug === slug);
};

export const getProductBySlug = (slug: string): ZebraProduct | undefined => {
  for (const category of zebraCategories) {
    const product = category.products?.find(p => p.slug === slug);
    if (product) return product;
  }
  return undefined;
};

export const getProductsByCategory = (categorySlug: string): ZebraProduct[] => {
  const category = getCategoryBySlug(categorySlug);
  return category?.products || [];
};

export const getAllProducts = (): ZebraProduct[] => {
  return zebraCategories
    .filter(category => category.products)
    .flatMap(category => category.products!);
};

export const getCategoryNames = (): string[] => {
  return zebraCategories.map(category => category.name);
};

export const getCategorySlugs = (): string[] => {
  return zebraCategories.map(category => category.slug);
};