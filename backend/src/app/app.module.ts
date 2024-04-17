import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from 'src/features/account/account.module';
import { TransactionModule } from 'src/features/transaction/transaction.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from 'src/features/customer/customer.module';
import { SecurityModule } from 'src/common/security/security.module';
import { BankModule } from 'src/features/bank/bank.module';
import { StatisticsModule } from 'src/features/statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccountModule,
    TransactionModule,
    DatabaseModule,
    CustomerModule,
    SecurityModule,
    BankModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
