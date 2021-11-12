import Winston from 'winston';
import * as LogForm from 'logform';

const { combine, timestamp, printf } = LogForm.format;

const levels = {
  coreInfo: -1,
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

/*
 * Custom app format
 */
const format: LogForm.Format = printf(
  (info: Winston.LogEntry) =>
    `${info.timestamp} - [${info.level.toUpperCase()}]: ${info.message}`
);

const appFormat: LogForm.Format = combine(timestamp(), format);
/*
 * Create logger instance
 */
const Logger: Winston.Logger = Winston.createLogger({
  format: appFormat,
  levels,
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production' || process.env.LOGGING === 'true') {
  Logger.add(new Winston.transports.Console());
} else {
  Logger.add(
    new Winston.transports.Console({
      level: 'warn',
    })
  );
}

export default Logger;
