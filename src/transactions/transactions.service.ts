import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RiskLevel } from '../generated/prisma/enums.js';
import { FilterTransactionsDto } from './dto/filter-transactions.dto.js';
import { setFinalValue } from './auxiliary-methods/set-final-value.js';
import { setTaxValue } from './auxiliary-methods/set-tax-value.js';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const installment = createTransactionDto.installment;
    let value = createTransactionDto.value;
    let tax = setTaxValue(installment);
    let finalValue = setFinalValue(value, installment);
    let riskLevel: RiskLevel = await this.defineRiskLevel(createTransactionDto);

    return this.prisma.transactions.create({
      data: {
        finalValue,
        tax,
        riskLevel,
        ...createTransactionDto,
      },
    });
  }

  findAll(FilterTransactions: FilterTransactionsDto) {
    return this.prisma.transactions.findMany({
      where: {
        date: {
          gte: FilterTransactions.startDate,
          lte: FilterTransactions.endDate,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.transactions.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transactions.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: string) {
    return this.prisma.transactions.delete({
      where: { id },
    });
  }

  async TransactionsCountLastFiveMinutes(clientId: String) {
    let fiveAgo = new Date(Date.now() - 1000 * (60 * 5)).toISOString();
    let count = await this.prisma.transactions.count({
      where: {
        date: {
          gte: fiveAgo,
        },
      },
    });
    return !!(count > 5);
  }

  async defineRiskLevel(createTransactionDto: CreateTransactionDto) {
    let riskLevel,
      value = createTransactionDto.value;

    let moreThan5 = await this.TransactionsCountLastFiveMinutes(
      createTransactionDto.clientId,
    );

    let parsedHour = new Date(createTransactionDto.date).getHours();
    let uncommonHour = parsedHour < 5;

    if (value >= 10000) riskLevel = RiskLevel.HIGH;
    else if (moreThan5) riskLevel = RiskLevel.MEDIUM;
    // Cliente com MMC suspeito -> Risco médio;  Matheus recomendou a não usar esse tópico por ser algo relacionado ao mercado Financeiro, que talvez eu não teria conhecimento.
    else if (uncommonHour) riskLevel = RiskLevel.LOW;
    // O teste não especifica diretamente, optei por setar toda transação "sem categoria" como com risco baixo
    else riskLevel = RiskLevel.LOW;

    return riskLevel;
  }
}
