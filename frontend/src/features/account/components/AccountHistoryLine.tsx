import { Amount } from '@/shared/components/Amount';
import { ChevronRightIcon } from '@/ui/icons/ChevronRightIcon';
import { HistoryLineIconFactory } from './HistoryLineIconFactory';
import { translateTransactionType } from '@/shared/utils/translateTransactionType';
import { TransactionType } from '@/features/transaction/types';

type AccountHistoryLineProps = {
  onClick: () => void;
  date: Date;
  amount: string;
  description: string;
  transaction_type: string;
};

export function AccountHistoryLine({ onClick, date, amount, transaction_type, description }: AccountHistoryLineProps) {
  const translatedAction = translateTransactionType(transaction_type.toLowerCase() as TransactionType);

  return (
    <li
      className='flex justify-between border-y py-2 items-center cursor-pointer hover:bg-slate-50 focus-within:bg-slate-50'
      onClick={onClick}
    >
      <div className='flex gap-x-4 items-center w-1/2'>
        <HistoryLineIconFactory transactionType={transaction_type.toLowerCase() as TransactionType} />
        <div>
          <h3 className='font-semibold text-primary'>{description}</h3>
          <p className='font-light text-xs'>Date: {new Date(date).toLocaleDateString('fr')}</p>
          <p className='md:hidden text-xs text-muted'>{translatedAction}</p>
        </div>
      </div>

      <p className='hidden md:block text-sm text-secondary'>{translatedAction}</p>

      <div className='flex flex-1 justify-end items-center'>
        <Amount value={Number(amount)} />
        <button onClick={onClick} aria-label='Ouvrir les détails de la transaction'>
          <ChevronRightIcon width={32} height={32} className='fill-primary' />
        </button>
      </div>
    </li>
  );
}
