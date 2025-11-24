import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'Auth - AYNI-SK',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-50">
        <main className="w-full max-w-md p-6">{children}</main>
      </body>
    </html>
  );
}
