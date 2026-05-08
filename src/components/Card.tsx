import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  className?: string;
  hover?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

export const Card = ({ className, hover = true, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white p-8 border border-slate-200 transition-all duration-300 relative',
        hover && 'hover:border-slate-400 hover:shadow-[8px_8px_0px_rgba(15,23,42,0.05)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
