export type InvoiceStatus = 'Pago' | 'Pendente' | 'Anulado' | 'Rascunho' | 'Emitido';

export interface InvoiceItem {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // e.g. 14 for 14% IVA
  total: number;
}

export interface Invoice {
  id: string;
  number: string; // e.g. 'FT 2026/00482'
  customerId: string;
  customerName: string;
  customerNif: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;
  issueDate: string; // ISO or formatted '02 Out 2026'
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  paymentMethod: string;
  notes?: string;
  hashDemonstration?: string; // AGT certification mock hash
  series?: string;
  currency: string;
}

export interface Customer {
  id: string;
  name: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  totalInvoiced: number;
  totalPending: number;
  invoicesCount: number;
  status: 'Ativo' | 'Inativo';
  createdAt: string;
  notes?: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  taxRate: number; // e.g. 14
  unit: string;
  status: 'Ativo' | 'Inativo';
  description?: string;
}

export interface Company {
  name: string;
  tradingName: string;
  nif: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  taxRegime: string;
  commercialRegistry: string;
  shareCapital: string;
  series: string;
  currentNumber: number;
  currency: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Financeiro' | 'Vendas' | 'Contabilista';
  avatarInitials: string;
  status: 'Ativo' | 'Inativo';
  lastActive: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  type: 'invoice' | 'payment' | 'customer' | 'system';
  relatedId?: string;
}
