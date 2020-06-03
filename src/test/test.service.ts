import { Injectable } from '@nestjs/common';
import { TestModel } from '../models/test.model';
import { getRepository } from 'typeorm';
import { Test } from '../entities/Test.entity';

@Injectable()
export class TestService {
  constructor() {}

  async getAllTest() {
    const tests = await getRepository(Test).find({
      relations: ['instrumentalist', 'operator', 'testSources'],
    });
    return tests;
  }

  async getOneTest(id: any) {
    const test = await getRepository(Test).findOne({
      where: {
        id,
      },
      relations: ['instrumentalist', 'operator', 'testSources'],
    });
    return test;
  }

  async createTest({
    name,
    dateInit,
    operator,
    instrumentalist,
    testSorurces,
  }: TestModel) {
    const test = getRepository(Test);
    const newTest = await test.save(
      test.create({
        name,
        dateInit,
        operator: {
          id: parseInt(operator.id),
        },
        instrumentalist: {
          id: parseInt(instrumentalist.id),
        },
        testSources: testSorurces.map(({ id }) => {
          return { id: parseInt(id) };
        }),
      }),
    );
    return newTest;
  }

  async updateTest(
    id: any,
    { name, dateEnd, isEnd, operator, instrumentalist }: TestModel,
  ) {
    let data: any = {};

    if (name) data.name = name;
    if (dateEnd) data.dateEnd = dateEnd;
    if (isEnd || isEnd === false || isEnd === true) data.isEnd = isEnd;
    if (operator) data.operator = { id: parseInt(operator.id) };
    if (instrumentalist)
      data.instrumentalist = { id: parseInt(instrumentalist.id) };

    await getRepository(Test).update(id, data);

    return await this.getOneTest(id);
  }

  async deleteTest(id: any) {
    try {
      const deleteConfirmation = await this.getOneTest(id);
      await getRepository(Test).delete(id);
      return deleteConfirmation;
    } catch (error) {
      return error;
    }
  }
}
