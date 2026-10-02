'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { CustomerDetailView } from '@/components/clientes/CustomerDetailView';

export default function CustomerDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || '';

  return (
    <AppLayout>
      <CustomerDetailView customerId={id} />
    </AppLayout>
  );
}
