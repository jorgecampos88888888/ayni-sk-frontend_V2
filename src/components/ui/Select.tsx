import React from 'react';
import { clsx } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, ...props }, ref) => (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-medium text-secondary-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={clsx(
          'w-full px-4 py-2 rounded-lg border-2 border-secondary-200 bg-white text-secondary-900 transition-colors focus:border-primary-500 focus:outline-none disabled:bg-secondary-100 disabled:cursor-not-allowed',
          error && 'border-error focus:border-error',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-error">{error}</p>}
      {helperText && !error && <p className="text-sm text-secondary-500">{helperText}</p>}
    </div>
  )
);

Select.displayName = 'Select';

export { Select };
export type { SelectProps };
