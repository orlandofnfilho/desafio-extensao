import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsuarioSwagger } from '../../common/swagger/usuario-swagger';
import { IsPublic } from '../auth/decorators/is-public-decorator';
import { RequestUsuarioDTO } from './request-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
@ApiTags('Usuários')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Cadastrar usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado com sucesso',
    type: UsuarioSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário já cadastrado',
  })
  async create(@Body() data: RequestUsuarioDTO) {
    return this.usuarioService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Resgatar usuário pelo Id' })
  @ApiResponse({
    status: 200,
    description: 'Usuário resgatado',
    type: UsuarioSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiBearerAuth()
  async findById(@Param('id') id: string) {
    return this.usuarioService.findById(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários cadastrados',
    type: UsuarioSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiBearerAuth()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Put(':id')
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Atualizar pelo Id' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: UsuarioSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário já cadastrado',
  })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() data: RequestUsuarioDTO) {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuário já cadastrado',
  })
  async delete(@Param('id') id: string) {
    return this.usuarioService.delete(id);
  }

  @Patch('role/:id/:role')
  // @HasRoles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Modificar role' })
  @ApiResponse({
    status: 200,
    description: 'Role modificada com sucesso',
    type: UsuarioSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiBearerAuth()
  async updateRole(@Param('id') id: string, @Param('role') role: string) {
    return this.usuarioService.updateRole(id, role);
  }
}
