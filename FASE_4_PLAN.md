# 🔗 FASE 4: Lógica, Estado e Integración API

**Versión:** 1.0  
**Estado:** En progreso  
**Fechas:** Nov 24, 2025 - Ongoing  
**Objetivo:** Dar vida a la interfaz con datos, lógica de negocio e integración de API.

---

## 📋 Resumen Ejecutivo

FASE 4 completa la funcionalidad del core de AYNI-SK al integrar:
- ✅ Manejo de estado avanzado (Zustand stores)
- ✅ Hooks personalizados (`useMediaQuery`, `useAuth`, `useFetch`)
- ✅ Integración API real/mock
- ✅ Manejo de errores y loading states
- ✅ Navegación y transiciones
- ✅ Cache de datos y optimización

---

## 🎯 Objetivos principales

1. **Conectar componentes con datos reales**
   - Dashboard: obtener estadísticas desde API
   - Gestion: listar, crear, editar, eliminar elementos
   - Profile: cargar/actualizar perfil de usuario

2. **Implementar stores avanzados**
   - `useGestionStore` para CRUD
   - `useUIStore` para estados globales (sidebar, modals)
   - `useAuthStore` mejorado con refresh token

3. **Manejo de estados (loading, error, success)**
   - Skeletons y spinners
   - Error boundaries y mensajes
   - Toast notifications

4. **Optimizar rendimiento**
   - Lazy loading de datos
   - Caché inteligente
   - Deduplicación de requests

---

## 📦 Subtareas ordenadas por prioridad

### **Tier 1: Core essentials (Semana 1)**

#### 1.1 Hooks personalizados
**Archivos:** `src/hooks/useMediaQuery.ts`, `src/hooks/useAuth.ts`, `src/hooks/useFetch.ts`

- `useMediaQuery`: Detectar breakpoints (mobile, tablet, desktop)
- `useAuth`: Wrapper around `useAuthStore` con validaciones
- `useFetch`: Hook genérico para llamadas API con caché
- `useLocalStorage`: Para persistencia alternativa

**Criterio de aceptación:**
- [ ] `useMediaQuery` retorna booleanos correctos en resize
- [ ] `useAuth` expone `user`, `isAuthenticated`, `login()`, `logout()`
- [ ] `useFetch` maneja loading, error, data y retry
- [ ] Todos compilan sin errores TypeScript

**Pasos de prueba:**
```bash
npm run dev
# Abrir DevTools → resize viewport → verificar useMediaQuery
# Navegar a /dashboard → verificar useAuth disponible
# Hacer llamada API en browser console
```

#### 1.2 Manejo de errores y loading
**Archivos:** `src/components/ui/Skeleton.tsx`, `src/components/ui/Alert.tsx`, `src/components/ui/Toast.tsx`

- Componentes Skeleton para loading placeholders
- Componente Alert para mensajes (success, error, warning, info)
- Toast/Notification system simple

**Criterio de aceptación:**
- [ ] Skeletons renderiza correctamente con animación
- [ ] Alert muestra todos los tipos con iconos
- [ ] Toast aparece y desaparece automáticamente
- [ ] Accesibilidad validada (ARIA labels)

#### 1.3 Mejora de `useGestionStore` (Zustand)
**Archivo:** `src/store/gestionStore.ts` (crear si no existe)

- Estructura: `{ items[], selectedItem, isLoading, error }`
- Acciones: `setItems()`, `addItem()`, `updateItem()`, `deleteItem()`, `setLoading()`, `setError()`
- Persist: `localStorage` con clave `gestion-store`

**Criterio de aceptación:**
- [ ] Store creado y exportado
- [ ] Persist funciona entre recargas
- [ ] Acciones mutables por immer (Zustand default)
- [ ] TypeScript tipos correctos

---

### **Tier 2: Integración API (Semana 2)**

#### 2.1 Endpoints mock/real para gestion
**Archivo:** `src/lib/api.ts` (actualizar)

Agregar funciones:
```typescript
apiClient.get('/gestion')  // Lista todos
apiClient.post('/gestion', data)  // Crear
apiClient.put('/gestion/:id', data)  // Actualizar
apiClient.delete('/gestion/:id')  // Eliminar
```

**Comportamiento:**
- Si `NEXT_PUBLIC_API_BASE_URL` existe → llamada real
- Si no existe → retorna mocks

**Criterio de aceptación:**
- [ ] Funciones exportadas desde `src/lib/api.ts`
- [ ] Mocks retornan datos coherentes
- [ ] Errores capturados y logueados
- [ ] TypeScript generics para requests/responses

#### 2.2 Conectar Dashboard a datos
**Archivo:** `src/app/dashboard/page.tsx` (actualizar)

- Usar `useFetch` para obtener `GET /dashboard/stats`
- Mostrar Skeleton mientras carga
- Mostrar Alert si error
- Actualizar estadísticas cada 30s (polling) o WebSocket

**Criterio de aceptación:**
- [ ] Dashboard carga datos reales (o mocks)
- [ ] Skeleton visible mientras fetch
- [ ] Error manejo con retry button
- [ ] Responsive en mobile/desktop

#### 2.3 Conectar Gestion a datos
**Archivo:** `src/app/gestion/page.tsx` (actualizar)

