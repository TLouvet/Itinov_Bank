import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatisticsReponseDTO } from './statistics.dto';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({ summary: 'Get statistics by account' })
  @ApiOkResponse({ type: StatisticsReponseDTO })
  @Get('/byAccount/:id')
  async getStatisticsByAccount(@Param('id') id: number) {
    return this.statisticsService.getStatisticsByAccount(id);
  }
}
