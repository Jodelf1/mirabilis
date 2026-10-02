'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Building2,
  ChevronDown,
  User,
  LogOut,
  Settings,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { Logo } from '../ui/Logo';

interface TopbarProps {
  onMobileMenuToggle?: () => void;
}

export function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const router = useRouter();
  const {
    company,
    users,
    activities,
    searchQuery,
    setSearchQuery,
    selectedNotification,
    setSelectedNotification,
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);

  const currentUser = users[0] || { name: 'João Manuel', role: 'Administrador', email: 'joao.manuel@mirabilis.ao', avatarInitials: 'JM' };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (compRef.current && !compRef.current.contains(event.target as Node)) {
        setCompanyMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="h-16 bg-white border-b border-[rgba(32,36,33,0.08)] flex items-center justify-between px-4 lg:px-8 z-20 shrink-0 select-none">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-[8px] text-[#202421] hover:bg-[#F5F0E6] transition-colors cursor-pointer"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(32,36,33,0.4)] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Pesquisar faturas, clientes, NIF..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-[#FAFAFA] border border-[rgba(32,36,33,0.1)] rounded-[8px] text-[#202421] placeholder-[rgba(32,36,33,0.4)] focus:outline-none focus:bg-white focus:border-[#32866D] focus:ring-2 focus:ring-[#32866D]/15 transition-all duration-150"
          />
        </div>
      </div>

      {/* Right Actions: Company Selector, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Company Badge / Selector */}
        <div className="relative" ref={compRef}>
          <button
            onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#F5F0E6]/80 hover:bg-[#F5F0E6] border border-[rgba(32,36,33,0.08)] text-left transition-colors cursor-pointer"
          >
            <div className="w-5 h-5 rounded bg-[#0D2923] text-white flex items-center justify-center shrink-0">
              <Building2 className="w-3 h-3 text-[#6E9B76]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#0D2923] leading-none">
                {company.tradingName}
              </span>
              <span className="text-[10px] text-[rgba(32,36,33,0.55)] leading-tight mt-0.5">
                NIF {company.nif}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[rgba(32,36,33,0.5)] ml-1" />
          </button>

          {companyMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-[8px] shadow-lg border border-[rgba(32,36,33,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-[rgba(32,36,33,0.06)]">
                <p className="text-[11px] font-semibold text-[rgba(32,36,33,0.5)] uppercase tracking-wider">
                  Empresa Ativa
                </p>
                <p className="text-xs font-semibold text-[#0D2923] mt-1">{company.name}</p>
                <p className="text-[11px] text-[rgba(32,36,33,0.65)]">{company.taxRegime}</p>
              </div>
              <div className="px-1 pt-1">
                <Link
                  href="/definicoes"
                  onClick={() => setCompanyMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-[#202421] hover:bg-[#F5F0E6] rounded-[6px] transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-[#32866D]" />
                  <span>Definições da Empresa</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-[8px] text-[rgba(32,36,33,0.7)] hover:text-[#0D2923] hover:bg-[#F5F0E6] transition-colors cursor-pointer"
            aria-label="Notificações"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B85C3A] ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-[10px] shadow-xl border border-[rgba(32,36,33,0.12)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(32,36,33,0.08)] bg-[#FAFAFA]">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#0D2923] uppercase tracking-wider">
                    Notificações & Atividade
                  </h4>
                  <span className="text-[10px] font-semibold bg-[#B85C3A] text-white px-1.5 py-0.2 rounded-full">
                    {activities.length}
                  </span>
                </div>
                <span className="text-[11px] text-[#32866D] font-medium cursor-pointer hover:underline">
                  Marcar lidas
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[rgba(32,36,33,0.06)]">
                {activities.map(act => (
                  <div
                    key={act.id}
                    className="p-3.5 hover:bg-[#F5F0E6]/50 transition-colors flex gap-3 cursor-pointer"
                    onClick={() => {
                      setNotificationsOpen(false);
                      if (act.relatedId?.startsWith('inv-')) {
                        router.push(`/faturacao/${act.relatedId}`);
                      } else if (act.relatedId?.startsWith('cust-')) {
                        router.push(`/clientes/${act.relatedId}`);
                      }
                    }}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white ${
                        act.type === 'invoice'
                          ? 'bg-[#32866D]'
                          : act.type === 'payment'
                          ? 'bg-[#10B981]'
                          : 'bg-[#B85C3A]'
                      }`}
                    >
                      {act.type === 'invoice' ? (
                        <FileCheck className="w-3.5 h-3.5" />
                      ) : act.type === 'payment' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <User className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#202421] truncate">{act.title}</p>
                      <p className="text-[11px] text-[rgba(32,36,33,0.65)] line-clamp-2 mt-0.5 leading-snug">
                        {act.description}
                      </p>
                      <p className="text-[10px] text-[rgba(32,36,33,0.4)] mt-1">{act.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-[rgba(32,36,33,0.08)] bg-[#FAFAFA] text-center">
                <Link
                  href="/dashboard"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-medium text-[#32866D] hover:underline"
                >
                  Ver todo o histórico no Dashboard →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-[8px] hover:bg-[#F5F0E6] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0D2923] text-white flex items-center justify-center font-semibold text-xs border border-[#32866D]/30 shadow-xs">
              {currentUser.avatarInitials}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#202421] leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-[#32866D] font-medium leading-tight mt-0.5">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[rgba(32,36,33,0.4)] hidden md:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-[10px] shadow-xl border border-[rgba(32,36,33,0.12)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3.5 py-2.5 border-b border-[rgba(32,36,33,0.06)]">
                <p className="text-xs font-semibold text-[#0D2923]">{currentUser.name}</p>
                <p className="text-[11px] text-[rgba(32,36,33,0.55)] truncate">{currentUser.email}</p>
                <span className="inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 bg-[#EBF5F1] text-[#32866D] rounded-full">
                  {currentUser.role}
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/definicoes"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#202421] hover:bg-[#F5F0E6] transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-[rgba(32,36,33,0.6)]" />
                  <span>Definições do Sistema</span>
                </Link>
                <Link
                  href="/login"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair da Sessão</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
