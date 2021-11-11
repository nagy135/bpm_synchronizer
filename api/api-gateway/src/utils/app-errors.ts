import {
  STATUS_HTTP_INTERNAL_SERVER_ERROR,
  STATUS_HTTP_BAD_REQUEST,
} from '@utils/http-codes';

export const ERR_APP_DEFAULT = 1000;
export const ERR_TOKEN_IS_NOT_PRESENT = 1001;
export const ERR_JWT_EXPIRED = 1002;
export const ERR_INVALID_SIGNATURE = 1003;
export const ERR_INVALID_TOKEN = 1004;
export const ERR_WRONG_USER_ROLE = 1005;
export const ERR_WRONG_ADMIN_ROLE = 1006;
export const ERR_NO_KYC = 1007;
export const ERR_EXTERNAL_SERVICE_DEFAULT = 1011;
export const ERR_APP_INTERNAL_CONFIGURATION = 2000;

export type TApplicationError = {
  code: number;
  message: string;
  httpStatusCode: number;
  logSeverity: string;
};

export type TApplicationErrors = {
  [key: number]: TApplicationError;
};

const baseErrors: TApplicationErrors = {
  1000: {
    code: 1000,
    message: 'default',
    httpStatusCode: STATUS_HTTP_INTERNAL_SERVER_ERROR,
    logSeverity: 'error',
  },
  1001: {
    code: 1001,
    message: 'token_is_not_present',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1002: {
    code: 1002,
    message: 'JWT_expired',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1003: {
    code: 1003,
    message: 'invalid_signature',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1004: {
    code: 1004,
    message: 'invalid_token',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1005: {
    code: 1005,
    message: 'wrong_user_role',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1006: {
    code: 1006,
    message: 'wrong_admin_role',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1007: {
    code: 1007,
    message: 'no_kyc',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1011: {
    code: 1011,
    message: 'external_service_error',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  2000: {
    code: 2000,
    message: 'internal_configuration',
    httpStatusCode: STATUS_HTTP_INTERNAL_SERVER_ERROR,
    logSeverity: 'error',
  },
};

const errors: TApplicationErrors = {
  ...baseErrors,
};

export default errors;
