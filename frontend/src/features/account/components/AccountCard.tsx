import { Account } from '@/features/account/account.type';
import { Amount } from '@/shared/components/Amount';
import clsx from 'clsx';
import { Transaction } from '../../transaction/types';
import { WarningIcon } from '@/ui/icons/WarningIcon';

type AccountCardProps = Readonly<{
  onClick: (id: number) => void;
  selected: boolean;
  account: Account;
  transactions?: Transaction[];
}>;

export function AccountCard({ onClick, selected, account, transactions }: AccountCardProps) {
  return (
    <li
      className={clsx(
        'shadow-lg p-3 w-full rounded  hover:shadow-xl hover:cursor-pointer focus:shadow-xl border-l-4 list-none',
        { 'border-l-transparent': !selected },
        { 'border-l-primary bg-slate-50': selected }
      )}
      role='listitem'
      tabIndex={0}
      onClick={() => onClick(account.id)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(account.id)}
    >
      <div className='flex justify-between items-center'>
        <div className='text-left'>
          <p className='text-primary font-semibold'>{account.bank}</p>
          <p className='font-semibold'>{account.type}</p>
          <p className='text-sm'>N°{account.reference}</p>
          <p className='text-xs text-muted md:hidden'>{account.owner}</p>
        </div>

        <p className='hidden md:block'>{account.owner}</p>
        <span className='flex items-center justify-center gap-x-2'>
          {account.balance < 0 && <WarningIcon width={24} height={24} />}
          <Amount value={account.balance} />
        </span>
      </div>

      {transactions && (
        <div className='md:mt-2 '>
          <hr className='my-3' />
          <p className='text-sm font-semibold'>Dernières opérations</p>
          {transactions.length === 0 && <p className='text-xs'>Aucune opération récente</p>}
          {transactions.map((transaction, index) => {
            return (
              <div key={`acc-${index}`} className='flex justify-between items-center'>
                <p className='text-xs w-4/12'>{transaction.description}</p>
                <span className='block w-4/12 text-center'>
                  <Amount value={transaction.amount} />
                </span>

                <p className='text-xs w-4/12 text-end'>{new Date(transaction.date).toLocaleDateString('fr')}</p>
              </div>
            );
          })}
        </div>
      )}
    </li>
  );
}
