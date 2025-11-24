---
title: "[Fase3][Gestion] Listado y vista de detalle (responsive)"
labels: ["Fase3", "gestion", "frontend"]
assignees: []
---

Descripción
---------
Crear la vista de listados para entidades del sistema (p. ej. items, proyectos) y una vista de detalle.

Archivos sugeridos
- `src/app/gestion/page.tsx`
- `src/app/gestion/[id]/page.tsx`
- `src/components/features/forms/*` (formularios de crear/editar)

Detalles
-------
- Listado: en desktop usar una tabla; en móvil usar tarjetas en lista.
- Detalle: mostrar información y acciones (editar, eliminar) con botones reutilizables.
- Integrar con `apiClient` si `NEXT_PUBLIC_API_BASE_URL` está listo; en otro caso usar datos mock.

Criterios de aceptación
----------------------
- Listado responde a breakpoints definidos por `useMediaQuery`.
- Pagina de detalle muestra datos correctos para un `id` dado.

Estimación
---------
8-16 horas

Notas
-----
- Evitar lógica de negocio pesada en componentes UI; centralizar en hooks o stores si es necesario.
