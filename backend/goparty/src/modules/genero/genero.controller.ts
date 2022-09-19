import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { GeneroSwagger } from '../../common/swagger/genero-swagger';
import { IsPublic } from '../auth/decorators/is-public-decorator';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GeneroDTO } from './genero.dto';
import { GeneroService } from './genero.service';

@Controller('generos')
@ApiTags('Gêneros')
@ApiBearerAuth()
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Post()
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Cadastrar gênero' })
  @ApiResponse({
    status: 201,
    description: 'Genero cadastrado com sucesso',
    type: GeneroSwagger,
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
    description: 'Gênero já cadastrado',
  })
  async create(@Body() data: GeneroDTO) {
    return this.generoService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Resgatar pelo Id' })
  @ApiResponse({
    status: 200,
    description: 'Genero resgatado com sucesso',
    type: GeneroSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 404,
    description: 'Gênero não encontrado',
  })
  async findById(@Param('id') id: string) {
    return this.generoService.findById(id);
  }

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Listar todos os gêneros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de gêneros cadastrados',
    type: GeneroSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  async findAll() {
    return this.generoService.findAll();
  }

  @Put(':id')
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Atualizar pelo Id' })
  @ApiResponse({
    status: 200,
    description: 'Genero atualizado com sucesso',
    type: GeneroSwagger,
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
    description: 'Gênero já cadastrado',
  })
  async update(@Param('id') id: string, @Body() data: GeneroDTO) {
    return this.generoService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Deletar gênero' })
  @ApiResponse({
    status: 200,
    description: 'Genero resgatado com sucesso',
    type: GeneroSwagger,
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
    description: 'Gênero não encontrado',
  })
  async delete(@Param('id') id: string) {
    return this.generoService.delete(id);
  }
}
