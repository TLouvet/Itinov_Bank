import { TransactionType } from '@/features/transaction/types';

export function translateTransactionType(transactionType: TransactionType) {
  switch (transactionType) {
    case 'deposit':
      return 'Dépôt';
    case 'withdrawal':
      return 'Retrait';
    case 'transfer':
      return 'Virement';
    default:
      return 'Inconnu';
  }
}
