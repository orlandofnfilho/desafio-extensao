import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { RoleDTO } from '../../modules/usuario/role.dto';

export class UsuarioSwagger {
  @ApiProperty()
  @IsString()
  id: string;

  @IsString()
  @ApiProperty()
  nome: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['ADMIN', 'USUARIO'] })
  role: RoleDTO;
}
