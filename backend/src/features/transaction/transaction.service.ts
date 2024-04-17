import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from './repository/ITransactionRepository.interface';
import { TransferDTO } from './dto/Transfer.dto';
import { DepositDTO } from './dto/Deposit.dto';
import { AuthenticationManager } from '../../common/security/AuthenticationManager';
import { WithdrawalDTO } from './dto/Withdrawal.dto';
import { Response } from '../../common/response/Response';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject(AuthenticationManager) private readonly authManager: AuthenticationManager,
  ) {}

  async withdraw(withdrawPayload: WithdrawalDTO) {
    const userID = await this.authManager.getUserID();
    await this.transactionRepository.withdraw(withdrawPayload, userID);
    return new Response<void>().withMessage('Withdrawal successful').build();
  }

  async deposit(depositPayload: DepositDTO) {
    await this.transactionRepository.deposit(depositPayload);
    return new Response<void>().withMessage('Deposit successful').build();
  }

  async transfer(transferDto: TransferDTO) {
    if (transferDto.receiverID === transferDto.senderID) {
      throw new BadRequestException('Sender and receiver cannot be the same');
    }

    const userID = await this.authManager.getUserID();
    await this.transactionRepository.transfer(transferDto, userID);

    return new Response<void>().withMessage('Transfer successful').build();
  }
}
