import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/store';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mirabilis — Plataforma de Faturação e Gestão Empresarial',
  description: 'Sistema corporativo de faturação e gestão de negócios para empresas em Angola.',
  icons: {
    icon: '/ICON.png',
    shortcut: '/ICON.png',
    apple: '/ICON.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${lexend.variable} font-sans`}>
      <body className="min-h-screen bg-[#FAFAFA] text-[#202421] antialiased selection:bg-[#32866D]/20 selection:text-[#0D2923]">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
