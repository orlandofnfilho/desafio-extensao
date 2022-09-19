import { Role } from '@prisma/client';

export interface UserPayload {
  sub: string;
  email: string;
  nome: string;
  role: Role;
  iat?: number;
  exp?: number;
}
