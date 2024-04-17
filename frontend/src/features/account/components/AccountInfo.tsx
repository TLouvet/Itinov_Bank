import { Amount } from '@/shared/components/Amount';
import { formatDate } from '@/shared/utils/dateFormatting';
import { Account } from '../account.type';
import { WarningIcon } from '@/ui/icons/WarningIcon';

type AccountInfoProps = Readonly<{
  account: Account;
}>;

export function AccountInfo({ account }: AccountInfoProps) {
  return (
    <div className='lg:flex justify-between items-center my-3 xl:pe-20'>
      <p className='text-primary text-center text-lg lg:text-start lg:text-xl font-semibold'>{account.type}</p>
      <div className='text-center'>
        <p className='text-sm font-semibold'>
          {account.reference} - {account.bank}
        </p>
        <span className='flex items-center justify-center gap-x-2'>
          {account.balance < 0 && <WarningIcon width={24} height={24} />}
          <Amount value={account.balance} />
        </span>
        <p className='text-muted'>Solde au {formatDate(new Date(Date.now()).toDateString())} </p>
      </div>
      <div>
        <div className='flex justify-between gap-x-10'>
          <span className=''>Découvert maximum</span>
          <Amount value={account.maxOverdraft} />
        </div>
        <div className='flex justify-between gap-x-10'>
          <span className=''>Titulaire</span>
          <span>{account.owner}</span>
        </div>
      </div>
    </div>
  );
}
