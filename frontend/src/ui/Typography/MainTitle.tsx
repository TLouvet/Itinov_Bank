import { PropsWithChildren } from 'react';

export function MainTitle({ children }: Readonly<PropsWithChildren>) {
  return <h1 className='text-xl sm:text-2xl text-primary font-bold'>{children}</h1>;
}
