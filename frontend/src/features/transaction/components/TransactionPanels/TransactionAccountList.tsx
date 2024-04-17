import { Account } from '@/features/account/account.type';
import { AccountCard } from '../../../account/components/AccountCard';
import { useState } from 'react';
import { Input } from '@/ui/form/Input';
import { filterAccountsByReference } from '@/shared/utils/filter';
import content from '../../content.json';

type TransferAccountListProps = Readonly<{
  onClick: () => void;
  accounts: Account[];
  selectedID?: number;
}>;

export function TransactionAccountList({ onClick, accounts, selectedID }: TransferAccountListProps) {
  const [search, setSearch] = useState('');
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const filteredAccounts = filterAccountsByReference(accounts, search);

  return (
    <>
      <Input label={content.labels.search} value={search} onChange={onSearch} />
      <ul className='space-y-6 mt-6'>
        {filteredAccounts.map((account) => (
          <AccountCard
            key={`acc-${account.id}`}
            account={account}
            onClick={onClick}
            selected={account.id === selectedID}
          />
        ))}
      </ul>
    </>
  );
}
