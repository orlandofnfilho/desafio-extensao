import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UsuarioEventoRequest {
  @ApiProperty()
  @IsString()
  usuarioId: string;

  @ApiProperty()
  @IsString()
  eventoId: string;
}
