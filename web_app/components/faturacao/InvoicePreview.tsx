'use client';

import React from 'react';
import { Invoice, Company } from '@/lib/types';
import { formatKzWithDecimals, formatKz } from '@/lib/utils';
import { Logo } from '../ui/Logo';
import { Badge } from '../ui/Badge';
import { ShieldCheck, Printer, Download, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface InvoicePreviewProps {
  invoice: Partial<Invoice>;
  company: Company;
  showActions?: boolean;
  onPrint?: () => void;
  onDownload?: () => void;
}

export function InvoicePreview({
  invoice,
  company,
  showActions = false,
  onPrint,
  onDownload,
}: InvoicePreviewProps) {
  const items = invoice.items || [];
  const subtotal = invoice.subtotal || 0;
  const taxTotal = invoice.taxTotal || 0;
  const total = invoice.total || 0;

  return (
    <div className="flex flex-col gap-3">
      {showActions && (
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider">
            Pré-visualização do Documento
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Printer className="w-3.5 h-3.5" />}
              onClick={onPrint || (() => window.print())}
            >
              Imprimir
            </Button>
          </div>
        </div>
      )}

      {/* Outer Linen Container */}
      <div className="bg-[#F5F0E6] p-4 sm:p-6 lg:p-8 rounded-[12px] border border-[rgba(32,36,33,0.1)] flex justify-center shadow-inner">
        {/* Printable White Document Sheet */}
        <div
          id="printable-invoice"
          className="w-full max-w-[760px] bg-white rounded-[8px] border border-[rgba(32,36,33,0.1)] p-6 sm:p-10 shadow-sm text-[#202421] font-sans flex flex-col justify-between"
          style={{ minHeight: '780px' }}
        >
          <div>
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[rgba(32,36,33,0.12)]">
              {/* Company Identity */}
              <div>
                <Logo variant="dark" size="md" />
                <div className="mt-3 text-xs text-[rgba(32,36,33,0.75)] space-y-0.5 leading-relaxed">
                  <p className="font-bold text-[#0D2923] text-sm">{company.name}</p>
                  <p>NIF: <span className="font-semibold text-[#202421]">{company.nif}</span></p>
                  <p>{company.address}</p>
                  <p>{company.city} — {company.country}</p>
                  <p>Tel: {company.phone} | Email: {company.email}</p>
                  <p className="text-[10px] text-[#32866D] font-medium pt-0.5">{company.taxRegime}</p>
                </div>
              </div>

              {/* Invoice Number & Metadata */}
              <div className="sm:text-right flex flex-col sm:items-end">
                <div className="inline-block px-3 py-1 bg-[#0D2923] text-white text-xs font-bold rounded-[6px] tracking-wider uppercase mb-2">
                  FATURA
                </div>
                <h3 className="text-xl font-bold text-[#0D2923] tracking-tight font-sans">
                  {invoice.number || 'FT 2026/00483'}
                </h3>
                <p className="text-[11px] text-[rgba(32,36,33,0.6)] font-medium mt-0.5">
                  Original • Moeda: {company.currency}
                </p>

                <div className="mt-3 text-xs text-[rgba(32,36,33,0.8)] space-y-1">
                  <p>
                    <span className="text-[rgba(32,36,33,0.55)]">Data de Emissão:</span>{' '}
                    <span className="font-semibold">{invoice.issueDate || '02 Out 2026'}</span>
                  </p>
                  <p>
                    <span className="text-[rgba(32,36,33,0.55)]">Vencimento:</span>{' '}
                    <span className="font-semibold">{invoice.dueDate || '16 Out 2026'}</span>
                  </p>
                  {invoice.status && (
                    <div className="pt-1 flex sm:justify-end">
                      <Badge status={invoice.status} size="sm" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Box */}
            <div className="my-6 p-4 rounded-[6px] bg-[#F5F0E6]/50 border border-[rgba(32,36,33,0.08)] flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#32866D] uppercase tracking-wider block mb-1">
                  Exmo.(s) Senhor(es) / Adquirente:
                </span>
                <p className="text-sm font-bold text-[#0D2923]">
                  {invoice.customerName || 'Selecione um cliente'}
                </p>
                <p className="text-xs text-[rgba(32,36,33,0.7)] mt-0.5">
                  {invoice.customerAddress || 'Endereço não especificado'}
                </p>
                {invoice.customerEmail && (
                  <p className="text-xs text-[rgba(32,36,33,0.6)]">{invoice.customerEmail}</p>
                )}
              </div>

              <div className="sm:text-right text-xs">
                <span className="text-[10px] font-bold text-[rgba(32,36,33,0.5)] uppercase tracking-wider block mb-1">
                  Dados Fiscais
                </span>
                <p>
                  NIF:{' '}
                  <span className="font-bold text-[#0D2923]">
                    {invoice.customerNif || 'Consumidor Final'}
                  </span>
                </p>
                <p className="text-[rgba(32,36,33,0.6)] mt-0.5">País: Angola</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-6 border border-[rgba(32,36,33,0.1)] rounded-[6px] overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F5F0E6] text-[#0D2923] border-b border-[rgba(32,36,33,0.1)] font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Item / Descrição</th>
                    <th className="py-2.5 px-3 text-center w-16">Qtd</th>
                    <th className="py-2.5 px-3 text-right w-28">Preço Unit.</th>
                    <th className="py-2.5 px-3 text-center w-16">IVA</th>
                    <th className="py-2.5 px-3 text-right w-28">Total Líquido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(32,36,33,0.06)]">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[rgba(32,36,33,0.4)] italic">
                        Nenhum item adicionado à fatura.
                      </td>
                    </tr>
                  ) : (
                    items.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-[#FAFAFA]">
                        <td className="py-2.5 px-3 font-medium text-[#202421]">
                          {item.description || 'Produto / Serviço'}
                        </td>
                        <td className="py-2.5 px-3 text-center text-[rgba(32,36,33,0.8)]">
                          {item.quantity}
                        </td>
                        <td className="py-2.5 px-3 text-right text-[rgba(32,36,33,0.8)]">
                          {formatKzWithDecimals(item.unitPrice)}
                        </td>
                        <td className="py-2.5 px-3 text-center text-[rgba(32,36,33,0.8)] font-medium">
                          {item.taxRate}%
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold text-[#0D2923]">
                          {formatKzWithDecimals(item.total)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Summary Totals */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-[rgba(32,36,33,0.1)]">
              {/* Payment & Additional Terms */}
              <div className="text-xs text-[rgba(32,36,33,0.7)] space-y-1 sm:max-w-xs">
                <p className="font-semibold text-[#0D2923]">Forma de Pagamento:</p>
                <p>{invoice.paymentMethod || 'Transferência Bancária / Multicaixa'}</p>
                <p className="text-[11px] text-[rgba(32,36,33,0.55)] pt-1 italic">
                  {invoice.notes || 'Os bens/serviços foram colocados à disposição do adquirente nesta data.'}
                </p>
              </div>

              {/* Total Calculation breakdown */}
              <div className="w-full sm:w-64 bg-[#FAFAFA] p-3.5 rounded-[6px] border border-[rgba(32,36,33,0.08)] space-y-2 text-xs">
                <div className="flex justify-between text-[rgba(32,36,33,0.7)]">
                  <span>Incidência (Subtotal):</span>
                  <span className="font-medium text-[#202421]">{formatKzWithDecimals(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[rgba(32,36,33,0.7)]">
                  <span>IVA (14% Geral):</span>
                  <span className="font-medium text-[#202421]">{formatKzWithDecimals(taxTotal)}</span>
                </div>
                <div className="border-t border-[rgba(32,36,33,0.12)] pt-2 flex justify-between items-baseline font-bold">
                  <span className="text-sm text-[#0D2923]">Total a Pagar:</span>
                  <span className="text-base text-[#32866D] font-sans">
                    {formatKzWithDecimals(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Certification Footer & Hash */}
          <div className="pt-6 mt-6 text-[10px] text-[rgba(32,36,33,0.5)] border-t border-[rgba(32,36,33,0.08)] flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#32866D]" />
              <span>
                Certificação Demonstrativa: <strong className="text-[#202421]">{invoice.hashDemonstration || 'MIRA-AGT-DEMO-2026'}</strong>
              </span>
            </div>
            <span>Software validado para demonstração empresarial em Angola</span>
          </div>
        </div>
      </div>
    </div>
  );
}
