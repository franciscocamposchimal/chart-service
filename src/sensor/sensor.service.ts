import { Injectable } from '@nestjs/common';
import { sensorModel } from '../models/sensor.model';
import { getRepository } from 'typeorm';
import { Sensor } from '../entities/Sensor.entity';
import { json } from 'express';

@Injectable()
export class SensorService {
  constructor() {}

  async getAllSensors() {
    const sensors = await getRepository(Sensor).find({
      relations: ['testSources'],
    });
    return sensors;
  }

  async getSensorToGraph() {
    const sensorsT = await getRepository(Sensor).find({ where: { type: 'T' } });
    const sensorsP = await getRepository(Sensor).find({ where: { type: 'P' } });
    return { sensorsT, sensorsP };
  }

  async getOneSensor(id: any) {
    const sensor = await getRepository(Sensor).findOne({
      where: {
        id,
      },
      relations: ['testSources'],
    });
    return sensor;
  }

  async createSensor({ name, tag, type }: sensorModel) {
    const newSensor = await getRepository(Sensor).save({ name, tag, type });
    return newSensor;
  }

  async updateSensor(id: any, { name, tag, type }: sensorModel) {
    let data: any = {};
    if (name) data.name = name;
    if (tag) data.tag = tag;
    if (type) data.type = type;

    try {
      await getRepository(Sensor).update(id, data);
      return await this.getOneSensor(id);
    } catch (error) {
      return error;
    }
  }

  async deleteSensor(id: any) {
    try {
      const deleteConfirmation = await this.getOneSensor(id);
      await getRepository(Sensor).delete(id);
      return deleteConfirmation;
    } catch (error) {
      return error;
    }
  }

  dataConvert(type: any, sensorsValue: any[]): any[] {
    let convertedList: any[] = [];
    const roundVal: any = (num: any) => Math.round(num * 100) / 100;
    switch (type) {
      case 'F':
        convertedList = sensorsValue.map(sensor => {
          sensor.val = roundVal((sensor.val * 9) / 5 + 32);
          return sensor;
        });
        break;
      case 'Pa':
        convertedList = sensorsValue.map(sensor => {
          sensor.val = roundVal(sensor.val * 6895);
          return sensor;
        });
        break;
      case 'MPa':
        convertedList = sensorsValue.map(sensor => {
          sensor.val = roundVal(sensor.val / 145);
          return sensor;
        });
        break;
      default:
        break;
    }
    return convertedList;
  }
}
