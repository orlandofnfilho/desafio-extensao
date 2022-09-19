import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService, PrismaService],
  exports: [EstabelecimentoService],
})
export class EstabelecimentoModule {}
