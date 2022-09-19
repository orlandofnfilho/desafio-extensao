import { Role } from '@prisma/client';

export interface UserFromJwt {
  id: string;
  email: string;
  nome: string;
  role: Role;
}
