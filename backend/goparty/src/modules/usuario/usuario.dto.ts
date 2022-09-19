import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleDTO } from './role.dto';

export class UsuarioDTO {
  @ApiProperty()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @MinLength(6)
  @IsString()
  @ApiProperty()
  senha: string;

  @ApiProperty({ enum: ['ADMIN', 'USUARIO'] })
  role: RoleDTO;
}
