'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('joao.manuel@mirabilis.ao');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex flex-col justify-between items-center p-4 sm:p-6 font-sans">
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between py-2">
        <Logo variant="dark" size="md" />
        <span className="text-xs font-medium text-[rgba(32,36,33,0.6)] bg-white/70 px-3 py-1 rounded-full border border-[rgba(32,36,33,0.08)]">
          Demonstração de Produto
        </span>
      </div>

      {/* Center Login Card */}
      <div className="w-full max-w-md bg-white rounded-[12px] p-6 sm:p-8 border border-[rgba(32,36,33,0.1)] shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-2 bg-[#EBF5F1] rounded-[12px] mb-1 border border-[#32866D]/20 shadow-xs">
            <img src="/ICON.png" alt="Mirabilis" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-[#0D2923] tracking-tight">
            Aceder ao Mirabilis
          </h1>
          <p className="text-xs text-[rgba(32,36,33,0.65)]">
            Plataforma corporativa de faturação e gestão de negócios
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Profissional"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#202421] uppercase tracking-tight">
                Palavra-passe
              </label>
              <button
                type="button"
                onClick={() => alert('Em ambiente demonstrativo, clique simplesmente em "Entrar na Plataforma".')}
                className="text-xs text-[#32866D] font-medium hover:underline cursor-pointer"
              >
                Esqueci a palavra-passe
              </button>
            </div>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Entrar na Plataforma
          </Button>
        </form>

        {/* Demo Mode Quick Access Helper */}
        <div className="p-3.5 bg-[#F5F0E6]/70 rounded-[8px] border border-[rgba(32,36,33,0.08)] text-xs space-y-1">
          <p className="font-semibold text-[#0D2923] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#32866D]" />
            <span>Perfil de Acesso Demonstrativo</span>
          </p>
          <p className="text-[rgba(32,36,33,0.65)]">
            Utilizador: <strong>João Manuel</strong> (Administrador da Empresa)
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center text-xs text-[rgba(32,36,33,0.5)] py-4">
        <p>Mirabilis © 2026 • Gestão Empresarial para Angola</p>
      </div>
    </div>
  );
}
