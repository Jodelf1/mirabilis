'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { InvoiceList } from '@/components/faturacao/InvoiceList';

export default function FaturacaoPage() {
  return (
    <AppLayout>
      <InvoiceList />
    </AppLayout>
  );
}
