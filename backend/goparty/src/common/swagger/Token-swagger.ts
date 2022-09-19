import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserTokenSwagger {
  @IsString()
  @ApiProperty()
  access_token: string;
}
