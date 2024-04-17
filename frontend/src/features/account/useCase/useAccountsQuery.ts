import { useQuery } from 'react-query';
import { findAll } from './account.service';
import { Account } from '../account.type';
import { accountQueryKeys } from './account.keys';

export function useAccountsQuery() {
  return useQuery<Account[]>(accountQueryKeys.accounts, async () => {
    const response = await findAll();
    return response.data;
  });
}
