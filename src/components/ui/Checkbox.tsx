import React from 'react';
import { clsx } from 'clsx';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        className={clsx(
          'h-4 w-4 rounded border-2 border-secondary-300 bg-white text-primary-500 accent-primary-500 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 disabled:bg-secondary-100 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      {label && (
        <label className="text-sm font-medium text-secondary-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };
