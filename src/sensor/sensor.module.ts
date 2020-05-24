import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { PrismaClientService } from '../prisma-client/prisma-client.service';

@Module({
  providers: [SensorService, PrismaClientService],
  controllers: [SensorController],
})
export class SensorModule {}
