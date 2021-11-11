import { ERR_APP_INVALID_PARAMS } from '@utils/app-errors';

/**
 * Handle validation exceptions
 */
class ValidationException extends Error {
  public code: number;
  public name: string;
  public detail: any[];

  public constructor(errors: any[], message = 'Validation error') {
    super(`${message} - ${JSON.stringify(errors, null, 2)}`);
    this.code = ERR_APP_INVALID_PARAMS;
    this.name = 'ValidationException';
    this.detail = errors;
  }
}

export default ValidationException;
