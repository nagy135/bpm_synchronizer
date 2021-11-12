import { Request, Response, NextFunction } from 'express';
import config from '@config/config';
import { ERR_WRONG_ADMIN_ROLE } from '@utils/app-errors';
import AppException from '@exception/app.exception';

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.rid !== config.adminRole) {
    return next(new AppException(ERR_WRONG_ADMIN_ROLE));
  }

  return next();
};
