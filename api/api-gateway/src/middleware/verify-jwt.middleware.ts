import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import {
  ERR_INVALID_SIGNATURE,
  ERR_INVALID_TOKEN,
  ERR_JWT_EXPIRED,
  ERR_TOKEN_IS_NOT_PRESENT,
} from '@utils/app-errors';
import AppException from '@exception/app.exception';

export const verifyJwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  let token: any;
  if (
    req.headers.authorization &&
    req.headers.authorization !== '' &&
    req.headers.authorization.includes('Bearer')
  ) {
    token = req.headers.authorization.substr(7) as string;
  } else {
    return next(new AppException(ERR_TOKEN_IS_NOT_PRESENT));
  }

  //Try to validate the token and get data
  try {
    const authCert = Buffer.from(
      process.env.AUTH_PUBLIC_KEY as string,
      'base64'
    );

    const jwtPayload = jwt.verify(token, authCert) as any;
    res.locals.jwtPayload = jwtPayload;
    res.locals.token = token;
    res.locals.rid = jwtPayload.rid;
    res.locals.pid = jwtPayload.pid;
    res.locals.csm = jwtPayload.csm;
    res.locals.merchantId = jwtPayload.mid;
  } catch (error) {
    let errorCode: number;
    switch (error.message) {
      case 'jwt expired':
        errorCode = ERR_JWT_EXPIRED;
        break;
      case 'invalid signature':
        errorCode = ERR_INVALID_SIGNATURE;
        break;
      default:
        errorCode = ERR_INVALID_TOKEN;
    }
    return next(new AppException(errorCode));
  }

  //Call the next middleware or controller
  return next();
};
