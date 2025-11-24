---
title: "[Fase3][PR] Perfil: ver y editar perfil"
branch: "feature/fase3-perfil"
labels: ["Fase3", "perfil"]
assignees: []
---

Resumen
------
Añade páginas `src/app/profile/page.tsx` y `src/app/perfil/page.tsx` para ver y editar información del usuario (sin contraseñas).

Files
- `src/app/profile/page.tsx` (nuevo)
- `src/app/perfil/page.tsx` (nuevo)

Testing
------
- Editar nombre/email y verificar `useAuthStore` persiste los cambios.

Checklist
- [ ] No almacenar contraseñas en el store.
