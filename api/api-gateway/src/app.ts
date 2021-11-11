import bodyParser from 'body-parser';
import { default as Express, Application } from 'express';
import { default as cors } from 'cors';
import Net from 'net';
import ErrorMiddleware from '@middleware/error.middleware';
import Logger from '@handler/logger/winston';
import RouterV1 from '@routes/v1';
import config from '@config/config';
import {
  MorganErrorMiddleware,
  MorganInfoMiddleware,
} from '@middleware/morgan.middleware';

const onListening = (server: Net.Server): void => {
  if (server) {
    const addr: string | Net.AddressInfo = server.address() as
      | string
      | Net.AddressInfo;
    const message: string =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    Logger.log('coreInfo', message);
  }
};

/**
 * Handles specific errors with friendly messages
 * @param error Error - error from Node http server
 * @author jozef.repan@01people.com
 */
const onHttpError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      Logger.log(
        'coreInfo',
        `Application start failed - Required elevated privileges for start: ${error.stack}`
      );
      process.exit(1);
    case 'EADDRINUSE':
      Logger.log(
        'coreInfo',
        `Application start failed - Address already in use: ${error.stack}`
      );
      process.exit(1);
    default:
      throw error;
  }
};

const whiteList: string[] = process.env.URL_WHITELIST
  ? process.env.URL_WHITELIST.split(',')
  : [];

const corsOptions: any = {
  origin: (origin: any, callback: any): any => {
    if (typeof origin === 'undefined' || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Content-Length',
    'X-Requested-With',
    'api-key',
  ],
};

/**
 * Run function
 */
const createApplication = (): void => {
  try {
    const gatewayApi: Application = Express();
    gatewayApi.use(bodyParser.json());
    gatewayApi.use(bodyParser.urlencoded({ extended: false }));
    gatewayApi.use(MorganInfoMiddleware);
    gatewayApi.use(MorganErrorMiddleware);
    gatewayApi.use(cors(corsOptions));
    gatewayApi.use('/v1', RouterV1);
    gatewayApi.use(ErrorMiddleware);
    const server: Net.Server = gatewayApi.listen(config.port);
    server.on('error', onHttpError);
    server.on('listening', () => onListening(server));
  } catch (error) {
    Logger.log('coreInfo', `Error when starting app: ${error.stack}`);
  }
};

export default createApplication;
