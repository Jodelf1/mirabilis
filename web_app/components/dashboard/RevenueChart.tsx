'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from '../ui/Card';
import { monthlyRevenueData } from '@/lib/mock-data';
import { formatKz } from '@/lib/utils';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

export function RevenueChart() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'breakdown'>('monthly');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = Math.max(...monthlyRevenueData.map(d => d.revenue)) * 1.15;
  const chartHeight = 220;

  return (
    <Card padding="md" className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(32,36,33,0.06)]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#202421] tracking-tight">
              Evolução da Faturação
            </h3>
            <span className="text-xs font-medium px-2 py-0.5 bg-[#EBF5F1] text-[#32866D] rounded-full">
              2026
            </span>
          </div>
          <p className="text-xs text-[rgba(32,36,33,0.6)] mt-0.5">
            Comparativo mensal entre valores faturados e recebidos
          </p>
        </div>

        {/* Legend and filter */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[3px] bg-[#32866D]" />
              <span className="text-[rgba(32,36,33,0.7)] font-medium">Faturado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[3px] bg-[#6E9B76]" />
              <span className="text-[rgba(32,36,33,0.7)] font-medium">Recebido</span>
            </div>
          </div>

          <div className="flex bg-[#F5F0E6] p-0.5 rounded-[8px] border border-[rgba(32,36,33,0.08)]">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-2.5 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                activeTab === 'monthly'
                  ? 'bg-white text-[#0D2923] shadow-xs'
                  : 'text-[rgba(32,36,33,0.6)] hover:text-[#0D2923]'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-2.5 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                activeTab === 'breakdown'
                  ? 'bg-white text-[#0D2923] shadow-xs'
                  : 'text-[rgba(32,36,33,0.6)] hover:text-[#0D2923]'
              }`}
            >
              Trimestral
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="pt-6 pb-2 flex-1 min-h-[260px] flex flex-col justify-end">
        <div className="relative w-full h-[220px] flex items-end justify-between gap-2 sm:gap-4 px-2">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
            <div className="border-b border-dashed border-[rgba(32,36,33,0.2)] w-full text-[10px] text-[rgba(32,36,33,0.4)] text-right pr-1">
              4.5M Kz
            </div>
            <div className="border-b border-dashed border-[rgba(32,36,33,0.2)] w-full text-[10px] text-[rgba(32,36,33,0.4)] text-right pr-1">
              3.0M Kz
            </div>
            <div className="border-b border-dashed border-[rgba(32,36,33,0.2)] w-full text-[10px] text-[rgba(32,36,33,0.4)] text-right pr-1">
              1.5M Kz
            </div>
            <div className="border-b border-[rgba(32,36,33,0.15)] w-full text-[10px] text-[rgba(32,36,33,0.4)] text-right pr-1">
              0 Kz
            </div>
          </div>

          {/* Bars */}
          {monthlyRevenueData.map((data, idx) => {
            const revHeight = (data.revenue / maxVal) * chartHeight;
            const recHeight = (data.received / maxVal) * chartHeight;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={data.month}
                className="relative flex-1 flex flex-col items-center group h-full justify-end z-10 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-20 z-30 bg-[#0D2923] text-white p-2.5 rounded-[8px] shadow-lg border border-[#183C34] text-xs whitespace-nowrap animate-in fade-in duration-100 pointer-events-none">
                    <p className="font-semibold text-[#EBF5F1] text-[11px] mb-1">
                      {data.month} 2026
                    </p>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-white/70">Faturação:</span>
                      <span className="font-bold text-white">{formatKz(data.revenue)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-[#6E9B76]">Recebido:</span>
                      <span className="font-bold text-[#6E9B76]">{formatKz(data.received)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-[#B85C3A]">Pendente:</span>
                      <span className="font-bold text-[#B85C3A]">{formatKz(data.pending)}</span>
                    </div>
                  </div>
                )}

                {/* Bars group */}
                <div className="flex items-end gap-1 sm:gap-1.5 w-full max-w-[36px] justify-center transition-transform group-hover:scale-105">
                  {/* Revenue Bar */}
                  <div
                    style={{ height: `${revHeight}px` }}
                    className={`w-1/2 rounded-t-[3px] transition-all duration-200 ${
                      isHovered ? 'bg-[#286F5A]' : 'bg-[#32866D]'
                    }`}
                  />
                  {/* Received Bar */}
                  <div
                    style={{ height: `${recHeight}px` }}
                    className={`w-1/2 rounded-t-[3px] transition-all duration-200 ${
                      isHovered ? 'bg-[#55825D]' : 'bg-[#6E9B76]'
                    }`}
                  />
                </div>

                {/* X-axis Label */}
                <span
                  className={`text-[11px] mt-2 font-medium transition-colors ${
                    isHovered ? 'text-[#0D2923] font-bold' : 'text-[rgba(32,36,33,0.55)]'
                  }`}
                >
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
