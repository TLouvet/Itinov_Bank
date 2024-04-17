import { Layout } from '@/ui/Layout/Layout';
import { SecondaryTitle } from '@/ui/Typography/SecondaryTitle';
import { DetailedOperation } from '../components/DetailedOperation';
import { Select } from '@/ui/form/Select';
import { AccountInfo } from '../components/AccountInfo';
import { AccountHistory } from '../components/AccountHistory';
import { StatisticsChart } from '@/features/statistics/components/StatisticsChart';
import { useSingleAccountPageLogic } from '../hooks/useSingleAccountPageLogic';

export default function SingleAccountPage() {
  const {
    accountID,
    accounts,
    account,
    history,
    selectedTransaction,
    selectAccountOptions,
    onUpdateCurrentAccount,
    onUpdateSelectedTransactionID,
  } = useSingleAccountPageLogic();

  return (
    <Layout pageTitle='Historique de compte'>
      <div className='max-w-80 mb-4'>
        <Select
          label='Sélectionnez un compte'
          value={accountID ?? accounts[0]?.id ?? ''}
          onChange={(e) => onUpdateCurrentAccount(Number(e.target.value))}
          options={selectAccountOptions}
        />
      </div>
      <StatisticsChart data={history} />
      {account && <AccountInfo account={account} />}
      <section className='mb-4'>
        <SecondaryTitle className='mb-4'>Historique des transactions</SecondaryTitle>
        <div className='lg:flex gap-x-10'>
          <AccountHistory transactions={account?.transactions} onClick={(id) => onUpdateSelectedTransactionID(id)} />
          {selectedTransaction && (
            <DetailedOperation
              amount={selectedTransaction.amount}
              date={selectedTransaction.date}
              description={selectedTransaction.description}
              onClose={() => onUpdateSelectedTransactionID(null)}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}
