import { Transaction } from '../transaction/types';

export type Account = {
  id: number;
  type: string;
  owner: string;
  bank: string;
  balance: number;
  reference: string;
  maxOverdraft: number;
  transactions: Transaction[];
};
