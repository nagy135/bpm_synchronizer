import ValidationException from '@exception/validation.exception';
import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

type TValidationData = {
  params?: any;
  body?: any;
  query?: any;
  headers?: any;
  cookies?: any;
};

/**
 * Additional validation options:
 * @member transform - override request body with values transformed by yup
 */
type TValidationOptions = {
  transform?: boolean;
};

/**
 * Middleware for request schema validation
 */
export const validate = (
  data: TValidationData,
  options: TValidationOptions = {}
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validationSchema: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      validationSchema[key] = yup.object().shape(value);
    }

    const yupValidationSchema = yup.object().shape(validationSchema);
    try {
      const transformedData = await yupValidationSchema.validate(req, {
        abortEarly: false,
      });

      /**
       * Override request data with transformed data
       */
      if (options.transform) {
        for (const key of ['params', 'body', 'query', 'headers', 'cookies']) {
          if (transformedData[key]) {
            req[key as keyof TValidationData] = transformedData[key];
          }
        }
      }

      return next();
    } catch (error) {
      return next(new ValidationException(error.errors));
    }
  };
};
