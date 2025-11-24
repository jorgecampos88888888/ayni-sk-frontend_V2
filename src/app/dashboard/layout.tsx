"use client";
import React from 'react';
import { Navbar, Sidebar } from '@/components/layout';
import { useUIStore, useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) router.replace('/auth/login');
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar items={[{ label: 'Inicio', href: '/dashboard' }, { label: 'Gestión', href: '/gestion' }, { label: 'Perfil', href: '/profile' }]} isOpen={sidebarOpen} />
      <div className="flex-1">
        <Navbar title="AYNI-SK" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
