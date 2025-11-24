import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ServiceWorkerRegister, PerformanceMonitor } from "@/components/layout";
import { ErrorBoundary } from "@/components/auth/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AYNI-SK",
  description: "Plataforma integral para gestión de proyectos AYNI",
  authors: [{ name: "Jorge Campos", url: "https://atinanka.com" }],
  creator: "ATINANKA",
  keywords: ["AYNI", "Gestión", "Proyecto", "Plataforma"],
  applicationName: "AYNI-SK",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AYNI-SK",
  },
  openGraph: {
    title: "AYNI-SK",
    description: "Plataforma integral para gestión de proyectos AYNI",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#22c55e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
          <ServiceWorkerRegister />
          <PerformanceMonitor />
        </ErrorBoundary>
      </body>
    </html>
  );
}