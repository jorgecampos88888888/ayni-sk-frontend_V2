---
title: "[Fase3][Auth] Implementar Login y Registro"
labels: ["Fase3", "auth", "frontend"]
assignees: []
---

Descripción
---------
Implementar las pantallas de autenticación: Login, Registro y Recuperación de contraseña.

Archivos sugeridos
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/app/(auth)/forgot-password/page.tsx`

Detalles
-------
- Reutilizar `src/components/ui/Input.tsx` y `src/components/ui/Button.tsx`.
- Al enviar login, llamar `apiClient.post('/auth/login', { email, password })` si `NEXT_PUBLIC_API_BASE_URL` está definido; en otro caso mantener fallback mock.
- En login exitoso llamar `useAuthStore().setUser(user)` y redirigir a `/dashboard`.

Criterios de aceptación
----------------------
- Formulario con validación básica (email válido, password no vacío).
- Indicador de carga mientras se espera la respuesta.
- Mostrar errores recibidos de la API.
- Al autenticarse, `useAuthStore` refleja usuario y `isAuthenticated=true`.

Estimación
---------
4-8 horas

Notas
-----
- No renombrar `auth-store` (persist name) para evitar pérdida de datos locales.
