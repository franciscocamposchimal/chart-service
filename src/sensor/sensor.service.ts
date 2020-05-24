import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { sensorModel } from 'src/models/sensor.model';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaClientService) {}

  async getAllSensors() {
    const sensors = await this.prisma.sensor.findMany();
    return sensors;
  }

  async getOneSensor(id: any) {
    const sensor = this.prisma.sensor.findOne({ where: { id: parseInt(id) } });
    return sensor;
  }

  async createSensor({ name, tag }: sensorModel) {
    const newSensor = this.prisma.sensor.create({
      data: {
        name,
        tag,
      },
    });
    return newSensor;
  }

  async updateSensor(id: any, { name, tag }: sensorModel) {
    let data: any = {};
    if (name) data.name = name;
    if (tag) data.tag = tag;

    try {
      const sensorUpdated = this.prisma.sensor.update({
        where: { id: parseInt(id) },
        data,
      });
      return sensorUpdated;
    } catch (error) {
      return error;
    }
  }

  async deleteSensor(id: any) {
    try {
      const deleteConfirmation = this.prisma.sensor.delete({
        where: { id: parseInt(id) },
      });
      return deleteConfirmation;
    } catch (error) {
      return error;
    }
  }
}
