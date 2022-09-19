import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public-decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { AuthRequestDTO } from './models/AuthRequestDTO';
import { UserTokenSwagger } from '../../common/swagger/Token-swagger';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthRequestDTO })
  @ApiOperation({ summary: 'Efetuar login' })
  @ApiResponse({
    status: 200,
    description: 'Retorna um access_token',
    type: UserTokenSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha inválidos',
  })
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
