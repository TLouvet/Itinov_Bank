import { create } from 'zustand';
import { TransactionType } from '../types';

interface TransactionStore {
  transactionType: TransactionType;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactionType: '',
  reset: () => set({ transactionType: '' }),
}));

export const useCurrentTransactionType = () => useTransactionStore((state) => state.transactionType);
export const updateCurrentTransactionType = (type: TransactionType) =>
  useTransactionStore.setState({ transactionType: type });
