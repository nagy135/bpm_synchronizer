import Logger from '@handler/logger/winston';
Logger.log('coreInfo', 'Starting Api-Gateway Application...');
import createApplication from './app';

// Generic logging
process.on('uncaughtException', (err: Error) => {
  Logger.log(
    'coreInfo',
    `There was an uncaught application error: ${err.stack}`
  );
});

// Handling signals
process.on('SIGINT', () => {
  Logger.log(
    'coreInfo',
    'Got SIGINT (aka ctrl-c in docker). Graceful shutdown'
  );
});

process.on('SIGTERM', () => {
  Logger.log(
    'coreInfo',
    'Got SIGINT (aka ctrl-c in docker). Graceful shutdown'
  );
});

const run = async (): Promise<void> => {
  try {
    createApplication();
    Logger.log('coreInfo', 'Application successfully started');
  } catch (err) {
    Logger.log('coreInfo', `Application start failed: ${err.stack}`);
  }
};

// RUN!
run().catch(/* Does catch nothing, server is event based */);
