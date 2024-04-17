import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { StatisticsSQLRepository } from './repository/statistics.repository';

@Module({
  imports: [],
  controllers: [StatisticsController],
  providers: [
    StatisticsService,
    {
      provide: 'IStatisticsRepository',
      useClass: StatisticsSQLRepository,
    },
  ],
})
export class StatisticsModule {}
