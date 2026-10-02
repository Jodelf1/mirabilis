'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  BarChart3,
  Settings,
  X,
  PlusCircle,
} from 'lucide-react';
import { Logo } from '../ui/Logo';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Faturação', href: '/faturacao', icon: FileText },
    { label: 'Clientes', href: '/clientes', icon: Users },
    { label: 'Produtos e Serviços', href: '/produtos', icon: Package },
    { label: 'Relatórios', href: '/relatorios', icon: BarChart3 },
    { label: 'Definições', href: '/definicoes', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] font-sans antialiased text-[#202421]">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] bg-[#0D2923] text-white flex flex-col h-full z-10 shadow-2xl">
            <div className="h-16 flex items-center justify-between px-4 border-b border-[#183C34]">
              <Logo variant="light" size="md" />
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 text-white/70 hover:text-white rounded-[6px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 border-b border-[#183C34]/60">
              <Link
                href="/faturacao/nova"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center justify-center bg-[#32866D] hover:bg-[#286F5A] text-white font-medium rounded-[10px] py-2.5 px-3 text-xs gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Nova Fatura</span>
              </Link>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
              {navItems.map(item => {
                const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#32866D] text-white font-semibold'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar onMobileMenuToggle={() => setMobileDrawerOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
