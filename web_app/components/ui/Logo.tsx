import React from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export function Logo({
  variant = 'light',
  size = 'md',
  showText = true,
  className = '',
}: LogoProps) {
  const isLight = variant === 'light';

  const heights = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-14',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  // If collapsed or icon only
  if (!showText) {
    return (
      <div className={`relative ${iconSizes[size]} flex items-center justify-center select-none ${className}`}>
        <img
          src="/ICON.png"
          alt="Mirabilis Ícone"
          className="w-full h-full object-contain filter drop-shadow-xs transition-transform duration-200 hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={isLight ? '/MIRABILIS-LOGO-WHITE.png' : '/MIRABILIS-LOGO.png'}
        alt="Mirabilis"
        className={`${heights[size]} w-auto object-contain transition-all duration-200`}
      />
    </div>
  );
}

export function BrandIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <img
      src="/ICON.png"
      alt="Mirabilis"
      className={`${iconSizes[size]} object-contain ${className}`}
    />
  );
}
