import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Get user accounts' })
  @Get()
  findAll() {
    return this.accountService.findByUser();
  }

  @ApiOperation({ summary: 'Get user account by id' })
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.accountService.findOne(id);
  }
}
