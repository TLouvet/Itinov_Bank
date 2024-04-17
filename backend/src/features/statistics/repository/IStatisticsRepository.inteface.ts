import { StatisticsFromDB } from '../statistics.dto';

export interface IStatisticsRepository {
  getByAccount(id: number): Promise<StatisticsFromDB[]>;
  getBalanceByAccount(id: number): Promise<[{ balance: number }]>;
}
