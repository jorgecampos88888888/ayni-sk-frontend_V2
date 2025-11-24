# 🚀 Guía de Despliegue Local - AYNI-SK Frontend

## Requisitos Previos

- **Node.js 20.x o superior** → [Descargar](https://nodejs.org/)
- **Git** → [Descargar](https://git-scm.com/)
- **Terminal / CMD / PowerShell**

Verificar que están instalados:
```bash
node --version    # Debe mostrar v20.x.x o superior
npm --version     # Debe mostrar 10.x.x o superior
git --version     # Debe mostrar git version 2.x.x o superior
```

---

## Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/jorgecampos88888888/ayni-sk-frontend_V2.git
cd ayni-sk-frontend_V2
```

---

## Paso 2: Instalar Dependencias

```bash
npm install
```

Esto descargará e instalará todos los paquetes necesarios (~5-10 minutos dependiendo de tu conexión).

---

## Paso 3: Copiar Variables de Entorno (Opcional)

```bash
cp .env.example .env.local
```

Si no existe `.env.example`, crea `.env.local` manualmente con:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

---

## Paso 4: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

**Salida esperada:**
```
   ▲ Next.js 16.0.3 (Turbopack)
   - Local:         http://localhost:3000
   - Network:       http://192.168.x.x:3000

 ✓ Starting...
 ✓ Ready in XXXms
```

---

## Paso 5: Abrir en el Navegador

Abre en tu navegador:
- **http://localhost:3000** ← Recomendado

---

## 🔐 Credenciales de Acceso (Mock Auth - Desarrollo)

La app usa autenticación mock. Puedes usar:

```
Email:    user@example.com
Password: password123
```

O cualquier email/password (la auth es mock — acepta cualquier combinación).

---

## 📝 Flujo de Uso

### 1. Página de Inicio
- Verás la landing page de bienvenida
- Botones "Ingresar" y "Registrarse"

### 2. Ingresar / Registrarse
- **Login:** usa credenciales arriba
- **Registro:** completa nombre, email, password
- Click en "Ingresar" o "Registrarse"

### 3. Dashboard (después de login)
- Verás: stats de proyectos, usuarios, tasa de éxito, alertas
- Panel de actividad reciente
- Sidebar con navegación

### 4. Gestión (CRUD Items)
- Click en "Gestión" en el sidebar
- Verás tabla de items AYNI
- Botones: **Crear**, **Editar**, **Eliminar**, **Ver**
- Los datos persisten en localStorage

### 5. Perfil
- Click en "Perfil" en el sidebar
- Editar nombre de usuario
- Ver email (read-only)

### 6. Cerrar Sesión
- Click en tu nombre en la navbar → "Logout"

---

## 🛠 Comandos Útiles

```bash
# Desarrollo (hot reload, cambios en vivo)
npm run dev

# Build optimizado para producción
npm run build

# Iniciar servidor de producción (después de build)
npm run start

# Validar código con linter
npm run lint

# Limpiar cache (si hay problemas)
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

---

## 🚨 Solución de Problemas

### "Puerto 3000 ya está en uso"
```bash
# Cambia el puerto:
npm run dev -- -p 3001
# Luego accede a http://localhost:3001
```

### "Module not found" o errores de dependencias
```bash
npm ci  # Install exact versions
npm run dev
```

### "Build falla con TypeScript errors"
```bash
npx tsc --noEmit  # Ver errores detallados
```

### "Cambios no persisten en el perfil/gestión"
- Abre DevTools (F12) → Application → Storage → Local Storage
- Verifica que haya items con claves `auth-store` y `gestion-store`
- Si está lleno, limpia: `localStorage.clear()` en la consola

### "La app se ve fea / estilos no cargan"
```bash
# Reinicia el servidor
npm run dev

# Si persiste:
rm -rf .next
npm run dev
```

---

## 📱 PWA (Instalar como App)

1. Abri en **Chrome, Edge o navegador basado en Chromium**
2. En la barra de direcciones verás: **"Instalar AYNI-SK"** o en el menú ⋮ → "Instalar aplicación"
3. Click para instalar
4. La app aparecerá en tu escritorio/inicio
5. Funciona offline (Service Worker en cache)

---

## 🔗 Conectar a Backend Real

Cuando tengas un backend en producción, actualiza:

**En `.env.local`:**
```bash
NEXT_PUBLIC_API_BASE_URL=https://tu-backend.com/api
```

**O edita en `src/lib/api.ts`:**
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://tu-backend.com/api';
```

Los endpoints esperados:
- `POST /auth/login` → autenticación
- `POST /auth/register` → registro
- `GET /gestion` → listar items
- `POST /gestion` → crear item
- `PUT /gestion/:id` → editar item
- `DELETE /gestion/:id` → eliminar item
- `GET /user/profile` → perfil del usuario

---

## 📚 Documentación Adicional

- **Arquitectura:** ver `PLAN_IMPLEMENTACION_AYNI_SK.md`
- **FASE 4 (Estado & API):** ver `FASE_4_PLAN.md`
- **FASE 5 (PWA & Deploy):** ver `FASE_5_DEPLOYMENT.md`
- **Guía para AI agents:** ver `.github/copilot-instructions.md`

---

## ✅ Checklist de Deploy Local

- [ ] Node.js 20+ instalado
- [ ] Clonar repo
- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Abrir http://localhost:3000
- [ ] Ingresar con `user@example.com` / `password123`
- [ ] Probar Dashboard, Gestión, Perfil
- [ ] (Opcional) Instalar como PWA

---

## 🎯 Próximos Pasos

1. **Desarrollo local:** usa `npm run dev` para cambios en vivo
2. **Preparar para producción:**
   ```bash
   npm run build    # Generar .next optimizado
   npm run start    # Iniciar server de producción
   ```
3. **Deploy a Vercel (recomendado):**
   - Push a tu rama `main`
   - Vercel despliega automáticamente
   - Ver: https://vercel.com/docs/frameworks/nextjs

---

## 📞 Soporte

Si hay errores o problemas:
1. Revisa logs de la terminal
2. Abre DevTools (F12) en el navegador → Console para ver errores
3. Intenta `npm run lint` para validar código
4. Limpia cache: `rm -rf .next && npm run dev`

¡Listo! Ya tienes AYNI-SK corriendo localmente. 🚀
