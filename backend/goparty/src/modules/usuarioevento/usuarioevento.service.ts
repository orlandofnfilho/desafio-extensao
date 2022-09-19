import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UsuarioEventoDTO } from './usuarioevento.dto';

@Injectable()
export class UsuarioeventoService {
  constructor(private prisma: PrismaService) {}

  async create(data: UsuarioEventoDTO) {
    const curtidaExistente = await this.prisma.usuarioEvento.findFirst({
      where: {
        usuarioId: data.usuarioId,
        eventoId: data.eventoId,
      },
    });

    if (curtidaExistente) {
      return null;
    }
    const evento = await this.prisma.evento.findUnique({
      where: {
        id: data.eventoId,
      },
    });
    await this.prisma.evento.update({
      where: {
        id: evento.id,
      },
      data: {
        curtidas: ++evento.curtidas,
      },
    });

    const UsuarioEvento = await this.prisma.usuarioEvento.create({
      data,
    });
    return UsuarioEvento;
  }

  async delete(id: string) {
    const curtida = await this.prisma.usuarioEvento.findUnique({
      where: {
        id,
      },
    });

    const eventoCurtido = await this.prisma.evento.findUnique({
      where: {
        id: curtida.eventoId,
      },
    });

    await this.prisma.evento.update({
      where: {
        id: eventoCurtido.id,
      },
      data: {
        curtidas: --eventoCurtido.curtidas,
      },
    });

    return await this.prisma.usuarioEvento.delete({
      where: {
        id,
      },
    });
  }
}
