import { Account } from '../entities/account.entity';

export interface IAccountRepository {
  findByUser(userID: number): Promise<Account[]>;
  findOne(id: number, userID: number): Promise<Account>;
}
