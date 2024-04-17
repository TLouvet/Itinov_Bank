import { Account } from '@/features/account/account.type';
import { Amount } from '@/shared/components/Amount';
import content from '../../content.json';

type TransactionAccountDetailProps = Readonly<{
  details: Account | undefined;
}>;

export function TransactionAccountDetail({ details }: TransactionAccountDetailProps) {
  if (!details) return null;

  return (
    <>
      <div>
        <p>{details.bank}</p>
        <p className='font-semibold'>{details.type}</p>
        <p className='text-muted text-sm'>N°{details.reference}</p>
        <p className='text-muted text-sm'>
          {content.maxOverdraft} {details.maxOverdraft}€
        </p>
      </div>
      <Amount value={details.balance} />
    </>
  );
}
