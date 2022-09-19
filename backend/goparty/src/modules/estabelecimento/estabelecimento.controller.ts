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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { EstabelecimentoSwagger } from '../../common/swagger/estabelecimento-swagger';
import { IsPublic } from '../auth/decorators/is-public-decorator';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EstabelecimentoDTO } from './estabelecimento.dto';
import { EstabelecimentoService } from './estabelecimento.service';

@Controller('estabelecimentos')
@ApiTags('Estabelecimentos')
@ApiBearerAuth()
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @Post()
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Cadastrar estabelecimento' })
  @ApiResponse({
    status: 201,
    description: 'Estabelecimento cadastrado com sucesso',
    type: EstabelecimentoSwagger,
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
    description: 'Estabelecimento já cadastrado',
  })
  async create(@Body() data: EstabelecimentoDTO) {
    return this.estabelecimentoService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Resgatar pelo Id' })
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento resgatado com sucesso',
    type: EstabelecimentoSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 404,
    description: 'Estabelecimento não encontrado',
  })
  async findById(@Param('id') id: string) {
    return this.estabelecimentoService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os estabelecimentos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estabelecimentos cadastrados',
    type: EstabelecimentoSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  async findAll() {
    return this.estabelecimentoService.findAll();
  }

  @Put(':id')
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Atualizar pelo Id' })
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento atualizado com sucesso',
    type: EstabelecimentoSwagger,
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
    description: 'Estabelecimento já cadastrado',
  })
  async update(@Param('id') id: string, @Body() data: EstabelecimentoDTO) {
    return this.estabelecimentoService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Deletar estabelecimento' })
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento resgatado com sucesso',
    type: EstabelecimentoSwagger,
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
    description: 'Estabelecimento não encontrado',
  })
  async delete(@Param('id') id: string) {
    return this.estabelecimentoService.delete(id);
  }
}
