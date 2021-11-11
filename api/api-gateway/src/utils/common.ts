import AppException from '@exception/app.exception';
import { ERR_APP_INTERNAL_CONFIGURATION } from './app-errors';

type TServices = 'market' | 'email' | 'auth' | 'wexo_payments' | 'document';

/**
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
//TODO: getServiceUri work with env
export const buildServiceUrl = (service: TServices, path: string): any => {
  let serviceUrl: string | undefined = '';
  switch (service) {
    case 'market':
      serviceUrl = process.env.market_service;
      break;
    case 'email':
      serviceUrl = process.env.email_service;
      break;
    case 'auth':
      serviceUrl = process.env.auth_service;
      break;
    case 'wexo_payments':
      serviceUrl = process.env.wexo_payments_service;
      break;
    case 'document':
      serviceUrl = process.env.document_service;
      break;
  }

  if (!serviceUrl)
    throw new AppException(
      ERR_APP_INTERNAL_CONFIGURATION,
      `undefined service url: ${service}`
    );

  return `${serviceUrl}${path}`;
};

export const getRoomName = (itemId: string): any => `room_${itemId}`;
