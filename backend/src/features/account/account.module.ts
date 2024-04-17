import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountMysqlRepository } from './repository/account.mysql.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { SecurityModule } from 'src/common/security/security.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), SecurityModule, TransactionModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: 'IAccountRepository',
      useClass: AccountMysqlRepository,
    },
  ],
})
export class AccountModule {}
