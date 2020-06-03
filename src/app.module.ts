import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClientService } from './prisma-client/prisma-client.service';
import { TestModule } from './test/test.module';
import { StaffModule } from './staff/staff.module';
import { SensorModule } from './sensor/sensor.module';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../prisma/dev.db',
      synchronize: true,
      logging: false,
      entities: [__dirname + '../*.entity{.ts,.js}'],
    }),
    TestModule, 
    StaffModule, 
    SensorModule],
  controllers: [AppController],
  providers: [AppService, PrismaClientService, AppGateway],
})
export class AppModule {}
