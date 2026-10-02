import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost' | 'outline-teal';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium font-sans select-none transition-all duration-150 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1';

  const variantClasses = {
    primary:
      'bg-[#32866D] text-white hover:bg-[#286F5A] active:bg-[#225B4A] focus:ring-[#32866D]/40 shadow-[0_1px_2px_rgba(13,41,35,0.08)]',
    secondary:
      'bg-white text-[#202421] border border-[rgba(32,36,33,0.15)] hover:bg-[#F5F0E6]/50 hover:border-[rgba(32,36,33,0.25)] active:bg-[#F5F0E6] focus:ring-[#32866D]/30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
    accent:
      'bg-[#B85C3A] text-white hover:bg-[#9E4E30] active:bg-[#864026] focus:ring-[#B85C3A]/40 shadow-[0_1px_2px_rgba(184,92,58,0.15)]',
    destructive:
      'bg-[#DC2626] text-white hover:bg-[#B91C1C] active:bg-[#991B1B] focus:ring-red-500/40 shadow-[0_1px_2px_rgba(220,38,38,0.15)]',
    ghost:
      'bg-transparent text-[#202421] hover:bg-[rgba(32,36,33,0.06)] active:bg-[rgba(32,36,33,0.1)] focus:ring-[rgba(32,36,33,0.2)]',
    'outline-teal':
      'bg-transparent text-[#32866D] border border-[#32866D]/40 hover:bg-[#32866D]/10 active:bg-[#32866D]/15 focus:ring-[#32866D]/30',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs rounded-[8px] gap-1.5',
    md: 'h-10 px-4 text-sm rounded-[10px] gap-2',
    lg: 'h-11 px-5 text-base rounded-[10px] gap-2.5',
    icon: 'h-10 w-10 p-0 rounded-[10px] flex items-center justify-center',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
