import { ApiResponse } from '@/config/http';

export type StatisticsResponse = ApiResponse<Statistic[]>;
export type Statistic = {
  name: string;
  income: number;
  expense: number;
  balance: number;
};
