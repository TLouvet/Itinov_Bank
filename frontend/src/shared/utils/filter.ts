import { Account } from '@/features/account/account.type';

export const filterAccountsByReference = (accounts: Account[], reference: string) =>
  accounts.filter((account) => account.reference.toLowerCase().includes(reference.toLowerCase()));
