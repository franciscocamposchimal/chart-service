import { Injectable } from '@nestjs/common';
import { TestModel } from '../models/test.model';
import { getRepository, In } from 'typeorm';
import { Test } from '../entities/Test.entity';
import { Operator } from '../entities/Operator.entity';
import { Instrumentalist } from '../entities/Instrumentalist.entity';
import { Sensor } from '../entities/Sensor.entity';
import { DataSource } from '../entities/DataSource.entity';
import { TestSource } from '../entities/TestSource.entity';

@Injectable()
export class TestService {
  constructor() {}

  async getAllTest() {
    const tests = await getRepository(Test).find({
      relations: [
        'instrumentalist',
        'operator',
        'testSources',
        'testSources.sensor',
        'testSources.datasource',
      ],
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
    sensorsTSelected,
    sensorsPSelected,
  }: TestModel) {
    // Repositorios a trabajar
    const operatorRep = getRepository(Operator);
    const instrumentalistRep = getRepository(Instrumentalist);
    const sensorRep = getRepository(Sensor);
    const testRep = getRepository(Test);
    const dataSourceRep = getRepository(DataSource);
    const testSourceRep = getRepository(TestSource);

    // buscamos si existen
    let findOp = await operatorRep.findOne({
      where: { name: operator.name },
      relations: ['tests'],
    });
    let findInst = await instrumentalistRep.findOne({
      where: { name: instrumentalist.name },
      relations: ['tests'],
    });
    // validamos si se encontro, si no lo creamos
    if (!findOp) {
      findOp = await operatorRep.save(
        operatorRep.create({ name: operator.name }),
      );
    }
    if (!findInst) {
      findInst = await instrumentalistRep.save(
        instrumentalistRep.create({ name: instrumentalist.name }),
      );
    }
    // obtenemos los sensores
    const findSensors = await sensorRep.find({
      select: ['id'],
      where: { id: In([...sensorsTSelected, ...sensorsPSelected]) },
    });
    // creamos los data sorces a partir de la cantidad de sensores
    const dataSourceForSensors = await dataSourceRep.save(
      dataSourceRep.create(
        findSensors.map(() => {
          return {
            data: '[]',
          };
        }),
      ),
    );
    // se crea el objeto para crear los test source y se guarda
    const testSourceForTest = await testSourceRep.save(
      testSourceRep.create(
        findSensors.map(({ id }, index) => {
          return {
            datasource: { id: dataSourceForSensors[index].id },
            sensor: { id },
          };
        }),
      ),
    );

    const newTest = testRep.save(
      testRep.create({
        name,
        dateInit,
        operator: { id: findOp.id },
        instrumentalist: { id: findInst.id },
        testSources: testSourceForTest.map(({ id }) => {
          return { id };
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
