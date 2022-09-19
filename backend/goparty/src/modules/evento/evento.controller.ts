import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { query } from 'express';
import { EventoSwagger } from '../../common/swagger/evento-swagger';
import { IsPublic } from '../auth/decorators/is-public-decorator';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EventoDTO } from './evento.dto';
import { EventoService } from './evento.service';

@Controller('eventos')
@ApiTags('Eventos')
@ApiBearerAuth()
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Cadastrar evento' })
  @ApiResponse({
    status: 201,
    description: 'Evento cadastrado com sucesso',
    type: EventoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  @ApiResponse({
    status: 409,
    description: 'Evento já cadastrado',
  })
  async create(@Body() data: EventoDTO) {
    return this.eventoService.create(data);
  }

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Listar todos os eventos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de eventos cadastrados',
    type: EventoSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  async findAll() {
    return this.eventoService.findByAll();
  }

  @Get('/nome?')
  @ApiOperation({ summary: 'Filtrar por nome' })
  @ApiResponse({
    status: 200,
    description: 'Lista de eventos por nome',
    type: EventoSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  async findByNome(@Query('nome') nome: string) {
    return this.eventoService.findByNome(nome);
  }

  @Get('/genero/:genero')
  @ApiOperation({ summary: 'Filtrar por gênero' })
  @ApiResponse({
    status: 200,
    description: 'Lista de eventos por gênero',
    type: EventoSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  async findByGenero(@Param('genero') genero: string) {
    return this.eventoService.findByGenero(genero);
  }

  @Get('/curtidas/:usuarioId')
  @ApiOperation({ summary: 'Filtrar por usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de eventos por curtidas de usuário',
    type: EventoSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  async findByCurtidas(@Param('usuarioId') usuarioId: string) {
    return this.eventoService.findByCurtidas(usuarioId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Resgatar pelo Id' })
  @ApiResponse({
    status: 200,
    description: 'Evento resgatado com sucesso',
    type: EventoSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado',
  })
  async findById(@Param('id') id: string) {
    return this.eventoService.findById(id);
  }

  @Put(':id')
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Atualizar pelo Id' })
  @ApiResponse({
    status: 200,
    description: 'Evento atualizado com sucesso',
    type: EventoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  @ApiResponse({
    status: 409,
    description: 'Evento já cadastrado',
  })
  async update(@Param('id') id: string, @Body() data: EventoDTO) {
    return this.eventoService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Deletar evento' })
  @ApiResponse({
    status: 200,
    description: 'Evento resgatado com sucesso',
    type: EventoSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado',
  })
  async delete(@Param('id') id: string) {
    return this.eventoService.delete(id);
  }
}
