'use client';

import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Checkbox } from '@/components/ui';
import { useAuthStore } from '@/store';
import { User, Lock, Bell, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

interface SettingsData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  publicProfile: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+34 123 456 789',
    bio: 'Miembro activo de la comunidad AYNI',
  });

  const [settingsData, setSettingsData] = useState<SettingsData>({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    publicProfile: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (field: keyof SettingsData) => {
    setSettingsData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditing(false);
      alert('Perfil guardado correctamente');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-primary-500" />
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">{user?.name}</h1>
          <p className="text-secondary-600">{user?.role}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-secondary-200">
        {(['profile', 'security', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 border-b-2 px-4 py-4 font-medium transition-colors ${
              activeTab === tab
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-600 hover:text-secondary-900'
            }`}
          >
            {tab === 'profile' && <User size={20} />}
            {tab === 'security' && <Lock size={20} />}
            {tab === 'settings' && <Bell size={20} />}
            <span className="capitalize">{tab === 'security' ? 'Seguridad' : tab === 'settings' ? 'Ajustes' : 'Perfil'}</span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Información Personal</CardTitle>
            {!isEditing && (
              <Button size="sm" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <Input
                  label="Nombre Completo"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                />
                <Input
                  label="Teléfono"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
                <Input
                  label="Biografía"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                />
                <div className="flex gap-2 pt-4">
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveProfile} isLoading={isLoading}>
                    Guardar Cambios
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-secondary-700">Nombre</p>
                  <p className="mt-1 text-secondary-900">{profileData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-700">Email</p>
                  <p className="mt-1 text-secondary-900">{profileData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-700">Teléfono</p>
                  <p className="mt-1 text-secondary-900">{profileData.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-700">Biografía</p>
                  <p className="mt-1 text-secondary-900">{profileData.bio}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle>Cambiar Contraseña</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Contraseña Actual" type="password" placeholder="••••••••" />
            <Input label="Nueva Contraseña" type="password" placeholder="••••••••" />
            <Input label="Confirmar Contraseña" type="password" placeholder="••••••••" />
            <Button>Actualizar Contraseña</Button>
          </CardContent>
        </Card>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Preferencias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium text-secondary-900">Notificaciones</h3>
              <Checkbox
                label="Recibir notificaciones por email"
                checked={settingsData.emailNotifications}
                onChange={() => handleSettingsChange('emailNotifications')}
              />
              <Checkbox
                label="Recibir notificaciones push"
                checked={settingsData.pushNotifications}
                onChange={() => handleSettingsChange('pushNotifications')}
              />
            </div>

            <div className="border-t border-secondary-200 pt-6">
              <h3 className="font-medium text-secondary-900">Privacidad</h3>
              <div className="mt-3 space-y-3">
                <Checkbox
                  label="Hacer perfil público"
                  checked={settingsData.publicProfile}
                  onChange={() => handleSettingsChange('publicProfile')}
                />
                <Checkbox
                  label="Modo oscuro (próximamente)"
                  checked={settingsData.darkMode}
                  onChange={() => handleSettingsChange('darkMode')}
                  disabled
                />
              </div>
            </div>

            <Button variant="secondary" fullWidth>
              Guardar Preferencias
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Logout Button */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="flex items-center justify-between pt-6">
          <div>
            <p className="font-medium text-secondary-900">Cerrar Sesión</p>
            <p className="text-sm text-secondary-600">Termina tu sesión actual</p>
          </div>
          <Button variant="danger" onClick={handleLogout} className="gap-2">
            <LogOut size={18} />
            Salir
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
