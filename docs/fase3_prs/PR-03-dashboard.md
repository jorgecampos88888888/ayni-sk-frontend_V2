---
title: "[Fase3][PR] Dashboard: widgets responsive"
branch: "feature/fase3-dashboard"
labels: ["Fase3", "dashboard"]
assignees: []
---

Resumen
------
Añade `src/app/dashboard/page.tsx` con widgets iniciales y componentes reutilizables en `src/components/features/Widgets`.

Files
- `src/app/dashboard/page.tsx` (nuevo)
- `src/components/features/Widgets/SummaryCard.tsx` (nuevo)

Testing
------
- Comprobar responsive en móvil y desktop.

Checklist
- [ ] Widgets aceptan props y estado `loading`.
- [ ] No llamadas reales a API (usar mocks hasta integrar).
