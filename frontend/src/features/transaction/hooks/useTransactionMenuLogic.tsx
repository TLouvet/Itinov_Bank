import { useAccountsQuery } from '@/features/account/useCase/useAccountsQuery';
import { useTransactionContext } from './useTransactionContext';
import { useTransactionMutations } from './useTransactionMutations';
import { useCurrentTransactionType } from '../store/useTransactionStore';

export function useTransactionMenuLogic() {
  const { data: accounts = [] } = useAccountsQuery();
  const { onMutationValidation } = useTransactionMutations();
  const transactionType = useCurrentTransactionType();
  const { selectedReceivingAccount, selectedSendingAccount, amount, reference, selectedPanel, errorAmount } =
    useTransactionContext();

  const selectedAccount = accounts.find((account) => account.id === selectedSendingAccount);
  const isGoingOverDraft =
    (transactionType === 'withdrawal' || transactionType === 'transfer') &&
    selectedAccount &&
    selectedAccount.balance + selectedAccount.maxOverdraft < +amount;

  const amountError = errorAmount || isGoingOverDraft;

  function showBtn() {
    const commonCondition = !amountError && !!amount && !!reference;
    switch (transactionType) {
      case 'deposit':
        return commonCondition && !!selectedReceivingAccount;
      case 'withdrawal':
        return commonCondition && !!selectedSendingAccount;
      case 'transfer':
        return commonCondition && !!selectedSendingAccount && !!selectedReceivingAccount;
    }
  }

  const onSubmit = () => onMutationValidation(selectedSendingAccount, selectedReceivingAccount, amount, reference);

  return {
    showBtn,
    onSubmit,
    amountError,
    selectedPanel,
  };
}
