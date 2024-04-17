import { useQuery } from 'react-query';
import { getByAccount } from './statistics.service';
import { errorToast } from '@/config/toasts/react-toastify';
import { statisticsKeys } from './statistics.keys';

export function useStatisticsQuery(id?: number) {
  return useQuery(
    statisticsKeys.statistics(id),
    async () => {
      const response = await getByAccount(id!);
      return response.data;
    },
    {
      enabled: !!id,
      onError: () => {
        errorToast('Impossible de récupérer les statistiques de ce compte');
      },
    }
  );
}
