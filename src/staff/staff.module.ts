import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { PrismaClientService } from '../prisma-client/prisma-client.service';

@Module({
  providers: [StaffService, PrismaClientService],
  controllers: [StaffController],
})
export class StaffModule {}