import { TransactionAccountList } from './TransactionAccountList';
import { TransactionAmountSelection } from './TransactionAmountSelection';
import { TransactionActionPanel } from './TransactionActionPanel';
import { PANEL_TYPE } from '../../types';
import { Account } from '@/features/account/account.type';
import { useTransactionContext } from '../../hooks/useTransactionContext';
import content from '../../content.json';
import { ReturnToPrevious } from '@/ui/Button/ReturnToPrevious';

type TransactionPanelFactoryProps = Readonly<{
  accounts: Account[];
}>;

export function TransactionPanelFactory({ accounts }: TransactionPanelFactoryProps) {
  const {
    selectedPanel,
    onPanelChange,
    selectedReceivingAccount,
    selectedSendingAccount,
    onSelectReceivingAccount,
    onSelectSendingAccount,
  } = useTransactionContext();

  return (
    <section className='lg:flex-1 lg:w-4/12'>
      <ReturnToPrevious hidden={!selectedPanel} text={content.goBack} onClick={() => onPanelChange(null)} />
      {selectedPanel === PANEL_TYPE.AMOUNT && (
        <TransactionActionPanel
          title={content.menu.amount}
          Component={TransactionAmountSelection}
          componentProps={{}}
        />
      )}
      {selectedPanel === PANEL_TYPE.SEND && (
        <TransactionActionPanel
          title={content.menu.from}
          Component={TransactionAccountList}
          componentProps={{
            onClick: onSelectSendingAccount,
            accounts: accounts,
            selectedID: selectedSendingAccount,
          }}
        />
      )}
      {selectedPanel === PANEL_TYPE.RECEIVE && (
        <TransactionActionPanel
          title={content.menu.to}
          Component={TransactionAccountList}
          componentProps={{
            onClick: onSelectReceivingAccount,
            accounts: accounts,
            selectedID: selectedReceivingAccount,
          }}
        />
      )}
    </section>
  );
}
