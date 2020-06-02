import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClientService } from './prisma-client/prisma-client.service';
import { TestModule } from './test/test.module';
import { StaffModule } from './staff/staff.module';
import { SensorModule } from './sensor/sensor.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [TestModule, StaffModule, SensorModule],
  controllers: [AppController],
  providers: [AppService, PrismaClientService, AppGateway],
})
export class AppModule {}
