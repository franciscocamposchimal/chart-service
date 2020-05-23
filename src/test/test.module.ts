import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { PrismaClientService } from '../prisma-client/prisma-client/prisma-client.service';

@Module({
  providers: [TestService, PrismaClientService],
  controllers: [TestController],
})
export class TestModule {}
