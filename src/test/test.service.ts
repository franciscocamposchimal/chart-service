import { Injectable } from '@nestjs/common';
import { getRepository, In } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { TestModel } from '../models/test.model';
import { dataSourceModel } from '../models/dataSource.model';
import { Test } from '../entities/Test.entity';
import { Operator } from '../entities/Operator.entity';
import { Instrumentalist } from '../entities/Instrumentalist.entity';
import { Sensor } from '../entities/Sensor.entity';
import { DataSource } from '../entities/DataSource.entity';
import { TestSource } from '../entities/TestSource.entity';
import { formatDateToday } from '../helpers/FormatDate';
import { dir } from 'console';

@Injectable()
export class TestService {
  constructor() {}

  async getAllTest() {
    const tests = await getRepository(Test).find({
      order: {
        id: 'DESC',
      },
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

  async getTestInProgress() {
    const testRep = getRepository(Test);

    const findLastTest = await testRep.findOne({
      where: { isEnd: false },
      relations: [
        'testSources',
        'testSources.sensor',
        'testSources.datasource',
      ],
    });

    if (!findLastTest) {
      return {};
    }
    return findLastTest;
  }

  async getOneTest(id: any) {
    const test = await getRepository(Test).findOne({
      where: {
        id,
      },
      relations: [
        'instrumentalist',
        'operator',
        'testSources',
        'testSources.sensor',
        'testSources.datasource',
      ],
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
    const testRep = getRepository(Test);

    const findLastTest = await testRep.find({
      where: { isEnd: false },
      order: { id: 'DESC' },
      take: 1,
    });

    if (findLastTest.length === 1) {
      return findLastTest;
    }
    const sensorRep = getRepository(Sensor);
    const operatorRep = getRepository(Operator);
    const dataSourceRep = getRepository(DataSource);
    const testSourceRep = getRepository(TestSource);
    const instrumentalistRep = getRepository(Instrumentalist);

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
      select: ['id', 'tag'],
      where: { id: In([...sensorsTSelected, ...sensorsPSelected]) },
    });
    //creamos la carpte y archivos para los datos de sensores
    this.createDir(name.replace(/\s+/g, ''));
    // const jsonData = this.readFile(name, 's1');
    // creamos los data sorces a partir de la cantidad de sensores
    const dataSourceForSensors = await dataSourceRep.save(
      dataSourceRep.create(
        findSensors.map(({ tag }) => {
          const pathToSave = this.createOrUpdateFile(
            `../../database/data/${name.replace(/\s+/g, '')}/${tag}.json`,
            { data: [] },
          );
          return {
            data: pathToSave,
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

  async endCurrentTest() {
    const testRep = getRepository(Test);

    const findLastTest = await testRep.findOne({
      where: { isEnd: false },
    });

    if (!findLastTest) {
      return {};
    }

    findLastTest.dateEnd = formatDateToday();
    findLastTest.isEnd = true;

    const testEnded = await testRep.save(findLastTest);

    return testEnded;
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

  async updateDataSource(dirToFile: any, sensorValue: any) {
    try {
      const dataFile: any = this.readFile(dirToFile);
      dataFile.data.push(sensorValue);
      this.createOrUpdateFile(dirToFile, dataFile);
      return { message: 'update success' };
    } catch (error) {
      return { message: error };
    }
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

  private createDir(dirPath: any) {
    const pathToDir = path.join(__dirname, `../../database/data/${dirPath}`);

    fs.mkdirSync(pathToDir, { recursive: true });
    console.log(pathToDir);
  }

  private createOrUpdateFile(dirPath: any, data: any) {
    const pathToDir = path.join(__dirname, dirPath);

    fs.writeFileSync(pathToDir, JSON.stringify(data));

    return dirPath;
  }

  private readFile(dirPath: any) {
    const pathToDir = path.join(__dirname, dirPath);

    const dataSourceJson = fs.readFileSync(pathToDir, {
      encoding: 'utf8',
      flag: 'r',
    });

    return JSON.parse(dataSourceJson);
  }
}
