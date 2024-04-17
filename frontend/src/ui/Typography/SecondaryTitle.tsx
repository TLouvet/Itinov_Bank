import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type SecondaryTitleProps = PropsWithChildren<{
  className?: string;
}>;

export function SecondaryTitle({ children, className }: Readonly<SecondaryTitleProps>) {
  return <h2 className={clsx('text-xl text-secondary font-bold', className)}>{children}</h2>;
}
