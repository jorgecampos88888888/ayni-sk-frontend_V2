import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onMenuClick?: () => void;
  title?: string;
  rightContent?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, title = 'AYNI-SK', rightContent }) => {
  return (
    <nav className="sticky top-0 z-40 border-b border-secondary-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo/Title */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary-500" />
          <span className="hidden font-bold text-secondary-900 sm:inline">{title}</span>
        </Link>

        {/* Right content */}
        <div className="flex items-center gap-4">
          {rightContent}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden rounded-lg p-2 hover:bg-secondary-100"
              aria-label="Menú"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
export type { NavbarProps };
