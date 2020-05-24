import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClientService } from './prisma-client/prisma-client/prisma-client.service';
import { TestModule } from './test/test.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [TestModule, StaffModule],
  controllers: [AppController],
  providers: [AppService, PrismaClientService],
})
export class AppModule {}
