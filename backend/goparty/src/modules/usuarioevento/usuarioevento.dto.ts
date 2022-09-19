import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UsuarioEventoDTO {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  usuarioId: string;

  @ApiProperty()
  @IsString()
  eventoId: string;
}
