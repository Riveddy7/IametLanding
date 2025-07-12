/**
 * Button component with glassmorphism styles for IAMET Zebra landing page
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types/zebra';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    loading = false,
    children, 
    onClick, 
    href, 
    target = '_self',
    className,
    ...props 
  }, ref) => {
    
    // Base styles for all buttons
    const baseStyles = cn(
      // Base layout and typography
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      
      // Ensure mobile-friendly sizing (minimum 48px touch target)
      'min-h-[48px] min-w-[48px]',
      
      // Responsive design
      'text-sm md:text-base',
      
      // Animation and transform
      'transform transition-transform active:scale-95',
      
      // Glassmorphism base (will be overridden by variant styles)
      'backdrop-blur-md border',
    );

    // Variant-specific styles with glassmorphism
    const variantStyles = {
      primary: cn(
        // Primary glassmorphism - Zebra blue accent
        'bg-zebra-blue-600/80 hover:bg-zebra-blue-500/90',
        'border-zebra-blue-500/50 hover:border-zebra-blue-400/70',
        'text-white shadow-lg shadow-zebra-blue-600/25',
        'hover:shadow-xl hover:shadow-zebra-blue-500/30',
        'focus:ring-zebra-blue-500/50',
        
        // Dark mode adjustments
        'dark:bg-zebra-blue-500/70 dark:hover:bg-zebra-blue-400/80',
        'dark:border-zebra-blue-400/40 dark:hover:border-zebra-blue-300/60',
        'dark:shadow-zebra-blue-500/20 dark:hover:shadow-zebra-blue-400/25',
      ),
      
      secondary: cn(
        // Secondary glassmorphism - Subtle glass effect
        'bg-white/10 hover:bg-white/20',
        'border-white/20 hover:border-white/30',
        'text-white shadow-lg shadow-black/10',
        'hover:shadow-xl hover:shadow-black/15',
        'focus:ring-white/30',
        
        // Dark mode adjustments
        'dark:bg-white/5 dark:hover:bg-white/10',
        'dark:border-white/10 dark:hover:border-white/20',
        'dark:text-white dark:shadow-black/20',
      ),
      
      outline: cn(
        // Outline glassmorphism
        'bg-transparent hover:bg-white/5',
        'border-zebra-blue-500/50 hover:border-zebra-blue-400/70',
        'text-zebra-blue-500 hover:text-zebra-blue-400',
        'shadow-lg shadow-zebra-blue-600/10',
        'hover:shadow-xl hover:shadow-zebra-blue-500/15',
        'focus:ring-zebra-blue-500/30',
        
        // Dark mode adjustments
        'dark:border-zebra-blue-400/40 dark:hover:border-zebra-blue-300/60',
        'dark:text-zebra-blue-400 dark:hover:text-zebra-blue-300',
        'dark:shadow-zebra-blue-500/10',
      ),
      
      ghost: cn(
        // Ghost variant with subtle glassmorphism
        'bg-transparent hover:bg-white/5',
        'border-transparent hover:border-white/10',
        'text-white/80 hover:text-white',
        'shadow-none hover:shadow-lg hover:shadow-black/5',
        'focus:ring-white/20',
        
        // Dark mode adjustments
        'dark:text-white/70 dark:hover:text-white',
        'dark:hover:bg-white/5 dark:hover:border-white/10',
      ),
    };

    // Size variants
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm min-h-[44px]',
      md: 'px-4 py-3 text-base min-h-[48px]',
      lg: 'px-6 py-4 text-lg min-h-[52px]',
    };

    // Combine all styles
    const buttonStyles = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // Content with loading state
    const buttonContent = (
      <>
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {children}
      </>
    );

    // If href is provided, render as Link
    if (href) {
      return (
        <Link
          href={href}
          target={target}
          className={buttonStyles}
          onClick={onClick}
          {...(disabled && { 'aria-disabled': true, tabIndex: -1 })}
        >
          {buttonContent}
        </Link>
      );
    }

    // Render as button
    return (
      <button
        ref={ref}
        type="button"
        className={buttonStyles}
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;