import { PropsWithChildren, useMemo, useState } from 'react';
import { TransactionPanel } from '../types';
import { TransactionContext } from './TransactionContext';

export function TransactionProvider({ children }: PropsWithChildren) {
  const [selectedPanel, setSelectedPanel] = useState<TransactionPanel | null>(null);
  const [selectedSendingAccount, setSelectedSendingAccount] = useState<number | null>(null);
  const [selectedReceivingAccount, setSelectedReceivingAccount] = useState<number | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [reference, setReference] = useState('');

  const errorAmount = !!amount && (+amount < 1 || +amount > 10000);

  function onPanelChange(panel: TransactionPanel | null) {
    setSelectedPanel(panel);
  }

  function onSelectSendingAccount(id: number | null) {
    setSelectedSendingAccount(id);
    setSelectedPanel(null);
  }

  function onSelectReceivingAccount(id: number | null) {
    setSelectedReceivingAccount(id);
    setSelectedPanel(null);
  }

  function reset() {
    setSelectedPanel(null);
    setSelectedSendingAccount(null);
    setSelectedReceivingAccount(null);
    setAmount('');
    setReference('');
  }

  const initialValues = useMemo(
    () => ({
      selectedPanel,
      selectedSendingAccount,
      selectedReceivingAccount,
      amount,
      reference,
      errorAmount,
      onPanelChange,
      setAmount,
      setReference,
      onSelectSendingAccount,
      onSelectReceivingAccount,
      reset,
    }),
    [selectedPanel, selectedSendingAccount, selectedReceivingAccount, amount, reference, errorAmount]
  );

  return <TransactionContext.Provider value={initialValues}>{children}</TransactionContext.Provider>;
}
