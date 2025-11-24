---
title: "[Fase3][Dashboard] Crear Dashboard / Home con widgets responsive"
labels: ["Fase3", "dashboard", "frontend"]
assignees: []
---

Descripción
---------
Crear la página principal del dashboard con widgets en grid responsive (1 columna móvil, 2-3 columnas en desktop).

Archivos sugeridos
- `src/app/dashboard/page.tsx`
- `src/components/features/Widgets/*` (cards reutilizables)

Detalles
-------
- Implementar 3 widgets iniciales (Resumen usuarios, Actividad reciente, Estadísticas simples) usando `Card`.
- Los datos pueden ser mock (local) hasta integrar API.

Criterios de aceptación
----------------------
- Dashboard renderiza correctamente en móviles y desktop.
- Widgets aceptan props `data` y `loading`.

Estimación
---------
6-12 horas

Notas
-----
- Mantener lógica de presentación en `components/features` y no mezclar llamadas a API en los componentes de UI.
