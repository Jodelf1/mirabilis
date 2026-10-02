'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader } from '../ui/Card';
import { useApp } from '@/lib/store';
import { FileText, CheckCircle2, UserPlus, Send, Clock, ArrowRight } from 'lucide-react';

export function ActivityStream() {
  const router = useRouter();
  const { activities } = useApp();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <FileText className="w-3.5 h-3.5 text-[#32866D]" />;
      case 'payment':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />;
      case 'customer':
        return <UserPlus className="w-3.5 h-3.5 text-[#B85C3A]" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-[#0D2923]" />;
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case 'invoice':
        return 'bg-[#EBF5F1] border-[#32866D]/20';
      case 'payment':
        return 'bg-[#ECFDF5] border-[#10B981]/20';
      case 'customer':
        return 'bg-[#FBF0EC] border-[#B85C3A]/20';
      default:
        return 'bg-[#F5F0E6] border-[#0D2923]/10';
    }
  };

  return (
    <Card padding="md" className="flex flex-col">
      <CardHeader
        title="Atividade Recente"
        subtitle="Movimentos operacionais registados"
      />

      <div className="pt-4 flex-1 space-y-4">
        {activities.slice(0, 5).map((act, index) => (
          <div
            key={act.id}
            onClick={() => {
              if (act.relatedId?.startsWith('inv-')) {
                router.push(`/faturacao/${act.relatedId}`);
              } else if (act.relatedId?.startsWith('cust-')) {
                router.push(`/clientes/${act.relatedId}`);
              }
            }}
            className="flex items-start gap-3 group cursor-pointer"
          >
            <div
              className={`w-7 h-7 rounded-[8px] border flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105 ${getActivityBg(
                act.type
              )}`}
            >
              {getActivityIcon(act.type)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#202421] group-hover:text-[#32866D] transition-colors leading-snug">
                {act.title}
              </p>
              <p className="text-[11px] text-[rgba(32,36,33,0.65)] mt-0.5 line-clamp-2 leading-relaxed">
                {act.description}
              </p>
              <span className="inline-block text-[10px] text-[rgba(32,36,33,0.4)] mt-1 font-medium">
                {act.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
