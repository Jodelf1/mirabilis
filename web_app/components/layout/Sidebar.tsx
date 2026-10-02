'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Building2,
  ReceiptText,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useApp } from '@/lib/store';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, invoices, company, users } = useApp();

  const mainNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Faturação',
      href: '/faturacao',
      icon: FileText,
      badge: invoices.filter(i => i.status === 'Pendente').length,
    },
    {
      label: 'Clientes',
      href: '/clientes',
      icon: Users,
    },
    {
      label: 'Produtos e Serviços',
      href: '/produtos',
      icon: Package,
    },
    {
      label: 'Relatórios',
      href: '/relatorios',
      icon: BarChart3,
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      label: 'Definições',
      href: '/definicoes',
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href !== '/dashboard' && pathname.startsWith(href)) return true;
    return false;
  };

  const currentUser = users[0] || { name: 'João Manuel', role: 'Administrador', avatarInitials: 'JM' };

  return (
    <aside
      className={`relative flex flex-col bg-[#0D2923] text-white transition-all duration-250 ease-in-out border-r border-[#183C34] z-30 shrink-0 ${
        sidebarCollapsed ? 'w-[72px]' : 'w-[250px]'
      }`}
    >
      {/* Top Header & Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#183C34]/80">
        <Link href="/dashboard" className="flex items-center overflow-hidden focus:outline-none">
          <Logo variant="light" size="md" showText={!sidebarCollapsed} />
        </Link>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-[6px] text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={sidebarCollapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Action Button */}
      <div className="p-3 border-b border-[#183C34]/60">
        <Link
          href="/faturacao/nova"
          className={`flex items-center justify-center bg-[#32866D] hover:bg-[#286F5A] active:bg-[#225B4A] text-white font-medium rounded-[10px] transition-all duration-150 shadow-sm ${
            sidebarCollapsed ? 'w-10 h-10 mx-auto p-0' : 'w-full py-2.5 px-3 text-xs gap-2'
          }`}
          title="Emitir Nova Fatura"
        >
          <PlusCircle className="w-4 h-4 shrink-0 text-[#EBF5F1]" />
          {!sidebarCollapsed && <span>Nova Fatura</span>}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
        {!sidebarCollapsed && (
          <div className="px-2 pb-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            Menu Principal
          </div>
        )}

        {mainNavItems.map(item => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={sidebarCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-150 group ${
                active
                  ? 'bg-[#32866D] text-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/8'
              } ${sidebarCollapsed ? 'justify-center px-0 w-10 h-10 mx-auto' : ''}`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  active ? 'text-white' : 'text-white/70 group-hover:text-white'
                }`}
              />
              {!sidebarCollapsed && (
                <span className="flex-1 truncate tracking-tight">{item.label}</span>
              )}
              {!sidebarCollapsed && item.badge !== undefined && Number(item.badge) > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    active
                      ? 'bg-white/25 text-white'
                      : 'bg-[#B85C3A] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-3 pb-2">
          <div className="border-t border-[#183C34]/80" />
        </div>

        {!sidebarCollapsed && (
          <div className="px-2 pb-1 text-[11px] font-semibold text-white/40 uppercase tracking-wider">
            Sistema
          </div>
        )}

        {secondaryNavItems.map(item => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={sidebarCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-150 group ${
                active
                  ? 'bg-[#32866D] text-white shadow-sm font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/8'
              } ${sidebarCollapsed ? 'justify-center px-0 w-10 h-10 mx-auto' : ''}`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  active ? 'text-white' : 'text-white/70 group-hover:text-white'
                }`}
              />
              {!sidebarCollapsed && (
                <span className="flex-1 truncate tracking-tight">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info: Company & User */}
      <div className="p-3 border-t border-[#183C34] bg-[#071714]/60">
        {!sidebarCollapsed ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 px-2 py-1">
              <div className="w-7 h-7 rounded-[6px] bg-[#183C34] flex items-center justify-center text-[#6E9B76] shrink-0 border border-[#32866D]/30">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{company.tradingName}</p>
                <p className="text-[10px] text-white/50 truncate">NIF: {company.nif}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-[8px] bg-white/5 border border-white/5">
              <div className="w-6 h-6 rounded-full bg-[#32866D] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                {currentUser.avatarInitials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-[#6E9B76]">{currentUser.role}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div
              className="w-8 h-8 rounded-full bg-[#32866D] text-white text-xs font-bold flex items-center justify-center cursor-pointer shadow-sm"
              title={`${currentUser.name} (${currentUser.role})`}
            >
              {currentUser.avatarInitials}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
