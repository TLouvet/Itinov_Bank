import { Account } from '@/features/account/account.type';
import { AccountCard } from '@/features/account/components/AccountCard';
import { SecondaryTitle } from '@/ui/Typography/SecondaryTitle';
import { useDashboardAccountsLogic } from '../hooks/useDashboardAccountsLogic';
import content from '../content.json';

type DashboardAccountsProps = Readonly<{
  accounts: Account[];
}>;

export function DashboardAccounts({ accounts }: DashboardAccountsProps) {
  const { onAccountClick } = useDashboardAccountsLogic();

  return (
    <div className=' py-4 space-y-4 px-2 lg:px-6 lg:w-8/12 lg:border-r-2'>
      <SecondaryTitle>{content.accounts.title}</SecondaryTitle>
      <ul className='xl:grid grid-cols-2 gap-x-6 gap-y-3'>
        {accounts.map((account, index) => (
          <AccountCard
            key={`hm-acc-${index}`}
            account={account}
            onClick={onAccountClick}
            selected={false}
            transactions={account.transactions}
          />
        ))}
      </ul>
    </div>
  );
}
