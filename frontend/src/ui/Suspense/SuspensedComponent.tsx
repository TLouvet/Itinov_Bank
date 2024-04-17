import { PropsWithChildren, Suspense } from 'react';
import { Loading } from '../Loading/Loading';

export function Suspensed({ children }: PropsWithChildren) {
  return <Suspense fallback={<Loading text='Chargement...' />}>{children}</Suspense>;
}
