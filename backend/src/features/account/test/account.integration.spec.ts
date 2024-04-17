import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthenticationManager } from '../../../common/security/AuthenticationManager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestingDatabaseModule } from '../../../common/database/testing-database.module';
import { AccountService } from '../account.service';
import { AccountController } from '../account.controller';
import { AccountMysqlRepository } from '../repository/account.mysql.repository';
import { TransactionMysqlRepository } from '../../../features/transaction/repository/transaction.mysql.repository';
import { TransactionEntity } from '../../../features/transaction/entity/transaction.entity';

describe('Transaction Integration Test', () => {
  let app: INestApplication;
  const accountsGivenSQLScript = [
    {
      owner: 'Mrs Doe Jane',
      id: 4,
      balance: 0.0,
      maxOverdraft: 0,
      bank: 'Itinov Bank',
      reference: 'FR123456786',
      type: 'Compte courant',
      transactions: [
        {
          transaction_id: 4,
          amount: '0.00',
          date: '2021-04-01',
          description: 'Initial deposit',
          transaction_type: 'Deposit',
        },
      ],
    },
  ];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestingDatabaseModule],
      controllers: [AccountController],
      providers: [
        AccountService,
        {
          provide: 'IAccountRepository',
          useClass: AccountMysqlRepository,
        },
        {
          provide: 'TransactionRepository',
          useClass: TransactionMysqlRepository,
        },
        {
          provide: getRepositoryToken(TransactionEntity),
          useClass: Repository<TransactionEntity>,
        },
        {
          provide: AuthenticationManager,
          useValue: {
            getUserID: () => 2,
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Get accounts', () => {
    it('should get the user accounts', async () => {
      await request(app.getHttpServer()).get('/accounts').expect(200).expect({ data: accountsGivenSQLScript });
    });

    it('should get one account', () => {
      return request(app.getHttpServer()).get('/accounts/4').expect(200).expect({ data: accountsGivenSQLScript[0] });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
