import morgan, { StreamOptions } from 'morgan';
import { NextFunction, Request, Response } from 'express';
import Logger from '@handler/logger/winston';

export const MorganInfoMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const stream: StreamOptions = {
    // Use the http severity
    write: (message) => Logger.log('info', message),
  };

  return morgan('short', {
    stream,
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
  })(request, response, next);
};

export const MorganErrorMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const stream: StreamOptions = {
    // Use the http severity
    write: (message) => Logger.log('warn', message),
  };

  return morgan('short', {
    stream,
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })(request, response, next);
};
