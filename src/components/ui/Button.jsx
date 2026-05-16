import { forwardRef } from 'react';

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-light shadow-sm hover:shadow-md',
  secondary: 'bg-transparent border border-brand text-brand hover:bg-brand hover:text-white',
  accent: 'bg-accent text-white hover:bg-accent-dark shadow-sm hover:shadow-md',
  ghost: 'bg-transparent text-gray-700 hover:bg-stone',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  icon: 'p-2.5',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide
          transition-all duration-300 active:scale-95 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
