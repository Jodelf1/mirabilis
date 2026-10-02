'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Logo } from '../ui/Logo';
import {
  Building2,
  Receipt,
  Users,
  Save,
  CheckCircle2,
  Plus,
  Shield,
  Key,
  Globe,
  Mail,
  Phone,
  MapPin,
  FileCode,
} from 'lucide-react';

export function SettingsTabs() {
  const { company, updateCompany, users, addUser } = useApp();

  const [activeTab, setActiveTab] = useState<'empresa' | 'faturacao' | 'utilizadores'>('empresa');
  const [savedToast, setSavedToast] = useState(false);

  // Company form state
  const [companyForm, setCompanyForm] = useState(company);

  // New user modal
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Administrador' | 'Financeiro' | 'Vendas' | 'Contabilista'>('Financeiro');

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany(companyForm);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const initials = newUserName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    addUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      avatarInitials: initials,
      status: 'Ativo',
    });

    setNewUserName('');
    setNewUserEmail('');
    setIsUserModalOpen(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {savedToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#0D2923] text-white px-5 py-3 rounded-[8px] shadow-xl border border-[#32866D] flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span className="text-xs font-semibold">Definições guardadas com sucesso!</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-2">
        <h1 className="text-2xl font-bold text-[#0D2923] tracking-tight">Definições do Sistema</h1>
        <p className="text-xs text-[rgba(32,36,33,0.65)] mt-0.5">
          Configure a identidade da empresa, séries de faturação e permissões de utilizadores.
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="flex border-b border-[rgba(32,36,33,0.1)] gap-6">
        {[
          { id: 'empresa', label: 'Empresa & Sede', icon: Building2 },
          { id: 'faturacao', label: 'Faturação & Séries', icon: Receipt },
          { id: 'utilizadores', label: 'Utilizadores & Acessos', icon: Users },
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium transition-all relative cursor-pointer ${
                active
                  ? 'text-[#32866D] font-semibold'
                  : 'text-[rgba(32,36,33,0.6)] hover:text-[#0D2923]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#32866D] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB: Empresa */}
      {activeTab === 'empresa' && (
        <form onSubmit={handleSaveCompany} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-6">
              <Card padding="md" className="bg-white space-y-4">
                <CardHeader
                  title="Dados Gerais da Empresa"
                  subtitle="Informações oficiais que constarão no cabeçalho das faturas"
                />

                <div className="space-y-4 pt-2">
                  <Input
                    label="Razão Social (Nome Oficial) *"
                    value={companyForm.name}
                    onChange={e => setCompanyForm({ ...companyForm, name: e.target.value })}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nome Comercial / Marca *"
                      value={companyForm.tradingName}
                      onChange={e =>
                        setCompanyForm({ ...companyForm, tradingName: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="NIF (Número de Identificação Fiscal) *"
                      value={companyForm.nif}
                      onChange={e => setCompanyForm({ ...companyForm, nif: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email de Contacto"
                      type="email"
                      value={companyForm.email}
                      onChange={e => setCompanyForm({ ...companyForm, email: e.target.value })}
                      leftIcon={<Mail className="w-4 h-4" />}
                    />
                    <Input
                      label="Telefone Comercial"
                      value={companyForm.phone}
                      onChange={e => setCompanyForm({ ...companyForm, phone: e.target.value })}
                      leftIcon={<Phone className="w-4 h-4" />}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Website Oficial"
                      value={companyForm.website}
                      onChange={e => setCompanyForm({ ...companyForm, website: e.target.value })}
                      leftIcon={<Globe className="w-4 h-4" />}
                    />
                    <Input
                      label="Capital Social"
                      value={companyForm.shareCapital}
                      onChange={e =>
                        setCompanyForm({ ...companyForm, shareCapital: e.target.value })
                      }
                    />
                  </div>

                  <Input
                    label="Morada / Sede Social"
                    value={companyForm.address}
                    onChange={e => setCompanyForm({ ...companyForm, address: e.target.value })}
                    leftIcon={<MapPin className="w-4 h-4" />}
                  />
                </div>
              </Card>
            </div>

            {/* Right: Brand preview */}
            <div className="lg:col-span-4 space-y-4">
              <Card padding="md" className="bg-white space-y-4">
                <CardHeader
                  title="Identidade Visual"
                  subtitle="Logotipo institucional aplicado"
                />

                <div className="space-y-3">
                  <div className="p-4 bg-[#0D2923] rounded-[8px] flex items-center justify-center">
                    <img src="/MIRABILIS-LOGO-WHITE.png" alt="Mirabilis Logo White" className="h-8 object-contain" />
                  </div>
                  <div className="p-4 bg-[#F5F0E6] rounded-[8px] flex items-center justify-center border border-[rgba(32,36,33,0.08)]">
                    <img src="/MIRABILIS-LOGO.png" alt="Mirabilis Logo Dark" className="h-8 object-contain" />
                  </div>
                  <div className="p-3 bg-white rounded-[8px] flex items-center justify-center gap-3 border border-[rgba(32,36,33,0.1)]">
                    <img src="/ICON.png" alt="Mirabilis Ícone" className="w-8 h-8 object-contain" />
                    <span className="text-xs text-[rgba(32,36,33,0.7)] font-medium">Ícone & Favicon</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F5F0E6] rounded-[6px] text-xs text-[rgba(32,36,33,0.7)] space-y-1">
                  <p className="font-semibold text-[#0D2923]">Identidade Oficial</p>
                  <p>Ficheiros carregados da pasta pública do projeto (PNG de alta definição).</p>
                </div>
              </Card>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                leftIcon={<Save className="w-4 h-4" />}
              >
                Guardar Alterações
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* TAB: Faturação */}
      {activeTab === 'faturacao' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <Card padding="md" className="bg-white space-y-4">
                <CardHeader
                  title="Séries e Numeração de Documentos"
                  subtitle="Controlo sequencial e parametrização fiscal"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Input
                    label="Série Ativa de Faturação"
                    value={company.series}
                    disabled
                    helperText="Configuração fixada para o ano fiscal de 2026."
                  />
                  <Input
                    label="Último Número Emitido"
                    value={String(company.currentNumber)}
                    disabled
                    helperText="Próxima fatura será FT 2026/00484."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Moeda Padrão" value="Kz" disabled>
                    <option value="Kz">Kwanza Angolano (Kz)</option>
                  </Select>
                  <Select label="Enquadramento Fiscal" value="Geral" disabled>
                    <option value="Geral">Regime Geral de IVA (14%)</option>
                    <option value="Simplificado">Regime Simplificado (7%)</option>
                    <option value="Isencao">Regime de Exclusão (0%)</option>
                  </Select>
                </div>
              </Card>

              <Card padding="md" className="bg-white space-y-4">
                <CardHeader
                  title="Conformidade & SAF-T AO"
                  subtitle="Parâmetros de extração do ficheiro de auditoria fiscal"
                />

                <div className="p-4 bg-[#F5F0E6] rounded-[8px] border border-[rgba(32,36,33,0.1)] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#0D2923] font-bold">
                    <FileCode className="w-4 h-4 text-[#32866D]" />
                    <span>Módulo de Exportação SAF-T (AO)</span>
                  </div>
                  <p className="text-[rgba(32,36,33,0.7)] leading-relaxed">
                    O Mirabilis gera automaticamente o ficheiro XML de auditoria com todas as faturas,
                    recibos e notas de crédito emitidas de acordo com a regulamentação fiscal angolana.
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="outline-teal"
                      size="sm"
                      onClick={() => alert('Ficheiro SAF-T AO 2026 gerado para demonstração.')}
                    >
                      Descarregar SAF-T Demonstrativo
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <Card padding="md" className="bg-[#0D2923] text-white space-y-3">
                <div className="flex items-center gap-2 text-[#6E9B76]">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Certificação do Software
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">Mirabilis Core v1.0</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Garante a imutabilidade dos registos fiscais com assinatura criptográfica em cada fatura emitida.
                </p>
                <div className="pt-2 border-t border-[#183C34] text-[11px] text-[#6E9B76]">
                  ● Chave ativa de 2048-bit
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Utilizadores */}
      {activeTab === 'utilizadores' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#202421]">
                Utilizadores da Equipa ({users.length})
              </h3>
              <p className="text-xs text-[rgba(32,36,33,0.6)] mt-0.5">
                Membros com acesso à plataforma e respetivos níveis de permissão
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsUserModalOpen(true)}
            >
              Convidar Utilizador
            </Button>
          </div>

          <Card padding="none" className="overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F5F0E6] text-[#0D2923] border-b border-[rgba(32,36,33,0.08)] text-[10px] font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Utilizador</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Papel / Função</th>
                    <th className="py-3 px-4">Última Atividade</th>
                    <th className="py-3 px-4 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(32,36,33,0.06)] bg-white">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-[#FAFAFA]">
                      <td className="py-3.5 px-4 font-semibold text-[#0D2923]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#0D2923] text-white font-bold text-[10px] flex items-center justify-center">
                            {user.avatarInitials}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[rgba(32,36,33,0.7)] font-mono">
                        {user.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge status={user.role} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-[rgba(32,36,33,0.6)]">
                        {user.lastActive}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <Badge status={user.status} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* New User Modal */}
          <Modal
            isOpen={isUserModalOpen}
            onClose={() => setIsUserModalOpen(false)}
            title="Convidar Novo Utilizador"
            subtitle="Adicione um membro da equipa com permissões específicas"
            maxWidth="sm"
          >
            <form onSubmit={handleAddUser} className="space-y-4">
              <Input
                label="Nome Completo *"
                placeholder="ex: Manuel dos Santos"
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
                required
              />

              <Input
                label="Email Corporativo *"
                type="email"
                placeholder="manuel.santos@mirabilis.ao"
                value={newUserEmail}
                onChange={e => setNewUserEmail(e.target.value)}
                required
              />

              <Select
                label="Função no Sistema"
                value={newUserRole}
                onChange={e => setNewUserRole(e.target.value as any)}
              >
                <option value="Administrador">Administrador (Acesso Total)</option>
                <option value="Financeiro">Financeiro (Faturação e Cobranças)</option>
                <option value="Vendas">Vendas (Emissão de Faturas)</option>
                <option value="Contabilista">Contabilista (Relatórios e SAF-T)</option>
              </Select>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(32,36,33,0.08)]">
                <Button type="button" variant="secondary" size="md" onClick={() => setIsUserModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" size="md">
                  Enviar Convite
                </Button>
              </div>
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
}
