import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from '../statistics.controller';
import { INestApplication } from '@nestjs/common';
import { StatisticsService } from '../statistics.service';
import { StatisticsSQLRepository } from '../repository/statistics.repository';
import { TestingDatabaseModule } from '../../../common/database/testing-database.module';
import * as request from 'supertest';

describe('StatisticsController Integration', () => {
  let app: INestApplication;

  const dataFromSQLScript = {
    name: '2021-03-31T22:00:00.000Z',
    expense: 0,
    income: 0,
    balance: 0,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestingDatabaseModule],
      controllers: [StatisticsController],
      providers: [
        StatisticsService,
        {
          provide: 'IStatisticsRepository',
          useClass: StatisticsSQLRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should get the statistics for one account', () => {
    return request(app.getHttpServer())
      .get('/statistics/byAccount/4')
      .expect(200)
      .expect({
        data: [dataFromSQLScript],
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
