import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GeneroSwagger {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  nome: string;
}
