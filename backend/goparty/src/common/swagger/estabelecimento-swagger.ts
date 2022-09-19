import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EstabelecimentoSwagger {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  nome: string;

  @IsString()
  @ApiProperty()
  urlLoc: string;
}
