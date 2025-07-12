/**
 * TypeScript interfaces for IAMET Zebra Landing Page
 */

// Core data types for type safety
export interface ZebraProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  slug: string;
  features?: string[];
  industries?: string[];
}

export interface ZebraSubcategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  industries: string[];
  modelCount: number;
  useCases: string[];
}

export interface ZebraCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  products?: ZebraProduct[];
  subcategories?: ZebraSubcategory[];
  metaTitle: string;
  metaDescription: string;
  benefits: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  metadata?: {
    productInterest?: string;
    conversationFlow?: ConversationFlow;
  };
}

export interface ConversationFlow {
  type: 'quote' | 'consultation' | 'general';
  productInterest?: string;
  customerData?: CustomerData;
  nextAction?: 'whatsapp' | 'calendly' | 'continue';
  stage: 'initial' | 'qualifying' | 'recommending' | 'converting';
}

export interface CustomerData {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  requirements?: string;
}

// Environment variables schema
export interface EnvConfig {
  GEMINI_API_KEY: string;
  NEXT_PUBLIC_WHATSAPP_NUMBER: string;
  NEXT_PUBLIC_CALENDLY_URL: string;
  NEXT_PUBLIC_SITE_URL: string;
}

// API Response types
export interface ChatResponse {
  message: string;
  conversationFlow?: ConversationFlow;
  recommendations?: ZebraProduct[];
  nextAction?: {
    type: 'whatsapp' | 'calendly' | 'continue';
    url?: string;
    message?: string;
  };
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
  context?: {
    currentPage?: string;
    userAgent?: string;
    referrer?: string;
  };
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: '_blank' | '_self';
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glassmorphism' | 'solid';
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaAction?: () => void;
}

export interface ProductLinesProps {
  categories: ZebraCategory[];
  onCategoryClick?: (category: ZebraCategory) => void;
}

export interface ChatAssistantProps {
  isOpen?: boolean;
  onToggle?: () => void;
  initialMessage?: string;
}

export interface FinalCTAProps {
  primaryCTA?: {
    text: string;
    action: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: () => void;
  };
}

// SEO and Metadata types
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article';
  };
  twitter?: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    image?: string;
  };
}

// Utility types
export type ConversationStage = 'initial' | 'qualifying' | 'recommending' | 'converting';
export type ConversationType = 'quote' | 'consultation' | 'general';
export type NextAction = 'whatsapp' | 'calendly' | 'continue';

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  productInterest?: string;
  preferredContactMethod: 'email' | 'phone' | 'whatsapp';
}

export interface QuoteRequestData extends ContactFormData {
  specificProduct: string;
  quantity?: number;
  timeline?: string;
  budget?: string;
}

export interface ConsultationRequestData extends ContactFormData {
  industryType: string;
  currentChallenges: string;
  preferredDate?: string;
  preferredTime?: string;
}