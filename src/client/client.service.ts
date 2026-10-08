import { Injectable } from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { RiskLevel } from '../generated/prisma/enums.js';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        ...createClientDto,
      },
    });
  }

  findAll() {
    return this.prisma.client.findMany({});
  }

  async getAnalytics(id: string) {
    let [lowRisk, mediumRisk, highRisk] = await this.prisma.$transaction([
      this.prisma.transactions.count({
        where: {
          clientId: id,
          riskLevel: RiskLevel.LOW,
        },
      }),

      this.prisma.transactions.count({
        where: {
          clientId: id,
          riskLevel: RiskLevel.MEDIUM,
        },
      }),

      this.prisma.transactions.count({
        where: {
          clientId: id,
          riskLevel: RiskLevel.HIGH,
        },
      }),
    ]);

    let total = lowRisk + mediumRisk + highRisk;

    let risksObject = {
      low: {
        count: lowRisk,
        percentage: (lowRisk / total) * 100,
      },
      medium: {
        count: mediumRisk,
        percentage: (mediumRisk / total) * 100,
      },
      high: {
        count: highRisk,
        percentage: (highRisk / total) * 100,
      },
    };
    return risksObject;
  }

  findOne(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  remove(id: string) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
