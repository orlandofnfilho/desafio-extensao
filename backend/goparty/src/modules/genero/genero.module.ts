import { Module } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [GeneroController],
  providers: [GeneroService, PrismaService],
  exports: [GeneroService],
})
export class GeneroModule {}
