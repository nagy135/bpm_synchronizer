import { default as Express, Application } from 'express';
import Net from 'net';
import ErrorMiddleware from '@middleware/error.middleware';
import Logger from '@handler/logger/winston';
import RouterV1 from '@routes/v1';
import config from '@config/config';
import {
  MorganErrorMiddleware,
  MorganInfoMiddleware,
} from '@middleware/morgan.middleware';

/**
 * Inform about successful start
 * @param server
 */
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
      break;
    case 'EADDRINUSE':
      Logger.log(
        'coreInfo',
        `Application start failed - Address already in use: ${error.stack}`
      );
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Run function
 */
const createApplication = async () => {
  try {
    const marketServiceApi: Application = Express();
    marketServiceApi.use(Express.json());
    marketServiceApi.use(Express.urlencoded({ extended: false }));
    marketServiceApi.use(MorganInfoMiddleware);
    marketServiceApi.use(MorganErrorMiddleware);
    marketServiceApi.use('/v1', RouterV1);
    marketServiceApi.use(ErrorMiddleware);

    const server = marketServiceApi.listen(config.port);
    server.on('error', onHttpError);
    server.on('listening', () => onListening(server));

    return server;
  } catch (error) {
    Logger.log('coreInfo', `Error when starting app: ${error.stack}`);
  }
};

export default createApplication;
