---
title: "[Fase3][Auth] Protección de rutas y layout autenticado"
labels: ["Fase3", "auth", "frontend"]
assignees: []
---

Descripción
---------
Implementar la validación de autenticación en layouts y rutas protegidas.

Archivos sugeridos
- `src/app/dashboard/layout.tsx`
- `src/app/(auth)/` (login/register)

Detalles
-------
- En el layout del dashboard (client component) comprobar `useAuthStore().isAuthenticated`.
- Si no autenticado, redirigir a `(auth)/login`.
- Mantener persistencia (`useAuthStore` usa `persist`) — no cambiar persist name.

Criterios de aceptación
----------------------
- Usuarios no autenticados son redirigidos al login al intentar acceder a `/dashboard`.
- Usuarios autenticados ven el layout completo (Navbar, Sidebar) correctamente.

Estimación
---------
2-4 horas

Notas
-----
- Usar client components para hooks y `useEffect`.
