import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, ArrowUpRight, Clock, FileCheck2 } from 'lucide-react';
import { formatKz } from '@/lib/utils';
import { useApp } from '@/lib/store';

export function MetricCards() {
  const { invoices } = useApp();

  // Compute live aggregates from state
  const totalInvoiced = invoices.filter(i => i.status !== 'Anulado').reduce((acc, i) => acc + i.total, 0);
  const totalReceived = invoices.filter(i => i.status === 'Pago').reduce((acc, i) => acc + i.total, 0);
  const totalPending = invoices.filter(i => i.status === 'Pendente').reduce((acc, i) => acc + i.total, 0);
  const totalIssued = invoices.length + 120; // 128 total base count in prototype context

  const metrics = [
    {
      title: 'Faturação',
      value: '4.285.400 Kz',
      comparison: '↑ 12,4% vs. mês anterior',
      trend: 'positive',
      icon: TrendingUp,
      iconColor: 'text-[#32866D]',
      iconBg: 'bg-[#EBF5F1]',
      accentBorder: 'border-t-2 border-t-[#32866D]',
    },
    {
      title: 'Recebido',
      value: '3.721.800 Kz',
      comparison: '↑ 8,1% vs. mês anterior',
      trend: 'positive',
      icon: ArrowUpRight,
      iconColor: 'text-[#10B981]',
      iconBg: 'bg-[#ECFDF5]',
      accentBorder: 'border-t-2 border-t-[#10B981]',
    },
    {
      title: 'Por receber',
      value: '563.600 Kz',
      comparison: '4 documentos com liquidação pendente',
      trend: 'warning',
      icon: Clock,
      iconColor: 'text-[#B85C3A]',
      iconBg: 'bg-[#FBF0EC]',
      accentBorder: 'border-t-2 border-t-[#B85C3A]',
    },
    {
      title: 'Documentos emitidos',
      value: `${totalIssued}`,
      comparison: '+15 documentos este mês',
      trend: 'neutral',
      icon: FileCheck2,
      iconColor: 'text-[#0D2923]',
      iconBg: 'bg-[#F5F0E6]',
      accentBorder: 'border-t-2 border-t-[#0D2923]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <Card
            key={idx}
            className={`relative overflow-hidden bg-white hover:shadow-sm transition-all duration-150 ${metric.accentBorder}`}
            padding="md"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-[rgba(32,36,33,0.65)] uppercase tracking-wider">
                {metric.title}
              </span>
              <div
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${metric.iconBg} ${metric.iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-2xl sm:text-[26px] font-semibold text-[#202421] tracking-tight font-sans">
                {metric.value}
              </h2>
              <p
                className={`text-xs mt-1.5 flex items-center font-medium ${
                  metric.trend === 'positive'
                    ? 'text-[#32866D]'
                    : metric.trend === 'warning'
                    ? 'text-[#B85C3A]'
                    : 'text-[rgba(32,36,33,0.6)]'
                }`}
              >
                {metric.comparison}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
