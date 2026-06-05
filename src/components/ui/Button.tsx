import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md active:scale-95', // Secundária é Laranja, muito usada em CTA
      secondary: 'bg-primary text-white hover:bg-primary-dark shadow-md active:scale-95', // Azul
      outline: 'border-2 border-primary text-primary hover:bg-primary/10 active:scale-95',
      ghost: 'hover:bg-black/5 active:scale-95',
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-14 px-6 text-base font-semibold', // Padrão mobile grande (touch-friendly)
      lg: 'h-16 px-8 text-lg font-bold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
