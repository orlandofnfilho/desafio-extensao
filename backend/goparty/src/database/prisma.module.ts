import { Module } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
