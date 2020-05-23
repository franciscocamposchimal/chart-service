import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClientService } from './prisma-client/prisma-client/prisma-client.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [TestModule],
  controllers: [AppController],
  providers: [AppService, PrismaClientService],
})
export class AppModule {}
