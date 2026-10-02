import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKz(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '0 Kz';
  // Format with dot separators according to Angolan/Portuguese standard
  const parts = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${parts} Kz`;
}

export function formatKzWithDecimals(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '0,00 Kz';
  const fixed = value.toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedInt},${decPart} Kz`;
}

export function formatDate(dateStr: string): string {
  return dateStr;
}
