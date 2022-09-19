import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcrypt';
import { RoleDTO } from './role.dto';
import { RequestUsuarioDTO } from './request-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: RequestUsuarioDTO) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: {
        email: data.email,
      },
    });

    if (usuarioExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: ['Usuário já cadastrado'],
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }
    data.senha = await bcrypt.hash(data.senha, 10);

    const usuario = await this.prisma.usuario.create({
      data,
    });
    return {
      ...usuario,
      senha: undefined,
    };
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Usuário não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      ...usuarioExistente,
      senha: undefined,
    };
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
      },
    });
  }

  async update(id: string, data: RequestUsuarioDTO) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    if (!usuarioExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Usuário não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    data.senha = await bcrypt.hash(data.senha, 10);

    const usuario = await this.prisma.usuario.update({
      data,
      where: {
        id,
      },
    });
    return {
      ...usuario,
      senha: undefined,
    };
  }

  async delete(id: string) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: {
        id,
      },
    });
    if (!usuarioExistente) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: ['Usuário não encontrado'],
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.usuario.delete({
      where: {
        id,
      },
    });
  }

  async updateRole(id: string, role: string) {
    const usuarioExistente = await this.findById(id);
    if (role == '2') {
      return await this.prisma.usuario.update({
        where: {
          id,
        },
        data: {
          role: RoleDTO.ADMIN,
        },
      });
    } else if (role == '1') {
      return await this.prisma.usuario.update({
        where: {
          id,
        },
        data: {
          role: RoleDTO.USUARIO,
        },
      });
    }
  }
}
