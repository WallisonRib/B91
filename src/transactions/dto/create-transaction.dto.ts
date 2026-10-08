import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsString, Max } from 'class-validator';
import { Status, TransactionType } from '../../generated/prisma/enums.js';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Id  do Cliente',
    example: '5097721b-dd33-480b-aeb7-24a9c66af472',
  })
  @IsString()
  clientId: string;

  @ApiProperty({
    description: 'Valor da transação',
    example: '250',
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Data da transação',
    example: new Date().toISOString(),
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'Tipo da transação',
    example: TransactionType.CREDIT,
  })
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @ApiProperty({
    description: 'Quantidade de parcelas da Transação',
    example: 1,
  })
  @IsNumber()
  installment: number;

  @ApiProperty({
    description: 'Status da transação',
    example: Status.APPROVED,
  })
  @IsEnum(Status)
  status: Status;
}
