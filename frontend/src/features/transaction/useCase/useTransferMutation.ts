import { useMutation } from 'react-query';
import { transfer } from './transaction.service';
import { errorToast, sucessToast } from '@/config/toasts/react-toastify';
import { updateCacheOnTransfer } from './transactions.cache-mutations';
import { TransferMutation } from '../types';

export function useTransferMutation() {
  return useMutation((data: TransferMutation) => transfer(data), {
    onSuccess: (data) => {
      updateCacheOnTransfer(data);
      sucessToast('Virement effectué avec succès');
    },
    onError: () => {
      errorToast('Virment échoué');
    },
  });
}
