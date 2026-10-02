'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SettingsTabs } from '@/components/definicoes/SettingsTabs';

export default function DefinicoesPage() {
  return (
    <AppLayout>
      <SettingsTabs />
    </AppLayout>
  );
}
