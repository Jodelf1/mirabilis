'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Invoice, Company } from '@/lib/types';
import { useApp } from '@/lib/store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { InvoicePreview } from './InvoicePreview';
import { formatKz } from '@/lib/utils';
import {
  ArrowLeft,
  Printer,
  Download,
  Mail,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Building2,
  Calendar,
  Share2,
} from 'lucide-react';

interface InvoiceDetailViewProps {
  invoiceId: string;
}

export function InvoiceDetailView({ invoiceId }: InvoiceDetailViewProps) {
  const router = useRouter();
  const { invoices, company, updateInvoiceStatus } = useApp();
  const [emailSent, setEmailSent] = useState(false);

  const invoice = invoices.find(i => i.id === invoiceId) || invoices[0];

  if (!invoice) {
    return (
      <div className="p-8 text-center bg-white rounded-[8px] border border-[rgba(32,36,33,0.1)]">
        <p className="text-sm font-semibold text-[#0D2923]">Documento não encontrado.</p>
        <Button variant="primary" size="sm" className="mt-4" onClick={() => router.push('/faturacao')}>
          Voltar para Faturação
        </Button>
      </div>
    );
  }

  const handleMarkAsPaid = () => {
    updateInvoiceStatus(invoice.id, 'Pago');
  };

  const handleCancelInvoice = () => {
    if (confirm('Tem a certeza que deseja anular esta fatura?')) {
      updateInvoiceStatus(invoice.id, 'Anulado');
    }
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/faturacao"
            className="p-2 rounded-[8px] bg-white border border-[rgba(32,36,33,0.1)] text-[#202421] hover:bg-[#F5F0E6] transition-colors"
            title="Voltar à lista"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0D2923] tracking-tight">
                {invoice.number}
              </h1>
              <Badge status={invoice.status} size="md" />
            </div>
            <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">
              Emitida a {invoice.issueDate} para{' '}
              <Link
                href={`/clientes/${invoice.customerId}`}
                className="text-[#32866D] font-semibold hover:underline"
              >
                {invoice.customerName}
              </Link>
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {invoice.status === 'Pendente' && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={handleMarkAsPaid}
            >
              Liquidar Fatura
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Printer className="w-4 h-4 text-[rgba(32,36,33,0.6)]" />}
            onClick={() => window.print()}
          >
            Imprimir
          </Button>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Mail className="w-4 h-4 text-[rgba(32,36,33,0.6)]" />}
            onClick={handleSendEmail}
          >
            {emailSent ? 'Enviado!' : 'Enviar Email'}
          </Button>

          {invoice.status !== 'Anulado' && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleCancelInvoice}
            >
              Anular
            </Button>
          )}
        </div>
      </div>

      {emailSent && (
        <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-[8px] text-xs text-[#065F46] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>Fatura enviada com sucesso para <strong>{invoice.customerEmail}</strong>!</span>
        </div>
      )}

      {/* Main Invoice Document Preview */}
      <div className="max-w-4xl mx-auto">
        <InvoicePreview
          invoice={invoice}
          company={company}
          showActions={false}
        />
      </div>

      {/* Audit Trail & Compliance Details */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card padding="sm" className="bg-white">
          <span className="text-[10px] font-bold text-[rgba(32,36,33,0.5)] uppercase tracking-wider block mb-1">
            Auditoria Fiscal
          </span>
          <p className="text-xs font-semibold text-[#0D2923]">Série {invoice.series || 'MIRA-2026'}</p>
          <p className="text-[11px] text-[rgba(32,36,33,0.6)] mt-0.5">
            Hash demonstrativo: <code className="bg-[#F5F0E6] px-1 py-0.5 rounded text-[10px]">{invoice.hashDemonstration}</code>
          </p>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[10px] font-bold text-[rgba(32,36,33,0.5)] uppercase tracking-wider block mb-1">
            Condições de Liquidação
          </span>
          <p className="text-xs font-semibold text-[#0D2923]">{invoice.paymentMethod}</p>
          <p className="text-[11px] text-[rgba(32,36,33,0.6)] mt-0.5">
            Vencimento em {invoice.dueDate}
          </p>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[10px] font-bold text-[rgba(32,36,33,0.5)] uppercase tracking-wider block mb-1">
            Estado Financeiro
          </span>
          <p className="text-xs font-semibold text-[#32866D]">{formatKz(invoice.total)}</p>
          <p className="text-[11px] text-[rgba(32,36,33,0.6)] mt-0.5">
            {invoice.status === 'Pago' ? 'Liquidado na íntegra' : 'Aguarda liquidação do cliente'}
          </p>
        </Card>
      </div>
    </div>
  );
}
