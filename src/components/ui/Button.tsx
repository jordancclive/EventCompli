import React from 'react';
export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] flex items-center justify-center box-border';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent',
    accent: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400 border border-transparent', 
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 border border-transparent'
  };
  return <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>;
}