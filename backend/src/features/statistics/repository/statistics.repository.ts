import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IStatisticsRepository } from './IStatisticsRepository.inteface';
import { StatisticsFromDB } from '../statistics.dto';

@Injectable()
export class StatisticsSQLRepository implements IStatisticsRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  getByAccount(id: number): Promise<StatisticsFromDB[]> {
    return this.dataSource
      .createQueryBuilder()
      .select('date as name')
      .addSelect('CAST(SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END) AS FLOAT)', 'expense')
      .addSelect('CAST(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS FLOAT)', 'income')
      .from('transaction', 't')
      .where('t.account_id = :id', { id })
      .orderBy('date', 'ASC')
      .groupBy('date')
      .execute();
  }

  getBalanceByAccount(id: number): Promise<[{ balance: number }]> {
    return this.dataSource
      .createQueryBuilder()
      .select('balance')
      .from('account', 'a')
      .where('a.account_id = :id', { id })
      .execute();
  }
}
