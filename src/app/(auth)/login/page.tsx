"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useAuthStore } from '@/store';
import { isValidEmail } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { mockLogin } from '@/lib/mockAuth';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const user = await mockLogin(formData.email, formData.password);
      setUser(user as any);
      router.push('/dashboard');
    } catch (error) {
      setServerError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary-500" />
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <p className="text-sm text-secondary-600">Accede a tu cuenta AYNI-SK</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {serverError && (
            <div className="flex gap-3 rounded-lg bg-error/10 p-3 text-error">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm">{serverError}</p>
            </div>
          )}

          <Input label="Email" name="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} error={errors.email} disabled={isLoading} />

          <Input label="Contraseña" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} error={errors.password} disabled={isLoading} />

          <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>Iniciar Sesión</Button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <Link href="/auth/forgot-password" className="block text-primary-600 hover:underline">¿Olvidaste tu contraseña?</Link>

          <div className="text-secondary-600">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/register" className="font-semibold text-primary-600 hover:underline">Regístrate aquí</Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
