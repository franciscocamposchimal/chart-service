import { Injectable } from '@nestjs/common';
import { sensorModel } from '../models/sensor.model';
import { getRepository } from 'typeorm';
import { Sensor } from '../entities/Sensor.entity';

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
    const sensorsT = await getRepository(Sensor).find({where: { type: 'T'}});
    const sensorsP = await getRepository(Sensor).find({where: { type: 'P'}});
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
}
