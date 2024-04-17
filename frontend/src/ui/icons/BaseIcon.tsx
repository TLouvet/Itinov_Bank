import { PropsWithChildren } from 'react';

export function BaseIcon({ children, ...props }: PropsWithChildren<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' focusable={false} aria-hidden={true} {...props}>
      {children}
    </svg>
  );
}
