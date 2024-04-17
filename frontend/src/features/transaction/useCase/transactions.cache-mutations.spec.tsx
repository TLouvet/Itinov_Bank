import { describe, it, expect, beforeEach } from 'vitest';
import { updateCacheOnTransfer, updateCacheOnDeposit, updateCacheOnWithdraw } from './transactions.cache-mutations';
import { queryClient } from '@/config/react-query';

describe('transactions.cache-mutations', () => {
  beforeEach(() => {
    queryClient.setQueryData('accounts', () => [
      { id: 1, balance: 100, ref: 'test' },
      { id: 2, balance: 200, ref: 'test' },
    ]);
  });

  it('should update cache on deposit', () => {
    const data = { accountID: 1, amount: 50, reference: 'test' };
    updateCacheOnDeposit(data);
    expect(queryClient.getQueryData('accounts')).toEqual([
      { id: 1, balance: 150, ref: 'test' },
      { id: 2, balance: 200, ref: 'test' },
    ]);
  });

  it('should update cache on withdraw', () => {
    const data = { accountID: 1, amount: 50, reference: 'test' };
    updateCacheOnWithdraw(data);
    expect(queryClient.getQueryData('accounts')).toEqual([
      { id: 1, balance: 50, ref: 'test' },
      { id: 2, balance: 200, ref: 'test' },
    ]);
  });

  it('should update cache on transfer', () => {
    const data = { senderID: 1, receiverID: 2, amount: 50, reference: 'test' };
    updateCacheOnTransfer(data);
    expect(queryClient.getQueryData('accounts')).toEqual([
      { id: 1, balance: 50, ref: 'test' },
      { id: 2, balance: 250, ref: 'test' },
    ]);
  });
});
