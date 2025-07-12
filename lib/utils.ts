/**
 * Utility functions for IAMET Zebra Landing Page
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZebraProduct, ZebraCategory } from '@/types/zebra';

/**
 * Combines class names with Tailwind CSS merge functionality
 * @param inputs - Class names to merge
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates WhatsApp URL for quote requests
 * @param productName - Name of the product for quote
 * @param customMessage - Custom message to include
 * @returns WhatsApp URL
 */
export function generateWhatsAppURL(
  productName?: string,
  customMessage?: string
): string {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  
  if (!whatsappNumber) {
    console.error('WhatsApp number not configured in environment variables');
    return '#';
  }

  let message = customMessage || 'Hola, me interesa obtener información sobre las soluciones Zebra para mi empresa.';
  
  if (productName) {
    message = `Hola, me interesa obtener una cotización para ${productName}. ¿Podrían ayudarme con más información?`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodedMessage}`;
}

/**
 * Generates Calendly URL for consultation booking
 * @param productInterest - Product category of interest
 * @returns Calendly URL
 */
export function generateCalendlyURL(productInterest?: string): string {
  const calendlyURL = process.env.NEXT_PUBLIC_CALENDLY_URL;
  
  if (!calendlyURL) {
    console.error('Calendly URL not configured in environment variables');
    return '#';
  }

  if (productInterest) {
    const params = new URLSearchParams({
      text: `Consulta sobre ${productInterest}`,
      details: `Interés en soluciones Zebra para ${productInterest}`
    });
    return `${calendlyURL}?${params.toString()}`;
  }

  return calendlyURL;
}

/**
 * Formats product name for display
 * @param product - Zebra product
 * @returns Formatted product name
 */
export function formatProductName(product: ZebraProduct): string {
  return `${product.name} - ${product.category}`;
}

/**
 * Generates SEO-friendly slug from text
 * @param text - Text to convert to slug
 * @returns SEO-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Formats currency for display (Mexican Peso)
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats date for display in Spanish
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Validates email format
 * @param email - Email to validate
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates Mexican phone number format
 * @param phone - Phone number to validate
 * @returns True if valid phone number
 */
export function isValidMexicanPhone(phone: string): boolean {
  // Mexican phone number format: +52 followed by 10 digits
  const phoneRegex = /^\+52\d{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Debounces function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttles function calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generates random ID for components
 * @param prefix - Prefix for the ID
 * @returns Random ID string
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Truncates text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

/**
 * Capitalizes first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Gets product recommendations based on category
 * @param category - Category to get recommendations for
 * @param currentProduct - Current product to exclude
 * @param limit - Number of recommendations
 * @returns Array of recommended products
 */
export function getProductRecommendations(
  category: ZebraCategory,
  currentProduct?: ZebraProduct,
  limit: number = 3
): ZebraProduct[] {
  return category.products
    .filter(product => product.id !== currentProduct?.id)
    .slice(0, limit);
}

/**
 * Checks if user is on mobile device
 * @returns True if mobile device
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Smooth scrolls to element
 * @param elementId - ID of element to scroll to
 */
export function smoothScrollTo(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

/**
 * Formats file size for display
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
}

/**
 * Gets contrast color for accessibility
 * @param backgroundColor - Background color hex
 * @returns Contrast color (black or white)
 */
export function getContrastColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Environment variable helpers
 */
export const env = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL,
} as const;