import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventoDTO } from './evento.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class EventoService {
  constructor(private prisma: PrismaService) {}
  async create(data: EventoDTO) {
    const eventoExistente = await this.prisma.evento.findUnique({
      where: {
        nome: data.nome,
      },
    });

    if (eventoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: ['Evento já cadastrado'],
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    const dataEvento = new Date(data.data);
    data.data = dataEvento.toISOString();
    const evento = await this.prisma.evento.create({
      data,
      include: {
        genero: {
          select: {
            nome: true,
          },
        },
        estabelecimento: {
          select: {
            nome: true,
          },
        },
      },
    });

    return evento;
  }

  async findByAll() {
    return await this.prisma.evento.findMany({
      orderBy: {
        data: 'desc',
      },
      include: {
        genero: {
          select: {
            nome: true,
          },
        },
        estabelecimento: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  async findByNome(nome: string) {
    return await this.prisma.evento.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
      include: {
        genero: {
          select: {
            nome: true,
          },
        },
        estabelecimento: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  async findByGenero(genero: string) {
    return await this.prisma.evento.findMany({
      where: {
        genero: {
          nome: {
            equals: genero,
          },
        },
      },
      include: {
        genero: {
          select: {
            nome: true,
          },
        },
        estabelecimento: {
          select: {
            nome: true,
          },
        },
      },
    });
  }

  async findByCurtidas(usuarioId: string) {
    return await this.prisma.evento.findMany({
      where: {
        usuarios: {
          some: {
            usuarioId: {
              equals: usuarioId,
            },
          },
        },
      },
    });
  }

  async findById(id: string) {
    const eventoExistente = await this.prisma.evento.findUnique({
      where: {
        id,
      },
      include: {
        genero: {
          select: {
            nome: true,
          },
        },
        estabelecimento: {
          select: {
            nome: true,
          },
        },
      },
    });

    if (!eventoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Evento não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return eventoExistente;
  }
  async update(id: string, data: EventoDTO) {
    const eventoExistente = await this.prisma.evento.findUnique({
      where: {
        id,
      },
      include: {
        genero: {
          select: {
            nome: true,
          },
        },
        estabelecimento: {
          select: {
            nome: true,
          },
        },
      },
    });
    if (!eventoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Evento não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const dataEvento = new Date(data.data);
    data.data = dataEvento.toISOString();
    const evento = await this.prisma.evento.update({
      data,
      where: {
        id,
      },
    });
    return evento;
  }

  async delete(id: string) {
    const eventoExistente = await this.prisma.evento.findUnique({
      where: {
        id,
      },
    });
    if (!eventoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Evento não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.prisma.evento.delete({
      where: {
        id,
      },
    });
  }
}
