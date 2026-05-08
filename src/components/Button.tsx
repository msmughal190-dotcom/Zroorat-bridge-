import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-accent transition-colors',
      secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
      outline: 'border-2 border-primary bg-transparent hover:bg-primary hover:text-white',
      ghost: 'bg-transparent hover:bg-slate-100',
    };

    const sizes = {
      sm: 'h-9 px-4 text-[10px]',
      md: 'h-12 px-8 text-xs',
      lg: 'h-16 px-10 text-sm',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center uppercase tracking-[0.2em] font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
