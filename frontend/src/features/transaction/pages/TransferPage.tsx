import { Layout } from '@/ui/Layout/Layout';
import { TransactionMenu } from '../components/TransactionMenu/TransactionMenu';
import { TransactionPageLayout } from '../ui/TransactionLayout';
import { useAccountsQuery } from '@/features/account/useCase/useAccountsQuery';
import { TransactionPanelFactory } from '../components/TransactionPanels/TransactionPanelFactory';
import { TransactionProvider } from '../context/TransactionProvider';
import transactionContent from '../content.json';

export default function TransferPage() {
  const { data: accounts = [] } = useAccountsQuery();

  return (
    <TransactionProvider>
      <Layout pageTitle={transactionContent.transferPage.title}>
        <TransactionPageLayout>
          <TransactionMenu title='Informations sur le virement' accounts={accounts} />
          <TransactionPanelFactory accounts={accounts} />
        </TransactionPageLayout>
      </Layout>
    </TransactionProvider>
  );
}
