'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatKz } from '@/lib/utils';
import {
  Plus,
  Search,
  FileText,
  Filter,
  ArrowUpDown,
  Download,
  CheckCircle2,
  ChevronRight,
  Printer,
} from 'lucide-react';

export function InvoiceList() {
  const router = useRouter();
  const { invoices } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [search, setSearch] = useState('');

  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter !== 'Todos' && inv.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        inv.number.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q) ||
        inv.customerNif.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalInvoiced = invoices.filter(i => i.status !== 'Anulado').reduce((acc, i) => acc + i.total, 0);
  const totalPaid = invoices.filter(i => i.status === 'Pago').reduce((acc, i) => acc + i.total, 0);
  const totalPending = invoices.filter(i => i.status === 'Pendente').reduce((acc, i) => acc + i.total, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2923] tracking-tight">Faturação</h1>
          <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">
            Consulte e acompanhe os documentos de faturação e liquidações da sua empresa.
          </p>
        </div>
        <Link
          href="/faturacao/nova"
          className="inline-flex items-center justify-center bg-[#32866D] hover:bg-[#286F5A] active:bg-[#225B4A] text-white font-medium rounded-[10px] h-10 px-4 text-sm gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova fatura</span>
        </Link>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Total Emitido
          </span>
          <p className="text-2xl font-bold text-[#0D2923] mt-1 font-sans">{formatKz(totalInvoiced)}</p>
          <span className="text-[11px] text-[rgba(32,36,33,0.6)] font-medium">
            {invoices.length} documentos registados
          </span>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Total Liquidado
          </span>
          <p className="text-2xl font-bold text-[#10B981] mt-1 font-sans">{formatKz(totalPaid)}</p>
          <span className="text-[11px] text-[#10B981] font-medium">
            Recebido e reconciliado
          </span>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Por Receber
          </span>
          <p className="text-2xl font-bold text-[#B85C3A] mt-1 font-sans">{formatKz(totalPending)}</p>
          <span className="text-[11px] text-[#B85C3A] font-medium">
            Faturas em aberto
          </span>
        </Card>
      </div>

      {/* Filters and Table Card */}
      <Card padding="none" className="overflow-hidden bg-white">
        <div className="p-4 border-b border-[rgba(32,36,33,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Filter Tabs */}
          <div className="flex bg-[#F5F0E6] p-1 rounded-[8px] border border-[rgba(32,36,33,0.08)]">
            {['Todos', 'Pago', 'Pendente', 'Anulado'].map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-white text-[#0D2923] shadow-xs font-semibold'
                    : 'text-[rgba(32,36,33,0.65)] hover:text-[#0D2923]'
                }`}
              >
                {tab === 'Todos' ? 'Todos os Documentos' : tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(32,36,33,0.4)] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Pesquisar número, cliente ou NIF..."
              className="w-full h-8 pl-9 pr-3 text-xs bg-[#FAFAFA] border border-[rgba(32,36,33,0.12)] rounded-[6px] text-[#202421] placeholder-[rgba(32,36,33,0.4)] focus:outline-none focus:bg-white focus:border-[#32866D]"
            />
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F5F0E6] text-[#0D2923] border-b border-[rgba(32,36,33,0.08)] text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Data Emissão</th>
                <th className="py-3 px-4">Vencimento</th>
                <th className="py-3 px-4 text-right">Valor Total</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(32,36,33,0.06)] bg-white text-xs">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[rgba(32,36,33,0.5)]">
                    Nenhum documento encontrado com os filtros ativos.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(invoice => (
                  <tr
                    key={invoice.id}
                    onClick={() => router.push(`/faturacao/${invoice.id}`)}
                    className="hover:bg-[#F5F0E6]/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#0D2923]">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#32866D] shrink-0" />
                        <span>{invoice.number}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#202421]">
                      <div>
                        <p className="font-semibold text-[#202421] group-hover:text-[#32866D] transition-colors">
                          {invoice.customerName}
                        </p>
                        <p className="text-[10px] text-[rgba(32,36,33,0.5)]">
                          NIF: {invoice.customerNif}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[rgba(32,36,33,0.7)] font-medium">
                      {invoice.issueDate}
                    </td>
                    <td className="py-3.5 px-4 text-[rgba(32,36,33,0.6)]">
                      {invoice.dueDate}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#202421] font-sans">
                      {formatKz(invoice.total)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge status={invoice.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right text-[rgba(32,36,33,0.4)] group-hover:text-[#32866D] transition-colors">
                      <ChevronRight className="w-4 h-4 inline" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
