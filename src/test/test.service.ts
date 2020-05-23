import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client/prisma-client.service';
import { TestModel } from '../models/test.model';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaClientService) {}

  async getAllTest() {
    const tests = await this.prisma.test.findMany({
      include: {
        operator: true,
        instrumentalist: true,
      },
    });
    return tests;
  }

  async getOneTest(id: any) {
    const test = await this.prisma.test.findOne({
      where: {
        id: parseInt(id),
      },
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
    const newTest = await this.prisma.test.create({
      data: {
        name,
        dateInit,
        operator: {
          connect: {
            id: parseInt(operator.id),
          },
        },
        instrumentalist: {
          connect: {
            id: parseInt(instrumentalist.id),
          },
        },
        testsources: {
          connect: testSorurces.map(({ id }) => {
            return { id: parseInt(id) };
          }),
        },
      },
      include: {
        operator: true,
        instrumentalist: true,
        testsources: true,
      },
    });

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
    if (operator) data.operator = { connect: { id: parseInt(operator.id) } };
    if (instrumentalist)
      data.instrumentalist = { connect: { id: parseInt(instrumentalist.id) } };

    const testUpdated = await this.prisma.test.update({
      where: {
        id: parseInt(id),
      },
      data,
      include: {
        operator: true,
        instrumentalist: true,
        testsources: true,
      },
    });

    return testUpdated;
  }

  async deleteTest(id: any) {
    try {
      const deleteConfirmation = await this.prisma.test.delete({
        where: { id: parseInt(id) },
        include: {
          operator: true,
          instrumentalist: true,
          testsources: true,
        },
      });
      return deleteConfirmation;
    } catch (error) {
      return error;
    }
  }
}
