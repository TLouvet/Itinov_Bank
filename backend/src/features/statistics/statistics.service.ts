import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StatisticDTO } from './statistics.dto';
import { IStatisticsRepository } from './repository/IStatisticsRepository.inteface';
import { Response } from '../../common/response/Response';

@Injectable()
export class StatisticsService {
  constructor(@Inject('IStatisticsRepository') private readonly statisticsSQLRepository: IStatisticsRepository) {}

  async getStatisticsByAccount(id: number) {
    const transactions = await this.statisticsSQLRepository.getByAccount(id);
    if (transactions.length === 0) {
      return new Response<StatisticDTO[]>().withData([]).build();
    }

    const balance = await this.statisticsSQLRepository.getBalanceByAccount(id);
    if (!balance.length) {
      throw new BadRequestException();
    }

    return new Response<StatisticDTO[]>().withData(this.addBalance(transactions, Number(balance[0].balance))).build();
  }

  /**
   * L'idée est de partir de la fin du tableau et de remonter pour calculer le solde
   * A noter, la fonction n'est pas optimisée, une simple boucle for avec modification
   * de l'état du tableau est envisageable si souci de performance
   */
  private addBalance(transactions: any, balance: number): StatisticDTO[] {
    let currentBalance = balance;
    const transactionsWithBalance = transactions.reduceRight((acc: StatisticDTO[], transaction: StatisticDTO) => {
      const newTransaction = { ...transaction, balance: currentBalance };
      currentBalance += -transaction.income + transaction.expense;
      return [newTransaction, ...acc];
    }, []);

    return transactionsWithBalance;
  }
}
