import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', ...props }, ref) => (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-medium text-secondary-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={clsx(
          'w-full px-4 py-2 rounded-lg border-2 border-secondary-200 bg-white text-secondary-900 placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none disabled:bg-secondary-100 disabled:cursor-not-allowed',
          error && 'border-error focus:border-error',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
      {helperText && !error && <p className="text-sm text-secondary-500">{helperText}</p>}
    </div>
  )
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
