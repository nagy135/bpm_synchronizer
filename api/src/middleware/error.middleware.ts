import { NextFunction, Request, Response } from 'express';

import Logger from '@handler/logger/winston';
import errorParser from '@utils/error-parser';
import { STATUS_HTTP_INTERNAL_SERVER_ERROR } from '@utils/http-codes';
import appErrors, { ERR_APP_DEFAULT } from '@utils/app-errors';
import { AxiosError } from 'axios';
import { URL } from 'url';
import globalConfig from '@config/global/config';
import { STATUS_HTTP_BAD_REQUEST } from '@utils/http-codes';
import { ERR_EXTERNAL_SERVICE_DEFAULT } from '@utils/app-errors';

const errorMiddleware = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  // Proccess known application error
  if (error.name === 'AppException') {
    const code = error.code as number;
    const appError = appErrors[code];
    Logger.log(appError.logSeverity, error.stack);

    const errorData = errorParser(code, error.detail);
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
