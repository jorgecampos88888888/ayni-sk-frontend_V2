import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen = true, onClose, isCollapsed = false }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const renderItems = (menuItems: SidebarItem[], depth = 0) => {
    return (
      <ul className="space-y-1">
        {menuItems.map((item, index) => (
          <li key={`${depth}-${index}`}>
            {item.href ? (
              <Link
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  'text-secondary-700 hover:bg-primary-50 hover:text-primary-600',
                  depth > 0 && 'ml-4'
                )}
              >
                {item.icon && <span className="h-5 w-5">{item.icon}</span>}
                {!isCollapsed && item.label}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={clsx(
                    'flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    'text-secondary-700 hover:bg-primary-50 hover:text-primary-600'
                  )}
                >
                  {item.icon && <span className="h-5 w-5">{item.icon}</span>}
                  {!isCollapsed && item.label}
                  {item.children && !isCollapsed && (
                    <ChevronDown
                      size={16}
                      className={clsx(
                        'ml-auto transition-transform',
                        expandedItems.includes(item.label) && 'rotate-180'
                      )}
                    />
                  )}
                </button>
                {item.children && expandedItems.includes(item.label) && !isCollapsed && (
                  <div className="mt-1 ml-2 border-l-2 border-primary-200 pl-2">
                    {renderItems(item.children, depth + 1)}
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
    <aside
      className={clsx(
        'border-r border-secondary-200 bg-white transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
        'hidden h-screen overflow-y-auto lg:block'
      )}
    >
      <div className="space-y-6 p-4">
        {/* Sidebar content */}
        <nav className="space-y-2">{renderItems(items)}</nav>
      </div>
    </aside>
  );
};

export { Sidebar };
export type { SidebarProps, SidebarItem };
