'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Checkbox } from '@/components/ui';
import { useAuthStore } from '@/store';
import { isValidEmail, isValidPassword } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { mockRegister } from '@/lib/mockAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Mín. 8 caracteres, 1 mayúscula y 1 número';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const user = await mockRegister(formData.name, formData.email, formData.password);
      setUser(user as any);
      router.push('/dashboard');
    } catch (error) {
      setServerError('Error al registrarse. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary-500" />
        <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
        <p className="text-sm text-secondary-600">Únete a la plataforma AYNI-SK</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {serverError && (
            <div className="flex gap-3 rounded-lg bg-error/10 p-3 text-error">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm">{serverError}</p>
            </div>
          )}

          <Input
            label="Nombre Completo"
            name="name"
            placeholder="Jorge Campos"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isLoading}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
            helperText="Mín. 8 caracteres, 1 mayúscula y 1 número"
          />

          <Input
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            disabled={isLoading}
          />

          <div className="flex items-start gap-2">
            <Checkbox
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label className="text-sm text-secondary-700">
              Acepto los{' '}
              <Link href="/terms" className="text-primary-600 hover:underline">
                términos y condiciones
              </Link>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-error">{errors.acceptTerms}</p>
              )}
            </label>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            Crear Cuenta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary-600">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth/login" className="font-semibold text-primary-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
