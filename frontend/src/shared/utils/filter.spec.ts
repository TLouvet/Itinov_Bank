import { accountsMock } from '@/features/account/data/accountsMock';
import { describe, expect, it } from 'vitest';
import { filterAccountsByReference } from './filter';

describe('filter accounts by reference', () => {
  it('should filter accounts by reference', () => {
    expect(filterAccountsByReference(accountsMock, '400')).toEqual([accountsMock[0]]);
  });

  it('should send back all accounts if no reference is provided', () => {
    expect(filterAccountsByReference(accountsMock, '')).toEqual(accountsMock);
  });

  it('should send back an empty array if no account is found', () => {
    expect(filterAccountsByReference(accountsMock, 'non-existant-reference')).toEqual([]);
  });
});
