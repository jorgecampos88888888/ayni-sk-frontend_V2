---
title: "[Fase3][Perfil] Página de perfil y ajustes de usuario"
labels: ["Fase3", "perfil", "frontend"]
assignees: []
---

Descripción
---------
Implementar página de perfil donde el usuario pueda ver y editar su información básica.

Archivos sugeridos
- `src/app/profile/page.tsx`
- `src/app/perfil/page.tsx`

Detalles
-------
- Permitir edición de nombre, email y foto de perfil (placeholder).
- Guardar cambios localmente en `useAuthStore` y enviar a API si `NEXT_PUBLIC_API_BASE_URL` está definido.

Criterios de aceptación
----------------------
- Formulario de edición con validaciones básicas.
- Cambios reflejados en `useAuthStore` y persistidos en localStorage.

Estimación
---------
4-6 horas

Notas
-----
- No almacenar contraseñas en el store.
