'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AnalyticsDashboard } from '@/components/relatorios/AnalyticsDashboard';

export default function RelatoriosPage() {
  return (
    <AppLayout>
      <AnalyticsDashboard />
    </AppLayout>
  );
}
