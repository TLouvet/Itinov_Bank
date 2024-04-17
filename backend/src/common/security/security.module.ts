import { Module } from '@nestjs/common';
import { AuthenticationManager } from './AuthenticationManager';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthenticationManager],
  exports: [AuthenticationManager],
})
export class SecurityModule {}
