'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { isValidEmail } from '@/lib/utils';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');

    if (!email.trim()) {
      setErrors('El email es requerido');
      return;
    }

    if (!isValidEmail(email)) {
      setErrors('Email inválido');
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      setErrors('Error al procesar tu solicitud. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card>
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle size={24} className="text-success" />
          </div>
          <CardTitle className="text-2xl">Revisa tu Email</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-secondary-700">
            Hemos enviado un enlace de recuperación a <strong>{email}</strong>
          </p>

          <p className="text-sm text-secondary-600">
            Si no ves el email en los próximos minutos, revisa tu carpeta de spam.
          </p>

          <Button variant="secondary" fullWidth asChild>
            <Link href="/auth/login">Volver al Login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-2 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary-500" />
        <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
        <p className="text-sm text-secondary-600">Te enviaremos un enlace para resetear tu contraseña</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors && (
            <div className="flex gap-3 rounded-lg bg-error/10 p-3 text-error">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm">{errors}</p>
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            Enviar Enlace
          </Button>
        </form>

        <Link
          href="/auth/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-primary-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Volver al Login
        </Link>
      </CardContent>
    </Card>
  );
}
