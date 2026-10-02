import React from 'react';
import { InvoiceStatus } from '@/lib/types';

interface BadgeProps {
  status: InvoiceStatus | 'Ativo' | 'Inativo' | 'Administrador' | 'Financeiro' | 'Vendas' | 'Contabilista' | string;
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ status, size = 'sm', className = '' }: BadgeProps) {
  const getStyle = (st: string) => {
    switch (st) {
      case 'Pago':
      case 'Ativo':
        return 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]/60';
      case 'Pendente':
        return 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]/60';
      case 'Anulado':
        return 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]/60';
      case 'Emitido':
        return 'bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]/60';
      case 'Rascunho':
        return 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]';
      case 'Administrador':
        return 'bg-[#EBF5F1] text-[#32866D] border border-[#32866D]/20 font-medium';
      case 'Financeiro':
        return 'bg-[#FBF0EC] text-[#B85C3A] border border-[#B85C3A]/20 font-medium';
      case 'Vendas':
        return 'bg-[#EFF6FF] text-[#2563EB] border border-[#93C5FD]/40 font-medium';
      case 'Contabilista':
        return 'bg-[#F5F0E6] text-[#0D2923] border border-[#0D2923]/15 font-medium';
      case 'Inativo':
        return 'bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]';
      default:
        return 'bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]';
    }
  };

  const sizeClasses = size === 'sm' ? 'text-[12px] px-2.5 py-0.5' : 'text-[13px] px-3 py-1';

  return (
    <span
      className={`inline-flex items-center justify-center font-medium rounded-full tracking-tight transition-colors select-none ${sizeClasses} ${getStyle(
        status
      )} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 opacity-75"
        style={{
          backgroundColor:
            status === 'Pago' || status === 'Ativo'
              ? '#10B981'
              : status === 'Pendente'
              ? '#F59E0B'
              : status === 'Anulado'
              ? '#EF4444'
              : status === 'Emitido'
              ? '#3B82F6'
              : '#9CA3AF',
        }}
      />
      {status}
    </span>
  );
}
