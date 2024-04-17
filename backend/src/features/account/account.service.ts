import { Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from './repository/IAccountRepository.interface';
import { AuthenticationManager } from '../../common/security/AuthenticationManager';
import { AccountDto } from './account.dto';
import { ITransactionRepository } from '../transaction/repository/ITransactionRepository.interface';
import { Response } from '../../common/response/Response';

@Injectable()
export class AccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject(AuthenticationManager)
    private readonly authManager: AuthenticationManager,
  ) {}

  async findByUser() {
    const userID = await this.authManager.getUserID();
    const accounts = await this.accountRepository.findByUser(userID);
    const history = await this.transactionRepository.getShortHistory(userID);

    const accountsWithTransactions = accounts.map((account) => {
      const transactions = history
        .filter((transaction) => transaction.account_id === account.account_id)
        .map((transaction) => {
          delete transaction.account_id;
          return transaction;
        });
      return { ...account, transactions };
    });

    return new Response<AccountDto[]>()
      .withData(accountsWithTransactions.map((account) => new AccountDto(account)))
      .build();
  }

  async findOne(id: number) {
    const userID = await this.authManager.getUserID();
    const account = await this.accountRepository.findOne(id, userID);
    const history = await this.transactionRepository.findByAccount(id, userID);
    return new Response<AccountDto>().withData(new AccountDto({ ...account, transactions: history })).build();
  }
}
