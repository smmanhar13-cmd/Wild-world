import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-3 border rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand/20
          ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-stone focus:border-brand'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
