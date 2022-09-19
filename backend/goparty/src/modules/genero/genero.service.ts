import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GeneroDTO } from './genero.dto';

@Injectable()
export class GeneroService {
  constructor(private prisma: PrismaService) {}

  async create(data: GeneroDTO) {
    const generoExistente = await this.prisma.genero.findUnique({
      where: {
        nome: data.nome,
      },
    });

    if (generoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: ['Gênero já cadastrado'],
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }

    const genero = await this.prisma.genero.create({
      data,
    });

    return genero;
  }

  async findById(id: string) {
    const generoExistente = await this.prisma.genero.findUnique({
      where: {
        id,
      },
    });

    if (!generoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Gênero não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return generoExistente;
  }

  async findAll() {
    return this.prisma.genero.findMany();
  }

  async update(id: string, data: GeneroDTO) {
    const generoExistente = await this.prisma.genero.findUnique({
      where: {
        id,
      },
    });

    if (!generoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Gênero não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const genero = await this.prisma.genero.update({
      data,
      where: {
        id,
      },
    });

    return genero;
  }

  async delete(id: string) {
    const generoExistente = await this.prisma.genero.findUnique({
      where: {
        id,
      },
    });

    if (!generoExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Gênero não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.genero.delete({
      where: {
        id,
      },
    });
  }
}
