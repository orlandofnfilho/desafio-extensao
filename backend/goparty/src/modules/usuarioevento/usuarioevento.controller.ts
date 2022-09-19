import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsuarioEventoSwagger } from '../../common/swagger/curtida-swagger';
import { UsuarioEventoRequest } from './usuarioevento-request';
import { UsuarioEventoDTO } from './usuarioevento.dto';
import { UsuarioeventoService } from './usuarioevento.service';

@Controller('usuarioeventos')
@ApiTags('Curtidas')
export class UsuarioeventoController {
  constructor(private readonly usuarioeventoService: UsuarioeventoService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar curtida' })
  @ApiResponse({
    status: 201,
    description: 'Curtida cadastrada com sucesso',
    type: UsuarioEventoSwagger,
  })
  @ApiBearerAuth()
  async create(@Body() data: UsuarioEventoRequest) {
    return this.usuarioeventoService.create(data);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover curtida' })
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return this.usuarioeventoService.delete(id);
  }
}
