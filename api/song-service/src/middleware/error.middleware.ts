import { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';
import globalConfig from '@config/global/config';
import { URL } from 'url';

import Logger from '@handler/logger/winston';
import errorParser from '@utils/error-parser';
import {
  STATUS_HTTP_BAD_REQUEST,
  STATUS_HTTP_INTERNAL_SERVER_ERROR,
} from '@utils/http-codes';
import appErrors, {
  ERR_APP_DEFAULT,
  ERR_EXTERNAL_SERVICE_DEFAULT,
  ERR_APP_ENTITY_NOT_FOUND,
} from '@utils/app-errors';

/**
 * Handle all errors
 * @author matej.dugovic
 */
const errorMiddleware = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  // Proccess known application error
  if (error.name === 'AppException' || error.name === 'ValidationException') {
    const code = error.code as number;
    const appError = appErrors[code];
    Logger.log(appError.logSeverity, error.stack);

    const errorData = errorParser(code, error.detail);
    return response.status(appError.httpStatusCode).send(errorData);
  }

  if (error.name === 'EntityNotFound') {
    const code = ERR_APP_ENTITY_NOT_FOUND;

    let entity = 'unknown';
    const match = error.message.match(/"([a-zA-Z]*)"/);
    if (match) entity = match[1];

    const appError = appErrors[code];
    Logger.log(appError.logSeverity, error.stack);

    const errorData = errorParser(code, error.detail);
    errorData.detail = {
      entity,
    };
    return response.status(appError.httpStatusCode).send(errorData);
  }

  // Process Axios error
  if (error.isAxiosError) {
    const axErrorResponse = (error as AxiosError).response;

    if (axErrorResponse) {
      Logger.log(
        'error',
        `${error.toString()} | ${axErrorResponse.config.url} | ${
          axErrorResponse.config.method
        } | ${JSON.stringify(axErrorResponse.data)}`
      );

      const url = new URL(axErrorResponse.config.url as string);
      if (globalConfig.internalServices.includes(url.origin)) {
        return response
          .status(axErrorResponse.status)
          .send(axErrorResponse.data);
      }
      return response
        .status(STATUS_HTTP_BAD_REQUEST)
        .send(errorParser(ERR_EXTERNAL_SERVICE_DEFAULT));
    }
  }
  Logger.log('error', error.toString());
  return response
    .status(STATUS_HTTP_INTERNAL_SERVER_ERROR)
    .send(errorParser(ERR_APP_DEFAULT));
};

export default errorMiddleware;
