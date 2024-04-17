import { useContext } from 'react';
import { TransactionMenuItem } from './TransactionMenuItem';
import { TransactionContext } from '../../context/TransactionContext';
import { PANEL_TYPE } from '../../types';
import clsx from 'clsx';
import { TransactionAmountDetail } from './TransactionAmountDetail';
import { TransactionAccountDetail } from './TransactionAccountDetail';
import { Account } from '@/features/account/account.type';
import { useCurrentTransactionType } from '../../store/useTransactionStore';
import content from '../../content.json';

type TransactionMenuItemsListProps = Readonly<{
  accounts: Account[];
  amountError?: boolean;
}>;

export function TransactionMenuItemsList({
  accounts,

  amountError,
}: TransactionMenuItemsListProps) {
  const transactionType = useCurrentTransactionType();
  const { onPanelChange, selectedPanel, selectedReceivingAccount, selectedSendingAccount } =
    useContext(TransactionContext);
  const active = selectedPanel !== null;

  return (
    <ul role='tablist' className={clsx({ hidden: active }, 'space-y-6 lg:block')}>
      <TransactionMenuItem
        Component={TransactionAmountDetail}
        componentProps={{ error: amountError }}
        onClick={() => onPanelChange(PANEL_TYPE.AMOUNT)}
        title={content.menu.amount}
        selected={selectedPanel === PANEL_TYPE.AMOUNT}
      />

      {transactionType !== 'deposit' && (
        <TransactionMenuItem
          onClick={() => onPanelChange(PANEL_TYPE.SEND)}
          title={content.menu.from}
          componentProps={{
            details: accounts?.find((a) => a.id === selectedSendingAccount),
          }}
          Component={TransactionAccountDetail}
          selected={selectedPanel === PANEL_TYPE.SEND}
        />
      )}
      {transactionType !== 'withdrawal' && (
        <TransactionMenuItem
          Component={TransactionAccountDetail}
          componentProps={{ details: accounts?.find((a) => a.id === selectedReceivingAccount) }}
          onClick={() => onPanelChange(PANEL_TYPE.RECEIVE)}
          title={content.menu.to}
          selected={selectedPanel === PANEL_TYPE.RECEIVE}
        />
      )}
    </ul>
  );
}
