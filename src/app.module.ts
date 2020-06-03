import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { StaffModule } from './staff/staff.module';
import { SensorModule } from './sensor/sensor.module';
import { AppGateway } from './app.gateway';
import { DataSource } from './entities/DataSource.entity';
import { Instrumentalist } from './entities/Instrumentalist.entity';
import { Test } from './entities/Test.entity';
import { Operator } from './entities/Operator.entity';
import { Sensor } from './entities/Sensor.entity';
import { TestSource } from './entities/TestSource.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/dev.db',
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: [
        DataSource,
        Instrumentalist,
        Operator,
        Sensor,
        Test,
        TestSource,
      ],
    }),
    TestModule,
    StaffModule,
    SensorModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
