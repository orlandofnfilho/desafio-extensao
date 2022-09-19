import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioDTO } from '../../usuario/usuario.dto';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UsuarioDTO => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
