import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { EstabelecimentoDTO } from './estabelecimento.dto';

@Injectable()
export class EstabelecimentoService {
  constructor(private prisma: PrismaService) {}

  async create(data: EstabelecimentoDTO) {
    const estabelecimentoExistente =
      await this.prisma.estabelecimento.findFirst({
        where: {
          nome: data.nome,
        },
      });

    if (estabelecimentoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: ['Estabelecimento já cadastrado'],
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    const estabelecimento = await this.prisma.estabelecimento.create({
      data,
    });

    return estabelecimento;
  }

  async findById(id: string) {
    const estabelecimentoExistente =
      await this.prisma.estabelecimento.findFirst({
        where: {
          id,
        },
      });

    if (!estabelecimentoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Estabelecimento não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return estabelecimentoExistente;
  }

  async findAll() {
    return this.prisma.estabelecimento.findMany();
  }

  async update(id: string, data: EstabelecimentoDTO) {
    const estabelecimentoExistente =
      await this.prisma.estabelecimento.findUnique({
        where: {
          id,
        },
      });
    if (!estabelecimentoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Estabelecimento não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const estabelecimento = await this.prisma.estabelecimento.update({
      data,
      where: {
        id,
      },
    });
    return estabelecimento;
  }

  async delete(id: string) {
    const estabelecimentoExistente =
      await this.prisma.estabelecimento.findUnique({
        where: { id },
      });
    if (!estabelecimentoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Estabelecimento não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.estabelecimento.delete({
      where: {
        id,
      },
    });
  }
}
