'use client';

import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { MetricCards } from '@/components/dashboard/MetricCards';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentDocumentsTable } from '@/components/dashboard/RecentDocumentsTable';
import { ActivityStream } from '@/components/dashboard/ActivityStream';
import { Button } from '@/components/ui/Button';
import { PlusCircle, FileText, ArrowRight, Download } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function DashboardPage() {
  const { users } = useApp();
  const currentUser = users[0] || { name: 'João' };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Dashboard Greeting Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0D2923] tracking-tight">
              Bom dia, {currentUser.name.split(' ')[0]}.
            </h1>
            <p className="text-xs sm:text-sm text-[rgba(32,36,33,0.65)] mt-0.5">
              Aqui está o resumo da sua empresa. <span className="font-semibold text-[#0D2923]">02 Outubro 2026</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/faturacao/nova"
              className="inline-flex items-center justify-center bg-[#32866D] hover:bg-[#286F5A] active:bg-[#225B4A] text-white font-medium rounded-[10px] h-10 px-4 text-sm gap-2 shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Nova fatura</span>
            </Link>
          </div>
        </div>

        {/* 4 Core KPIs */}
        <MetricCards />

        {/* Revenue Analytics Chart */}
        <RevenueChart />

        {/* 2-Column Split: Recent Documents & Operational Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <RecentDocumentsTable />
          </div>
          <div className="lg:col-span-4">
            <ActivityStream />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
