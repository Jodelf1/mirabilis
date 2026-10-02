'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CustomerList } from '@/components/clientes/CustomerList';

export default function ClientesPage() {
  return (
    <AppLayout>
      <CustomerList />
    </AppLayout>
  );
}
