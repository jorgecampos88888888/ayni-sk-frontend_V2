## Propósito
Breve guía para agentes AI que contribuyen a este repositorio: contexto, convenciones y ejemplos prácticos para ser productivos de inmediato.

## Big picture & arquitectura
- **Framework:** Next.js (App Router) en `src/app` — rutas agrupadas por paréntesis (`(auth)`, etc.).
- **UI:** Tailwind CSS + `class-variance-authority` + `clsx` para variantes y composición (ver `src/components/ui`).
- **Estado:** `zustand` con `persist` para stores en `src/store` (`useAuthStore`, `useUIStore`).
- **API:** `src/lib/api.ts` contiene una implementación mock de `apiClient` y la clase `APIError`. Sustituir por `axios` con `baseURL` para integración real.

## Flujo de datos y límites de servicio
- UI <-> componentes (`src/components/*`) -> hooks (`src/hooks/*`) -> stores (`src/store/*`) -> llamadas API (`src/lib/api.ts`).
- Los stores usan `localStorage` (persist) — cuidado al renombrar `name` en persist (p. ej. `auth-store`).

## Comandos útiles (dev / build / lint)
- Arrancar en desarrollo: `npm run dev` (Next.js, puerto 3000)
- Build producción: `npm run build`
- Iniciar en producción: `npm run start`
- Linter: `npm run lint` (usa `eslint`)

## Convenciones y patrones del proyecto
- **Componentes UI:** colocados en `src/components/ui`. Usan `cva` para variantes. Ejemplo: `src/components/ui/Button.tsx` — respeta `variant`, `size`, `fullWidth` y soporta `asChild`.
- **Layouts / navegación:** `src/components/layout` contiene `Navbar`, `Sidebar`, `MobileMenu`, `BottomNavigation`.
- **Hooks:** `useMediaQuery` define breakpoints de Tailwind (xs, sm, md, lg, xl, 2xl) — preferir estos hooks para condicional render.
- **Client components:** la mayoría de los componentes son client components (uso de hooks y estado local). Mantener consistencia al mover lógica compartida al servidor.

## Integraciones y puntos de atención
- `src/lib/api.ts` está en modo mock; para integrar backend crear una instancia de `axios` y exportarla como `apiClient` con `baseURL` y manejo de errores con `APIError`.
- Stores persistentes: `useAuthStore` y `useUIStore` usan persist con nombres `auth-store` y `ui-store` — renombrar con cuidado para no invalidar datos existentes.
- Fuentes y metas en `src/app/layout.tsx` configuran viewport y PWA hints (apple-touch-icon, meta tags) — revisar antes de cambios de PWA.

## Ejemplos de tareas comunes y dónde tocar
- Añadir endpoint real: modificar `src/lib/api.ts` y actualizar componentes que llaman `apiClient`.
- Nuevo componente visual: crear en `src/components/ui`, exportarlo desde `src/components/ui/index.ts` y documentar variantes en comentarios.
- Nuevo store: agregar en `src/store/` usando patrón `create(...)` + `persist`, exponer hooks `useXStore`.

## Reglas para cambios de UI / comportamiento
- Mantener variantes mediante `class-variance-authority` (`cva`) y no mezclar lógica de variantes en componentes con lógica de negocio.
- Evitar mutaciones directas del store; usar setters expuestos (por ejemplo `setUser`, `toggleSidebar`).

## Archivos clave a revisar antes de PR
- `package.json` (scripts, dependencias)
- `PLAN_IMPLEMENTACION_AYNI_SK.md` y `FASE_2_COMPLETADA.md` (contexto de fases y qué está completo)
- `src/lib/api.ts`, `src/store/*`, `src/hooks/*`, `src/components/ui/*`, `src/components/layout/*`, `src/app/layout.tsx`.

## Preguntas al autor mantainer (útiles antes de editar)
- ¿Base URL del API y esquema de auth (JWT/cookies)?
- ¿Convención de nombres para nuevos stores (persist names)?
- ¿Desea que la integración PWA se automatice ahora o en fase 5?

Si falta información aquí o deseas que amplíe ejemplos (p.ej. snippet para inicializar `axios`), dime qué sección expandir.