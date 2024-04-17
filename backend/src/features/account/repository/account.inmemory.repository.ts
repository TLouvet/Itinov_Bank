import { Injectable } from '@nestjs/common';
import { IAccountRepository } from './IAccountRepository.interface';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountInMemoryRepository implements IAccountRepository {
  constructor(private accounts: Account[] = []) {}

  async findByUser(userID: number): Promise<Account[]> {
    return this.accounts.filter((account) => account.customer.customer_id === userID);
  }

  async findOne(id: number): Promise<Account> {
    return this.accounts.find((account) => account.account_id === id);
  }
}
