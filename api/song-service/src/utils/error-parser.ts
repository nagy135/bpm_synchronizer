import appErrors, { TApplicationError } from './app-errors';

type TErrorResponse = {
  code: number;
  message: string;
  detail?: any;
};

/**
 * Prepares error object for user
 *
 * @author jozef.repan@01people.com
 */
const errorParser = (code: number, detail?: any): TErrorResponse => {
  const error: TApplicationError = appErrors[code];

  return {
    code: error.code,
    message: error.message,
    ...(detail && { detail }),
  };
};

export default errorParser;
