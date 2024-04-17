import { createContext } from 'react';
import { TransactionPanel } from '../types';

type TransactionContextType = {
  selectedPanel: TransactionPanel | null;
  selectedSendingAccount: number | null;
  selectedReceivingAccount: number | null;
  amount: string;
  reference: string;
  errorAmount: boolean;
  onPanelChange: (panel: TransactionPanel | null) => void;
  onSelectSendingAccount: (id: number | null) => void;
  onSelectReceivingAccount: (id: number | null) => void;
  setAmount: (amount: string) => void;
  setReference: (reference: string) => void;
  reset: () => void;
};

export const TransactionContext = createContext<TransactionContextType>({
  selectedPanel: null,
  selectedSendingAccount: null,
  selectedReceivingAccount: null,
  onPanelChange: () => {},
  onSelectSendingAccount: () => {},
  onSelectReceivingAccount: () => {},
  amount: '',
  setAmount: () => {},
  reference: '',
  setReference: () => {},
  reset: () => {},
  errorAmount: false,
});
