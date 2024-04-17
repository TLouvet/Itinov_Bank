import { Injectable } from '@nestjs/common';
import { IAccountRepository } from './IAccountRepository.interface';
import { Account } from '../entities/account.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AccountMysqlRepository implements IAccountRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findByUser(userID: number): Promise<Account[]> {
    return this.dataSource.createEntityManager().find(Account, {
      where: {
        customer: {
          customer_id: userID,
        },
      },
      relations: ['account_type', 'bank', 'customer'],
      select: {
        account_id: true,
        account_type: {
          name: true,
        },
        bank: {
          name: true,
        },
        balance: true,
        account_number: true,
        max_overdraft: true,
        customer: {
          last_name: true,
          first_name: true,
          civility: true,
        },
      },
    });
  }

  async findOne(id: number, userID: number): Promise<Account> {
    return this.dataSource.createEntityManager().findOne(Account, {
      where: {
        account_id: id,
        customer: {
          customer_id: userID,
        },
      },
      relations: ['account_type', 'bank', 'customer'],
      select: {
        account_id: true,
        account_type: {
          name: true,
        },
        bank: {
          name: true,
        },
        balance: true,
        account_number: true,
        max_overdraft: true,
        customer: {
          last_name: true,
          first_name: true,
          civility: true,
        },
      },
    });
  }
}
