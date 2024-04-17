import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../features/account/entities/account.entity';
import { TransactionEntity } from '../../features/transaction/entity/transaction.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_TEST_NAME } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_TEST_NAME,
      entities: ['dist/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts,.js}', Account, TransactionEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Account, TransactionEntity]),
  ],
  controllers: [],
  providers: [],
})
export class TestingDatabaseModule {}
