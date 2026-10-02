'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApp } from '@/lib/store';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: (customerId: string) => void;
}

export function NewCustomerModal({ isOpen, onClose, onCreated }: NewCustomerModalProps) {
  const { addCustomer } = useApp();
  const [name, setName] = useState('');
  const [nif, setNif] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+244 9');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Luanda');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nif) {
      setError('Por favor preencha pelo menos a Razão Social e o NIF.');
      return;
    }

    const created = addCustomer({
      name,
      nif,
      email: email || `faturacao@${name.toLowerCase().replace(/\s+/g, '')}.ao`,
      phone,
      address: address || 'Luanda, Angola',
      city,
      country: 'Angola',
      status: 'Ativo',
      notes: 'Cliente registado via formulário rápido.',
    });

    setName('');
    setNif('');
    setEmail('');
    setPhone('+244 9');
    setAddress('');
    setError('');
    onClose();

    if (onCreated) {
      onCreated(created.id);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Adicionar Novo Cliente"
      subtitle="Registe os dados fiscais e de contacto da empresa adquirente"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{error}</p>}

        <Input
          label="Razão Social / Nome da Empresa *"
          placeholder="ex: Kwanza Comercial, Lda."
          value={name}
          onChange={e => setName(e.target.value)}
          leftIcon={<Building2 className="w-4 h-4" />}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="NIF *"
            placeholder="ex: 5000123456"
            value={nif}
            onChange={e => setNif(e.target.value)}
            required
          />
          <Input
            label="Telefone Comercial"
            placeholder="+244 923 000 000"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Financeiro"
            placeholder="contas@empresa.ao"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Cidade / Província"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </div>

        <Input
          label="Morada / Sede Social"
          placeholder="ex: Avenida 4 de Fevereiro, Talatona, Luanda"
          value={address}
          onChange={e => setAddress(e.target.value)}
          leftIcon={<MapPin className="w-4 h-4" />}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(32,36,33,0.08)]">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="md">
            Gravar Cliente
          </Button>
        </div>
      </form>
    </Modal>
  );
}
