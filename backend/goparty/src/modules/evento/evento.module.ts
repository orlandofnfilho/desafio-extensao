import { Module } from '@nestjs/common';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [EventoController],
  providers: [EventoService, PrismaService],
  exports: [EventoService],
})
export class EventoModule {}
