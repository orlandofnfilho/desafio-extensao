import { Request } from 'express';
import { UsuarioDTO } from 'src/modules/usuario/usuario.dto';

export interface AuthRequest extends Request {
  user: UsuarioDTO;
}
