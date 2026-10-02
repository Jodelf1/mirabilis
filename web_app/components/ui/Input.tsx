import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[#202421] tracking-tight uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[rgba(32,36,33,0.45)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full h-10 px-3.5 bg-white border text-sm text-[#202421] placeholder-[rgba(32,36,33,0.38)] rounded-[8px] transition-all duration-150 outline-none
              ${
                error
                  ? 'border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                  : 'border-[rgba(32,36,33,0.16)] hover:border-[rgba(32,36,33,0.28)] focus:border-[#32866D] focus:ring-2 focus:ring-[#32866D]/20'
              }
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon || rightElement ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-[rgba(32,36,33,0.45)]">
              {rightIcon}
            </div>
          )}
          {rightElement && (
            <div className="absolute right-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
        {helperText && !error && (
          <p className="text-[11px] text-[rgba(32,36,33,0.6)] mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { value: string | number; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, children, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-[#202421] tracking-tight uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`w-full h-10 px-3.5 pr-9 bg-white border text-sm text-[#202421] rounded-[8px] transition-all duration-150 outline-none appearance-none cursor-pointer
              ${
                error
                  ? 'border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                  : 'border-[rgba(32,36,33,0.16)] hover:border-[rgba(32,36,33,0.28)] focus:border-[#32866D] focus:ring-2 focus:ring-[#32866D]/20'
              }
              ${className}
            `}
            {...props}
          >
            {options
              ? options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(32,36,33,0.5)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
        {helperText && !error && (
          <p className="text-[11px] text-[rgba(32,36,33,0.6)] mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
