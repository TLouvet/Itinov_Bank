import { http } from '@/config/http';
import { StatisticsResponse } from '../statistics.type';

export function getByAccount(id: number) {
  return http.get<StatisticsResponse>(`statistics/byAccount/${id}`);
}
