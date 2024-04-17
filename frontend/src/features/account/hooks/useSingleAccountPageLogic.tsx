import { useStatisticsQuery } from '@/features/statistics/useCase/useStatisticsQuery';
import { useCurrentAccountID, useCurrentTransactionID } from '../store/useAccountStore';
import { useAccountsQuery } from '../useCase/useAccountsQuery';
import { useSingleAccountQuery } from '../useCase/useSingleAccountQuery';
import { updateCurrentAccount, updateSelectedTransactionID } from '../store/useAccountStore';

export function useSingleAccountPageLogic() {
  const accountID = useCurrentAccountID();
  const { data: accounts = [] } = useAccountsQuery();
  const { data: account } = useSingleAccountQuery(accountID ?? accounts[0]?.id);
  const { data: history = [] } = useStatisticsQuery(accountID ?? accounts[0]?.id);
  const selectedTransactionID = useCurrentTransactionID();

  const selectedTransaction = account?.transactions?.find(
    (transaction) => transaction.transaction_id === selectedTransactionID
  );

  const selectAccountOptions = accounts.map((account) => ({
    label: `${account.reference} - ${account.type}`,
    value: account.id,
  }));

  const onUpdateCurrentAccount = (id: number) => updateCurrentAccount(id);
  const onUpdateSelectedTransactionID = (id: number | null) => updateSelectedTransactionID(id);

  return {
    accountID,
    accounts,
    account,
    history,
    selectedTransaction,
    onUpdateCurrentAccount,
    onUpdateSelectedTransactionID,
    selectAccountOptions,
  };
}
