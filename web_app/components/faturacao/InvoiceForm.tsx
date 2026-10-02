'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { InvoiceItem, Customer, Product } from '@/lib/types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { InvoicePreview } from './InvoicePreview';
import { formatKz, formatKzWithDecimals } from '@/lib/utils';
import {
  Plus,
  Trash2,
  Save,
  Send,
  UserPlus,
  CheckCircle,
  FilePlus,
  Calendar,
  CreditCard,
} from 'lucide-react';

export function InvoiceForm() {
  const router = useRouter();
  const { customers, products, company, addInvoice } = useApp();

  // Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || '');
  const [issueDate, setIssueDate] = useState<string>('02 Out 2026');
  const [dueDate, setDueDate] = useState<string>('16 Out 2026');
  const [paymentMethod, setPaymentMethod] = useState<string>('Transferência Bancária (BFA)');
  const [notes, setNotes] = useState<string>('Os bens e serviços foram colocados à disposição do adquirente nesta data.');
  
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item-1',
      productId: products[0]?.id,
      description: products[0]?.name || 'Consultoria de Gestão Empresarial',
      quantity: 1,
      unitPrice: products[0]?.price || 150000,
      taxRate: 14,
      total: (products[0]?.price || 150000) * 1.14,
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Active customer object
  const activeCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const taxTotal = items.reduce(
    (acc, item) => acc + (item.unitPrice * item.quantity * (item.taxRate / 100)),
    0
  );
  const total = subtotal + taxTotal;

  // Handle changing customer
  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomerId(e.target.value);
  };

  // Handle line item modifications
  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updated = [...items];
    const current = { ...updated[index], [field]: value };

    if (field === 'productId') {
      const selectedProd = products.find(p => p.id === value);
      if (selectedProd) {
        current.description = selectedProd.name;
        current.unitPrice = selectedProd.price;
        current.taxRate = selectedProd.taxRate;
      }
    }

    // Recalculate line total
    const itemSubtotal = (Number(current.unitPrice) || 0) * (Number(current.quantity) || 1);
    current.total = itemSubtotal * (1 + (Number(current.taxRate) || 0) / 100);

    updated[index] = current;
    setItems(updated);
  };

  // Add line item
  const handleAddItem = () => {
    const defaultProd = products[0];
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      productId: defaultProd?.id,
      description: defaultProd?.name || 'Novo Serviço / Produto',
      quantity: 1,
      unitPrice: defaultProd?.price || 100000,
      taxRate: 14,
      total: (defaultProd?.price || 100000) * 1.14,
    };
    setItems(prev => [...prev, newItem]);
  };

  // Remove line item
  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Emit Invoice
  const handleSubmit = (status: 'Emitido' | 'Pago' | 'Rascunho') => {
    if (!activeCustomer) return;
    setIsSubmitting(true);

    const newInvoice = addInvoice({
      customerId: activeCustomer.id,
      customerName: activeCustomer.name,
      customerNif: activeCustomer.nif,
      customerAddress: activeCustomer.address,
      customerEmail: activeCustomer.email,
      customerPhone: activeCustomer.phone,
      issueDate,
      dueDate,
      status: status === 'Rascunho' ? 'Rascunho' : 'Pago', // Default to paid for demonstration fluidity
      items,
      subtotal,
      taxTotal,
      total,
      paymentMethod,
      notes,
      series: company.series,
      currency: company.currency,
    });

    setShowSuccessToast(true);
    setTimeout(() => {
      router.push(`/faturacao/${newInvoice.id}`);
    }, 800);
  };

  // Current preview invoice model
  const previewInvoice = {
    number: `FT 2026/${String(company.currentNumber + 1).padStart(5, '0')}`,
    customerName: activeCustomer?.name || 'Selecione um cliente',
    customerNif: activeCustomer?.nif || '5000000000',
    customerAddress: activeCustomer?.address || 'Luanda, Angola',
    customerEmail: activeCustomer?.email,
    issueDate,
    dueDate,
    status: 'Emitido' as const,
    items,
    subtotal,
    taxTotal,
    total,
    paymentMethod,
    notes,
    hashDemonstration: 'MIRA-LIVE-PREVIEW-2026',
  };

  return (
    <div className="relative">
      {/* Success Banner */}
      {showSuccessToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#0D2923] text-white px-5 py-3.5 rounded-[10px] shadow-xl border border-[#32866D] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-5 h-5 text-[#10B981]" />
          <div>
            <p className="text-sm font-semibold">Fatura emitida com sucesso!</p>
            <p className="text-xs text-white/70">A redirecionar para o documento final...</p>
          </div>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (5 cols on xl) */}
        <div className="xl:col-span-6 space-y-6">
          <Card padding="md" className="space-y-5">
            <div className="pb-3 border-b border-[rgba(32,36,33,0.08)]">
              <h2 className="text-lg font-bold text-[#0D2923] tracking-tight">
                Emitir Nova Fatura
              </h2>
              <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">
                Preencha os dados da fatura para gerar o documento fiscal correspondente.
              </p>
            </div>

            {/* Customer Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#202421] uppercase tracking-wider">
                  Cliente Adquirente
                </label>
                <button
                  type="button"
                  onClick={() => router.push('/clientes')}
                  className="text-xs text-[#32866D] font-medium hover:underline flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Gerir clientes</span>
                </button>
              </div>

              <select
                value={selectedCustomerId}
                onChange={handleCustomerChange}
                className="w-full h-10 px-3.5 bg-white border border-[rgba(32,36,33,0.18)] rounded-[8px] text-sm text-[#202421] focus:border-[#32866D] focus:ring-2 focus:ring-[#32866D]/20 outline-none"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — NIF {c.nif}
                  </option>
                ))}
              </select>

              {activeCustomer && (
                <div className="p-3 bg-[#F5F0E6]/60 rounded-[8px] border border-[rgba(32,36,33,0.08)] text-xs text-[rgba(32,36,33,0.7)] space-y-0.5">
                  <p className="font-semibold text-[#0D2923]">{activeCustomer.name}</p>
                  <p>NIF: {activeCustomer.nif} | Contacto: {activeCustomer.phone}</p>
                  <p>{activeCustomer.address}</p>
                </div>
              )}
            </div>

            {/* Dates & Payment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Data de Emissão"
                value={issueDate}
                onChange={e => setIssueDate(e.target.value)}
                leftIcon={<Calendar className="w-4 h-4" />}
              />
              <Input
                label="Data de Vencimento"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                leftIcon={<Calendar className="w-4 h-4" />}
              />
            </div>

            <Select
              label="Forma de Pagamento"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <option value="Transferência Bancária (BFA)">Transferência Bancária (BFA)</option>
              <option value="Transferência Bancária (BAI)">Transferência Bancária (BAI)</option>
              <option value="Multicaixa Express">Multicaixa Express</option>
              <option value="Numerário / Caixa">Numerário / Caixa</option>
              <option value="Terminal de Pagamento Automático (TPA)">TPA</option>
            </Select>

            {/* Products / Services Line Items */}
            <div className="pt-3 border-t border-[rgba(32,36,33,0.08)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#202421] uppercase tracking-wider">
                  Itens da Fatura ({items.length})
                </span>
                <Button
                  type="button"
                  variant="outline-teal"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={handleAddItem}
                >
                  Adicionar Item
                </Button>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="p-3.5 bg-[#FAFAFA] rounded-[8px] border border-[rgba(32,36,33,0.1)] space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#32866D] uppercase">
                        Linha #{index + 1}
                      </span>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Remover linha"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-12">
                        <label className="text-[11px] font-medium text-[rgba(32,36,33,0.7)] block mb-1">
                          Selecionar do Catálogo ou Personalizar
                        </label>
                        <select
                          value={item.productId || ''}
                          onChange={e => handleItemChange(index, 'productId', e.target.value)}
                          className="w-full h-9 px-3 bg-white border border-[rgba(32,36,33,0.16)] rounded-[6px] text-xs font-medium text-[#202421] outline-none"
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.code} — {p.name} ({formatKz(p.price)})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-12">
                        <Input
                          placeholder="Descrição detalhada do item..."
                          value={item.description}
                          onChange={e => handleItemChange(index, 'description', e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[10px] font-medium text-[rgba(32,36,33,0.6)] uppercase block mb-1">
                          Quantidade
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e =>
                            handleItemChange(index, 'quantity', Math.max(1, parseInt(e.target.value) || 1))
                          }
                          className="w-full h-8 px-2 bg-white border border-[rgba(32,36,33,0.16)] rounded-[6px] text-xs text-center text-[#202421]"
                        />
                      </div>

                      <div className="sm:col-span-5">
                        <label className="text-[10px] font-medium text-[rgba(32,36,33,0.6)] uppercase block mb-1">
                          Preço Unitário (Kz)
                        </label>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={e =>
                            handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)
                          }
                          className="w-full h-8 px-2 bg-white border border-[rgba(32,36,33,0.16)] rounded-[6px] text-xs text-right text-[#202421]"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="text-[10px] font-medium text-[rgba(32,36,33,0.6)] uppercase block mb-1">
                          Taxa IVA
                        </label>
                        <select
                          value={item.taxRate}
                          onChange={e =>
                            handleItemChange(index, 'taxRate', parseFloat(e.target.value) || 0)
                          }
                          className="w-full h-8 px-2 bg-white border border-[rgba(32,36,33,0.16)] rounded-[6px] text-xs text-center text-[#202421]"
                        >
                          <option value={14}>14% (Geral)</option>
                          <option value={7}>7% (Reduzida)</option>
                          <option value={0}>0% (Isento)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-[#202421] uppercase tracking-wider block mb-1">
                Observações no Documento
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full p-2.5 bg-white border border-[rgba(32,36,33,0.16)] rounded-[8px] text-xs text-[#202421] outline-none focus:border-[#32866D]"
                placeholder="Indicações adicionais de entrega ou referências..."
              />
            </div>

            {/* Financial Summary & Actions */}
            <div className="p-4 bg-[#F5F0E6] rounded-[8px] border border-[rgba(32,36,33,0.1)] space-y-2">
              <div className="flex justify-between text-xs text-[rgba(32,36,33,0.7)]">
                <span>Subtotal (Incidência):</span>
                <span className="font-semibold text-[#202421]">{formatKz(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-[rgba(32,36,33,0.7)]">
                <span>IVA (14%):</span>
                <span className="font-semibold text-[#202421]">{formatKz(taxTotal)}</span>
              </div>
              <div className="border-t border-[rgba(32,36,33,0.15)] pt-2 flex justify-between items-baseline font-bold">
                <span className="text-sm text-[#0D2923]">Total da Fatura:</span>
                <span className="text-lg text-[#32866D] font-sans">{formatKz(total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full sm:flex-1"
                isLoading={isSubmitting}
                leftIcon={<Send className="w-4 h-4" />}
                onClick={() => handleSubmit('Emitido')}
              >
                Emitir Fatura Definitiva
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Save className="w-4 h-4 text-[rgba(32,36,33,0.6)]" />}
                onClick={() => handleSubmit('Rascunho')}
              >
                Guardar Rascunho
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Live Document Preview (6 cols on xl) */}
        <div className="xl:col-span-6 sticky top-6">
          <InvoicePreview
            invoice={previewInvoice}
            company={company}
            showActions={true}
          />
        </div>
      </div>
    </div>
  );
}
