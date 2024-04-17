import { useMutation } from 'react-query';
import { withdraw } from './transaction.service';
import { errorToast, sucessToast } from '@/config/toasts/react-toastify';
import { updateCacheOnWithdraw } from './transactions.cache-mutations';
import { WithdrawMutation } from '../types';

export function useWithdrawMutation() {
  return useMutation((data: WithdrawMutation) => withdraw(data), {
    onSuccess: (data) => {
      updateCacheOnWithdraw(data);
      sucessToast('Retrait effectué avec succès');
    },
    onError: () => {
      errorToast('Retrait échoué');
    },
  });
}
