import { currencyFormatter } from '@/shared/utils/currencyFormatting';
import { WarningIcon } from '@/ui/icons/WarningIcon';
import { useTransactionContext } from '../../hooks/useTransactionContext';
import content from '../../content.json';

type TransactionAmountDetailProps = Readonly<{
  error?: boolean;
}>;

export function TransactionAmountDetail({ error }: TransactionAmountDetailProps) {
  const { amount, reference } = useTransactionContext();
  const formattedAmount = currencyFormatter('EUR').format(Number(amount));

  return (
    <>
      <p className=' text-muted w-1/2 break-words'>{reference}</p>
      {amount !== '' && (
        <div>
          <div className='flex gap-x-2 items-center justify-end'>
            {error && <WarningIcon width={28} height={28} />}
            <p className='font-semibold'> {formattedAmount}</p>
          </div>
          {error && <p className='text-end text-xs text-error'>{content.errors.generic}</p>}
        </div>
      )}
    </>
  );
}
