"use client";
import React, { useState } from 'react';
import { useAuthStore } from '@/store';
import { Input, Button } from '@/components/ui';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    // mock save
    await new Promise((r) => setTimeout(r, 600));
    setUser({ ...(user as any), name } as any);
    setSaving(false);
  };

  if (!user) return <p>Debes iniciar sesión para ver tu perfil.</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Perfil</h1>
      <div className="space-y-4 bg-white p-6 rounded shadow">
        <Input label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Correo" value={email} disabled />
        <Button onClick={save} isLoading={saving}>Guardar</Button>
      </div>
    </div>
  );
}
