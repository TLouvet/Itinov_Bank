import { PropsWithChildren } from 'react';
import { Navbar } from '../../router/components/NavBar';
import { MainTitle } from '../Typography/MainTitle';

type Props = {
  isLoading?: boolean;
  pageTitle: string;
};

export function Layout({ children, isLoading = false, pageTitle }: Readonly<PropsWithChildren<Props>>) {
  return (
    <main className='flex min-h-screen max-w-full'>
      <Navbar />
      <div className='flex-1 w-8/12'>
        <div className='p-4 shadow-lg mb-8'>
          <MainTitle>{pageTitle}</MainTitle>
        </div>
        <section className='px-4'>{isLoading ? <p>Loading...</p> : children}</section>
      </div>
    </main>
  );
}
