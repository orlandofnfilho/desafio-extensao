import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EventoDTO {
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  atracao: string;

  @IsString()
  @ApiProperty()
  data: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  generoId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  estabelecimentoId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @IsNumber()
  curtidas?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  urlImagem: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  urlIngresso: string;
}
