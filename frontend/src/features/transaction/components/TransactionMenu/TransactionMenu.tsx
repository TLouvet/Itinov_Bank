import { SecondaryTitle } from '@/ui/Typography/SecondaryTitle';
import { Account } from '@/features/account/account.type';
import { Button } from '@/ui/Button/Button';
import { TransactionMenuItemsList } from './TransactionMenuItemsList';
import { useTransactionMenuLogic } from '../../hooks/useTransactionMenuLogic';
import clsx from 'clsx';
import content from '../../content.json';

type TransactionMenuProps = Readonly<{
  title: string;
  accounts: Account[];
}>;

export function TransactionMenu({ title, accounts }: TransactionMenuProps) {
  const { onSubmit, showBtn, amountError, selectedPanel } = useTransactionMenuLogic();

  return (
    <div className='space-y-5 lg:w-4/12  lg:border-r-2 lg:pe-3 mb-5 lg:mb-0 lg:min-w-[300px]'>
      <section>
        <SecondaryTitle className='text-center mb-6'>{title}</SecondaryTitle>
        <TransactionMenuItemsList accounts={accounts} amountError={amountError} />
      </section>
      <Button
        className={clsx('block ms-auto disabled:opacity-50 disabled:bg-muted', {
          'hidden lg:block': selectedPanel !== null,
        })}
        onClick={onSubmit}
        disabled={!showBtn()}
      >
        {content.menu.validate}
      </Button>
    </div>
  );
}
