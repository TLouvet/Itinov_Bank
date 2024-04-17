import { useQuery } from 'react-query';
import { Account } from '../account.type';
import { findOne } from './account.service';
import { accountQueryKeys } from './account.keys';

export function useSingleAccountQuery(id: number | null) {
  return useQuery<Account>(
    accountQueryKeys.account(id),
    async () => {
      const response = await findOne(id!);
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
}
