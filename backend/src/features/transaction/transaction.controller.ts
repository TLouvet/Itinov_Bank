import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { TransferDTO } from './dto/Transfer.dto';
import { DepositDTO } from './dto/Deposit.dto';
import { WithdrawalDTO } from './dto/Withdrawal.dto';

@ApiTags('Transaction')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/withdraw')
  withdraw(@Body() body: WithdrawalDTO) {
    return this.transactionService.withdraw(body);
  }

  @Post('/deposit')
  deposit(@Body() body: DepositDTO) {
    return this.transactionService.deposit(body);
  }

  @Post('/transfer')
  transfer(@Body() transferInformation: TransferDTO) {
    return this.transactionService.transfer(transferInformation);
  }
}
