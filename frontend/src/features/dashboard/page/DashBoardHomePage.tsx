import { useAccountsQuery } from '../../account/useCase/useAccountsQuery';
import { useStatisticsQuery } from '@/features/statistics/useCase/useStatisticsQuery';
import { Layout } from '@/ui/Layout/Layout';
import { StatisticsChart } from '@/features/statistics/components/StatisticsChart';
import { DashboardActions } from '../components/DashboardActions';
import { DashboardAccounts } from '../components/DashboardAccounts';
import { DashboardAgencyContact } from '../components/DashboardAgencyContact';
import content from '../content.json';

export default function DashBoardHomePage() {
  const { data: accounts = [] } = useAccountsQuery();
  const { data: statistics = [], isLoading: isLoadingStatistics } = useStatisticsQuery(accounts[0]?.id);

  return (
    <Layout pageTitle={content.page.title}>
      <StatisticsChart data={statistics} isLoading={isLoadingStatistics} />
      <section className='lg:flex'>
        <DashboardAccounts accounts={accounts} />
        <aside className='flex flex-col py-4 space-y-4 lg:px-6'>
          <DashboardActions />
          <DashboardAgencyContact />
        </aside>
      </section>
    </Layout>
  );
}
