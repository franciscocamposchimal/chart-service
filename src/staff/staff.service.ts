import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { OperatorModel } from '../models/operator.model';
import { instrumentalistModel } from '../models/instrumentalist.model';
import { Operator } from '../entities/Operator.entity';
import { Instrumentalist } from '../entities/Instrumentalist.entity';

@Injectable()
export class StaffService {
  constructor() {}
  // Gets Operator
  async getAllOperators() {
    const operators = await getRepository(Operator).find({
      order:{ id: 'DESC' },
      relations: ['tests'],
    });
    return operators;
  }

  async getOneOperator(id: any) {
    const operator = await getRepository(Operator).findOne({
      where: {
        id,
      },
      relations: ['tests'],
    });
    return operator;
  }

  // Gets Instrumentalist
  async getAllInstrumentalist() {
    const instrumentalists = await getRepository(Instrumentalist).find({
      order:{ id: 'DESC' },
      relations: ['tests'],
    });
    return instrumentalists;
  }

  async getOneInstrumentalist(id: any) {
    const instrumentalist = await getRepository(Instrumentalist).findOne({
      where: {
        id,
      },
      relations: ['tests'],
    });
    return instrumentalist;
  }

  // Post Operator
  async createOperator({ name }: OperatorModel) {
    const newOperator = await getRepository(Operator).save({ name });
    return newOperator;
  }

  // Post Instrumentalist
  async createInstrumentalist({ name }: instrumentalistModel) {
    const newInstrumentalist = await getRepository(Instrumentalist).save({
      name,
    });
    return newInstrumentalist;
  }

  // Put Operator
  async updateOperator(id: string, name: string) {
    await getRepository(Operator).update(id, { name });
    return await this.getOneOperator(id);
  }

  // Put Instrumentalist
  async updateInstrumentalist(id: string, name: string) {
    await getRepository(Instrumentalist).update(id, { name });
    return await this.getOneInstrumentalist(id);
  }

  // Delete Operator
  async deleteOperator(id: string) {
    const deleConfirmation = await this.getOneOperator(id);
    await getRepository(Operator).delete(id);
    return deleConfirmation;
  }

  // Delete Instrumentalist
  async deleteInstrumentalist(id: string) {
    const deleConfirmation = await this.getOneInstrumentalist(id);
    await getRepository(Instrumentalist).delete(id);
    return deleConfirmation;
  }
}
