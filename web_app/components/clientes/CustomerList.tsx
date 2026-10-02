'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { formatKz } from '@/lib/utils';
import { NewCustomerModal } from './NewCustomerModal';
import {
  UserPlus,
  Search,
  Users,
  Building2,
  ChevronRight,
  Phone,
  Mail,
  FileText,
  Filter,
} from 'lucide-react';

export function CustomerList() {
  const router = useRouter();
  const { customers, invoices } = useApp();
  const [filterTab, setFilterTab] = useState<'Todos' | 'Ativos' | 'Inativos'>('Todos');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCustomers = customers.filter(c => {
    if (filterTab === 'Ativos' && c.status !== 'Ativo') return false;
    if (filterTab === 'Inativos' && c.status !== 'Inativo') return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.nif.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalInvoicedAll = customers.reduce((acc, c) => acc + c.totalInvoiced, 0);
  const totalPendingAll = customers.reduce((acc, c) => acc + c.totalPending, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2923] tracking-tight">Clientes</h1>
          <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">
            Gerencie a carteira de clientes, dados fiscais e histórico financeiro.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          leftIcon={<UserPlus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Cliente
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Total de Clientes
          </span>
          <p className="text-2xl font-bold text-[#0D2923] mt-1">{customers.length}</p>
          <span className="text-[11px] text-[#32866D] font-medium">
            {customers.filter(c => c.status === 'Ativo').length} ativos no sistema
          </span>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Volume Faturado
          </span>
          <p className="text-2xl font-bold text-[#0D2923] mt-1">{formatKz(totalInvoicedAll)}</p>
          <span className="text-[11px] text-[rgba(32,36,33,0.6)] font-medium">
            Histórico acumulado de faturas
          </span>
        </Card>

        <Card padding="sm" className="bg-white">
          <span className="text-[11px] font-semibold text-[rgba(32,36,33,0.6)] uppercase tracking-wider block">
            Saldos em Aberto
          </span>
          <p className="text-2xl font-bold text-[#B85C3A] mt-1">{formatKz(totalPendingAll)}</p>
          <span className="text-[11px] text-[#B85C3A] font-medium">
            Faturas a aguardar liquidação
          </span>
        </Card>
      </div>

      {/* Search & Tabs */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-[rgba(32,36,33,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          {/* Status Tabs */}
          <div className="flex bg-[#F5F0E6] p-1 rounded-[8px] border border-[rgba(32,36,33,0.08)]">
            {(['Todos', 'Ativos', 'Inativos'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1 text-xs font-medium rounded-[6px] transition-colors cursor-pointer ${
                  filterTab === tab
                    ? 'bg-white text-[#0D2923] shadow-xs font-semibold'
                    : 'text-[rgba(32,36,33,0.65)] hover:text-[#0D2923]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(32,36,33,0.4)] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Pesquisar cliente ou NIF..."
              className="w-full h-8 pl-9 pr-3 text-xs bg-[#FAFAFA] border border-[rgba(32,36,33,0.12)] rounded-[6px] text-[#202421] placeholder-[rgba(32,36,33,0.4)] focus:outline-none focus:bg-white focus:border-[#32866D]"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F5F0E6] border-b border-[rgba(32,36,33,0.08)] text-[11px] font-semibold text-[#0D2923] uppercase tracking-wider">
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">NIF</th>
                <th className="py-3 px-4">Contacto</th>
                <th className="py-3 px-4 text-center">Documentos</th>
                <th className="py-3 px-4 text-right">Total Faturado</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(32,36,33,0.06)] bg-white text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[rgba(32,36,33,0.5)]">
                    Nenhum cliente encontrado com os critérios selecionados.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr
                    key={customer.id}
                    onClick={() => router.push(`/clientes/${customer.id}`)}
                    className="hover:bg-[#F5F0E6]/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#0D2923]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[8px] bg-[#EBF5F1] text-[#32866D] font-bold flex items-center justify-center shrink-0 border border-[#32866D]/20 text-xs">
                          {customer.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[#202421] group-hover:text-[#32866D] transition-colors">
                            {customer.name}
                          </p>
                          <p className="text-[11px] text-[rgba(32,36,33,0.55)]">
                            {customer.city}, Angola
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#202421]">
                      {customer.nif}
                    </td>
                    <td className="py-3.5 px-4 text-[rgba(32,36,33,0.7)]">
                      <div className="space-y-0.5">
                        <p>{customer.phone}</p>
                        <p className="text-[11px] text-[rgba(32,36,33,0.5)]">{customer.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-semibold text-[#0D2923] bg-[#F5F0E6] px-2 py-0.5 rounded-[4px]">
                        {customer.invoicesCount} doc(s)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#202421] font-sans">
                      {formatKz(customer.totalInvoiced)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge status={customer.status} />
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

      <NewCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={newId => router.push(`/clientes/${newId}`)}
      />
    </div>
  );
}
