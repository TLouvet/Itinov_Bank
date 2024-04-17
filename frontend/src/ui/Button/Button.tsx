import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type ButtonProps = Readonly<PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={clsx('bg-primary text-white px-4 py-2 rounded-lg mb-2', props.className ?? '')}>
      {children}
    </button>
  );
}
