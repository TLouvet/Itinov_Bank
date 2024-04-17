import { TransactionType } from '@/features/transaction/types';
import { DepositIcon } from '@/ui/icons/DepositIcon';
import { TransferIcon } from '@/ui/icons/TransferIcon';
import { WithdrawIcon } from '@/ui/icons/WithdrawIcon';

type HistoryLineIconFactoryProps = Readonly<{
  transactionType: TransactionType;
}>;

export function HistoryLineIconFactory({ transactionType }: HistoryLineIconFactoryProps) {
  return (
    <div className='flex items-center justify-center'>
      {transactionType === 'deposit' && <DepositIcon width={32} height={32} className='fill-primary' />}
      {transactionType === 'withdrawal' && <WithdrawIcon width={32} height={32} className='fill-primary rotate-180' />}
      {transactionType === 'transfer' && <TransferIcon width={32} height={32} className='fill-primary rotate-90' />}
    </div>
  );
}
