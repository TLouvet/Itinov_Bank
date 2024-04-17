import { Transaction } from '@/features/transaction/types';
import { AccountHistoryLine } from './AccountHistoryLine';

type AccountHistoryProps = Readonly<{
  transactions?: Transaction[];
  onClick: (id: number) => void;
}>;

export function AccountHistory({ transactions = [], onClick }: AccountHistoryProps) {
  if (transactions.length === 0) {
    return <p>Aucune transaction effectuée récemment</p>;
  }

  return (
    <ul className='lg:w-6/12 space-y-5 mb-10'>
      {transactions.map((transaction) => (
        <AccountHistoryLine
          key={transaction.transaction_id}
          date={transaction.date}
          amount={transaction.amount}
          description={transaction.description}
          transaction_type={transaction.transaction_type}
          onClick={() => onClick(transaction.transaction_id)}
        />
      ))}
    </ul>
  );
}
