/**
 * Card component with glassmorphism styles for IAMET Zebra landing page
 */
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CardProps } from '@/types/zebra';

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className, 
    variant = 'default', 
    hover = false, 
    onClick,
    style,
    ...props 
  }, ref) => {
    
    // Base styles for all cards
    const baseStyles = cn(
      // Base layout
      'rounded-lg border transition-all duration-300 ease-in-out',
      
      // Cursor change if clickable
      onClick && 'cursor-pointer',
      
      // Focus states for accessibility
      onClick && 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
    );

    // Variant-specific styles
    const variantStyles = {
      default: cn(
        // Default card with subtle glassmorphism
        'bg-white/5 backdrop-blur-sm',
        'border-white/10',
        'shadow-lg shadow-black/5',
        
        // Dark mode adjustments
        'dark:bg-white/5 dark:border-white/10',
        'dark:shadow-black/10',
      ),
      
      glassmorphism: cn(
        // Enhanced glassmorphism effect
        'bg-white/8 backdrop-blur-2xl',
        'border-white/25',
        'shadow-2xl shadow-black/20',
        
        // Multi-layer glass effect
        'before:absolute before:inset-0 before:rounded-lg',
        'before:bg-gradient-to-br before:from-white/15 before:via-white/5 before:to-transparent',
        'before:opacity-60 before:pointer-events-none',
        
        // Additional inner glow
        'after:absolute after:inset-0 after:rounded-lg',
        'after:bg-gradient-to-t after:from-zebra-blue-500/5 after:via-transparent after:to-zebra-blue-400/5',
        'after:opacity-40 after:pointer-events-none',
        'relative overflow-hidden',
        
        // Enhanced backdrop blur support
        'supports-[backdrop-filter]:bg-white/5',
        'supports-[backdrop-filter]:backdrop-blur-3xl',
        
        // Dark mode adjustments
        'dark:bg-white/3 dark:border-white/20',
        'dark:shadow-black/30',
        'dark:before:from-white/8 dark:before:via-white/2',
        'dark:after:from-zebra-blue-600/3 dark:after:to-zebra-blue-500/3',
      ),
      
      solid: cn(
        // Solid card for high contrast
        'bg-zebra-gray-800/90 backdrop-blur-sm',
        'border-zebra-gray-700/50',
        'shadow-xl shadow-black/20',
        
        // Dark mode adjustments
        'dark:bg-zebra-gray-900/90 dark:border-zebra-gray-800/50',
        'dark:shadow-black/30',
      ),
    };

    // Hover styles
    const hoverStyles = hover ? {
      default: cn(
        'hover:bg-white/10 hover:border-white/20',
        'hover:shadow-xl hover:shadow-black/10',
        'hover:scale-105',
        
        // Dark mode hover
        'dark:hover:bg-white/10 dark:hover:border-white/20',
        'dark:hover:shadow-black/15',
      ),
      
      glassmorphism: cn(
        'hover:bg-white/12 hover:border-white/35',
        'hover:shadow-3xl hover:shadow-black/25',
        'hover:scale-[1.02] lg:hover:scale-105',
        'hover:before:opacity-80',
        'hover:after:opacity-60',
        
        // Enhanced hover animations
        'transition-all duration-500 ease-out',
        'hover:backdrop-blur-3xl',
        
        // Pulse glow effect on hover
        'hover:shadow-zebra-blue-500/10',
        
        // Dark mode hover
        'dark:hover:bg-white/8 dark:hover:border-white/30',
        'dark:hover:shadow-black/35',
        'dark:hover:shadow-zebra-blue-600/10',
      ),
      
      solid: cn(
        'hover:bg-zebra-gray-700/90 hover:border-zebra-gray-600/50',
        'hover:shadow-2xl hover:shadow-black/25',
        'hover:scale-105',
        
        // Dark mode hover
        'dark:hover:bg-zebra-gray-800/90 dark:hover:border-zebra-gray-700/50',
        'dark:hover:shadow-black/35',
      ),
    } : {};

    // Click styles
    const clickStyles = onClick ? cn(
      'active:scale-95 active:shadow-md',
      'transition-transform duration-150',
      
      // Focus ring
      'focus:ring-zebra-blue-500/30 focus:ring-2',
      
      // Dark mode focus
      'dark:focus:ring-zebra-blue-400/30',
    ) : '';

    // Combine all styles
    const cardStyles = cn(
      baseStyles,
      variantStyles[variant],
      hover && hoverStyles[variant],
      clickStyles,
      className
    );

    return (
      <div
        ref={ref}
        className={cardStyles}
        style={style}
        onClick={onClick}
        {...(onClick && { 
          role: 'button',
          tabIndex: 0,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          }
        })}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

// Additional card components for common use cases

/**
 * Card header component
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 p-6 pb-4',
      className
    )}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

/**
 * Card title component
 */
export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-white',
      'dark:text-white',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

/**
 * Card description component
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-white/70 leading-relaxed',
      'dark:text-white/70',
      className
    )}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * Card content component
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-0', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

/**
 * Card footer component
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center p-6 pt-0',
      className
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';