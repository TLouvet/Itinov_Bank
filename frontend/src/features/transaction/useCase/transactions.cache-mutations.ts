import { queryClient } from '@/config/react-query';
import { Account } from '@/features/account/account.type';
import { DepositMutation, TransferMutation, WithdrawMutation } from '../types';
import { statisticsKeys } from '@/features/statistics/useCase/statistics.keys';
import { accountQueryKeys } from '@/features/account/useCase/account.keys';

export function updateCacheOnDeposit(data: DepositMutation) {
  queryClient.setQueriesData(accountQueryKeys.accounts, (old?: Account[]) =>
    (old || []).map((account) => onDeposit(account, data))
  );
  queryClient.invalidateQueries(statisticsKeys.statistics(data.accountID));
  queryClient.invalidateQueries(accountQueryKeys.account(data.accountID));
}

export function updateCacheOnWithdraw(data: WithdrawMutation) {
  queryClient.setQueriesData(accountQueryKeys.accounts, (old?: Account[]) =>
    (old || []).map((account) => onWithdraw(account, data))
  );
  queryClient.invalidateQueries(statisticsKeys.statistics(data.accountID));
  queryClient.invalidateQueries(accountQueryKeys.account(data.accountID));
}

export function updateCacheOnTransfer(data: TransferMutation) {
  queryClient.setQueriesData(accountQueryKeys.accounts, (old?: Account[]) =>
    (old || []).map((account) => onTransfer(account, data))
  );
  queryClient.invalidateQueries(statisticsKeys.statistics(data.senderID));
  queryClient.invalidateQueries(statisticsKeys.statistics(data.receiverID));
  queryClient.invalidateQueries(accountQueryKeys.account(data.senderID));
  queryClient.invalidateQueries(accountQueryKeys.account(data.receiverID));
}

function onDeposit(account: Account, data: DepositMutation) {
  if (!isAccountToUpdate(account.id, data.accountID)) {
    return account;
  }

  return {
    ...account,
    balance: account.balance + data.amount,
  };
}

function onWithdraw(account: Account, data: WithdrawMutation) {
  if (!isAccountToUpdate(account.id, data.accountID)) {
    return account;
  }

  return {
    ...account,
    balance: account.balance - data.amount,
  };
}

function onTransfer(account: Account, data: TransferMutation) {
  if (isAccountToUpdate(account.id, data.senderID)) {
    return {
      ...account,
      balance: account.balance - data.amount,
    };
  }

  if (isAccountToUpdate(account.id, data.receiverID)) {
    return {
      ...account,
      balance: account.balance + data.amount,
    };
  }

  return account;
}

function isAccountToUpdate(accountID: number, dataAccountID: number) {
  return accountID === dataAccountID;
}
