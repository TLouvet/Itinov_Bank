import { Account } from '../account.type';

export const accountsMock: Account[] = [
  {
    id: 1,
    type: 'Compte épargne',
    balance: 1000.41,
    reference: '00448711400',
    owner: 'M. Louvet Thomas',
    bank: 'ItinovBank',
    maxOverdraft: 1000,
    transactions: [],
  },
  {
    id: 2,
    type: 'Compte courant',
    balance: -805.4,
    reference: '00448711401',
    owner: 'M. Louvet Thomas',
    bank: 'ItinovBank',
    maxOverdraft: 1000,
    transactions: [],
  },
  {
    id: 3,
    type: 'Livret A',
    balance: 12000.61,
    reference: '00448711402',
    owner: 'M. Louvet Thomas',
    bank: 'ItinovBank',
    maxOverdraft: 0,
    transactions: [],
  },
];
