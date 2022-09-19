import { DataBaseError } from '../types/database.error';
import { PrismaClientError } from '../types/prisma-client.error';
import { UniqueConstraintError } from '../types/uniqueconstraint.error';

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
  ForeignKeyConstraint = 'P2003',
  ConstraintFailed = 'P2004',
  DataValidationError = 'P2007',
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    case PrismaErrors.ForeignKeyConstraint:
      return new UniqueConstraintError(e);

    case PrismaErrors.ConstraintFailed:
      return new UniqueConstraintError(e);

    case PrismaErrors.DataValidationError:
      return new UniqueConstraintError(e);

    default:
      return new DataBaseError(e.message);
  }
};
