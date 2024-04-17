import { ApiProperty } from '@nestjs/swagger';

export class StatisticsFromDB {
  name: Date;
  expense: number;
  income: number;
}

export class StatisticDTO {
  @ApiProperty()
  name: Date;

  @ApiProperty()
  expense: number;

  @ApiProperty()
  income: number;

  @ApiProperty()
  balance: number;
}

export class StatisticsReponseDTO {
  @ApiProperty({ type: [StatisticDTO] })
  data: StatisticDTO[];
}
