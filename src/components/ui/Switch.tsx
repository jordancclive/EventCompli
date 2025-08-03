import React from 'react';
export function Switch({
  id,
  checked,
  onCheckedChange,
  disabled = false
}) {
  return <button id={id} role="switch" aria-checked={checked} disabled={disabled} onClick={() => onCheckedChange(!checked)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${checked ? 'bg-teal-500' : 'bg-gray-200'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
    </button>;
}