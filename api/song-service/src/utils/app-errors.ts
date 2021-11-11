import {
  STATUS_HTTP_INTERNAL_SERVER_ERROR,
  STATUS_HTTP_BAD_REQUEST,
  STATUS_HTTP_NOT_FOUND,
} from '@utils/http-codes';

export const ERR_APP_DEFAULT = 1000;
export const ERR_EXTERNAL_SERVICE_DEFAULT = 1011;

export const ERR_APP_INVALID_PARAMS = 1201;
export const ERR_APP_SOLD_OUT = 1202;
export const ERR_APP_INVALID_BID = 1203;
export const ERR_APP_END_NOT_SET = 1204;
export const ERR_APP_AUCTION_OVER = 1205;
export const ERR_APP_PAYMENT_LOCK_TIMEOUT = 1206;
export const ERR_APP_BID_TOO_LOW = 1207;

export const ERR_APP_ENTITY_NOT_FOUND = 1300;

export const ERR_BRAINTREE_ERROR = 1301;

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
  1011: {
    code: 1011,
    message: 'external_service_error',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1201: {
    code: 1201,
    message: 'invalid_params',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1202: {
    code: 1202,
    message: 'sold_out',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1203: {
    code: 1203,
    message: 'invalid_bid',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1204: {
    code: 1204,
    message: 'end_not_set',
    httpStatusCode: STATUS_HTTP_INTERNAL_SERVER_ERROR,
    logSeverity: 'error',
  },
  1205: {
    code: 1205,
    message: 'auction_over',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1206: {
    code: 1206,
    message: 'payment_lock_timeout',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1207: {
    code: 1207,
    message: 'bid_too_low',
    httpStatusCode: STATUS_HTTP_BAD_REQUEST,
    logSeverity: 'error',
  },
  1300: {
    code: 1300,
    message: 'entity_not_found',
    httpStatusCode: STATUS_HTTP_NOT_FOUND,
    logSeverity: 'error',
  },
  1301: {
    code: 1301,
    message: 'braintree_error',
    httpStatusCode: STATUS_HTTP_INTERNAL_SERVER_ERROR,
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