- Usar `useGestionStore` con datos de API
- Modal/formulario para crear/editar
- Confirmación para eliminar
- Loading states en botones

**Criterio de aceptación:**
- [ ] Listado carga y muestra items
- [ ] CRUD completo funcional
- [ ] Optimistic updates (actualizar UI antes de API)
- [ ] Manejo de errores con rollback

#### 2.4 Conectar Profile a datos
**Archivo:** `src/app/profile/page.tsx` (actualizar)

- Usar `useAuthStore` para cargar datos
- Formulario para editar perfil
- Guardar en `PUT /auth/profile`
- Validar contraseña antes de cambios sensibles

**Criterio de aceptación:**
- [ ] Carga datos del usuario autenticado
- [ ] Formulario valida campos
- [ ] Cambios se persisten en API
- [ ] Feedback visual de éxito/error

---

### **Tier 3: Optimización y UX (Semana 3)**

#### 3.1 Navegación y transiciones
**Archivos:** `src/components/layout/Navigation.tsx`, `src/lib/navigation.ts`

- Componente Navigation con links activos
- Transiciones suaves entre páginas (framer-motion)
- Breadcrumbs para contexto
- Mobile menu drawer

**Criterio de aceptación:**
- [ ] Nav renderiza con links correctos
- [ ] Active link highlight funciona
- [ ] Transiciones suaves sin jarring
- [ ] Mobile menu abre/cierra

#### 3.2 Caché de datos y deduplicación
**Archivo:** `src/lib/api.ts` (mejorar)

- Agregar caché simple (Map con TTL)
- Deduplicar requests paralelos
- Invalidación manual `cache.invalidate(key)`

**Criterio de aceptación:**
- [ ] Requests duplicadas → retorna cached
- [ ] TTL respetado (ej: 5 minutos)
- [ ] Cache invalidation funciona

#### 3.3 Polling/Sync de datos
**Archivo:** `src/hooks/useSync.ts` (crear)

- Hook para sincronizar datos periódicamente
- Exponential backoff en errores
- Pausa en tab invisible

**Criterio de aceptación:**
- [ ] Datos se actualizan cada N segundos
- [ ] Backoff en errores
- [ ] Pausa cuando tab no visible

#### 3.4 Notificaciones (Toast)
**Archivo:** `src/store/toastStore.ts` (crear)

- Store para manejar toasts
- Componente ToastContainer en root layout
- Métodos: `addToast()`, `removeToast()`

**Criterio de aceptación:**
- [ ] Toast aparece en esquina
- [ ] Auto-desaparece después de 3s
- [ ] Múltiples toasts se apilan
- [ ] Click cierra inmediatamente

---

### **Tier 4: Pulido y Testing (Semana 4)**

#### 4.1 Validación de formularios avanzada
**Archivo:** `src/lib/validation.ts` (mejorar)

- Validadores reutilizables
- Mostrar errores inline
- Server-side validation errors

**Criterio de aceptación:**
- [ ] Validaciones ejecutadas en cliente
- [ ] Mensajes de error claros
- [ ] Previene envíos inválidos

#### 4.2 Error boundaries
**Archivo:** `src/components/ErrorBoundary.tsx` (crear)

- Componente que atrapa errores en subtree
- Muestra UI fallback
- Botón retry

#### 4.3 Tests unitarios
**Archivos:** `src/**/*.test.ts`, `src/**/*.test.tsx`

- Tests para hooks (`useMediaQuery`, `useFetch`, `useAuth`)
- Tests para stores (`useAuthStore`, `useGestionStore`)
- Tests para componentes UI

---

## 📊 Criterios de aceptación globales para FASE 4

- [ ] Build compila sin errores
- [ ] TypeScript strict mode sin warnings
- [ ] Todas las llamadas API capturadas y manejadas
- [ ] Loading, error y success states visibles
- [ ] Responsive en mobile/tablet/desktop
- [ ] Performance Lighthouse > 80
- [ ] Accesibilidad (WCAG 2.1 AA)
- [ ] Tests coverage > 60%

---

## 🔄 Flujo de trabajo por PR

1. **Crear rama feature:** `git checkout -b feature/fase4-<tarea>`
2. **Implementar cambios** según subtarea
3. **Validar localmente:** `npm run dev` y `npm run build`
4. **PR con descripción:**
   ```
   ## Cambios
   - Implementar [componente/feature]
   - Agregar [función/hook]
   
   ## Testing manual
   1. npm run dev
   2. Navegar a [ruta]
   3. Verificar [comportamiento]
   
   ## Checklist
   - [ ] Build pasa
   - [ ] TypeScript limpio
   - [ ] Tests escritos
   ```

---

## 🚀 Próximos pasos después de FASE 4

- **FASE 5:** Optimización PWA, deployment y performance final
- **FASE 6:** Integración CI/CD, monitoring y mantenimiento

---

## 📝 Notas técnicas

- Mantener `src/lib/api.ts` como punto único de entrada para API
- No mezclar lógica de estado en componentes → usar stores
- Hooks personalizados en `src/hooks/` — máx 1 responsabilidad cada uno
- Componentes UI reutilizables sin lógica de negocio
- Validación en cliente Y servidor (no confiar solo en cliente)

---

**Última actualización:** Nov 24, 2025  
**Responsable:** AI Coding Agent  
**Status:** 🟢 En progreso
