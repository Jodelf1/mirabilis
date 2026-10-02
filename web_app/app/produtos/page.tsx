'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductList } from '@/components/produtos/ProductList';

export default function ProdutosPage() {
  return (
    <AppLayout>
      <ProductList />
    </AppLayout>
  );
}
