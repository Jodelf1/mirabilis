'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useApp } from '@/lib/store';
import { formatKz } from '@/lib/utils';
import { ArrowRight, FileText, ChevronRight } from 'lucide-react';

export function RecentDocumentsTable() {
  const router = useRouter();
  const { invoices } = useApp();

  // Show the most recent 5 documents
  const recentInvoices = invoices.slice(0, 5);

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="p-5 border-b border-[rgba(32,36,33,0.08)] flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#202421] tracking-tight">
            Documentos Recentes
          </h3>
          <p className="text-xs text-[rgba(32,36,33,0.6)] mt-0.5">
            Últimas faturas emitidas e respetivos estados
          </p>
        </div>
        <Link
          href="/faturacao"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#32866D] hover:text-[#286F5A] transition-colors"
        >
          <span>Ver todos ({invoices.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#F5F0E6] border-b border-[rgba(32,36,33,0.08)] text-[11px] font-semibold text-[#0D2923] uppercase tracking-wider">
              <th className="py-3 px-4 font-semibold">Documento</th>
              <th className="py-3 px-4 font-semibold">Cliente</th>
              <th className="py-3 px-4 font-semibold">Data</th>
              <th className="py-3 px-4 font-semibold text-right">Valor</th>
              <th className="py-3 px-4 font-semibold text-center">Estado</th>
              <th className="py-3 px-4 font-semibold text-right w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(32,36,33,0.06)] bg-white text-xs">
            {recentInvoices.map(invoice => (
              <tr
                key={invoice.id}
                onClick={() => router.push(`/faturacao/${invoice.id}`)}
                className="hover:bg-[#F5F0E6]/40 cursor-pointer transition-colors group"
              >
                <td className="py-3 px-4 font-semibold text-[#0D2923]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#32866D]/70 shrink-0" />
                    <span>{invoice.number}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#202421] font-medium">
                  {invoice.customerName}
                </td>
                <td className="py-3 px-4 text-[rgba(32,36,33,0.65)]">
                  {invoice.issueDate}
                </td>
                <td className="py-3 px-4 font-semibold text-[#202421] text-right font-sans">
                  {formatKz(invoice.total)}
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge status={invoice.status} />
                </td>
                <td className="py-3 px-4 text-right text-[rgba(32,36,33,0.4)] group-hover:text-[#32866D] transition-colors">
                  <ChevronRight className="w-4 h-4 inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
