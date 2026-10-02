'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Company,
  Customer,
  Invoice,
  InvoiceStatus,
  Product,
  User,
  Activity,
} from './types';
import {
  initialCompany,
  initialCustomers,
  initialInvoices,
  initialProducts,
  initialUsers,
  initialActivities,
} from './mock-data';

interface AppContextType {
  company: Company;
  updateCompany: (comp: Partial<Company>) => void;
  customers: Customer[];
  addCustomer: (cust: Omit<Customer, 'id' | 'totalInvoiced' | 'totalPending' | 'invoicesCount' | 'createdAt'>) => Customer;
  products: Product[];
  addProduct: (prod: Omit<Product, 'id'>) => Product;
  invoices: Invoice[];
  addInvoice: (inv: Omit<Invoice, 'id' | 'number'>) => Invoice;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => void;
  users: User[];
  addUser: (user: Omit<User, 'id' | 'lastActive'>) => User;
  activities: Activity[];
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedNotification: string | null;
  setSelectedNotification: (n: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompany] = useState<Company>(initialCompany);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  // Helper to add invoice
  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'number'>): Invoice => {
    const nextNumber = company.currentNumber + 1;
    const formattedNum = `FT 2026/${String(nextNumber).padStart(5, '0')}`;
    const newId = `inv-${nextNumber}`;
    
    const newInvoice: Invoice = {
      ...invoiceData,
      id: newId,
      number: formattedNum,
      hashDemonstration: `${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6)}-Mirabilis-Valid-2026`,
    };

    setCompany(prev => ({ ...prev, currentNumber: nextNumber }));
    setInvoices(prev => [newInvoice, ...prev]);

    // Update customer statistics
    setCustomers(prev =>
      prev.map(c => {
        if (c.id === newInvoice.customerId) {
          return {
            ...c,
            totalInvoiced: c.totalInvoiced + newInvoice.total,
            totalPending: newInvoice.status === 'Pendente' ? c.totalPending + newInvoice.total : c.totalPending,
            invoicesCount: c.invoicesCount + 1,
          };
        }
        return c;
      })
    );

    // Add activity
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      title: `Fatura ${formattedNum} emitida`,
      description: `Emitida para ${newInvoice.customerName} no valor de ${newInvoice.total.toLocaleString()} Kz`,
      timeAgo: 'Agora mesmo',
      timestamp: new Date().toISOString(),
      type: 'invoice',
      relatedId: newId,
    };
    setActivities(prev => [newAct, ...prev]);

    return newInvoice;
  };

  const updateInvoiceStatus = (id: string, status: InvoiceStatus) => {
    setInvoices(prev =>
      prev.map(inv => {
        if (inv.id === id) {
          const prevStatus = inv.status;
          const updated = { ...inv, status };

          // Adjust customer pending if status changed to/from Pago
          if (prevStatus === 'Pendente' && status === 'Pago') {
            setCustomers(custs =>
              custs.map(c =>
                c.id === inv.customerId
                  ? { ...c, totalPending: Math.max(0, c.totalPending - inv.total) }
                  : c
              )
            );
          }
          return updated;
        }
        return inv;
      })
    );
  };

  const addCustomer = (custData: Omit<Customer, 'id' | 'totalInvoiced' | 'totalPending' | 'invoicesCount' | 'createdAt'>): Customer => {
    const newCustomer: Customer = {
      ...custData,
      id: `cust-${Date.now()}`,
      totalInvoiced: 0,
      totalPending: 0,
      invoicesCount: 0,
      createdAt: '02 Out 2026',
    };
    setCustomers(prev => [newCustomer, ...prev]);

    const newAct: Activity = {
      id: `act-${Date.now()}`,
      title: `Cliente ${newCustomer.name} adicionado`,
      description: `Registo criado com NIF ${newCustomer.nif}`,
      timeAgo: 'Agora mesmo',
      timestamp: new Date().toISOString(),
      type: 'customer',
      relatedId: newCustomer.id,
    };
    setActivities(prev => [newAct, ...prev]);

    return newCustomer;
  };

  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateCompany = (compData: Partial<Company>) => {
    setCompany(prev => ({ ...prev, ...compData }));
  };

  const addUser = (userData: Omit<User, 'id' | 'lastActive'>): User => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      lastActive: 'Agora mesmo',
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  return (
    <AppContext.Provider
      value={{
        company,
        updateCompany,
        customers,
        addCustomer,
        products,
        addProduct,
        invoices,
        addInvoice,
        updateInvoiceStatus,
        users,
        addUser,
        activities,
        sidebarCollapsed,
        setSidebarCollapsed,
        searchQuery,
        setSearchQuery,
        selectedNotification,
        setSelectedNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
