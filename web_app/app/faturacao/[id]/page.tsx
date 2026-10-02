'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { InvoiceDetailView } from '@/components/faturacao/InvoiceDetailView';

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || '';

  return (
    <AppLayout>
      <InvoiceDetailView invoiceId={id} />
    </AppLayout>
  );
}
