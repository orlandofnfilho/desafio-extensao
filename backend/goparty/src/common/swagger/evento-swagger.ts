import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EventoSwagger {
  @ApiProperty()
  @IsString()
  id: string;

  @IsString()
  @ApiProperty()
  nome: string;

  @IsString()
  @ApiProperty()
  atracao: string;

  @IsString()
  @ApiProperty()
  data: string;

  @IsString()
  @ApiProperty()
  generoId: string;

  @IsString()
  @ApiProperty()
  estabelecimentoId: string;

  @IsString()
  @ApiProperty()
  descricao: string;

  @IsNumber()
  curtidas?: number;

  @IsString()
  @ApiProperty()
  urlImagem: string;

  @IsString()
  @ApiProperty()
  urlIngresso: string;
}
