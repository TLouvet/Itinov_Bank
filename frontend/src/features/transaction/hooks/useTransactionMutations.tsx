import { useCurrentTransactionType } from '../store/useTransactionStore';
import { useDepositMutation } from '../useCase/useDepositMutation';
import { useTransferMutation } from '../useCase/useTransferMutation';
import { useWithdrawMutation } from '../useCase/useWithdrawMutation';
import { useTransactionContext } from './useTransactionContext';

export function useTransactionMutations() {
  const { reset } = useTransactionContext();
  const transactionType = useCurrentTransactionType();
  const withdrawMutation = useWithdrawMutation();
  const depositMutation = useDepositMutation();
  const transferMutation = useTransferMutation();

  function onMutationValidation(senderID: number | null, receiverID: number | null, amount: string, reference: string) {
    switch (transactionType) {
      case 'withdrawal':
        return handleWithdraw(senderID, amount, reference);
      case 'deposit':
        return handleDeposit(receiverID, amount, reference);
      case 'transfer':
        return onTransfer(senderID, receiverID, amount, reference);
      default:
        return () => null;
    }
  }

  function handleWithdraw(accountID: number | null, amount: string, reference: string) {
    if (!accountID) return;

    withdrawMutation.mutate({
      amount: +amount,
      accountID,
      reference,
    });

    reset();
  }

  function handleDeposit(accountID: number | null, amount: string, reference: string) {
    if (!accountID) return;

    depositMutation.mutate({
      amount: +amount,
      accountID,
      reference,
    });

    reset();
  }

  function onTransfer(senderID: number | null, receiverID: number | null, amount: string, reference: string) {
    if (!senderID || !receiverID) return;

    transferMutation.mutate({
      amount: +amount,
      senderID,
      receiverID,
      reference,
    });

    reset();
  }

  return {
    onMutationValidation,
  };
}
