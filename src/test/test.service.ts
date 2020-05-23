import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client/prisma-client.service';
import { TestDataDTO } from './test.dto';

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
    test,
    operator,
    instrumentalist,
    testSorurce: { sensor },
  }: TestDataDTO) {
    const newTest = this.prisma.test.create({
      data: {
        name: test.name,
        dateInit: test.dateInit,
        operator: {
          connect: {
            id: operator.id,
          },
        },
        instrumentalist: {
          connect: {
            id: instrumentalist.id,
          },
        },
        testsources: {
          create: [
            {
              sensor: {
                connect: {
                  id: sensor.id,
                },
              },
              datasource: {
                create: {
                  data: '[]',
                },
              },
            },
          ],
        },
      },
      include: {
        operator: true,
        instrumentalist: true,
      },
    });

    return newTest;
  }

  async updateTest() {
    const testUpdated = this.prisma.test.update({
      where: {
        id: 1,
      },
      data: {
        name: '',
        dateEnd: '',
        isEnd: true,
        operator: {
          connect: {
            id: 1,
          },
        },
        instrumentalist: {
          connect: {
            id: 1,
          },
        },
        testsources: {
          connect: [
            {
              id: 2,
            },
            {
              id: 2,
            },
          ],
        },
      },
    });
  }
}
