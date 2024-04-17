import { ApiProperty } from '@nestjs/swagger';
import { Account } from './entities/account.entity';

export class AccountDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  maxOverdraft: number;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  bank: string;

  @ApiProperty()
  transactions: any;

  constructor(account: Account) {
    this.id = account.account_id;
    this.owner = `${account.customer.civility} ${account.customer.last_name} ${account.customer.first_name}`;
    this.balance = Number(account.balance);
    this.reference = account.account_number;
    this.maxOverdraft = account.max_overdraft;
    this.type = account.account_type.name;
    this.bank = account.bank.name;
    this.transactions = account.transactions.map((t) => ({
      ...t,
      transaction_type: t.transaction_type?.name ? t.transaction_type.name : t.transaction_type,
    }));
  }
}
