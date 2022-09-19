import { Module } from '@nestjs/common';
import { UsuarioeventoService } from './usuarioevento.service';
import { UsuarioeventoController } from './usuarioevento.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [UsuarioeventoController],
  providers: [UsuarioeventoService, PrismaService],
  exports: [UsuarioeventoService],
})
export class UsuarioeventoModule {}
