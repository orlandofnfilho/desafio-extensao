import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { UsuarioDTO } from '../usuario/usuario.dto';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserTokenSwagger } from '../../common/swagger/Token-swagger';
import { UnauthorizedError } from './errors/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const usuario = await this.usuarioService.findByEmail(email);

    if (usuario) {
      const isSenhaValid = await bcrypt.compare(senha, usuario.senha);

      if (isSenhaValid) {
        return {
          ...usuario,
          senha: undefined,
        };
      }
    }
    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }

  login(user: UsuarioDTO): UserTokenSwagger {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role,
    };
    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }
}
