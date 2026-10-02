'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApp } from '@/lib/store';
import { Package, Tag, Layers } from 'lucide-react';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProductModal({ isOpen, onClose }: NewProductModalProps) {
  const { addProduct, products } = useApp();
  const [name, setName] = useState('');
  const [code, setCode] = useState(`SRV-00${products.length + 1}`);
  const [category, setCategory] = useState('Consultoria');
  const [price, setPrice] = useState('100000');
  const [taxRate, setTaxRate] = useState('14');
  const [unit, setUnit] = useState('Serviço');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Por favor preencha o nome do produto/serviço e o preço.');
      return;
    }

    addProduct({
      name,
      code,
      category,
      price: parseFloat(price) || 0,
      taxRate: parseFloat(taxRate) || 14,
      unit,
      status: 'Ativo',
      description,
    });

    setName('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Produto ou Serviço"
      subtitle="Cadastre itens no catálogo da empresa para utilização na faturação"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</p>}

        <Input
          label="Nome do Produto / Serviço *"
          placeholder="ex: Consultoria Financeira Especializada"
          value={name}
          onChange={e => setName(e.target.value)}
          leftIcon={<Package className="w-4 h-4" />}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Código do Item *"
            placeholder="SRV-007"
            value={code}
            onChange={e => setCode(e.target.value)}
            leftIcon={<Tag className="w-4 h-4" />}
            required
          />
          <Select
            label="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="Consultoria">Consultoria</option>
            <option value="Software">Software</option>
            <option value="Suporte">Suporte</option>
            <option value="Serviços Técnicos">Serviços Técnicos</option>
            <option value="Formação">Formação</option>
            <option value="Auditoria">Auditoria</option>
            <option value="Equipamento">Equipamento</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Preço Base (Kz) *"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
          <Select
            label="Taxa IVA"
            value={taxRate}
            onChange={e => setTaxRate(e.target.value)}
          >
            <option value="14">14% (Geral)</option>
            <option value="7">7% (Reduzida)</option>
            <option value="0">0% (Isento)</option>
          </Select>
          <Select
            label="Unidade"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          >
            <option value="Serviço">Serviço</option>
            <option value="Hora">Hora</option>
            <option value="Mês">Mês</option>
            <option value="Licença">Licença</option>
            <option value="Unidade">Unidade</option>
            <option value="Projeto">Projeto</option>
          </Select>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#202421] uppercase tracking-wider block mb-1">
            Descrição Opcional
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-2.5 bg-white border border-[rgba(32,36,33,0.16)] rounded-[8px] text-xs text-[#202421] outline-none focus:border-[#32866D]"
            placeholder="Detalhes sobre a prestação do serviço..."
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(32,36,33,0.08)]">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="md">
            Gravar Produto
          </Button>
        </div>
      </form>
    </Modal>
  );
}
