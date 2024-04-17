import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionMysqlRepository } from './repository/transaction.mysql.repository';
import { SecurityModule } from '../../common/security/security.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entity/transaction.entity';

@Module({
  imports: [SecurityModule, TypeOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: 'TransactionRepository',
      useClass: TransactionMysqlRepository,
    },
  ],
  exports: ['TransactionRepository'],
})
export class TransactionModule {}
