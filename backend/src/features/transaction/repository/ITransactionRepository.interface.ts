import { DepositDTO } from '../dto/Deposit.dto';
import { TransferDTO } from '../dto/Transfer.dto';
import { WithdrawalDTO } from '../dto/Withdrawal.dto';
import { TransactionEntity } from '../entity/transaction.entity';

export interface ITransactionRepository {
  getShortHistory(userID: number): Promise<any[]>;
  findByAccount(accountID: number, userID: number, skip?: number, limit?: number): Promise<TransactionEntity[]>;
  withdraw(withdrawPayload: WithdrawalDTO, userID: number): Promise<void>;
  deposit(depositPayload: DepositDTO): Promise<void>;
  transfer(transferPayload: TransferDTO, userID: number): Promise<void>;
}
