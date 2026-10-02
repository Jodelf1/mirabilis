'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { InvoiceForm } from '@/components/faturacao/InvoiceForm';

export default function NovaFaturaPage() {
  return (
    <AppLayout>
      <InvoiceForm />
    </AppLayout>
  );
}
