'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardHeader } from '../ui/Card';
import { formatKz } from '@/lib/utils';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Calendar,
  Download,
  Users,
  Package,
  Layers,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Button } from '../ui/Button';

export function AnalyticsDashboard() {
  const { customers, products, invoices } = useApp();
  const [period, setPeriod] = useState<'2026' | 'Q3' | 'Q4'>('2026');

  // Client breakdown
  const topClients = [...customers]
    .sort((a, b) => b.totalInvoiced - a.totalInvoiced)
    .slice(0, 4);

  const totalInvoiced = invoices.filter(i => i.status !== 'Anulado').reduce((acc, i) => acc + i.total, 0);
  const totalReceived = invoices.filter(i => i.status === 'Pago').reduce((acc, i) => acc + i.total, 0);
  const totalPending = invoices.filter(i => i.status === 'Pendente').reduce((acc, i) => acc + i.total, 0);
  const recoveryRate = Math.round((totalReceived / (totalInvoiced || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2923] tracking-tight">Relatórios & Análise</h1>
          <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">
            Visão analítica consolidada do desempenho comercial e liquidez da empresa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[#F5F0E6] p-1 rounded-[8px] border border-[rgba(32,36,33,0.08)]">
            {(['2026', 'Q3', 'Q4'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                  period === p
                    ? 'bg-white text-[#0D2923] shadow-xs font-semibold'
                    : 'text-[rgba(32,36,33,0.6)] hover:text-[#0D2923]'
                }`}
              >
                {p === '2026' ? 'Ano Completo (2026)' : p}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5 text-[rgba(32,36,33,0.6)]" />}
            onClick={() => window.print()}
          >
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Faturação Acumulada
          </span>
          <p className="text-2xl font-bold text-[#0D2923] mt-1 font-sans">
            4.285.400 Kz
          </p>
          <span className="text-[11px] text-[#32866D] font-medium flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3" /> +12,4% de crescimento
          </span>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Taxa de Cobrança
          </span>
          <p className="text-2xl font-bold text-[#32866D] mt-1 font-sans">
            86,8%
          </p>
          <span className="text-[11px] text-[#10B981] font-medium mt-0.5">
            3.721.800 Kz liquidados
          </span>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Exposição em Aberto
          </span>
          <p className="text-2xl font-bold text-[#B85C3A] mt-1 font-sans">
            563.600 Kz
          </p>
          <span className="text-[11px] text-[#B85C3A] font-medium mt-0.5">
            4 clientes com faturas ativas
          </span>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            IVA Estimado (14%)
          </span>
          <p className="text-2xl font-bold text-[#0D2923] mt-1 font-sans">
            526.298 Kz
          </p>
          <span className="text-[11px] text-[rgba(32,36,33,0.6)] font-medium mt-0.5">
            Regime Geral de IVA
          </span>
        </Card>
      </div>

      {/* 2-Column Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients by Revenue */}
        <Card padding="md" className="bg-white space-y-4">
          <CardHeader
            title="Principais Clientes por Volume"
            subtitle="Concentração de faturação na carteira de clientes"
          />

          <div className="space-y-3.5 pt-2">
            {topClients.map((client, idx) => {
              const percentage = Math.round((client.totalInvoiced / 4820000) * 100);
              return (
                <div key={client.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#F5F0E6] text-[#0D2923] font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-[#202421]">{client.name}</span>
                    </div>
                    <span className="font-bold text-[#0D2923] font-sans">
                      {formatKz(client.totalInvoiced)}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[#F5F0E6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#32866D] rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Services & Products */}
        <Card padding="md" className="bg-white space-y-4">
          <CardHeader
            title="Distribuição por Serviço & Categoria"
            subtitle="Produtos e serviços com maior representatividade"
          />

          <div className="space-y-3 pt-2">
            {products.slice(0, 4).map((product, idx) => {
              const share = [38, 28, 18, 16][idx] || 10;
              return (
                <div
                  key={product.id}
                  className="p-3 bg-[#FAFAFA] rounded-[8px] border border-[rgba(32,36,33,0.06)] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-[6px] bg-[#EBF5F1] text-[#32866D] font-bold text-xs flex items-center justify-center shrink-0">
                      {product.code.split('-')[1]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#202421] truncate">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-[rgba(32,36,33,0.5)]">
                        {product.category} • Preço base: {formatKz(product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#0D2923]">{share}%</span>
                    <p className="text-[10px] text-[rgba(32,36,33,0.5)]">do volume total</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Liquidity Breakdown Card */}
      <Card padding="md" className="bg-white">
        <CardHeader
          title="Estrutura de Liquidação e Prazos Médios"
          subtitle="Comportamento de pagamento das entidades em Angola"
        />

        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-[8px] bg-[#ECFDF5] border border-[#A7F3D0] space-y-1">
            <div className="flex items-center gap-2 text-[#065F46]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold uppercase tracking-wider">Pagamentos a Prazo (15 Dias)</span>
            </div>
            <p className="text-xl font-bold text-[#065F46] font-sans">82% das faturas</p>
            <p className="text-[11px] text-[#065F46]/80">Liquidadas dentro do vencimento legal estipulado.</p>
          </div>

          <div className="p-4 rounded-[8px] bg-[#FFFBEB] border border-[#FDE68A] space-y-1">
            <div className="flex items-center gap-2 text-[#92400E]">
              <Clock className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs font-bold uppercase tracking-wider">Pendentes (&lt; 30 Dias)</span>
            </div>
            <p className="text-xl font-bold text-[#92400E] font-sans">563.600 Kz</p>
            <p className="text-[11px] text-[#92400E]/80">4 documentos em processo de autorização bancária.</p>
          </div>

          <div className="p-4 rounded-[8px] bg-[#F5F0E6] border border-[rgba(32,36,33,0.1)] space-y-1">
            <div className="flex items-center gap-2 text-[#0D2923]">
              <Layers className="w-4 h-4 text-[#32866D]" />
              <span className="text-xs font-bold uppercase tracking-wider">Canal de Pagamento Preferencial</span>
            </div>
            <p className="text-xl font-bold text-[#0D2923] font-sans">BFA & BAI</p>
            <p className="text-[11px] text-[rgba(32,36,33,0.7)]">Transferência bancária direta representa 89% dos fluxos.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
