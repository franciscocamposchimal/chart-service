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

  async getOneSensor(id: any) {
    const sensor = await getRepository(Sensor).findOne({
      where: {
        id,
      },
      relations: ['testSources'],
    });
    return sensor;
  }

  async createSensor({ name, tag }: sensorModel) {
    const newSensor = await getRepository(Sensor).save({ name, tag });
    return newSensor;
  }

  async updateSensor(id: any, { name, tag }: sensorModel) {
    let data: any = {};
    if (name) data.name = name;
    if (tag) data.tag = tag;

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
