/**
 * Extended Error class for generic Application Errors that can be returned to user
 */
class AppException extends Error {
  public code: number;
  public name: string;
  public constructor(code: number, message = 'error') {
    super(`${code} - ${message}`);
    this.code = code;
    this.name = 'AppException';
  }
}

export default AppException;
