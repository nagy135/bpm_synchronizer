import appErrors, { TApplicationError } from './app-errors';

type TErrorResponse = {
  code: number;
  message_code: string;
};

/**
 * Prepares error object for user
 *
 * @author jozef.repan@01people.com
 */
const errorParser = (code: number, additionalInfo?: string): TErrorResponse => {
  const error: TApplicationError = appErrors[code];

  return {
    code: error.code,
    message_code: error.message,
  };
};

export default errorParser;
