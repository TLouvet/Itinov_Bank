import { useMutation } from 'react-query';
import { deposit } from './transaction.service';
import { errorToast, sucessToast } from '@/config/toasts/react-toastify';
import { updateCacheOnDeposit } from './transactions.cache-mutations';
import { DepositMutation } from '../types';

export function useDepositMutation() {
  return useMutation((body: DepositMutation) => deposit(body), {
    onSuccess: (data) => {
      updateCacheOnDeposit(data);
      sucessToast('Dépot effectué avec succès');
    },
    onError: () => {
      errorToast('Dépot échoué');
    },
  });
}
