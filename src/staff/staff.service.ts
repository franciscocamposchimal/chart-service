import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client/prisma-client.service';
import { OperatorModel } from '../models/operator.model';
import { instrumentalistModel } from '../models/instrumentalist.model';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaClientService) {}

  // Gets Operator
  async getAllOperators() {
    const operators = await this.prisma.operator.findMany({
      include: {
        tests: true,
      },
    });
    return operators;
  }

  async getOneOperator(id: any) {
    const operator = await this.prisma.operator.findOne({
      where: {
        id: parseInt(id),
      },
      include: {
        tests: true,
      },
    });
    return operator;
  }

  // Gets Instrumentalist
  async getAllInstrumentalist() {
    const instrumentalists = await this.prisma.instrumentalist.findMany({
      include: {
        tests: true,
      },
    });
    return instrumentalists;
  }

  async getOneInstrumentalist(id: any) {
    const instrumentalist = await this.prisma.instrumentalist.findOne({
      where: {
        id: parseInt(id),
      },
      include: {
        tests: true,
      },
    });
    return instrumentalist;
  }

  // Post Operator
  async createOperator({ name }: OperatorModel) {
    const newOperator = this.prisma.operator.create({
      data: {
        name,
      },
    });
    return newOperator;
  }

  // Post Instrumentalist
  async createInstrumentalist({ name }: instrumentalistModel) {
    const newInstrumentalist = this.prisma.instrumentalist.create({
      data: {
        name,
      },
    });
    return newInstrumentalist;
  }

  // Put Operator
  async updateOperator(id: string, name: string) {
    const operatorUpdated = this.prisma.operator.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
      include: {
        tests: true,
      },
    });
    return operatorUpdated;
  }

  // Put Instrumentalist
  async updateInstrumentalist(id: string, name: string) {
    const instrumentalistUpdated = this.prisma.instrumentalist.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
      include: {
        tests: true,
      },
    });
    return instrumentalistUpdated;
  }

  // Delete Operator
  async deleteOperator(id: string) {
    const deleConfirmation = this.prisma.operator.delete({
      where: { id: parseInt(id) },
      include: { tests: true },
    });
    return deleConfirmation;
  }

  // Delete Instrumentalist
  async deleteInstrumentalist(id: string) {
    const deleConfirmation = this.prisma.instrumentalist.delete({
      where: { id: parseInt(id) },
      include: { tests: true },
    });
    return deleConfirmation;
  }
}
