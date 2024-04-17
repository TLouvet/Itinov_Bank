import { BadRequestException, Injectable } from '@nestjs/common';
import { ITransactionRepository } from './ITransactionRepository.interface';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { TransactionEntity } from '../entity/transaction.entity';
import { WithdrawalDTO } from '../dto/Withdrawal.dto';
import { DepositDTO } from '../dto/Deposit.dto';
import { TransferDTO } from '../dto/Transfer.dto';

@Injectable()
export class TransactionMysqlRepository implements ITransactionRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async withdraw(withdrawPayload: WithdrawalDTO, userID: number): Promise<void> {
    const { accountID, amount, reference } = withdrawPayload;
    await this.dataSource.transaction(async (manager) => {
      await this.debitAccount(manager, amount, accountID, amount, userID);
      await this.addTransaction(manager, -amount, accountID, reference, 'Withdrawal');
    });
  }

  async deposit(depositPayload: DepositDTO): Promise<void> {
    const { accountID, amount, reference } = depositPayload;
    await this.dataSource.transaction(async (manager) => {
      await this.creditAccount(manager, accountID, amount);
      await this.addTransaction(manager, amount, accountID, reference, 'Deposit');
    });
  }

  async transfer(transferPayload: TransferDTO, userID: number): Promise<void> {
    const { senderID, receiverID, amount, reference } = transferPayload;
    await this.dataSource.transaction(async (manager) => {
      await this.debitAccount(manager, amount, senderID, amount, userID);
      await this.addTransaction(manager, -amount, senderID, reference, 'Transfer');
      await this.addTransaction(manager, amount, receiverID, 'Virement reçu', 'Transfer');
      await this.creditAccount(manager, receiverID, amount);
    });
  }

  async findByAccount(accountID: number, userID: number, offset = 0, limit = 50) {
    return this.dataSource.createEntityManager().find(TransactionEntity, {
      where: {
        account: {
          account_id: accountID,
          customer: {
            customer_id: userID,
          },
        },
      },
      select: {
        transaction_id: true,
        amount: true,
        date: true,
        description: true,
        transaction_type: {
          name: true,
        },
      },
      relations: ['transaction_type'],
      order: {
        date: 'DESC',
      },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Raw SQL difficilement maintenable
   */
  async getShortHistory(userID: number) {
    return this.dataSource.query(
      `
      SELECT 
        o.transaction_id,
        o.amount,
        DATE_FORMAT(CONVERT_TZ(o.date, '+00:00', '+02:00'), '%Y-%m-%d') AS date,
        o.description,
        ot.name AS transaction_type,
        o.account_id
      FROM transaction o
      LEFT JOIN transaction_type ot ON o.transaction_type_id = ot.transaction_type_id
      WHERE o.transaction_id IN (
        SELECT transaction_id
        FROM (
          SELECT 
              transaction_id,
              ROW_NUMBER() OVER (PARTITION BY account_id ORDER BY date DESC) AS rn
          FROM 
              transaction
          WHERE 
              account_id IN (
                  SELECT account_id
                  FROM account
                  WHERE customer_id = ?
              )
          ) AS t
        WHERE rn <= 3
      );`,
      [userID],
    );
  }

  /**
   * NOTE: Cette requête est peut-être trop associée à la logique métier
   * @param manager
   * @param args - [amount, account_id, amount]
   */
  private async debitAccount(manager: EntityManager, ...args: any[]) {
    const update = await manager.query(
      `UPDATE account SET balance = balance - ? WHERE account_id = ? AND balance + max_overdraft >= ? AND customer_id = ?`,
      args,
    );

    if (update.affectedRows === 0) {
      throw new BadRequestException('Insufficient funds');
    }
  }

  private async creditAccount(manager: EntityManager, accountID: number, amount: number) {
    const update = await manager.update('account', accountID, { balance: () => `balance + ${amount}` });
    if (update.affected === 0) {
      throw new BadRequestException('Account not found');
    }
  }

  /**
   * @param manager
   * @param args - [amount, account_id, transaction_type, description]
   */
  private async addTransaction(manager: EntityManager, ...args: any[]) {
    return manager.query(
      `
    INSERT INTO transaction (transaction_type_id, amount, account_id, description, date) 
    SELECT 
        transaction_type_id,
        ? AS amount,
        ? AS account_id,
        ? AS description,
        NOW() AS date
    FROM 
        transaction_type 
    WHERE 
        name = ?`,
      args,
    );
  }
}
