import React from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
}

const drawerVariants = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
};

const drawerClasses = {
  left: 'fixed inset-y-0 left-0 w-64',
  right: 'fixed inset-y-0 right-0 w-64',
  bottom: 'fixed bottom-0 inset-x-0 h-auto max-h-[80vh]',
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children, position = 'left' }) => {
  const variants = drawerVariants[position];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />
          {/* Drawer */}
          <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className={clsx('fixed z-50 bg-white shadow-lg overflow-y-auto', drawerClasses[position])}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-secondary-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-secondary-900">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 transition-colors hover:bg-secondary-100"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Drawer.displayName = 'Drawer';

export { Drawer };
export type { DrawerProps };
