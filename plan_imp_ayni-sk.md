# 🚀 Plan de Implementación de Interfaz: Proyecto AYNI-SK

**Versión del Documento:** 1.0
**Stack Tecnológico:** React, Next.js 14 (App Router), TypeScript, Tailwind CSS.
**Objetivo:** Desarrollo de interfaz unificada para Web y Mobile (Responsive Design / PWA).

---

## 1. Arquitectura y Estrategia Técnica

Para cumplir con el requerimiento de despliegue dual (Web y Móvil) utilizando una sola base de código, utilizaremos una estrategia **Mobile-First** con capacidades de **PWA (Progressive Web App)**.

* **Framework:** Next.js 14+ (App Router).
* **Estilos:** Tailwind CSS (para manejo fluido de breakpoints móviles/desktop).
* **Componentes UI:** Shadcn/UI (o Radix UI) para accesibilidad y rapidez.
* **Iconografía:** Lucide React.
* **State Management:** Zustand (ligero y efectivo) o React Context.
* **Mobile Experience:** Configuración de Manifest.json y Viewport para sensación nativa.

---

## 2. Estructura del Repositorio

A continuación se presenta la estructura de carpetas optimizada para escalabilidad y separación de lógica/vista.

```text
ayni-sk-frontend/
├── public/
│   ├── assets/              # Imágenes estáticas, logos
│   ├── manifest.json        # Configuración PWA
│   └── icons/               # Iconos para homescreen móvil
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Grupo de rutas de autenticación (Login, Register)
│   │   ├── (dashboard)/     # Grupo de rutas protegidas (Panel principal)
│   │   │   ├── layout.tsx   # Layout persistente (Sidebar/Nav)
│   │   │   └── page.tsx     # Vista principal Dashboard
│   │   ├── layout.tsx       # Root Layout (Fuentes, Metadata)
│   │   └── page.tsx         # Landing page / Home
│   ├── components/
│   │   ├── ui/              # Componentes base (Botones, Inputs, Cards)
│   │   ├── layout/          # Estructuras (Navbar, Sidebar, MobileMenu)
│   │   ├── features/        # Componentes específicos del negocio AYNI
│   │   └── shared/          # Componentes reutilizables globales
│   ├── hooks/               # Custom Hooks (useMobile, useAuth)
│   ├── lib/                 # Utilidades (axios instance, validaciones, utils)
│   ├── styles/              # Estilos globales adicionales
│   ├── types/               # Definiciones TypeScript
│   └── store/               # Manejo de estado global (Zustand)
├── tailwind.config.ts       # Configuración de temas y breakpoints
├── next.config.mjs          # Configuración de Next.js
└── tsconfig.json
3. Fases de Implementación
La ejecución se divide en 5 fases estratégicas para asegurar calidad y adaptabilidad.

📅 Fase 1: Fundación y Configuración del Entorno
Objetivo: Establecer las bases del proyecto y herramientas de desarrollo.

Inicialización:

Crear proyecto: npx create-next-app@latest ayni-sk --typescript --tailwind --eslint.

Configuración de ESLint y Prettier para consistencia de código.

Configuración de Estilos (Tailwind):

Definir la paleta de colores "AYNI" en tailwind.config.ts.

Configurar tipografía base.

Arquitectura de Carpetas:

Crear la estructura de directorios definida anteriormente.

Instalación de Librerías Core:

clsx, tailwind-merge (para manejo dinámico de clases).

lucide-react (iconos).

framer-motion (animaciones para menús móviles).

🎨 Fase 2: Sistema de Diseño y Componentes Atómicos
Objetivo: Crear los bloques de construcción visuales (UI Kit).

Componentes Base (Atomic UI):

Desarrollar botones (Primary, Secondary, Ghost).

Inputs de texto, Selects y Checkboxes.

Cards (Tarjetas contenedoras para info).

Modales y Drawers (Esenciales para la experiencia móvil).

Layouts Responsivos:

Navbar: Header superior adaptable.

Sidebar: Barra lateral para Desktop (colapsable).

Bottom Navigation: Barra inferior de navegación exclusiva para Móvil (estilo App nativa).

Configuración de Tema:

Implementar soporte para Dark Mode/Light Mode (opcional pero recomendado).

📱 Fase 3: Desarrollo de Vistas Core (Web & Mobile)
Objetivo: Implementar las pantallas principales según el flujo del usuario.

Módulo de Autenticación:

Login y Registro (Diseño centrado, inputs grandes para touch).

Recuperación de contraseña.

Dashboard / Home:

Vista resumen con Widgets (Grid responsive: 1 columna en móvil, 3 en desktop).

Imagen de Responsive Dashboard Grid Layout
Shutterstock
Vistas de Gestión (Entidades del proyecto AYNI):

Listados de datos (Tablas para Desktop, Cards tipo lista para Móvil).

Formularios de creación/edición.

Detalle de items.

Perfil y Ajustes:

Gestión de cuenta de usuario.

🔗 Fase 4: Lógica, Estado e Integración
Objetivo: Dar vida a la interfaz con datos y lógica de negocio.

Manejo de Estado (Zustand):

Crear stores para: useUIStore (sidebar open/close), useAuthStore (usuario logueado).

Hooks Personalizados:

useMediaQuery: Para detectar si es móvil o desktop y renderizar componentes condicionales.

Mock Data / API Integration:

Conectar los componentes a datos reales o simulados.

Manejo de estados de carga (Skeletons) para mejorar la percepción de velocidad.

Navegación:

Configurar enlaces y transiciones suaves entre páginas.

🚀 Fase 5: Optimización Móvil, PWA y Despliegue
Objetivo: Asegurar que la app se sienta como una aplicación nativa en celulares.

Configuración PWA (Progressive Web App):

Generar manifest.json (Nombre, colores, iconos).

Configurar viewport para evitar zoom innecesario en inputs.

Añadir iconos para iOS (Apple Touch Icon).

Optimización de Rendimiento:

Optimización de imágenes (next/image).

Lazy loading de componentes pesados.

Testing Básico:

Pruebas de responsividad en Chrome DevTools (iPhone SE, Pixel 7, Desktop 1080p).

Despliegue:

Configuración de CI/CD.

Despliegue en Vercel (Recomendado para Next.js).

4. Checklist de Entregables
[ ] Repositorio en GitHub/GitLab estructurado.

[ ] UI Kit implementado (Botones, Inputs, Layouts).

[ ] Vistas totalmente responsivas (Mobile/Tablet/Desktop).

[ ] Puntuación Lighthouse > 90 en Performance y Accesibilidad.

[ ] URL de producción funcional.
