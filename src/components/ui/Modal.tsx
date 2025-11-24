import React from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-lg',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
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
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={clsx(
              'fixed inset-0 z-50 flex items-center justify-center p-4',
              'pointer-events-none'
            )}
          >
            <div
              className={clsx(
                'pointer-events-auto rounded-lg bg-white shadow-lg max-h-[90vh] overflow-y-auto',
                sizeClasses[size]
              )}
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
              <div className="px-6 py-4">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = 'Modal';

export { Modal };
export type { ModalProps };
