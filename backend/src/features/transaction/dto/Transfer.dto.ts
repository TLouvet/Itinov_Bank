import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class TransferDTO {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  readonly senderID: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  readonly receiverID: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(10_000)
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly reference: string;
}
