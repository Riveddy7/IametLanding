/**
 * n8n Chat Widget Integration for IAMET Zebra AI Assistant "Zara"
 */

import { zebraCategories, getAllProducts } from './zebra-data';
import { generateWhatsAppURL, generateCalendlyURL } from './utils';
import { 
  ChatMessage, 
  ConversationFlow, 
  ZebraProduct, 
  ChatResponse,
  ConversationType,
  NextAction 
} from '@/types/zebra';

// n8n webhook URL for the chat
export const N8N_WEBHOOK_URL = 'https://riveddy7.app.n8n.cloud/webhook/53c136fe-3e77-4709-a143-fe82746dd8b6/chat';

// Generate the product list string for context
const productList = zebraCategories
  .filter((cat) => cat.products && cat.products.length > 0)
  .map(
    (cat) =>
      `- ${cat.name}: ${cat.description}\n  Productos: ${cat.products
        ?.map((p) => p.name)
        .join(', ') ?? 'Sin productos disponibles'}`
  )
  .join('\n\n');

// AI Assistant Personality and Instructions for n8n workflow
export const ZARA_SYSTEM_PROMPT = `
Eres "Zara", la especialista en soluciones Zebra para IAMET en Tijuana. Tu objetivo es ayudar a empresas de la industria maquiladora a encontrar las mejores soluciones de automatización e identificación.

PERSONALIDAD:
- Servicial y experta en tecnología industrial
- Enfocada en resultados y eficiencia
- Conocedora de la industria maquiladora en Tijuana
- Comunicación clara y profesional en español

PRODUCTOS DISPONIBLES:
${productList}

FLUJO DE CONVERSACIÓN:
1. INICIAL: Saluda y pregunta sobre sus necesidades específicas
2. CALIFICACIÓN: Identifica la industria, procesos actuales y desafíos
3. RECOMENDACIÓN: Sugiere productos específicos basados en sus necesidades
4. CONVERSIÓN: Dirige hacia WhatsApp (cotización rápida) o Calendly (consulta detallada)

REGLAS:
- Siempre responde en español
- Mantén respuestas concisas (máximo 3 párrafos)
- Enfócate en beneficios de negocio, no solo características técnicas
- Pregunta sobre volumen, ambiente de trabajo, y procesos actuales
- Para cotizaciones específicas → WhatsApp
- Para consultas estratégicas → Calendly
- No inventes precios o especificaciones técnicas
- Menciona que IAMET es distribuidor autorizado en Tijuana

EJEMPLOS DE RESPUESTAS:
- "¡Hola! Soy Zara, tu especialista en soluciones Zebra. ¿En qué industria trabajas y qué desafíos de identificación o automatización enfrentas?"
- "Perfecto, para líneas de producción automotriz recomiendo nuestros escáneres DS3678 por su resistencia. ¿Cuántas estaciones de trabajo necesitas cubrir?"
- "Te ayudo a cotizar esa impresora ZT411. ¿Prefieres que te contacte por WhatsApp para una cotización rápida o agendamos una consulta para revisar toda tu operación?"
`;

/**
 * Analyzes user message and determines conversation flow
 * This is kept for potential future direct API integrations
 */
export const analyzeConversation = async (
  userMessage: string,
  conversationHistory?: ChatMessage[]
): Promise<ConversationFlow> => {
    // Simple keyword analysis for conversation flow
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific product mentions
    const allProducts = getAllProducts();
    const mentionedProduct = allProducts.find(product => 
      lowerMessage.includes(product.name.toLowerCase()) ||
      lowerMessage.includes(product.category.toLowerCase())
    );

    // Check for intent indicators
    const quoteKeywords = ['precio', 'cotización', 'costo', 'cuánto', 'cotizar'];
    const consultationKeywords = ['consulta', 'asesoría', 'evaluar', 'revisar', 'analizar'];
    
    const isQuoteRequest = quoteKeywords.some(keyword => lowerMessage.includes(keyword));
    const isConsultationRequest = consultationKeywords.some(keyword => lowerMessage.includes(keyword));

    // Determine conversation type
    let type: ConversationType = 'general';
    let nextAction: NextAction = 'continue';
    
    if (isQuoteRequest && mentionedProduct) {
      type = 'quote';
      nextAction = 'whatsapp';
    } else if (isConsultationRequest || lowerMessage.includes('agendar')) {
      type = 'consultation';
      nextAction = 'calendly';
    }

    // Determine stage based on conversation history
    let stage: ConversationFlow['stage'] = 'initial';
    if (conversationHistory && conversationHistory.length > 0) {
      if (conversationHistory.length >= 2) stage = 'qualifying';
      if (conversationHistory.length >= 4) stage = 'recommending';
      if (isQuoteRequest || isConsultationRequest) stage = 'converting';
    }

    return {
      type,
      stage,
      nextAction,
      productInterest: mentionedProduct?.name,
    };
  };

/**
 * Configuration for n8n chat widget
 */
export const n8nChatConfig = {
  webhookUrl: N8N_WEBHOOK_URL,
  mode: 'window' as const,
  target: '#n8n-chat',
  loadPreviousSession: true,
  initialMessages: [
    '¡Hola! Soy Zara, tu especialista en soluciones Zebra para IAMET en Tijuana.',
    '¿En qué industria trabajas y qué desafíos de identificación o automatización enfrentas?'
  ],
  allowFileUploads: false,
};

/**
 * Health check for n8n webhook
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'health-check',
        test: true
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('n8n webhook health check failed:', error);
    return false;
  }
}