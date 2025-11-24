---
title: "[Fase3][PR] Protección de rutas / layout autenticado"
branch: "feature/fase3-protect-routes"
labels: ["Fase3", "auth"]
assignees: []
---

Resumen
------
Implementa checks de autenticación en `src/app/dashboard/layout.tsx` y redirección a `/login`.

Files
- `src/app/dashboard/layout.tsx` (modificado)

Testing
------
- Intentar acceder a `/dashboard` sin estar autenticado debe redirigir a `/login`.

Checklist
- [ ] No romper SSR (usar client components donde corresponda).
- [ ] Mantener persist name `auth-store`.
