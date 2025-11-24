---
title: "[Fase3][PR] Auth: Login & Register - scaffold + integration points"
branch: "feature/fase3-auth-login"
labels: ["Fase3", "auth", "scaffold"]
assignees: []
---

Resumen
------
Scaffold de páginas de autenticación (login/register/forgot-password) y hooks de integración con `useAuthStore`.

Archivos propuestos (cambios)
- `src/app/(auth)/login/page.tsx` (nuevo)
- `src/app/(auth)/register/page.tsx` (nuevo)
- `src/app/(auth)/forgot-password/page.tsx` (nuevo)

Pruebas manuales
-------------
1. `npm run dev`.
2. Abrir `/login`, completar credenciales de prueba.
3. Verificar que al 'loguear' se llama `useAuthStore().setUser()` y se redirige a `/dashboard`.

Checklist PR
-----------
- [ ] Código compilable (`npm run build`).
- [ ] Documentación en la descripción del PR.
- [ ] Testing manual descrito.
