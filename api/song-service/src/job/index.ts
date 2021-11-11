// import { runItemStateJob } from './item-state';
import Logger from '@handler/logger/winston';
import { createConnection } from 'typeorm';

const runJob = async () => {
  await createConnection();
  // runItemStateJob();
  Logger.log('coreInfo', 'started market-service-job successfully');
};

Logger.log('coreInfo', 'starting market-service-job');
runJob().catch((error) =>
  Logger.log('error', `error starting market-service-job: ${error.stack}`)
);
