import { create } from 'zustand';

interface AccountStore {
  currentAccountID: number | null;
  currentTransactionID: number | null;
}

export const useAccountStore = create<AccountStore>(() => ({
  currentAccountID: null,
  currentTransactionID: null,
}));

export const useCurrentAccountID = () => useAccountStore((state) => state.currentAccountID);
export const updateCurrentAccount = (id: number) => useAccountStore.setState({ currentAccountID: id });

export const useCurrentTransactionID = () => useAccountStore((state) => state.currentTransactionID);
export const updateSelectedTransactionID = (id: number | null) =>
  useAccountStore.setState({ currentTransactionID: id });
