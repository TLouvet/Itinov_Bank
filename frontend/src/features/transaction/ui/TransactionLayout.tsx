import { PropsWithChildren, useEffect } from 'react';
import { updateCurrentTransactionType } from '../store/useTransactionStore';
import { useLocation } from 'react-router-dom';
import { TransactionType } from '../types';

function useUpdateTransactionTypeOnPageLoad() {
  const location = useLocation();

  /**
   * action reprensent the first part of the url here
   */
  const getTransactionType = (action: string): TransactionType => {
    switch (action) {
      case 'deposit':
        return 'deposit';
      case 'transfer':
        return 'transfer';
      case 'withdraw':
        return 'withdrawal';
      default:
        return '';
    }
  };

  useEffect(() => {
    const action = location.pathname.split('/')[1];
    updateCurrentTransactionType(getTransactionType(action));
  }, []);
}

export function TransactionPageLayout({ children }: Readonly<PropsWithChildren>) {
  useUpdateTransactionTypeOnPageLoad();
  return <div className='flex flex-col gap-x-8 container mx-auto lg:flex-row lg:pe-4 xl:pe-20 '>{children}</div>;
}
