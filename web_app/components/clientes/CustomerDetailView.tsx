'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatKz } from '@/lib/utils';
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  FilePlus,
  FileText,
  Calendar,
  ChevronRight,
  ReceiptText,
} from 'lucide-react';

interface CustomerDetailViewProps {
  customerId: string;
}

export function CustomerDetailView({ customerId }: CustomerDetailViewProps) {
  const router = useRouter();
  const { customers, invoices } = useApp();

  const customer = customers.find(c => c.id === customerId) || customers[0];
  const customerInvoices = invoices.filter(
    i => i.customerId === customerId || i.customerName === customer?.name
  );

  if (!customer) {
    return (
      <div className="p-8 text-center bg-white rounded-[8px]">
        <p className="text-sm font-semibold">Cliente não encontrado.</p>
        <Button variant="primary" size="sm" className="mt-4" onClick={() => router.push('/clientes')}>
          Voltar para Clientes
        </Button>
      </div>
    );
  }

  const calculatedTotal = customerInvoices.reduce((acc, i) => acc + (i.status !== 'Anulado' ? i.total : 0), 0);
  const calculatedPending = customerInvoices
    .filter(i => i.status === 'Pendente')
    .reduce((acc, i) => acc + i.total, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/clientes"
            className="p-2 rounded-[8px] bg-white border border-[rgba(32,36,33,0.1)] text-[#202421] hover:bg-[#F5F0E6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-[#0D2923] tracking-tight">
                {customer.name}
              </h1>
              <Badge status={customer.status} size="md" />
            </div>
            <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">
              NIF: <span className="font-semibold text-[#202421]">{customer.nif}</span> • Cliente desde {customer.createdAt}
            </p>
          </div>
        </div>

        <Link
          href="/faturacao/nova"
          className="inline-flex items-center justify-center bg-[#32866D] hover:bg-[#286F5A] text-white font-medium rounded-[10px] py-2 px-4 text-xs gap-2 shadow-xs transition-colors"
        >
          <FilePlus className="w-4 h-4" />
          <span>Emitir Fatura para este Cliente</span>
        </Link>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md" className="bg-white">
          <span className="text-xs font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Total Faturado
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-[#0D2923] mt-1 font-sans">
            {formatKz(calculatedTotal || customer.totalInvoiced)}
          </p>
          <span className="text-xs text-[#32866D] font-medium mt-1 inline-block">
            Histórico de faturação acumulada
          </span>
        </Card>

        <Card padding="md" className="bg-white">
          <span className="text-xs font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Valor Pendente
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-[#B85C3A] mt-1 font-sans">
            {formatKz(calculatedPending || customer.totalPending)}
          </p>
          <span className="text-xs text-[#B85C3A] font-medium mt-1 inline-block">
            {calculatedPending > 0 ? 'Documentos com liquidação pendente' : 'Sem dívidas pendentes'}
          </span>
        </Card>

        <Card padding="md" className="bg-white">
          <span className="text-xs font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Documentos Emitidos
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-[#202421] mt-1 font-sans">
            {customerInvoices.length > 0 ? customerInvoices.length : customer.invoicesCount}
          </p>
          <span className="text-xs text-[rgba(32,36,33,0.6)] font-medium mt-1 inline-block">
            Faturas e notas associadas
          </span>
        </Card>
      </div>

      {/* Profile & History Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Customer Dossier (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card padding="md" className="space-y-4 bg-white">
            <h3 className="text-sm font-bold text-[#0D2923] uppercase tracking-wider pb-2 border-b border-[rgba(32,36,33,0.08)]">
              Ficha da Empresa
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[rgba(32,36,33,0.5)] block font-medium">Razão Social:</span>
                <p className="font-semibold text-[#202421] mt-0.5">{customer.name}</p>
              </div>

              <div>
                <span className="text-[rgba(32,36,33,0.5)] block font-medium">NIF:</span>
                <p className="font-mono font-semibold text-[#202421] mt-0.5">{customer.nif}</p>
              </div>

              <div>
                <span className="text-[rgba(32,36,33,0.5)] block font-medium">Contacto Telefónico:</span>
                <p className="text-[#202421] mt-0.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#32866D]" />
                  <span>{customer.phone}</span>
                </p>
              </div>

              <div>
                <span className="text-[rgba(32,36,33,0.5)] block font-medium">Email Financeiro:</span>
                <p className="text-[#202421] mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#32866D]" />
                  <span>{customer.email}</span>
                </p>
              </div>

              <div>
                <span className="text-[rgba(32,36,33,0.5)] block font-medium">Morada / Província:</span>
                <p className="text-[#202421] mt-0.5 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#32866D] shrink-0 mt-0.5" />
                  <span>{customer.address}, {customer.city}</span>
                </p>
              </div>

              {customer.notes && (
                <div className="pt-2 border-t border-[rgba(32,36,33,0.08)]">
                  <span className="text-[rgba(32,36,33,0.5)] block font-medium">Notas Comerciais:</span>
                  <p className="text-[rgba(32,36,33,0.7)] mt-0.5 italic">{customer.notes}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Invoices History (8 cols) */}
        <div className="lg:col-span-8">
          <Card padding="none" className="overflow-hidden bg-white">
            <div className="p-4 border-b border-[rgba(32,36,33,0.08)] flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#202421] tracking-tight">
                  Histórico de Faturas
                </h3>
                <p className="text-xs text-[rgba(32,36,33,0.6)] mt-0.5">
                  Todos os documentos emitidos para esta entidade
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F5F0E6] text-[#0D2923] border-b border-[rgba(32,36,33,0.08)] text-[10px] font-semibold uppercase tracking-wider">
                    <th className="py-2.5 px-4">Documento</th>
                    <th className="py-2.5 px-4">Data Emissão</th>
                    <th className="py-2.5 px-4">Vencimento</th>
                    <th className="py-2.5 px-4 text-right">Valor Total</th>
                    <th className="py-2.5 px-4 text-center">Estado</th>
                    <th className="py-2.5 px-4 text-right w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(32,36,33,0.06)] bg-white">
                  {customerInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[rgba(32,36,33,0.5)]">
                        Nenhuma fatura registada para este cliente.
                      </td>
                    </tr>
                  ) : (
                    customerInvoices.map(inv => (
                      <tr
                        key={inv.id}
                        onClick={() => router.push(`/faturacao/${inv.id}`)}
                        className="hover:bg-[#F5F0E6]/40 cursor-pointer transition-colors group"
                      >
                        <td className="py-3 px-4 font-semibold text-[#0D2923]">
                          <div className="flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5 text-[#32866D]" />
                            <span>{inv.number}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[rgba(32,36,33,0.7)]">{inv.issueDate}</td>
                        <td className="py-3 px-4 text-[rgba(32,36,33,0.7)]">{inv.dueDate}</td>
                        <td className="py-3 px-4 text-right font-semibold text-[#202421] font-sans">
                          {formatKz(inv.total)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge status={inv.status} size="sm" />
                        </td>
                        <td className="py-3 px-4 text-right text-[rgba(32,36,33,0.4)] group-hover:text-[#32866D]">
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
      </div>
    </div>
  );
}
