import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface BottomNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface BottomNavigationProps {
  items: BottomNavItem[];
  activeHref?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ items, activeHref }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-secondary-200 bg-white lg:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary-600'
                  : 'text-secondary-600 hover:text-secondary-900'
              )}
            >
              <span className="h-6 w-6">{item.icon}</span>
              <span className="text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export { BottomNavigation };
export type { BottomNavigationProps, BottomNavItem };
