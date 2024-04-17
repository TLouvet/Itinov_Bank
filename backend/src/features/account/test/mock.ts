import { Account } from '../entities/account.entity';

export const accountsMock: Account[] = [
  {
    account_id: 1,
    account_number: '123456789',
    balance: 100,
    max_overdraft: 0,
    account_type: {
      acc_type_id: 1,
      name: 'Compte courant',
    },
    customer: {
      customer_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      civility: 'M',
    },
    bank: {
      bank_id: 1,
      name: 'Bank of the World',
    },
    transactions: [],
  },
  {
    account_id: 2,
    account_number: '987654321',
    balance: 1000,
    max_overdraft: 500,
    account_type: {
      acc_type_id: 2,
      name: 'Compte épargne',
    },
    customer: {
      customer_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      civility: 'M',
    },
    bank: {
      bank_id: 1,
      name: 'Bank of the World',
    },
    transactions: [],
  },
  {
    account_id: 3,
    account_number: '123456789',
    balance: 100,
    max_overdraft: 0,
    account_type: {
      acc_type_id: 1,
      name: 'Compte courant',
    },
    customer: {
      customer_id: 2,
      first_name: 'Jane',
      last_name: 'Doe',
      civility: 'M',
    },
    bank: {
      bank_id: 1,
      name: 'Bank of the World',
    },
    transactions: [],
  },
  {
    account_id: 4,
    account_number: '987654321',
    balance: 1000,
    max_overdraft: 500,
    account_type: {
      acc_type_id: 2,
      name: 'Compte épargne',
    },
    customer: {
      customer_id: 2,
      first_name: 'Jane',
      last_name: 'Doe',
      civility: 'M',
    },
    bank: {
      bank_id: 1,
      name: 'Bank of the World',
    },
    transactions: [],
  },
];
