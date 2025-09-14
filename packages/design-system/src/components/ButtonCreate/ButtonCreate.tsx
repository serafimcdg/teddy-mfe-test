import * as React from 'react';
import clsx from 'clsx';

export type ButtonCreateProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
};

export default function ButtonCreate({ children = 'Criar cliente', onClick, className, disabled }: ButtonCreateProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-full py-2 px-4 border border-orange-500 rounded bg-white text-orange-500 font-semibold text-base transition hover:bg-orange-500 hover:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
