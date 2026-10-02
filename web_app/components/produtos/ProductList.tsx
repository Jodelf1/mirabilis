'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatKz } from '@/lib/utils';
import { NewProductModal } from './NewProductModal';
import { Plus, Search, Package, Tag, Check, Layers } from 'lucide-react';

export function ProductList() {
  const { products } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'Todas' && p.category !== selectedCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2923] tracking-tight">Produtos e Serviços</h1>
          <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">
            Catálogo de serviços e produtos para seleção rápida na emissão de documentos.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Novo Produto / Serviço
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card padding="none" className="overflow-hidden bg-white">
        <div className="p-4 border-b border-[rgba(32,36,33,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-[6px] text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0D2923] text-white shadow-xs font-semibold'
                    : 'bg-[#F5F0E6] text-[rgba(32,36,33,0.7)] hover:text-[#0D2923] hover:bg-[#F5F0E6]/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(32,36,33,0.4)] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Pesquisar produto ou código..."
              className="w-full h-8 pl-9 pr-3 text-xs bg-[#FAFAFA] border border-[rgba(32,36,33,0.12)] rounded-[6px] text-[#202421] placeholder-[rgba(32,36,33,0.4)] focus:outline-none focus:bg-white focus:border-[#32866D]"
            />
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F5F0E6] text-[#0D2923] border-b border-[rgba(32,36,33,0.08)] text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Produto / Serviço</th>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4 text-right">Preço Base</th>
                <th className="py-3 px-4 text-center">Taxa IVA</th>
                <th className="py-3 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(32,36,33,0.06)] bg-white text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[rgba(32,36,33,0.5)]">
                    Nenhum item encontrado no catálogo.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#0D2923]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[8px] bg-[#F5F0E6] text-[#0D2923] font-medium flex items-center justify-center shrink-0 border border-[rgba(32,36,33,0.08)]">
                          <Package className="w-4 h-4 text-[#32866D]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#202421]">{product.name}</p>
                          {product.description && (
                            <p className="text-[11px] text-[rgba(32,36,33,0.5)] line-clamp-1">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#202421]">
                      {product.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#F5F0E6] text-[rgba(32,36,33,0.8)] font-medium text-[11px]">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#202421] font-sans">
                      {formatKz(product.price)}{' '}
                      <span className="text-[10px] text-[rgba(32,36,33,0.5)] font-normal">
                        / {product.unit}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-[#202421]">
                      <span className="px-2 py-0.5 rounded-full bg-[#EBF5F1] text-[#32866D] font-semibold text-[11px]">
                        {product.taxRate}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge status={product.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <NewProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
