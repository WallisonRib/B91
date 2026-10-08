import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FilterTransactionsDto {
  @ApiProperty({
    description: 'clientId',
    example: '5097721b-dd33-480b-aeb7-24a9c66af472',
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    description: 'startDate',
    example: '2026-10-08T20:03:10.883Z',
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    description: 'startDate',
    example: '2026-10-08T21:03:10.883Z',
  })
  @IsString()
  endDate: string;
}
