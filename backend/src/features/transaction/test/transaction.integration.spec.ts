import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TransactionController } from '../transaction.controller';
import { TransactionService } from '../transaction.service';
import { AuthenticationManager } from '../../../common/security/AuthenticationManager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionMysqlRepository } from '../repository/transaction.mysql.repository';
import { TransactionEntity } from '../entity/transaction.entity';
import { Repository } from 'typeorm';
import { TestingDatabaseModule } from '../../../common/database/testing-database.module';

describe('Transaction Integration Test', () => {
  let app: INestApplication;
  const userID = 1;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestingDatabaseModule],
      controllers: [TransactionController],
      providers: [
        TransactionService,
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
            getUserID: () => userID,
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.useGlobalPipes(new ValidationPipe()).init();
  });

  describe('Deposit', () => {
    it('should make a deposit', () => {
      return request(app.getHttpServer())
        .post('/transactions/deposit')
        .send({ accountID: 1, amount: 200, reference: 'ref' }) // IMPORTANT: We do 200 because we take back 100 twice in the next tests - and we are playing with a db data
        .expect(201);
    });

    it('should refuse to make a deposit on a non existing account', () => {
      return request(app.getHttpServer())
        .post('/transactions/deposit')
        .send({ accountID: 9999, amount: 2000, reference: 'ref' })
        .expect(400);
    });

    it('should refusee to make a deposit without reference', () => {
      return request(app.getHttpServer())
        .post('/transactions/deposit')
        .send({ accountID: 1, amount: 2000 })
        .expect(400);
    });

    it('should refuse to make a negative deposit', () => {
      return request(app.getHttpServer())
        .post('/transactions/deposit')
        .send({ accountID: 1, amount: -2000, reference: 'ref' })
        .expect(400);
    });
  });

  describe('Withdrawal', () => {
    it('should make a withdrawal', () => {
      return request(app.getHttpServer())
        .post('/transactions/withdraw')
        .send({ accountID: 1, amount: 100, reference: 'ref' })
        .expect(201);
    });

    it('should refuse to make a withdrawal on a non existing account', () => {
      return request(app.getHttpServer())
        .post('/transactions/withdraw')
        .send({ accountID: 9999, amount: 2000, reference: 'ref' })
        .expect(400);
    });

    it('should refuse to make a withdrawal without reference', () => {
      return request(app.getHttpServer())
        .post('/transactions/withdraw')
        .send({ accountID: 1, amount: 2000 })
        .expect(400);
    });

    it('should refuse to make a negative withdrawal', () => {
      return request(app.getHttpServer())
        .post('/transactions/withdraw')
        .send({ accountID: 1, amount: -2000, reference: 'ref' })
        .expect(400);
    });

    it('should refuse to make a withdrawal on an account with insufficient funds', () => {
      return request(app.getHttpServer())
        .post('/transactions/withdraw')
        .send({ accountID: 1, amount: 2000, reference: 'ref' })
        .expect(400);
    });
  });

  describe('Transfer', () => {
    it('should make a transfer', () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer')
        .send({ senderID: 1, receiverID: 2, amount: 100, reference: 'ref' })
        .expect(201);
    });

    it('should refuse to make a transfer with the same sender and receiver', () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer')
        .send({ senderID: 1, receiverID: 1, amount: 100, reference: 'ref' })
        .expect(400);
    });

    it('should refuse to make a transfer with insufficient funds', () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer')
        .send({ senderID: 1, receiverID: 2, amount: 2000, reference: 'ref' })
        .expect(400);
    });

    it('should refuse to make a transfer without reference', () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer')
        .send({ senderID: 1, receiverID: 2, amount: 100 })
        .expect(400);
    });

    it('should refuse to make a negative transfer', () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer')
        .send({ senderID: 1, receiverID: 2, amount: -100, reference: 'ref' })
        .expect(400);
    });

    it("should refuse to make a transfer on a non existing sender's account", () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer')
        .send({ senderID: 9999, receiverID: 2, amount: 100, reference: 'ref' })
        .expect(400);
    });

    it("should refuse to make a transfer on a non existing receiver's account", () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer')
        .send({ senderID: 1, receiverID: 9999, amount: 100, reference: 'ref' })
        .expect(500);
    });
  });
});
