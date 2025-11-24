This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Despliegue (rápido)

Pasos para un despliegue ordenado y reproducible:

1. Variables de entorno clave
	- `NEXT_PUBLIC_API_BASE_URL` → URL base del backend (si aplica).
	- `NODE_ENV=production` en entorno de producción (normalmente Vercel lo gestiona).

2. Preparar assets PWA
	- Añadir iconos en `public/icons/`: `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`.
	- `public/manifest.json` ya existe; reemplaza iconos por imágenes definitivas.

3. Build y verificación local
	- Instalar dependencias (si no están):

```bash
npm install
```

	- Ejecutar desarrollo:

```bash
npm run dev
```

	- Ejecutar build para verificar errores de compilación:

```bash
npm run build
```

4. Despliegue en Vercel (recomendado)
	- Importar repo en Vercel, configurar `NEXT_PUBLIC_API_BASE_URL` en Settings → Environment Variables.
	- Vercel detecta `next` y usará `npm run build` y `npm run start` automáticamente.

5. Checks post-deploy
	- Revisar consola de errores en Vercel.
	- Verificar PWA: abrir `https://TU_APP/manifest.json` y comprobar que los iconos existen.
	- Probar rutas protegidas y autenticación (si aplica) con la variable `NEXT_PUBLIC_API_BASE_URL` apuntando a staging.

Notas:
- `src/lib/api.ts` usa `NEXT_PUBLIC_API_BASE_URL` si está definido; en su ausencia, el cliente devuelve mocks vacíos para permitir desarrollo sin backend.
- Reemplaza icons en `public/icons/` antes del despliegue para evitar avisos 404 en la consola.

