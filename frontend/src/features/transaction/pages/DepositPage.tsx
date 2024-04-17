import { Layout } from '@/ui/Layout/Layout';
import { TransactionPageLayout } from '../ui/TransactionLayout';
import { TransactionMenu } from '../components/TransactionMenu/TransactionMenu';
import { useAccountsQuery } from '@/features/account/useCase/useAccountsQuery';
import { TransactionPanelFactory } from '../components/TransactionPanels/TransactionPanelFactory';
import { TransactionProvider } from '../context/TransactionProvider';
import transactionContent from '../content.json';

export default function DepositPage() {
  const { data: accounts = [] } = useAccountsQuery();

  return (
    <TransactionProvider>
      <Layout pageTitle={transactionContent.depositPage.title}>
        <TransactionPageLayout>
          <TransactionMenu title='Informations sur le dépôt' accounts={accounts} />
          <TransactionPanelFactory accounts={accounts} />
        </TransactionPageLayout>
      </Layout>
    </TransactionProvider>
  );
}
