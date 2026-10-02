import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'linen' | 'evergreen' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-[rgba(32,36,33,0.08)] text-[#202421]',
    linen: 'bg-[#F5F0E6] border border-[rgba(32,36,33,0.1)] text-[#202421]',
    evergreen: 'bg-[#0D2923] text-white border border-[#183C34]',
    bordered: 'bg-white border-2 border-[rgba(32,36,33,0.12)] text-[#202421]',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  };

  return (
    <div
      className={`rounded-[8px] transition-shadow duration-150 ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className = '',
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 pb-4 border-b border-[rgba(32,36,33,0.06)] ${className}`}>
      <div>
        <h3 className="text-base font-semibold text-[#202421] tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
