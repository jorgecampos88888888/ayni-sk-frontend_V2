import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Drawer } from '@/components/ui';
import { SidebarItem } from './Sidebar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, items }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const renderItems = (menuItems: SidebarItem[]) => {
    return (
      <ul className="space-y-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link
                href={item.href}
                onClick={onClose}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className="w-full text-left rounded-lg px-4 py-3 text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </button>
                {item.children && expandedItems.includes(item.label) && (
                  <div className="mt-1 ml-4 space-y-1 border-l-2 border-primary-200 pl-2">
                    {renderItems(item.children)}
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="left" title="Menú">
      {renderItems(items)}
    </Drawer>
  );
};

export { MobileMenu };
export type { MobileMenuProps };
