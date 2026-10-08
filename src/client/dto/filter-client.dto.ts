import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FilterClientDto {
  @ApiProperty({
    description: 'Nome fantasia do Cliente',
    example: 'B91',
  })
  @IsString()
  fantasyName: string;

  @ApiProperty({
    description: 'CNPJ da Empresa',
    example: '70.892.449/0001-97',
  })
  @IsString()
  CNPJ: string;
}
