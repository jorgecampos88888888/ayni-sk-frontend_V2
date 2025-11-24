"use client";

import React, { useState } from "react";
import { Input, Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { apiClient } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      const user = res?.data?.user ?? { id: "local", name: "Demo User", email };
      setUser(user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Error durante el login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card>
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" type="email" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" />
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" isLoading={loading}>Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
"use client";
import React, { useState } from "react";
import { Input, Button } from "@/components/ui";
import { useAuthStore } from "@/store";
import { mockLogin } from "@/lib/mockAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await mockLogin(email, password);
      setUser(user as any);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
      <form onSubmit={submit} className="space-y-4">
        <Input label="Correo electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" isLoading={loading} fullWidth>
          Entrar
        </Button>
      </form>
    </div>
  );
}
