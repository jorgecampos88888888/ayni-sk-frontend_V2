"use client";

import { useAuthStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Users, Briefcase, TrendingUp, AlertCircle } from 'lucide-react';
import RequireAuth from '@/components/auth/RequireAuth';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  const statCards = [
    {
      title: 'Proyectos Activos',
      value: '8',
      icon: Briefcase,
      color: 'primary',
      increase: '+2 este mes',
    },
    {
      title: 'Usuarios',
      value: '42',
      icon: Users,
      color: 'accent',
      increase: '+5 este mes',
    },
    {
      title: 'Tasa de Éxito',
      value: '94%',
      icon: TrendingUp,
      color: 'success',
      increase: '+3% vs mes anterior',
    },
    {
      title: 'Alertas Pendientes',
      value: '3',
      icon: AlertCircle,
      color: 'warning',
      increase: 'Revisar pronto',
    },
  ];

  const content = (
    <main className="p-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-secondary-900">Bienvenido, {user?.name}</h1>
          <p className="text-secondary-600">Aquí está un resumen de tu actividad en AYNI-SK</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon as any;
            const colorMap: Record<string, string> = {
              primary: 'bg-primary-50 text-primary-600',
              accent: 'bg-accent-50 text-accent-600',
              success: 'bg-green-50 text-green-600',
              warning: 'bg-warning/10 text-warning',
            };

            const colorClass = colorMap[card.color as string] || 'bg-gray-50 text-gray-600';

            return (
              <Card key={card.title}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-secondary-700">{card.title}</h3>
                      <div className={`rounded-lg p-2 ${colorClass}`}>
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-secondary-900">{card.value}</p>
                      <p className="text-xs text-secondary-500">{card.increase}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-4 border-b border-secondary-100 pb-4 last:border-0">
                  <div className="h-10 w-10 rounded-lg bg-primary-100" />
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900">Nueva actividad #{item}</p>
                    <p className="text-sm text-secondary-600">Hace {item * 2} horas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );

  return <RequireAuth>{content}</RequireAuth>;
}

